# sparkmeld-storyboard-svg

A small local SVG generator for [SparkMeld](https://sparkmeld.com/). It does not call the site or provide full video/export functionality.

Install: `pip install sparkmeld-storyboard-svg`.

```python
from sparkmeld_storyboard_svg import render_storyboard
svg = render_storyboard(["Opening scene", "Closing scene"])
```

MIT licensed.
