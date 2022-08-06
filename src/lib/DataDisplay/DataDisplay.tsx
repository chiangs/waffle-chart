import React from 'react';
import type { DataDisplayProps, VerticalFill } from '../__types';

type Props = {
    data1: DataDisplayProps;
    data2: DataDisplayProps;
    verticalFill: VerticalFill;
};
const DataDisplay: React.FC<Props> = (props: Props) => {
    const displayClasses = [
        'waffle-chart-display-container',
        props.verticalFill,
    ];
    const displayItem = ({
        value,
        count,
        dataLabel,
        color = '',
    }: DataDisplayProps) => (
        <div
            key={value}
            className='display-item'
            style={{ color }}
            data-testid='display-item'>
            <h3 className='display-item-title' data-testid='display-percentage'>
                {value}%
            </h3>
            <p className='display-item-description' data-testid='display-count'>
                {count}&nbsp;{dataLabel}
            </p>
        </div>
    );
    const display = [props?.data1, props?.data2].map((d) => displayItem(d));
    return (
        <div
            className={displayClasses.join(' ')}
            data-testid='display-container'>
            {display}
        </div>
    );
};

export default DataDisplay;
