import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, test, afterEach } from 'vitest';
import { WaffleChart } from './index';

describe('Integration test', () => {
    afterEach(cleanup);
    const DEFAULT_PROPS = {};
    const TESTID_SQUARE = 'chart-square';
    const TESTID_DISPLAY_CONTAINER = 'display-container';
    const TESTID_DISPLAY_ITEM = 'display-item';
    const TESTID_DISPLAY_PERCENTAGE = 'display-percentage';
    const TESTID_DISPLAY_COUNT = 'display-count';

    test('Minimal render display expected 100 child squares', () => {
        const { queryAllByTestId } = render(<WaffleChart {...DEFAULT_PROPS} />);
        const numSquares = queryAllByTestId(TESTID_SQUARE).length;
        expect(numSquares).toBe(100);
    });

    test('Expect parts to display percentage and count', () => {
        const { queryAllByTestId, getByTestId } = render(
            <WaffleChart {...DEFAULT_PROPS} />
        );
        const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
        const displayItems = queryAllByTestId(TESTID_DISPLAY_ITEM);
        const displayPercentages = queryAllByTestId(TESTID_DISPLAY_PERCENTAGE);
        const displayCount = queryAllByTestId(TESTID_DISPLAY_COUNT);
        expect(displayContainer).toBeTruthy();
        expect(displayItems.length).toBe(2);
        expect(displayPercentages.length).toBe(2);
        expect(displayCount.length).toBe(2);
        screen.getByText('0%');
        screen.getByText('100%');
    });

    test('Expect chart to colorize the number of squares equal to partA value', async () => {
        const props = {
            partA: 1,
        };
        const filledClass = 'valued';
        const { getAllByTestId } = await render(<WaffleChart {...props} />);
        const squares = await getAllByTestId(TESTID_SQUARE);
        expect(squares[99].className).includes(filledClass);
    });
});
