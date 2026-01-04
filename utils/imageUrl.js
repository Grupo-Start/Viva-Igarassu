export function buildImageUrl(p) {
  if (!p) return null;
  const value = String(p);
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('//')) return value;
  const api = process.env.API_URL || '';
  if (!api) return value.startsWith('/') ? value : `/${value}`;
  if (value.startsWith('/')) return `${api}${value}`;
  return `${api}/${value}`;
}

export default { buildImageUrl };
