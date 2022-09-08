import React from 'react';
import type {
    WaffleChartProps,
    DataDisplayProps,
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
    (part / total) * 100;

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
const getColorOverride = (color?: string): { background: string } | undefined =>
    color ? { background: color } : undefined;

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

const createSquareProps = ([
    largest,
    medium,
    smallest,
]: PartProps[]): GridItemProps[] => {
    console.log(
        '🚀 ~ file: index.tsx ~ line 187 ~ largest',
        largest.percentage,
        medium.percentage,
        smallest.percentage
    );
    const itemProps = [];
    const sProps = getSquareProps(smallest.percentage);
    const mProps = getSquareProps(medium.percentage);
    console.log('🚀 ~ file: index.tsx ~ line 196 ~ mProps', mProps);
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

    for (let column = 100; column > 0; column--) {
        const row = getRow(column);

        const isSmall = false;

        const isMedium =
            isValueForRow(mProps, row, column) ||
            isExtraForRow(mProps, row, column);

        const isLarge = !isSmall && !isMedium;
        const identifier = isSmall
            ? smallest.id
            : isMedium
            ? medium.id
            : largest.id;

        const itemProp: GridItemProps = {
            index: column,
            identifier,
            isSmall,
            isMedium,
            isLarge,
        };
        itemProps.push(itemProp);
    }
    return itemProps;
};

const getGridItemProps = ([l, m, s]: PartProps[], isSquareFill: boolean) => {
    const minSquares = 2;
    const canSquareS = s.percentage > minSquares;
    const canSquareM = canSquareS || m.percentage > minSquares;
    const isHalfHalf = l.percentage === 50;
    return !isHalfHalf && isSquareFill && (canSquareS || canSquareM)
        ? createSquareProps([l, m, s])
        : createLinearProps([l, m, s]);
};

// TODO: earlier check on negative
// TODO: earlier check on anything over 100%?
const WaffleChart: React.FC<Props> = ({
    partA = 24,
    partB = 0,
    partC = 100 - partA,
    displayPrecision = 0,
    partAlabel = 'count',
    partBlabel = 'count',
    partClabel = 'count',
    rounding = 'nearest',
    isFilledFromTop = false,
    isFrilledFromLeft = false,
    isSquareFill = true,
    isAnimatedFill = true,
    showDataDisplay = false,
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
    const valueA: PartProps = {
        id: 'a',
        value: partA,
        percentage: percentAraw,
        style: styleA,
    };
    const valueB: PartProps = {
        id: 'b',
        value: partB,
        percentage: percentBraw,
        style: styleB,
    };
    const valueC: PartProps = {
        id: 'c',
        value: partC,
        percentage: percentCraw,
        style: styleC,
    };
    // Determine order from largest
    const ordered = sortValuesLargestToLowest([valueA, valueB, valueC]);
    const rounded = ordered.map((o) => round(o, rounding));
    // Determing fill direction
    const verticalFill: VerticalFill = isFilledFromTop ? 'top' : 'bottom';
    const horizontalFill: HorizontalFill = isFrilledFromLeft ? 'left' : 'right';
    // Total Display
    const totalDisplay = showTotal ? (
        <Total style={styleTotal}>{total}</Total>
    ) : null;
    // Data Display
    // const { data1Props, data2Props } = showDataDisplay
    //     ? createDisplayProps(
    //           partA,
    //           partB,
    //           partC,
    //           partAlabel,
    //           partBlabel,
    //           partClabel,
    //           rounded,
    //           styleA,
    //           styleB
    //       )
    //     : { data1Props: null, data2Props: null };
    // const dataDisplay =
    //     showDataDisplay && data1Props && data2Props ? (
    //         <DataDisplay
    //             data1={data1Props}
    //             data2={data2Props}
    //             verticalFill={verticalFill}
    //         />
    //     ) : null;

    const propsGrid = getGridItemProps(rounded, isSquareFill);

    return (
        <div
            className='waffle-chart-container'
            data-testid='waffle-chart-container'>
            {totalDisplay}
            <Chart
                itemProps={propsGrid}
                verticalFill={verticalFill}
                horizontalFill={horizontalFill}
                isAnimatedFill={isAnimatedFill}
                isZeros={!partA && !partB}
                clickHandler={onItemClick}
            />
            {/* {dataDisplay} */}
        </div>
    );
};

export default WaffleChart;
