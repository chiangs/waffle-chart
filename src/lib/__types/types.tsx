/**
 * defaults to nearest whole.
 * use 'up' for if any portion over a whole should count.
 * use 'down' for if less than whole should not count.
 */
export type Rounding = 'nearest' | 'up' | 'down';

export type VerticalFill = 'top' | 'bottom';

export type HorizontalFill = 'left' | 'right';

export interface ValueIdentifier {
    id: 'a' | 'b' | 'c';
    value: number;
}

export interface GridItemProps {
    index: number;
    identifier: 'a' | 'b' | 'c';
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
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
    partC?: number;
    partAlabel?: string;
    partBlabel?: string;
    partClabel?: string;
    rounding?: Rounding;
    isFilledFromTop?: boolean;
    isFrilledFromLeft?: boolean;
    isSquareFill?: boolean;
    isAnimatedFill?: boolean;
    showDataDisplay?: boolean;
    showTotal?: boolean;
    partAcolor?: string;
    partBcolor?: string;
    partCcolor?: string;
    totalColor?: string;
    clickHandler?: (props: GridItemProps) => GridItemProps;
};
