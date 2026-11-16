/* @ts-self-types="./mod.d.ts" */
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

/** Render 1–12 text prompts as a planning storyboard. */
export function renderStoryboard(prompts, options = {}) {
  const { width = 900, cardColor = '#e9edff' } = options;
  if (!Array.isArray(prompts) || prompts.length < 1 || prompts.length > 12 || prompts.some((x) => !String(x).trim())) throw new TypeError('provide 1 to 12 nonempty prompts');
  if (!Number.isInteger(width) || width < 400 || !/^#[0-9a-fA-F]{6}$/.test(cardColor)) throw new TypeError('invalid options');
  const columns = Math.min(3, prompts.length);
  const rows = Math.ceil(prompts.length / columns);
  const gap = 16;
  const cardWidth = (width - gap * (columns + 1)) / columns;
  const cardHeight = 180;
  const height = rows * (cardHeight + gap) + gap;
  const cards = prompts.map((prompt, i) => {
    const x = gap + (i % columns) * (cardWidth + gap);
    const y = gap + Math.floor(i / columns) * (cardHeight + gap);
    const words = String(prompt).trim().split(/\s+/);
    const lines = [];
    let current = '';
    for (const word of words) {
      if ((current + ' ' + word).trim().length > 28 && current) { lines.push(current); current = word; }
      else current = `${current} ${word}`.trim();
    }
    if (current) lines.push(current);
    const text = lines.slice(0, 4).map((line, j) => `<text x="${x + 18}" y="${y + 76 + j * 24}" font-family="Arial,sans-serif" font-size="16" fill="#22283a">${escapeXml(line.slice(0, 34))}</text>`).join('');
    return `<rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="12" fill="${cardColor}"/><text x="${x + 18}" y="${y + 36}" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#303f91">Scene ${i + 1}</text>${text}`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Storyboard with ${prompts.length} scenes"><rect width="100%" height="100%" fill="#ffffff"/>${cards}</svg>`;
}
