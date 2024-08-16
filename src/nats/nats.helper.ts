import { snakeCase } from 'lodash';

export function natsRoute(controller: string, action: string): string {
  return joinBy(['user', controller, action], '.', snakeCase);
}

function joinBy(
  parts: string[],
  separator: string,
  iteratee?: (str: string) => string,
): string {
  if (!Array.isArray(parts) || typeof separator !== 'string') {
    throw new TypeError('Invalid input types');
  }

  return parts
    .map((part) =>
      part
        .split(separator)
        .map((str) => str.trim())
        .filter((str) => str)
        .map((str) => (iteratee ? iteratee(str) : str)),
    )
    .flat()
    .join(separator);
}
