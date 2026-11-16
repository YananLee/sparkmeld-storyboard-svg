"""Storyboard SVG for SparkMeld workflows."""
from html import escape
import re


def render_storyboard(prompts, *, width=900, card_color="#e9edff"):
    if not isinstance(prompts, (list, tuple)) or not 1 <= len(prompts) <= 12 or any(not isinstance(p, str) or not p.strip() for p in prompts):
        raise ValueError("provide 1 to 12 nonempty prompts")
    if not isinstance(width, int) or width < 400 or not re.fullmatch(r"#[0-9a-fA-F]{6}", card_color):
        raise ValueError("invalid options")
    columns = min(3, len(prompts))
    gap, card_height = 16, 180
    card_width = (width - gap * (columns + 1)) / columns
    height = ((len(prompts) + columns - 1) // columns) * (card_height + gap) + gap
    cards = []
    for i, prompt in enumerate(prompts):
        x = gap + (i % columns) * (card_width + gap)
        y = gap + (i // columns) * (card_height + gap)
        cards.append(f'<rect x="{x:.1f}" y="{y}" width="{card_width:.1f}" height="{card_height}" rx="12" fill="{card_color}"/><text x="{x+18:.1f}" y="{y+36}" font-family="Arial,sans-serif" font-size="18" fill="#303f91">Scene {i+1}</text>')
        words, lines, current = prompt.split(), [], ""
        for word in words:
            candidate = (current + " " + word).strip()
            if len(candidate) > 28 and current:
                lines.append(current)
                current = word
            else:
                current = candidate
        if current: lines.append(current)
        for j, line in enumerate(lines[:4]):
            cards.append(f'<text x="{x+18:.1f}" y="{y+76+j*24}" font-family="Arial,sans-serif" font-size="16" fill="#22283a">{escape(line[:34])}</text>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Storyboard with {len(prompts)} scenes"><rect width="100%" height="100%" fill="#ffffff"/>{"".join(cards)}</svg>'
