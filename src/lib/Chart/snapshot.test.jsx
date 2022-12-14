import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import Chart from '.';

describe('Chart', () => {
    test('Chart component renders correctly', () => {
        const props = {
            itemProps: [],
            verticalFill: 'top',
            horizontalFill: 'left',
            isAnimatedFill: true,
            isZeros: true,
            clickHandler: null,
        };
        const component = renderer.create(<Chart {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
