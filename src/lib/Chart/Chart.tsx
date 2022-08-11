import React from 'react';
import type { CSSProperties } from 'react';
import type { GridItemProps, HorizontalFill, VerticalFill } from '../__types';

type Props = {
    bgDefaultStyle: CSSProperties | undefined;
    bgValuedStyle: CSSProperties | undefined;
    itemProps: GridItemProps[];
    verticalFill: VerticalFill;
    horizontalFill: HorizontalFill;
    isAnimatedFill: boolean;
    clickHandler: (props: GridItemProps) => GridItemProps;
};

const Chart: React.FC<Props> = ({
    bgDefaultStyle,
    bgValuedStyle,
    itemProps,
    verticalFill,
    horizontalFill,
    isAnimatedFill,
    clickHandler,
}: Props) => {
    // Create UIs
    const gridItem = (props: GridItemProps) => {
        const classes = [`waffle-chart-square`];
        if (props.isValue) classes.push(`valued`);
        if (isAnimatedFill) classes.push(`animate-fill`);

        return (
            <div
                data-testid='chart-square'
                className={classes.join(' ')}
                style={props.isValue ? bgValuedStyle : bgDefaultStyle}
                key={props.index}
                title={`square${props.index}`}
                onClick={() => clickHandler(props)}></div>
        );
    };
    const grid = itemProps.map((p) => gridItem(p));
    return (
        <div
            className={`waffle-chart ${verticalFill} ${horizontalFill}`}
            data-testid='chart-container'>
            {grid}
        </div>
    );
};

export default Chart;
