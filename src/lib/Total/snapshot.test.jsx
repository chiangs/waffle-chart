import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import Total from './index';

describe('DataDisplay', () => {
    test('DataDisplay component renders correctly', () => {
        const props = {};
        const component = renderer.create(<Total {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
