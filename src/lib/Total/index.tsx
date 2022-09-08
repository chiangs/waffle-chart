import React from 'react';

type Props = {
    style: {} | undefined;
    children: any;
};

const COMPONENT_NAME = 'total';

const Total: React.FC<Props> = ({ style = undefined, children }) => (
    <h3 className={COMPONENT_NAME} style={style} data-testid={COMPONENT_NAME}>
        {children}
    </h3>
);

export default Total;
