import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, expect, test, afterEach } from 'vitest';
import type { GridItemProps } from './__types';
import { WaffleChart } from './index';

describe('Integration test', () => {
    afterEach(cleanup);
    const DEFAULT_PROPS = {};
    const TESTID_COMPONENT = 'waffle-chart-container';
    const TESTID_SQUARE = 'chart-square';
    const TESTID_DISPLAY_CONTAINER = 'display-container';
    const TESTID_DISPLAY_ITEM = 'display-item';
    const TESTID_DISPLAY_PERCENTAGE = 'display-percentage';
    const TESTID_DISPLAY_COUNT = 'display-count';
    const CLASS_FILLED = 'valued';

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

    test('Expect chart to colorize the number of squares equal to partA value', () => {
        const props = {
            partA: 1,
        };
        const { getAllByTestId } = render(<WaffleChart {...props} />);
        const squares = getAllByTestId(TESTID_SQUARE);
        expect(squares[99].className).includes(CLASS_FILLED);
    });

    test('Update in values of partA and partB updates rendered UI', () => {
        const { getByTestId, queryAllByTestId, getAllByTestId, rerender } =
            render(<WaffleChart {...DEFAULT_PROPS} />);
        const numSquares = queryAllByTestId(TESTID_SQUARE).length;
        expect(numSquares).toBe(100);
        // Update Props
        rerender(<WaffleChart partA={2} partB={8} />);
        const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
        const squares = getAllByTestId(TESTID_SQUARE);
        const partAsquares = squares.filter((s) =>
            s.className.includes(CLASS_FILLED)
        );
        expect(partAsquares.length).toBe(25);
        expect(displayContainer).toBeTruthy();
        screen.getByText('25%');
        screen.getByText('75%');
    });

    test('Click on chart square triggers click function when provided in prop', async () => {
        const user = userEvent.setup();
        const mock = vi
            .fn()
            .mockImplementation((props: GridItemProps) => props);
        const { getAllByTestId } = render(
            <WaffleChart {...DEFAULT_PROPS} partA={1} clickHandler={mock} />
        );
        const squares = getAllByTestId(TESTID_SQUARE);
        const square = squares[99];
        const nonValueSquare = squares[0];
        const spy = vi.spyOn(square, 'click');
        const spy2 = vi.spyOn(nonValueSquare, 'click');
        await user.click(square);
        expect(spy.getMockName()).toEqual('click');
        expect(mock).toHaveBeenCalledOnce();
        expect(mock).toHaveBeenCalledWith({ index: 1, isValue: true });
    });
});
