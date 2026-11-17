# sparkmeld-storyboard-svg

A small local SVG generator for [SparkMeld](https://sparkmeld.com/). It does not call the site or provide full video/export functionality.

```sh
cargo add sparkmeld-storyboard-svg
```

Use `sparkmeld_storyboard_svg::render_storyboard(&["Opening", "Closing"])` to return an SVG string. MIT licensed.
