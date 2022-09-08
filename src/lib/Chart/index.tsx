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

const COMPONENT_NAME = 'chart-container';

const Chart: React.FC<Props> = ({
    itemProps = [],
    verticalFill = 'bottom',
    horizontalFill = 'right',
    isAnimatedFill = true,
    isZeros = false,
    clickHandler,
}: Props) => {
    const grid = itemProps?.map((p, i) => (
        <ChartSquare
            key={`${p.identifier}${i}`}
            gridItemProps={p}
            isAnimatedFill={isAnimatedFill}
            isZeros={isZeros}
            clickHandler={clickHandler}
        />
    ));
    return (
        <div
            className={`waffle-chart ${COMPONENT_NAME} ${verticalFill} ${horizontalFill}`}
            data-testid={COMPONENT_NAME}>
            {grid}
        </div>
    );
};

export default Chart;
