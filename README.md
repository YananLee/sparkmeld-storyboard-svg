# SparkMeld storyboard SVG

Turn a short list of image or video prompts into a simple, shareable storyboard SVG. It runs locally and does not generate images or videos. For AI media creation, use [SparkMeld](https://sparkmeld.com/).

```sh
npm install sparkmeld-storyboard-svg
```

```js
import { renderStoryboard } from 'sparkmeld-storyboard-svg';
import { writeFileSync } from 'node:fs';

writeFileSync('storyboard.svg', renderStoryboard(['Wide opening scene', 'Close-up of the product', 'Final logo']));
```

Options: `width` and `cardColor`. MIT licensed, no runtime dependencies.

RubyGems source and tests are in [`ruby/`](./ruby/). Install with `gem install sparkmeld_storyboard_svg`.

## Additional SVG packages

Small local SVG utilities are maintained in [`python/`](./python/), [`jsr/`](./jsr/), and [`rust/`](./rust/). They do not call the website's export or AI service.

- JSR: [`@yananlee/sparkmeld-storyboard-svg`](https://jsr.io/@yananlee/sparkmeld-storyboard-svg)
- Rust: [`sparkmeld-storyboard-svg`](https://crates.io/crates/sparkmeld-storyboard-svg)
- Python: [`sparkmeld-storyboard-svg`](https://pypi.org/project/sparkmeld-storyboard-svg/0.1.0/) is published; source is in [`python/`](./python/).
