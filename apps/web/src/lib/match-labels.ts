type DisplayPair = { left: string; right: string; labelLeft: string; labelRight: string };

/** Describe the submitted pair using the labels of the two selected items. */
export function selectedMatchLabel(pairs: DisplayPair[], selected: { left: string; right: string }): string {
  const left = pairs.find((pair) => pair.left === selected.left);
  const right = pairs.find((pair) => pair.right === selected.right);
  return `${left?.labelLeft ?? selected.left}→${right?.labelRight ?? selected.right}`;
}
