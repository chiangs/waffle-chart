import React from 'react';
import type { GridItemProps } from '../__types';

type Props = {
    gridItemProps: GridItemProps;
    isAnimatedFill: boolean;
    isZeros: boolean;
    clickHandler: (props: GridItemProps) => GridItemProps;
};

const NAME_COMPONENT = `waffle-chart-square`;

const ChartSquare: React.FC<Props> = ({
    gridItemProps,
    isAnimatedFill,
    isZeros,
    clickHandler,
}: Props) => {
    const classes = [NAME_COMPONENT];
    classes.push(gridItemProps?.identifier);
    if (isAnimatedFill) classes.push(`animate-fill`);
    if (isZeros) classes.push('zeroed');
    // Fallback style
    const fallbackStyle = {
        background: `var(--bg-fallback-${gridItemProps?.identifier})`,
    };
    return (
        <div
            data-testid={NAME_COMPONENT}
            className={classes.join(' ')}
            style={gridItemProps?.style || fallbackStyle}
            key={gridItemProps?.index}
            title={`square${gridItemProps?.index}`}
            onClick={() => clickHandler(gridItemProps)}></div>
    );
};

export default ChartSquare;
