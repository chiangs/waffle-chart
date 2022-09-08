import React from 'react';
import type { GridItemProps, HorizontalFill, VerticalFill } from '../__types';
import ChartSquare from '../ChartSquare';

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
    console.log('🚀 ~ file: index.tsx ~ line 23 ~ itemProps', itemProps);
    const grid = itemProps?.map((p, i) => (
        <ChartSquare
            key={`${p.identifier}${i}`}
            props={p}
            isAnimatedFill={isAnimatedFill}
            isZeros={isZeros}
            clickHandler={clickHandler}
        />
    ));
    return (
        <div
            className={`waffle-chart ${verticalFill} ${horizontalFill}`}
            data-testid='chart-container'>
            {grid}
        </div>
    );
};

export default Chart;
