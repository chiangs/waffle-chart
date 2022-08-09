import React from 'react';
import './styles.css';
import type {
    DataDisplayProps,
    GridItemProps,
    HorizontalFill,
    Rounding,
    VerticalFill,
} from '../__types';
import { Chart } from '../Chart';
import { DataDisplay } from '../DataDisplay';

type Props = {
    partA?: number;
    partB?: number;
    partAlabel?: string;
    partBlabel?: string;
    rounding?: Rounding;
    isFilledFromTop?: boolean;
    isFrilledFromLeft?: boolean;
    isSquareFill?: boolean;
    isAnimatedFill?: boolean;
    showDataDisplay?: boolean;
    partAColor?: string;
    partBColor?: string;
    clickHandler?: (props: GridItemProps) => GridItemProps;
};

/**
 * Rounds a number
 * @param percentage: number
 * @param rounding : Rounding, rounding method
 * @returns rounded number
 */
const round = (percentage: number, rounding: Rounding) => {
    switch (rounding) {
        case 'nearest':
            return Math.round(percentage);
        case 'up':
            return Math.ceil(percentage);
        case 'down':
            return Math.floor(percentage);
        default:
            return Math.round(percentage);
    }
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
    const setValueMethod = (i, isCompleteRow) =>
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

const createDisplayProps = (
    partA: number,
    partB: number,
    partAlabel: string,
    partBlabel: string,
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

const WaffleChart: React.FC<Props> = ({
    partA = 0,
    partB = 100,
    partAlabel = 'count',
    partBlabel = 'count',
    rounding = 'nearest',
    isFilledFromTop = false,
    isFrilledFromLeft = false,
    isSquareFill = false,
    isAnimatedFill = true,
    showDataDisplay = true,
    partAColor = undefined,
    partBColor = undefined,
    clickHandler = undefined,
}: Props) => {
    const bgPartAstyle = partAColor ? { background: partAColor } : undefined;
    const bgPartBstyle = partBColor ? { background: partBColor } : undefined;
    // Calculate value
    const percentage = (partA / partB) * 100;
    const rounded = percentage > 100 ? 100 : round(percentage, rounding);
    const verticalFill: VerticalFill = isFilledFromTop ? 'top' : 'bottom';
    const horizontalFill: HorizontalFill = isFrilledFromLeft ? 'left' : 'right';
    // Create prop collection
    const itemProps = createPropsCollection(rounded, isSquareFill);
    // Create display prop collection
    let dataDisplay;
    if (showDataDisplay) {
        const { data1Props, data2Props } = createDisplayProps(
            partA,
            partB,
            partAlabel,
            partBlabel,
            rounded,
            bgPartAstyle,
            bgPartBstyle
        );
        dataDisplay = (
            <DataDisplay
                data1={data1Props}
                data2={data2Props}
                verticalFill={verticalFill}
            />
        );
    }
    // Click handler
    const onItemClick = (props: GridItemProps) =>
        clickHandler && props.isValue ? clickHandler(props) : null;

    return (
        <div
            className='waffle-chart-container'
            data-testid='waffle-chart-container'>
            <Chart
                bgDefaultStyle={bgPartBstyle}
                bgValuedStyle={bgPartAstyle}
                itemProps={itemProps}
                verticalFill={verticalFill}
                horizontalFill={horizontalFill}
                isAnimatedFill={isAnimatedFill}
                clickHandler={onItemClick}
            />
            {dataDisplay}
        </div>
    );
};

export default WaffleChart;
