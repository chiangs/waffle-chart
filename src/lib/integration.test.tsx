import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, expect, test, afterEach } from 'vitest';
import type { GridItemProps, PartProps } from './__types';
import WaffleChart from './WaffleChart';

describe('Integration test', () => {
    afterEach(cleanup);
    const DEFAULT_PROPS = {};
    const TESTID_CONTAINER = 'waffle-chart-container';
    const TESTID_CONTAINER_CHART = 'chart-container';
    const TESTID_SQUARE = 'waffle-chart-square';
    const TESTID_DISPLAY_ITEM = 'display-item';
    const TESTID_DISPLAY_TOTAL = 'total';
    const TESTID_DISPLAY_CONTAINER = 'display-container';
    const TESTID_DISPLAY_PERCENTAGE = 'display-percentage';
    const TESTID_DISPLAY_COUNT = 'display-count';
    const PART_A_SQUARES = 'waffle-chart-square a';
    const PART_B_SQUARES = 'waffle-chart-square b';

    const getPartSquares = (collection: HTMLElement[], identifier: string) =>
        collection.filter((s) => s.className.includes(identifier));

    test('Minimal render display expected 100 child squares', () => {
        const { queryAllByTestId } = render(<WaffleChart {...DEFAULT_PROPS} />);
        const numSquares = queryAllByTestId(TESTID_SQUARE).length;
        expect(numSquares).toBe(100);
    });

    test('Expect parts to display percentage and count', () => {
        const partA = 1;
        const partB = 3;
        const partC = 100 - partA - partB;
        const partAlabel = 'coffee';
        const partBlabel = 'beer';
        const partClabel = 'wine';
        const props = {
            ...DEFAULT_PROPS,
            partA,
            partB,
            partC,
            partAlabel,
            partBlabel,
            partClabel,
        };
        let partApercentage = partA;
        const partAcount = `${partA} ${partAlabel}`;
        const partBpercentage = partB;
        const partBcount = `${partB} ${partBlabel}`;
        const { queryAllByTestId, getByTestId } = render(
            <WaffleChart {...props} />
        );
        const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
        const displayItems = queryAllByTestId(TESTID_DISPLAY_ITEM);
        const displayPercentages = queryAllByTestId(TESTID_DISPLAY_PERCENTAGE);
        const displayCount = queryAllByTestId(TESTID_DISPLAY_COUNT);
        expect(displayContainer).toBeTruthy();
        expect(displayItems.length).toBe(3);
        expect(displayPercentages.length).toBe(3);
        expect(displayCount.length).toBe(3);
        screen.getByText(`${partApercentage}%`);
        screen.getByText(`${partBpercentage}%`);
        screen.getByText(partAcount);
        screen.getByText(partBcount);
    });

    test('Expect chart to colorize the number of squares equal to partA value', () => {
        const props = {
            partA: 1,
        };
        const { getAllByTestId } = render(<WaffleChart {...props} />);
        const squares = getAllByTestId(TESTID_SQUARE);
        expect(squares[99].className).includes(PART_A_SQUARES);
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
            s.className.includes(PART_A_SQUARES)
        );
        expect(partAsquares.length).toBe(20);
        expect(displayContainer).toBeTruthy();
        screen.getByText('20%');
        screen.getByText('80%');
    });

    test('Click on chart square triggers click function when provided in prop', async () => {
        const expectedObject: GridItemProps = {
            index: 1,
            identifier: 'a',
            isSmall: false,
            isMedium: false,
            isLarge: true,
        };
        const user = userEvent.setup();
        const mock = vi
            .fn()
            .mockImplementation((props: GridItemProps) => props);
        const { getAllByTestId } = render(
            <WaffleChart {...DEFAULT_PROPS} partA={1} clickHandler={mock} />
        );
        const squares = getAllByTestId(TESTID_SQUARE);
        const square = squares[99];
        const spy = vi.spyOn(square, 'click');
        await user.click(square);
        expect(spy.getMockName()).toEqual('click');
        expect(mock).toHaveBeenCalledOnce();
        expect(mock).toHaveBeenCalledWith(expectedObject);
    });

    test('Rounding method selection reflect number of squares filled', () => {
        const partA = 191;
        const partB = 9;
        const defaultAndUpRoundingCountA = 95;
        const defaultAndUpRoundingPercentageA = 96;
        const defaultAndUpRoundingCountB = 5;
        const defaultAndUpRoundingPercentageB = 5;
        const downRoundingB = 4;
        const props = { ...DEFAULT_PROPS, partA, partB };
        const { rerender, getByTestId, getAllByTestId } = render(
            <WaffleChart {...props} />
        );
        let numPartAsquares = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_A_SQUARES
        ).length;
        let numPartBsquares = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_B_SQUARES
        ).length;
        const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
        expect(displayContainer).toBeTruthy();
        // Default rounding to nearest
        expect(numPartAsquares).toBe(defaultAndUpRoundingCountA);
        screen.getByText(`${defaultAndUpRoundingPercentageA}%`);
        screen.getByText(`${partA} A`);
        expect(numPartBsquares).toBe(defaultAndUpRoundingCountB);
        screen.getByText(`${defaultAndUpRoundingPercentageB}%`);
        screen.getByText(`${partB} B`);
        // Round up
        rerender(<WaffleChart {...props} rounding={'up'} />);
        numPartBsquares = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_B_SQUARES
        ).length;
        expect(numPartBsquares).toBe(defaultAndUpRoundingCountB);
        // Round down
        rerender(<WaffleChart {...props} rounding={'down'} />);
        numPartAsquares = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_B_SQUARES
        ).length;
        expect(numPartAsquares).toBe(downRoundingB);
        screen.getByText(`${downRoundingB}%`);
        screen.getByText(`${partB} B`);
    });

    test('Fill prop changes the visual filling of chart squares and adds the remainder', () => {
        const partA = 7;
        const partB = 93;
        const linearIndexes = [
            `square7`,
            `square6`,
            `square5`,
            `square4`,
            `square3`,
            `square2`,
            `square1`,
        ];
        const squareIndexes = [
            `square21`,
            `square13`,
            `square12`,
            `square11`,
            `square3`,
            `square2`,
            `square1`,
        ];
        const propsDefaultFill = { ...DEFAULT_PROPS, partA, partB };
        const propsLinearFill = { ...propsDefaultFill, isSquareFill: false };
        const { rerender, getByTestId, getAllByTestId } = render(
            <WaffleChart {...propsDefaultFill} />
        );
        const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
        expect(displayContainer).toBeTruthy();
        // Linear row fill
        const indexesWithLineartFill = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_A_SQUARES
        ).map((s) => s.title);
        expect(indexesWithLineartFill).toStrictEqual(squareIndexes);
        // Square fill
        rerender(<WaffleChart {...propsLinearFill} />);
        const indexesWithSquareFill = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_A_SQUARES
        ).map((s) => s.title);
        expect(indexesWithSquareFill).toStrictEqual(linearIndexes);
        // Change props to where square and remainder doesn't make sense
        const invalidSquareFillIndexes = [`square2`, `square1`];
        const invalidSquareFill = {
            ...DEFAULT_PROPS,
            partA: 2,
            partB: 80,
        };
        rerender(<WaffleChart {...invalidSquareFill} />);
        const indexesWithInvalidSquareFill = getPartSquares(
            getAllByTestId(TESTID_SQUARE),
            PART_A_SQUARES
        ).map((s) => s.title);
        expect(indexesWithInvalidSquareFill).toStrictEqual(
            invalidSquareFillIndexes
        );
    });

    test('Displays total amount', () => {
        const partA = 10;
        const partAcolor = '#333';
        const props = {
            ...DEFAULT_PROPS,
            partA,
            partAcolor,
        };
        const propsWithTotal = {
            ...props,
            showTotal: true,
        };
        const { rerender } = render(<WaffleChart {...propsWithTotal} />);
        screen.getByTestId('total');
        const propsWithNoTotal = {
            ...propsWithTotal,
            showTotal: false,
        };
        rerender(<WaffleChart {...propsWithNoTotal} />);
    });
});
