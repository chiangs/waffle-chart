- [Introduction](#introduction)
    - [Limitations](#limitations)
  - [Demo](#demo)
  - [Supporting reads](#supporting-reads)
  - [API](#api)
    - [Square vs linear fill](#square-vs-linear-fill)
    - [Directional filling](#directional-filling)
    - [Total and Data Display](#total-and-data-display)
    - [Colors](#colors)
    - [Fonts and other styling](#fonts-and-other-styling)
  - [Installing](#installing)
    - [Usage](#usage)
  - [Contributing](#contributing)
  - [Developing](#developing)
    - [Testing](#testing)
    - [Building](#building)
    - [Merging](#merging)

# Introduction

As an American assimilating into Norway and the way of life, I'd like to think Norwegians would be proud of me for this one: 

***Waffles are better than Pies***

```js
🧇 > 🥧
```

There, I said it...and it's true.

Pies and donuts are harder to read, take longer to evaluate the meaning behind the visualization, and tend to take up more space.

Waffle charts can display more in the same amount of space at a larger, easier to read size. It provides a better graphical and textual representation of proportions.Thanks to a 10 x 10 grid, the user can quickly assess the overall portions and then drill down to the 1%.

<p>
  <img src="/assets/donut.svg?sanitize=true" alt="donut" width="300"/>
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="/assets/waffle.svg?sanitize=true" alt="waffle chart" width="300">
</p>

So let's improve your dashboard of hard-to-read pie charts that are insufficient in truly representing proportions.

This is a zero-dependency waffle chart built with React, Typescript & Vite. 

No `D3` only `HTML`, `CSS`, and `JS/TS`.

### Limitations

- Requires browser support for CSS `grid` and `flexbox`.
- Requires browser support for CSS `clamp()`.
- Currently only available for two values _(good candidate for next version)_.

## Demo

Live demo via Storybook [coming soon]().

## Supporting reads

- [📄 Storytelling with Data](https://www.storytellingwithdata.com/)
- [📄 The Issue with Pie (Donut) Chart](https://www.data-to-viz.com/caveat/pie.html)
- [📄 The Worst Chart In The World](https://www.businessinsider.com/pie-charts-are-the-worst-2013-6?r=US&IR=T)
- [📄 Waffles vs Pies - A visualization showdown!](https://www.barefootdatascience.com/2017/09/17/waffle-vs-pie-a-visualization-showdown/)
- [📄 Your Dashboard Needs a Waffle Chart](https://aptitive.com/blog/your-dashboard-needs-a-waffle-chart/)


## API

The chart will render with just the default props.

| Prop              | Type                    | Default   | Notes |
|-------------------|-------------------------|-----------|-------|
| partA             | number                  | 0         | this is the quantity, % is calculated by component |
| partB             | number                  | 100       | this is the quantity, % is calculated by component |
| partAlabel        | string                  | 'count'   |       |
| partBlabel        | string                  | 'count'   |       |
| rounding          | 'nearest', 'up', 'down' | 'nearest' | up for any amount over the whole, down if under a whole      |
| isFilledFromTop   | boolean                 | false     |       |
| isFrilledFromLeft | boolean                 | false     |       |
| isSquareFill      | boolean                 | true      | can fill in linear by row if false |
| isAnimatedFill    | boolean                 | true      | fade in color vs. instant change   |
| showDataDisplay   | boolean                 | true      |       |
| showTotal         | boolean                 | false     |       |
| partAColor        | string                  | undefined | can take any CSS color (hsl, rgb, hex, ...) |
| partBColor        | string                  | undefined | can take any CSS color (hsl, rgb, hex, ...) |
| totalColor        | string                  | undefined | can take any CSS color (hsl, rgb, hex, ...) |

### Square vs linear fill

Square (default) fill will fill `partA` values in a square shape with any remainders above on the next row. Linear will fill the entire row first then move onto the next row. Square fill is slightly more logic, but performance difference shouldn't be noticeable.

<p>
  <img src="/assets/waffle.svg?sanitize=true" alt="waffle chart" width="300">
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
  <img src="/assets/waffle-linear.svg?sanitize=true" alt="linear fill" width="300"/>
</p>

### Directional filling

Toggling the vertical and horizontal fill directions will change the position where `partA` value fills from. The label will follow the vertical fill setting.

<img src="/assets/waffle-vertical.svg?sanitize=true" alt="waffle chart vertical fill" width="300">
  
### Total and Data Display

Toggling these values will show/hide the calculations for total and percentages/counts.

### Colors

You can pass in colors via props or just override in `:root` or some scope above the component for the following:

- `--bg-total`: color for **total**, the fallback is `slategray`
- `--bg-square`: color for **partB** squares, the fallback is `cadetblue`
- `--bg-square-valued`: color for **partA** squares, the fallback is `palevioletred`

The fallbacks were chosen as they satisfy color contrast accessibility for both white and black backgrounds according to **WCAG AA** standards for _Large Text, UI Components, & Graphical Objects_.

### Fonts and other styling

The component will inherit the font from your app or can be modified by selecting it's class. Additional special stylings can be applied by selecting the right classes.

## Installing

Using `NPM`:

```bash
npm i waffle-chart
```

Using `Yarn`:

```bash
yarn add waffle-chart
```

### Usage

I recommend as a practice to wrap components like this in your own wrapper component that exposes the same API. This way you aren't married to this library and can easily swap it out without breaking consumers of your component.

```ts
// Import the CSS at the highest scope possible without coupling e.g. Shared or Vendor or Lib directory.
import 'node_modules/waffle-chart/dist/style.css';
```

```ts
import type { WaffleChartProps } from 'waffle-chart';
import { WaffleChart } from 'waffle-chart';

type Props = WaffleChartProps;

const MyChart: React.FC<Props> = (props: Props) => <WaffleChart {...props}/>

export default MyChart;
```

For Remix projects just import the style url in the `links` at the `root.tsx`.

```ts
import waffleChartStylesUrl from 'node_modules/waffle-chart/dist/style.css';

export const links: LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: waffleChartStylesUrl,
    },
];
```

## Contributing

This package is free for you to clone and change to your needs in accordance with the MIT license terms. If you want to contribute back to this codebase for improvements, please fork it, create an issue and then initiate a pull request that details the changes and problem or enhancement. Thanks! 🍻

## Developing

Starting development server:

```bash
yarn dev
```

### Testing

Testing methodology follows the testing-library guiding principles and focusing user interactions and integration testing.

Latest coverage report:

```
Test Files  4 passed (4)
     Tests  11 passed (11)
  Start at  10:54:55
  Duration  2.31s (setup 1ms, collect 669ms, tests 285ms)

------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |   98.94 |    82.66 |   95.45 |   98.94 |
 lib              |     100 |      100 |     100 |     100 |
  index.tsx       |     100 |      100 |     100 |     100 |
 lib/Chart        |     100 |      100 |     100 |     100 |
  Chart.tsx       |     100 |      100 |     100 |     100 |
  index.tsx       |     100 |      100 |     100 |     100 |
 lib/DataDisplay  |     100 |      100 |     100 |     100 |
  DataDisplay.tsx |     100 |      100 |     100 |     100 |
  index.tsx       |     100 |      100 |     100 |     100 |
 lib/Total        |     100 |      100 |     100 |     100 |
  Total.tsx       |     100 |      100 |     100 |     100 |
  index.ts        |     100 |      100 |     100 |     100 |
 lib/WaffleChart  |    98.5 |    78.68 |    92.3 |    98.5 |
  WaffleChart.tsx |   98.49 |    78.33 |   91.66 |   98.49 | 46-47,118-119
  index.tsx       |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------
```

Testing is built and run with:

- [Vitest](https://vitest.dev/)
- [React-Testing-Library](https://testing-library.com/)

Run tests once:

```bash
yarn test
```

Run tests and watch for changes:

```bash
yarn watch
```

Check coverage:

```bash
yarn coverage
```

Run Vitest UI:

```bash
yarn testui
```

### Building

```
yarn build
```

### Merging

See [Contributing](#contributing).