import React from 'react';
import type { GridItemProps } from '../__types';

type Props = {
    props: GridItemProps;
    isAnimatedFill: boolean;
    isZeros: boolean;
    clickHandler: (props: GridItemProps) => GridItemProps;
};

const ChartSquare: React.FC<Props> = ({
    props,
    isAnimatedFill,
    isZeros,
    clickHandler,
}: Props) => {
    const classes = [`waffle-chart-square`];
    classes.push(props.identifier);
    if (isAnimatedFill) classes.push(`animate-fill`);
    if (isZeros) classes.push('zeroed');
    // Fallback style
    const fallbackStyle = {
        background: `var(--bg-fallback-${props.identifier})`,
    };
    return (
        <div
            data-testid='chart-square'
            className={classes.join(' ')}
            style={props.style || fallbackStyle}
            key={props.index}
            title={`square${props.index}`}
            onClick={() => clickHandler(props)}></div>
    );
};

export default ChartSquare;
