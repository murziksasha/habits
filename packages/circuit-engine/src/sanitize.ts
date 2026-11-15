/**
 * Netlist validation and security sanitation.
 * Enforces execution limits and prevents access to the host environment.
 */

export const MAX_COMPONENTS = 200;
export const MAX_SIM_POINTS = 100_000;
export const MAX_RETURN_POINTS = 10_000;
export const SIMULATION_TIMEOUT_MS = 10_000;
export const MAX_NETLIST_CHARS = 1_000_000; // 1 MB limit

export type SanitizeResult = {
  valid: boolean;
  errors: string[];
  sanitizedNetlist: string;
  componentCount: number;
};

// Forbidden SPICE directives that might attempt external file I/O or shell access
const FORBIDDEN_DIRECTIVES = [
  /^\s*\.inc(?:lude)?\b/i,
  /^\s*\.lib\b/i,
  /^\s*\.exec\b/i,
  /^\s*\.system\b/i,
  /^\s*\.shell\b/i,
  /^\s*\.control\b/i,
  /^\s*\.endc\b/i,
  /^\s*\.save\s+file\b/i,
  /^\s*\.open\b/i,
  /^\s*\.write\b/i,
  /^\s*\.cd\b/i,
];

const ALLOWED_DOT = /^\s*\.(model|subckt|ends|param|op|dc|ac|tran|noise|end|probe|print|save|options|ic|nodeset|temp|global|title|plot|four|measure|func)\b/i;
const COMPONENT_LINE = /^[RCLVIDQMXSKEFGHB]\w*/i;
const INTERPRETER = /\b(while|repeat|dowhile|foreach|shell|system|fopen|wrdata|echo)\b/i;

/**
 * Validates and sanitizes SPICE netlist text.
 */
export function sanitizeNetlist(rawNetlist: string): SanitizeResult {
  const errors: string[] = [];

  if (!rawNetlist || rawNetlist.trim().length === 0) {
    return {
      valid: false,
      errors: ["netlist_empty: No SPICE netlist provided"],
      sanitizedNetlist: "",
      componentCount: 0,
    };
  }

  if (rawNetlist.length > MAX_NETLIST_CHARS) {
    return {
      valid: false,
      errors: [`netlist_too_large: Exceeds ${MAX_NETLIST_CHARS} bytes limit`],
      sanitizedNetlist: "",
      componentCount: 0,
    };
  }

  const lines = rawNetlist.split(/\r?\n/);
  const cleanLines: string[] = [];
  let componentCount = 0;
  let hasGroundNode = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i]!;
    const line = rawLine.trim();

    // Skip empty lines or pure comments (starting with *)
    if (!line || line.startsWith("*")) {
      cleanLines.push(rawLine);
      continue;
    }

    if (INTERPRETER.test(line) || /[`]/.test(line) || /\b(sh|cmd)\s/i.test(line)) {
      errors.push(`disallowed_directive: Line ${i + 1} contains an interpreter or shell command`);
    }

    // Check forbidden directives
    for (const forbidden of FORBIDDEN_DIRECTIVES) {
      if (forbidden.test(line)) {
        errors.push(`disallowed_directive: Line ${i + 1} contains unsafe directive: "${line}"`);
      }
    }

    if (line.startsWith(".") && !ALLOWED_DOT.test(line) && !FORBIDDEN_DIRECTIVES.some((re) => re.test(line))) {
      errors.push(`disallowed_directive: Line ${i + 1} is not in the allowed netlist grammar`);
    }

    if (line.startsWith("+")) {
      cleanLines.push(rawLine);
      continue;
    }

    if (!line.startsWith(".") && !line.startsWith("*") && !COMPONENT_LINE.test(line)) {
      errors.push(`disallowed_directive: Line ${i + 1} is not a supported element`);
    }

    // Detect components (lines starting with R, C, L, V, I, D, Q, M, X, S, K, E, F, G, H)
    const firstChar = line[0]?.toUpperCase();
    if (firstChar && "RCLVIDQMXSKEFGH".includes(firstChar)) {
      componentCount++;
    }

    // Check for ground node (0 or GND)
    const tokens = line.split(/\s+/);
    if (tokens.length >= 3) {
      for (let t = 1; t < tokens.length; t++) {
        const tok = tokens[t]?.toLowerCase();
        if (tok === "0" || tok === "gnd" || tok === "ground") {
          hasGroundNode = true;
        }
      }
    }

    cleanLines.push(rawLine);
  }

  if (componentCount > MAX_COMPONENTS) {
    errors.push(`component_limit_exceeded: Found ${componentCount} components (maximum ${MAX_COMPONENTS})`);
  }

  if (!hasGroundNode) {
    errors.push("missing_ground: Circuit must contain reference ground node 0");
  }

  // Ensure title card (first line in SPICE is title unless already comment)
  if (cleanLines.length > 0 && !cleanLines[0]!.startsWith("*")) {
    cleanLines.unshift("* EduForge Generated SPICE Netlist");
  }

  // Ensure .end directive at the end
  const hasEnd = cleanLines.some((l) => /^\s*\.end\b/i.test(l.trim()));
  if (!hasEnd) {
    cleanLines.push(".end");
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitizedNetlist: cleanLines.join("\n"),
    componentCount,
  };
}
