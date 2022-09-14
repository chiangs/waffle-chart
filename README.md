![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/chiangs/waffle-chart/Release?style=for-the-badge)
![GitHub all releases](https://img.shields.io/github/downloads/chiangs/waffle-chart/total?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/chiangs/waffle-chart?style=for-the-badge)

- [Introduction](#introduction)
  - [Usage in commercial projects](#usage-in-commercial-projects)
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
    - [Updating](#updating)
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

Waffle charts can display more in the same amount of space at a larger, easier to read size. It provides a better graphical and textual representation of proportions. Thanks to a 10 x 10 grid, the user can quickly assess the overall portions and then drill down to the 1%.

My personal opinion is that after three values, a bar chart (`stackable-bar-chart` coming soon) is better at showing the data relations rather than the waffle, which is why I've capped the values to three for this component. It also helps to keep each input prop primitive.

<p>
  <img src="/assets/donut.svg?sanitize=true" alt="donut" width="300"/>
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="/assets/waffle.svg?sanitize=true" alt="waffle chart" width="300">
</p>

This is a zero-dependency library built with React, Typescript & Vite. 

No `D3` only `HTML`, `CSS`, and `JS/TS`.

> 🚀 ***v2.0.0***: Now supporting three quantities!

<img src="/assets/waffle-v2.png" alt="waffle chart three values square fill" width="300">

## Usage in commercial projects

If you are using this in a commercial project, please consider leaving a donation/tip. Cheers!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M1EC8PM)

## Limitations

- Requires browser support for CSS `grid` and `flexbox`.
- Requires browser support for CSS `clamp()`.

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
| partB             | number                  | 0         | this is the quantity, % is calculated by component |
| partC             | number                  | 0         | this is the quantity, % is calculated by component |
| displayPrecision  | number                  | 0         | number of decimals for quantity and percentage     |
| partAlabel        | string                  | 'A'       |       |
| partBlabel        | string                  | 'B'       |       |
| partClabel        | string                  | 'C'       |       |
| rounding          | 'nearest', 'up', 'down' | 'nearest' | up for any amount over the whole, down if under a whole      |
| isFilledFromTop   | boolean                 | false     |       |
| isFilledFromLeft  | boolean                 | false     |       |
| isSquareFill      | boolean                 | true      | can fill in linear by row if false |
| isAnimatedFill    | boolean                 | true      | fade in color vs. instant change   |
| showDataDisplay   | boolean                 | true      |       |
| showTotal         | boolean                 | false     |       |
| partAColor        | string                  | undefined | can take any CSS color (hsl, rgb, hex, ...) |
| partBColor        | string                  | undefined | can take any CSS color (hsl, rgb, hex, ...) |
| partCColor        | string                  | undefined | can take any CSS color (hsl, rgb, hex, ...) |
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

### Updating

npm 

```bash
npm update
```

yarn

```bash
yarn upgrade waffle-chart@^
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
Test Files  6 passed (6)
     Tests  13 passed (13)
  Start at  12:41:38
  Duration  2.26s (setup 2ms, collect 1.08s, tests 395ms)

-------------|---------|----------|---------|---------|---------------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|---------------------------
All files    |   98.52 |    87.64 |   95.65 |   98.52 |                           
 Chart       |     100 |      100 |     100 |     100 | 
  index.tsx  |     100 |      100 |     100 |     100 | 
 ChartSquare |     100 |      100 |     100 |     100 | 
  index.tsx  |     100 |      100 |     100 |     100 | 
 DataDisplay |     100 |      100 |     100 |     100 | 
  index.tsx  |     100 |      100 |     100 |     100 | 
 Total       |     100 |      100 |     100 |     100 | 
  index.tsx  |     100 |      100 |     100 |     100 | 
 WaffleChart |   97.86 |    84.93 |   94.11 |   97.86 | 
  index.tsx  |   97.86 |    84.93 |   94.11 |   97.86 | 79-80,106,111,116,199,307
-------------|---------|----------|---------|---------|---------------------------
```

Testing is built and run with:

- [Vitest](https://vitest.dev/)
- [React-Testing-Library](https://testing-library.com/)

You'll notice very sparse snapshots for each component and a focus on the integrations.

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