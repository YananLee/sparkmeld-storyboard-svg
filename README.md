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
