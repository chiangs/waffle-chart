import React from 'react';
import type { CSSProperties } from 'react';
import type { GridItemProps, HorizontalFill, VerticalFill } from '../__types';

type Props = {
    itemProps: GridItemProps[] | null;
    verticalFill: VerticalFill;
    horizontalFill: HorizontalFill;
    isAnimatedFill: boolean;
    isZeros: boolean;
    clickHandler: (props: GridItemProps) => GridItemProps;
};

const Chart: React.FC<Props> = ({
    itemProps = [],
    verticalFill = 'bottom',
    horizontalFill = 'right',
    isAnimatedFill = true,
    isZeros = false,
    clickHandler,
}: Props) => {
    // Create UIs
    const gridItem = (props: GridItemProps) => {
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

    const grid = itemProps?.map((p) => gridItem(p));
    return (
        <div
            className={`waffle-chart ${verticalFill} ${horizontalFill}`}
            data-testid='chart-container'>
            {grid}
        </div>
    );
};

export default Chart;
