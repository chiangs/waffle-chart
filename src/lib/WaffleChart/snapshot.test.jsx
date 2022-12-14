import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import WaffleChart from './index';

describe('WaffleChart', () => {
    test('WaffleChart component renders correctly', () => {
        const component = renderer.create(<WaffleChart />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
