/**
 * defaults to nearest whole.
 * use 'up' for if any portion over a whole should count.
 * use 'down' for if less than whole should not count.
 */
export type Rounding = 'nearest' | 'up' | 'down';

export type VerticalFill = 'top' | 'bottom';

export type HorizontalFill = 'left' | 'right';

export interface GridItemProps {
    index: number;
    isValue: boolean;
    data?: any;
}

export interface DataDisplayProps {
    value: number;
    count: number;
    dataLabel: string;
    color?: string;
}

export type WaffleChartProps = {
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
    showTotal?: boolean;
    partAColor?: string;
    partBColor?: string;
    totalColor?: string;
    clickHandler?: (props: GridItemProps) => GridItemProps;
};
