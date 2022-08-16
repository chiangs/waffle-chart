import React from 'react';
import type {
    WaffleChartProps,
    DataDisplayProps,
    GridItemProps,
    HorizontalFill,
    Rounding,
    VerticalFill,
    ValueIdentifier,
} from '../__types';
import './index.css';
import Chart from '../Chart';
import DataDisplay from '../DataDisplay';
import Total from '../Total';

type Props = WaffleChartProps;

/**
 * Rounds a number
 * @param percentage: number
 * @param rounding : Rounding, rounding method
 * @returns rounded number
 */
const round = (
    percentage: ValueIdentifier,
    rounding: Rounding
): ValueIdentifier => {
    const copy = { ...percentage };
    if (percentage.value > 100) copy.value = 100;
    switch (rounding) {
        case 'nearest':
            copy.value = Math.round(percentage.value);
        case 'up':
            copy.value = Math.ceil(percentage.value);
        case 'down':
            copy.value = Math.floor(percentage.value);
        default:
            copy.value = Math.round(percentage.value);
    }
    return copy;
};

/**
 * If filling grid as a square instead of by rows
 * @param value
 * @returns columns, rows, remaining nodes
 */
const getSquareProps = (value: number): { c: number; r: number; e: number } => {
    const sqrt = Math.sqrt(value);
    const c = Math.ceil(sqrt);
    const r = Math.floor(value / c);
    const e = value - c * r;
    return { c, r, e };
};

/**
 * Determines if index is within values of r
 * @param index
 * @param value
 * @param squareProps
 * @returns boolean
 */
const setIsValueForCompleteRow = (
    index: number,
    value: number,
    squareProps: { c: number; r: number; e: number } | null
): boolean => {
    if (!squareProps || value < 3) {
        return index <= value;
    }
    const { c, r } = squareProps;
    const row1 = index <= c;
    const row2 = row1 || (index > 10 && index <= 10 + c);
    const row3 = row2 || (index > 20 && index <= 20 + c);
    const row4 = row3 || (index > 30 && index <= 30 + c);
    const row5 = row4 || (index > 40 && index <= 40 + c);
    const row6 = row5 || (index > 50 && index <= 50 + c);
    const row7 = row6 || (index > 60 && index <= 60 + c);
    const row8 = row7 || (index > 70 && index <= 70 + c);
    const row9 = row8 || (index > 80 && index <= 80 + c);
    const row10 = row9 || (index > 90 && index <= 90 + c);
    const rowLogic: { [k: number]: boolean } = {
        1: row1,
        2: row2,
        3: row3,
        4: row4,
        5: row5,
        6: row6,
        7: row7,
        8: row8,
        9: row9,
        10: row10,
    };
    return rowLogic[r] || false;
};

/**
 * Determines if index is within values of e
 * @param index
 * @param value
 * @param squareProps
 * @returns boolean
 */
const setIsValueForRemainder = (
    index: number,
    value: number,
    squareProps: { c: number; r: number; e: number } | null
): boolean => {
    if (!squareProps || value < 3) {
        return index <= value;
    }
    return index <= 10 * squareProps.r + squareProps.e;
};

/**
 * Builds the collection of GridItemProps
 * @param rounded
 * @returns GridItemProps[]
 */
const createPropsCollection = (
    value: number,
    isSquareFill: boolean
): GridItemProps[] => {
    const props: GridItemProps[] = [];
    const squareProps = isSquareFill ? getSquareProps(value) : null;
    const setValueMethod = (i: number, isCompleteRow: boolean) =>
        isSquareFill && isCompleteRow
            ? setIsValueForCompleteRow(i, value, squareProps)
            : squareProps?.e
            ? setIsValueForRemainder(i, value, squareProps)
            : i <= value;

    for (let index = 100; index > 0; index--) {
        const indexInCompleteRow = squareProps
            ? index <= 10 * squareProps.r
            : true;
        const itemProp = {
            index,
            isValue:
                value >= 100 ? true : setValueMethod(index, indexInCompleteRow),
        };
        props.push(itemProp);
    }
    return props;
};

/**
 * Returns props for linear fill
 * @param l
 * @param m
 * @param s
 * @returns GridItemProps[]
 */
const createLinearProps = (collection: ValueIdentifier[]): GridItemProps[] => {
    console.log(collection);
    const [largest, medium, smallest] = [...collection];
    const s = smallest.value;
    const m = medium.value;
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

        const itemProp: GridItemProps = {
            index,
            identifier,
            isSmall,
            isMedium,
            isLarge,
        };
        props.push(itemProp);
    }
    console.log('🚀 ~ file: index.tsx ~ line 157 ~ props', props);

    return props;
};

const createDisplayProps = (
    partA: number,
    partB: number,
    partC: number,
    partAlabel: string,
    partBlabel: string,
    partClabel: string,
    rounded: number,
    bgPartAstyle:
        | {
              background: string;
          }
        | undefined,
    bgPartBstyle:
        | {
              background: string;
          }
        | undefined
): {
    data1Props: DataDisplayProps;
    data2Props: DataDisplayProps;
} => {
    const usePositiveOrZero = (v: number) => (v >= 0 ? v : 0);
    const data1Props: DataDisplayProps = {
        value: usePositiveOrZero(rounded),
        count: usePositiveOrZero(partA),
        dataLabel: partAlabel,
        color: bgPartAstyle?.background || 'palevioletred',
    };
    const data2Props: DataDisplayProps = {
        value: usePositiveOrZero(100 - rounded),
        count: usePositiveOrZero(partB),
        dataLabel: partBlabel,
        color: bgPartBstyle?.background || 'cadetblue',
    };
    return { data1Props, data2Props };
};

/**
 * Calculate the total
 * @param a
 * @param b
 * @param c
 * @returns total
 */
const calcTotal = (a: number, b: number, c: number): number => a + b + c;

/**
 * Get the raw percentage of a value
 * @param part
 * @param total
 * @returns raw percentage
 */
const calcPercentageRaw = (part: number, total: number): number =>
    (part / total) * 100;

const createValueIdentifiers = (
    a: number,
    b: number,
    c: number
): ValueIdentifier[] => [
    { id: 'a', value: a },
    { id: 'b', value: b },
    { id: 'c', value: c },
];
/**
 * Sort the values from largest to smallest
 * @param a
 * @param b
 * @param c
 * @returns sorted list of values
 */
const sortValuesLargestToLowest = (
    collection: ValueIdentifier[]
): ValueIdentifier[] => collection.sort((a, b) => b.value - a.value);

/**
 * Determine if style override passed in as prop
 * @param color
 * @returns CSS prop object for background or undefined
 */
const getColorOverride = (color?: string): { background: string } | undefined =>
    color ? { background: color } : undefined;

const getGridItemProps = (
    collection: ValueIdentifier[],
    isSquareFill: boolean
) => (isSquareFill ? null : createLinearProps(collection));

const WaffleChart: React.FC<Props> = ({
    partA = 1,
    partB = 29,
    partC = 30,
    partAlabel = 'count',
    partBlabel = 'count',
    partClabel = 'count',
    rounding = 'nearest',
    isFilledFromTop = false,
    isFrilledFromLeft = false,
    isSquareFill = false,
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
    // Calculate raw values
    const rawTotal = calcTotal(partA, partB, partC);
    const rawA = calcPercentageRaw(partA, rawTotal);
    const rawB = calcPercentageRaw(partB, rawTotal);
    const rawC = calcPercentageRaw(partC, rawTotal);
    // Create collection of ValueIdentifier obj
    const rawCollectionWithIdentifiers = createValueIdentifiers(
        rawA,
        rawB,
        rawC
    );
    // Determine order from largest
    const ordered = sortValuesLargestToLowest(rawCollectionWithIdentifiers);
    const rounded = ordered.map((o) => round(o, rounding));
    // Create prop collection for each portion
    const propsGrid = getGridItemProps(rounded, isSquareFill);
    // Determing fill direction
    const verticalFill: VerticalFill = isFilledFromTop ? 'top' : 'bottom';
    const horizontalFill: HorizontalFill = isFrilledFromLeft ? 'left' : 'right';
    // Create display prop collection
    let dataDisplay;
    const totalDisplay = showTotal ? (
        <Total style={styleTotal}>{rawTotal}</Total>
    ) : null;

    if (showDataDisplay) {
        // const { data1Props, data2Props } = createDisplayProps(
        //     partA,
        //     partB,
        //     partAlabel,
        //     partBlabel,
        //     rounded,
        //     styleA,
        //     styleB
        // );
        // dataDisplay = (
        //     <DataDisplay
        //         data1={data1Props}
        //         data2={data2Props}
        //         verticalFill={verticalFill}
        //     />
        // );
    }

    return (
        <div
            className='waffle-chart-container'
            data-testid='waffle-chart-container'>
            {totalDisplay}
            <Chart
                bgDefaultStyle={styleB}
                bgValuedStyle={styleA}
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
