# SparkMeld SVG for Ruby

A small local SVG utility. For the full product, visit [SparkMeld](https://sparkmeld.com/).

```sh
gem install sparkmeld_storyboard_svg
```

```ruby
require "sparkmeld_storyboard_svg"
svg = SparkMeldStoryboardSvg.render(["Intro", "Final"])
File.write("output.svg", svg)
```

This gem generates a basic SVG and does not call the website's AI service. MIT licensed; no runtime dependencies.
