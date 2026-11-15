/** Map avatar keys to emoji for UI chips / profiles. */
export function avatarEmoji(key: string | null | undefined): string {
  switch (key) {
    case "knight":
      return "⚔️";
    case "scholar":
      return "📚";
    case "fox":
      return "🦊";
    case "robot":
      return "🤖";
    case "wizard":
      return "🧙‍♂️";
    case "dragon":
      return "🐉";
    case "ninja":
      return "🥷";
    case "owl":
      return "🦉";
    case "panda":
      return "🐼";
    case "phoenix":
      return "🔥";
    case "cosmic":
      return "🌌";
    case "samurai":
      return "🗡️";
    case "mage":
      return "🔮";
    case "cyborg":
      return "🦾";
    case "unicorn":
      return "🦄";
    case "admin":
      return "👑";
    default:
      return "🧙";
  }
}
