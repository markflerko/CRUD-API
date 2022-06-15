/**
 * Check if id correspond to uuid format
 * @param id id that should be checked
 * @returns true if id correspond to uuid format and false otherwise
 */
export const isUuid = (id: string): boolean =>
  Boolean(id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
