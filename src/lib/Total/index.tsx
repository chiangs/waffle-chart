import React from 'react';

type Props = {
    style: {} | undefined;
    children: any;
};

const Total: React.FC<Props> = ({ style = undefined, children }) => (
    <h3 className='total' style={style} data-testid='total'>
        {children}
    </h3>
);

export default Total;
