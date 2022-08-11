import React from 'react';

type Props = {
    children: any;
};

const Total: React.FC<Props> = (props: Props) => (
    <h3 className='total' data-testid='total'>
        {props.children}
    </h3>
);

export default Total;
