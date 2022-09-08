import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, expect, test, afterEach } from 'vitest';
import type { GridItemProps } from './__types';
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

    test('Minimal render display expected 100 child squares', () => {
        const { queryAllByTestId } = render(<WaffleChart {...DEFAULT_PROPS} />);
        const numSquares = queryAllByTestId(TESTID_SQUARE).length;
        expect(numSquares).toBe(100);
    });

    // test('Expect parts to display percentage and count', () => {
    //     const partA = 1;
    //     const partB = 4;
    //     const partAlabel = 'puppies';
    //     const partBlabel = 'kittens';
    //     const props = {
    //         ...DEFAULT_PROPS,
    //         partA,
    //         partB,
    //         partAlabel,
    //         partBlabel,
    //     };
    //     let partApercentage = 20;
    //     const partAcount = `${partA} ${partAlabel}`;
    //     const partBpercentage = 100 - partApercentage;
    //     const partBcount = `${partB} ${partBlabel}`;
    //     const { rerender, queryAllByTestId, getByTestId } = render(
    //         <WaffleChart {...props} />
    //     );
    //     const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
    //     const displayItems = queryAllByTestId(TESTID_DISPLAY_ITEM);
    //     const displayPercentages = queryAllByTestId(TESTID_DISPLAY_PERCENTAGE);
    //     const displayCount = queryAllByTestId(TESTID_DISPLAY_COUNT);
    //     expect(displayContainer).toBeTruthy();
    //     expect(displayItems.length).toBe(2);
    //     expect(displayPercentages.length).toBe(2);
    //     expect(displayCount.length).toBe(2);
    //     screen.getByText(`${partApercentage}%`);
    //     screen.getByText(`${partBpercentage}%`);
    //     screen.getByText(partAcount);
    //     screen.getByText(partBcount);
    //     rerender(<WaffleChart partA={4} partB={2} />);
    //     partApercentage = 33;
    //     screen.getByText(`${partApercentage}%`);
    // });

    // test('Expect chart to colorize the number of squares equal to partA value', () => {
    //     const props = {
    //         partA: 1,
    //     };
    //     const { getAllByTestId } = render(<WaffleChart {...props} />);
    //     const squares = getAllByTestId(TESTID_SQUARE);
    //     expect(squares[99].className).includes(CLASS_FILLED);
    // });

    // test('Update in values of partA and partB updates rendered UI', () => {
    //     const { getByTestId, queryAllByTestId, getAllByTestId, rerender } =
    //         render(<WaffleChart {...DEFAULT_PROPS} />);
    //     const numSquares = queryAllByTestId(TESTID_SQUARE).length;
    //     expect(numSquares).toBe(100);
    //     // Update Props
    //     rerender(<WaffleChart partA={2} partB={8} />);
    //     const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
    //     const squares = getAllByTestId(TESTID_SQUARE);
    //     const partAsquares = squares.filter((s) =>
    //         s.className.includes(CLASS_FILLED)
    //     );
    //     expect(partAsquares.length).toBe(20);
    //     expect(displayContainer).toBeTruthy();
    //     screen.getByText('20%');
    //     screen.getByText('80%');
    // });

    // test('Click on chart square triggers click function when provided in prop', async () => {
    //     const user = userEvent.setup();
    //     const mock = vi
    //         .fn()
    //         .mockImplementation((props: GridItemProps) => props);
    //     const { getAllByTestId } = render(
    //         <WaffleChart {...DEFAULT_PROPS} partA={1} clickHandler={mock} />
    //     );
    //     const squares = getAllByTestId(TESTID_SQUARE);
    //     const square = squares[99];
    //     const spy = vi.spyOn(square, 'click');
    //     await user.click(square);
    //     expect(spy.getMockName()).toEqual('click');
    //     expect(mock).toHaveBeenCalledOnce();
    //     expect(mock).toHaveBeenCalledWith({ index: 1, isValue: true });
    // });

    // test('Rounding method selection reflect number of squares filled', () => {
    //     const getPartASquares = (collection: HTMLElement[]) =>
    //         collection.filter((s) => s.className.includes(CLASS_FILLED));
    //     const partA = 191;
    //     const partB = 9;
    //     const defaultAndUpRoundingCount = 96;
    //     const downRounding = 95;
    //     const props = { ...DEFAULT_PROPS, partA, partB };
    //     const { rerender, getByTestId, getAllByTestId } = render(
    //         <WaffleChart {...props} />
    //     );
    //     let numPartAsquares = getPartASquares(
    //         getAllByTestId(TESTID_SQUARE)
    //     ).length;
    //     const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
    //     expect(displayContainer).toBeTruthy();
    //     // Default rounding to nearest
    //     expect(numPartAsquares).toBe(defaultAndUpRoundingCount);
    //     screen.getByText(`${defaultAndUpRoundingCount}%`);
    //     screen.getByText(`${partA} count`);
    //     // Round up
    //     rerender(<WaffleChart {...props} rounding={'up'} />);
    //     numPartAsquares = getPartASquares(getAllByTestId(TESTID_SQUARE)).length;
    //     expect(numPartAsquares).toBe(defaultAndUpRoundingCount);
    //     // Round down
    //     rerender(<WaffleChart {...props} rounding={'down'} />);
    //     numPartAsquares = getPartASquares(getAllByTestId(TESTID_SQUARE)).length;
    //     expect(numPartAsquares).toBe(downRounding);
    //     screen.getByText(`${downRounding}%`);
    //     screen.getByText(`${partA} count`);
    // });

    // test('Fill prop changes the visual filling of chart squares and adds the remainder', () => {
    //     const getFilledSquareIndexes = (collection: HTMLElement[]) => {
    //         const filledSquares = collection.filter((s) =>
    //             s.className.includes(CLASS_FILLED)
    //         );
    //         const titles = filledSquares.map((s) => s.title);
    //         return titles;
    //     };
    //     const partA = 7;
    //     const partB = 100;
    //     const linearIndexes = [
    //         `square7`,
    //         `square6`,
    //         `square5`,
    //         `square4`,
    //         `square3`,
    //         `square2`,
    //         `square1`,
    //     ];
    //     const squareIndexes = [
    //         `square21`,
    //         `square13`,
    //         `square12`,
    //         `square11`,
    //         `square3`,
    //         `square2`,
    //         `square1`,
    //     ];
    //     const propsDefaultFill = { ...DEFAULT_PROPS, partA, partB };
    //     const propsLinearFill = { ...propsDefaultFill, isSquareFill: false };
    //     const { rerender, getByTestId, getAllByTestId } = render(
    //         <WaffleChart {...propsDefaultFill} />
    //     );
    //     const displayContainer = getByTestId(TESTID_DISPLAY_CONTAINER);
    //     expect(displayContainer).toBeTruthy();
    //     // Linear row fill
    //     const indexesWithLineartFill = getFilledSquareIndexes(
    //         getAllByTestId(TESTID_SQUARE)
    //     );
    //     expect(indexesWithLineartFill).toStrictEqual(squareIndexes);
    //     // Square fill
    //     rerender(<WaffleChart {...propsLinearFill} />);
    //     const indexesWithSquareFill = getFilledSquareIndexes(
    //         getAllByTestId(TESTID_SQUARE)
    //     );
    //     expect(indexesWithSquareFill).toStrictEqual(linearIndexes);
    //     // Change props to where square and remainder doesn't make sense
    //     const invalidSquareFillIndexes = [`square2`, `square1`];
    //     const invalidSquareFill = {
    //         ...DEFAULT_PROPS,
    //         partA: 2,
    //         partB: 80,
    //     };
    //     rerender(<WaffleChart {...invalidSquareFill} />);
    //     const indexesWithInvalidSquareFill = getFilledSquareIndexes(
    //         getAllByTestId(TESTID_SQUARE)
    //     );
    //     expect(indexesWithInvalidSquareFill).toStrictEqual(
    //         invalidSquareFillIndexes
    //     );
    // });

    // test('Displays total amount', () => {
    //     const partA = 10;
    //     const props = {
    //         ...DEFAULT_PROPS,
    //         partA,
    //     };
    //     const propsWithTotal = {
    //         ...props,
    //         showTotal: true,
    //     };
    //     render(<WaffleChart {...propsWithTotal} />);
    //     screen.getByTestId('total');
    // });
});
