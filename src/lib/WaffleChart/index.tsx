import React from 'react';
import type {
    WaffleChartProps,
    GridItemProps,
    HorizontalFill,
    Rounding,
    VerticalFill,
    PartProps,
} from '../__types';
import './index.css';
import Chart from '../Chart';
import DataDisplay from '../DataDisplay';
import Total from '../Total';

type Props = WaffleChartProps;

const COMPONENT_NAME = 'waffle-chart-container';

/**
 * Calculate the total
 * @param a
 * @param b
 * @param c
 * @returns total
 */
const calcTotal = (a: number, b: number, c: number): number => a + b + c;

const normalize = (a: number, b: number, c: number): number[] =>
    [a, b, c].map((v) => (v <= 0 ? 0 : v));

/**
 * Get the raw percentage of a value
 * @param part
 * @param total
 * @returns raw percentage
 */
const calcPercentageRaw = (part: number, total: number): number =>
    (part / total) * 100 || 0;

/**
 * Sort the values from largest to smallest
 * @param a
 * @param b
 * @param c
 * @returns sorted list of values
 */
const sortValuesLargestToLowest = (collection: PartProps[]): PartProps[] =>
    collection.sort((a, b) => b.value - a.value);

/**
 * Determine if style override passed in as prop
 * @param color
 * @returns CSS prop object for background or undefined
 */
const getColorOverride = (
    color?: string
): { color: string; background: string } | undefined =>
    color ? { color, background: color } : undefined;

/**
 * Rounds a number
 * @param part: number
 * @param rounding : Rounding, rounding method
 * @returns rounded number
 */
const round = (part: PartProps, rounding: Rounding): PartProps => {
    const copy = { ...part };
    if (part.percentage > 100) copy.value = 100;
    switch (rounding) {
        case 'nearest':
            copy.percentage = Math.round(part.percentage);
            break;
        case 'up':
            copy.percentage = Math.ceil(part.percentage);
            break;
        case 'down':
            copy.percentage = Math.floor(part.percentage);
            break;
        default:
            copy.percentage = Math.round(part.percentage);
    }
    return copy;
};

/**
 * Returns props for linear fill
 * @param l
 * @param m
 * @param s
 * @returns GridItemProps[]
 */
const createLinearProps = ([
    largest,
    medium,
    smallest,
]: PartProps[]): GridItemProps[] => {
    const s = smallest.percentage;
    const m = medium.percentage;
    const mIndexOverS = s + m;
    const props: GridItemProps[] = [];
    for (let index = 100; index > 0; index--) {
        const isSmall = index <= s;
        const isMedium = index > s && index <= mIndexOverS;
        const isLarge = !isMedium && !isSmall;
        const identifier = isSmall
            ? smallest.id
            : isMedium
            ? medium.id
            : largest.id;
        const style = isSmall
            ? smallest.style
            : isMedium
            ? medium.style
            : isLarge
            ? largest.style
            : undefined;

        const itemProp: GridItemProps = {
            index,
            identifier,
            isSmall,
            isMedium,
            isLarge,
            style,
        };
        props.push(itemProp);
    }
    return largest.percentage === 50 ? props.reverse() : props;
};

/**
 * If filling grid as a square instead of by rows
 * @param value
 * @returns columns, rows, remaining nodes
 */
const getSquareProps = (value: number): { c: number; r: number; e: number } => {
    const sqrt = Math.sqrt(value);
    const c = Math.ceil(sqrt);
    const r = Math.floor(value / c) || 0;
    const e = value - c * r || 0;
    return { c, r, e };
};

/**
 * Returns rendering props for square rendering
 * mPercentage depends if there is 3rd value to offset beginning col
 * @param param0
 * @returns
 */
const createSquareProps = ([
    largest,
    medium,
    smallest,
]: PartProps[]): GridItemProps[] => {
    const itemProps = [];
    const mPercentage = smallest.percentage
        ? smallest.percentage + medium.percentage
        : medium.percentage;
    const sProps = getSquareProps(smallest.percentage);
    const mProps = getSquareProps(mPercentage);
    // Callbacks
    const getRow = (c: number): number => (Math.ceil(c / 10) * 10) / 10;
    const getRowColumnIndex = (r: number, c: number): number => r * 10 - 10 + c;
    const isValueForRow = (
        props: { c: number; r: number; e: number },
        row: number,
        column: number
    ): boolean =>
        (row < props.r && column <= getRowColumnIndex(row, props.c)) ||
        (row === props.r && column <= getRowColumnIndex(row, props.c));
    const isExtraForRow = (
        props: { c: number; r: number; e: number },
        row: number,
        column: number
    ) => row === props.r + 1 && column <= getRowColumnIndex(row, props.e);

    // Iterate through each grid square to assign props
    for (let column = 100; column > 0; column--) {
        const row = getRow(column);
        const isSmall = sProps.r
            ? isValueForRow(sProps, row, column) ||
              isExtraForRow(sProps, row, column)
            : false;
        const isMedium =
            isValueForRow(mProps, row, column) ||
            isExtraForRow(mProps, row, column);
        const isLarge = !isSmall && !isMedium;
        const identifier = isSmall
            ? smallest.id
            : isMedium
            ? medium.id
            : largest.id;
        const style = isSmall
            ? smallest.style
            : isMedium
            ? medium.style
            : isLarge
            ? largest.style
            : undefined;
        const itemProp: GridItemProps = {
            index: column,
            identifier,
            isSmall,
            isMedium,
            isLarge,
            style,
        };
        itemProps.push(itemProp);
    }
    return itemProps;
};

/**
 * Composes props based on settings and conditions
 * 50/50 always renders linear for ease of reading
 * @param PartProps from largest to smallest
 * @param isSquareFill
 * @returns rendering props by square or linear
 */
const getGridItemProps = ([l, m, s]: PartProps[], isSquareFill: boolean) => {
    const minSquares = 2;
    const canSquareS = s.percentage > minSquares;
    const canSquareM = canSquareS || m.percentage > minSquares;
    const isHalfHalf = l.percentage === 50 && !s.percentage;
    return !isHalfHalf && isSquareFill && (canSquareS || canSquareM)
        ? createSquareProps([l, m, s])
        : createLinearProps([l, m, s]);
};

const WaffleChart: React.FC<Props> = ({
    partA = 0,
    partB = 0,
    partC = 0,
    displayPrecision = 0,
    partAlabel = 'A',
    partBlabel = 'B',
    partClabel = 'C',
    rounding = 'nearest',
    isFilledFromTop = false,
    isFrilledFromLeft = false,
    isSquareFill = true,
    isAnimatedFill = true,
    showDataDisplay = true,
    showTotal = true,
    partAcolor = undefined,
    partBcolor = undefined,
    partCcolor = undefined,
    totalColor = undefined,
    clickHandler = (props) => props,
}: Props) => {
    // Click handler
    const onItemClick = (props: GridItemProps) => clickHandler(props);
    // Determine color overrides
    const styleA = getColorOverride(partAcolor);
    const styleB = getColorOverride(partBcolor);
    const styleC = getColorOverride(partCcolor);
    const styleTotal = getColorOverride(totalColor);
    // Calculate raw values and normalize to 0 or positive value
    const [normA, normB, normC] = normalize(partA, partB, partC);
    const rawTotal = calcTotal(normA, normB, normC);
    const total = rawTotal.toFixed(displayPrecision);
    const [percentAraw, percentBraw, percentCraw] = [normA, normB, normC].map(
        (p) => calcPercentageRaw(p, rawTotal)
    );
    // Create collection of ValueIdentifier obj
    const propA: PartProps = {
        id: 'a',
        value: partA,
        percentage: percentAraw,
        label: partAlabel,
        style: styleA,
    };
    const propB: PartProps = {
        id: 'b',
        value: partB,
        percentage: percentBraw,
        label: partBlabel,
        style: styleB,
    };
    const propC: PartProps = {
        id: 'c',
        value: partC,
        percentage: percentCraw,
        label: partClabel,
        style: styleC,
    };
    // Determine order from largest
    const ordered = sortValuesLargestToLowest([propA, propB, propC]);
    const rounded = ordered.map((o) => round(o, rounding));
    // Determing fill direction
    const verticalFill: VerticalFill = isFilledFromTop ? 'top' : 'bottom';
    const horizontalFill: HorizontalFill = isFrilledFromLeft ? 'left' : 'right';
    // Total Display
    const totalDisplay = showTotal ? (
        <Total style={styleTotal}>{total}</Total>
    ) : null;
    // Data Display
    const dataDisplay =
        showDataDisplay && propA && propB && propC ? (
            <DataDisplay
                data1={rounded[2]}
                data2={rounded[1]}
                data3={rounded[0]}
                verticalFill={verticalFill}
                precision={displayPrecision}
            />
        ) : null;

    // Grid rendering properties
    const propsGrid = getGridItemProps(rounded, isSquareFill);

    return (
        <div className={COMPONENT_NAME} data-testid={COMPONENT_NAME}>
            {totalDisplay}
            <Chart
                itemProps={propsGrid}
                verticalFill={verticalFill}
                horizontalFill={horizontalFill}
                isAnimatedFill={isAnimatedFill}
                isZeros={!partA && !partB}
                clickHandler={onItemClick}
            />
            {dataDisplay}
        </div>
    );
};

export default WaffleChart;
