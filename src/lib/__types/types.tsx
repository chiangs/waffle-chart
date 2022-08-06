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
