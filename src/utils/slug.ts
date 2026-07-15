export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function findBySlug<T extends { id: string; name?: string; title?: string }>(
  items: T[],
  slug: string
): T | undefined {
  return items.find(item => {
    const name = item.name || item.title || '';
    return slugify(name) === slug || item.id === slug;
  });
}
