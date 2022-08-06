import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import { DataDisplay } from './index';

describe('DataDisplay', () => {
    test('DataDisplay component renders correctly', () => {
        const props = {
            data1: {
                value: 1,
                count: 1,
                dataLabel: 'data1',
            },
            data2: {
                value: 2,
                count: 2,
                dataLabel: 'data2',
            },
            verticalFill: false,
        };
        const component = renderer.create(<DataDisplay {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
