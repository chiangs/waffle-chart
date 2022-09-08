import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import DataDisplay from './index';

describe('DataDisplay', () => {
    test('DataDisplay component renders correctly', () => {
        const props = {
            data1: {
                id: 'a',
                value: 1,
                percentage: 1,
                dataLabel: 'data1',
            },
            data2: {
                id: 'b',
                value: 2,
                percentage: 2,
                dataLabel: 'data2',
            },
            data3: {
                id: 'c',
                value: 3,
                percentage: 3,
                dataLabel: 'data3',
            },
            verticalFill: false,
            precision: 0,
        };
        const component = renderer.create(<DataDisplay {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
