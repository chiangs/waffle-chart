import React from 'react';
import type { PartProps, VerticalFill } from '../__types';

type Props = {
    data1: PartProps;
    data2: PartProps;
    data3: PartProps;
    verticalFill: VerticalFill;
    precision: number;
};

const NAME_COMPONENT = 'display-item';

const DataDisplay: React.FC<Props> = ({
    data1,
    data2,
    data3,
    verticalFill,
    precision,
}: Props) => {
    const displayClasses = ['waffle-chart-display-container', verticalFill];
    const displayItem = ({
        id,
        value,
        percentage,
        label,
        style,
    }: PartProps) => (
        <div
            key={`${label}${value}`}
            className={[NAME_COMPONENT, id].join(' ')}
            style={{ color: style?.color }}
            data-testid={NAME_COMPONENT}>
            <h3 className='display-item-title' data-testid='display-percentage'>
                {percentage.toFixed(precision)}%
            </h3>
            <p className='display-item-description' data-testid='display-count'>
                {value}&nbsp;{label}
            </p>
        </div>
    );
    const display = [data1, data2, data3].map((d) => displayItem(d));
    return (
        <div
            className={displayClasses.join(' ')}
            data-testid='display-container'>
            {display}
        </div>
    );
};

export default DataDisplay;
