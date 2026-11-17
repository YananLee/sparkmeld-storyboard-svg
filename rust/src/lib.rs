//! Lightweight SVG generator associated with SparkMeld.

fn escape(input: &str) -> String {
    input
        .chars()
        .map(|c| match c {
            '&' => "&amp;".to_string(),
            '<' => "&lt;".to_string(),
            '>' => "&gt;".to_string(),
            '"' => "&quot;".to_string(),
            '\'' => "&apos;".to_string(),
            _ => c.to_string(),
        })
        .collect()
}

/// Arrange 1 to 12 scene prompts into a planning storyboard SVG.
pub fn render_storyboard(prompts: &[&str]) -> Result<String, &'static str> {
    if prompts.is_empty() || prompts.len() > 12 || prompts.iter().any(|p| p.trim().is_empty()) {
        return Err("provide 1 to 12 nonempty prompts");
    }
    let columns = prompts.len().min(3);
    let rows = prompts.len().div_ceil(columns);
    let width = 900_usize;
    let height = rows * 196 + 16;
    let card_width = (width - 16 * (columns + 1)) / columns;
    let mut cards = String::new();
    for (i, prompt) in prompts.iter().enumerate() {
        let x = 16 + (i % columns) * (card_width + 16);
        let y = 16 + (i / columns) * 196;
        let line: String = prompt.chars().take(90).collect();
        cards.push_str(&format!(r##"<rect x="{x}" y="{y}" width="{card_width}" height="180" rx="12" fill="#e9edff"/><text x="{}" y="{}" font-family="Arial,sans-serif" font-size="18" fill="#303f91">Scene {}</text><text x="{}" y="{}" font-family="Arial,sans-serif" font-size="16" fill="#22283a">{}</text>"##, x+18, y+36, i+1, x+18, y+76, escape(&line)));
    }
    Ok(format!(
        r##"<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Storyboard with {} scenes"><rect width="100%" height="100%" fill="#ffffff"/>{cards}</svg>"##,
        prompts.len()
    ))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn renders_escaped_svg() {
        let svg = render_storyboard(&["Opening", "Closing"]).unwrap();
        assert!(svg.starts_with("<svg "));
        assert!(svg.ends_with("</svg>"));
        assert!(!svg.contains("<script>"));
    }
}
