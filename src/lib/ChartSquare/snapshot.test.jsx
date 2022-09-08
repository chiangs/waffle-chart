import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest';
import ChartSquare from '.';

describe('Chart', () => {
    test('Chart component renders correctly', () => {
        const props = {
            props: [],
            isAnimatedFill: true,
            isZeros: true,
            clickHandler: () => null,
        };
        const component = renderer.create(<ChartSquare {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
