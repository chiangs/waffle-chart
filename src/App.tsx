import React from 'react';
import WaffleChart from './lib/WaffleChart';

const App = () => (
    <WaffleChart
        partA={2}
        partB={35}
        partC={86.7}
        partAlabel={'beer'}
        partBlabel={'water'}
        partClabel={'coffee'}
        partAcolor={'#F7A355'}
        partBcolor={'#4D93E5'}
        partCcolor={'#439090'}
    />
);

export default App;
