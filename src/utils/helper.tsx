export function generateUniqueId() {
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.random().toString(16).substr(2, 8);
  return `${timestamp}-${randomPart}`;
}
