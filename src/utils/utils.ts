export function parseBool(
  val?: string | number | boolean,
): boolean | undefined {
  if (typeof val === 'boolean') {
    return val;
  }

  if (typeof val === 'number') {
    return val === 1 ? true : val === 0 ? false : undefined;
  }

  if (typeof val === 'string') {
    val = val.trim().toLowerCase();
    if (['1', 'true', 'yes', 'y'].includes(val)) {
      return true;
    }
    if (['0', 'false', 'no', 'n'].includes(val)) {
      return false;
    }
  }

  return undefined;
}
