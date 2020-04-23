/* leny/zoondo
 *
 * /src/client/components/board/grid.js - Board Components: Grid
 *
 * coded by leny
 * started at 23/04/2020
 */

import React, {useMemo} from "react";
import PropTypes from "prop-types";

import {px, rem, percent, rgba, translate} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {BORDER_COLOR, DEBUG_MODE, CELL_SIZE, GAP_SIZE} from "core/constants";

const Grid = ({
    className,
    rowSize,
    colSize,
    reverse = false,
    cards = [],
    overlays = [],
    activeCell,
}) => {
    const boardSize = useMemo(
        () => [
            CELL_SIZE * colSize + (colSize - 1) * GAP_SIZE,
            CELL_SIZE * rowSize + (rowSize - 1) * GAP_SIZE,
        ],
        [colSize, rowSize],
    );
    const styles = usePwops({
        container: {
            size: boardSize.map(px),
            [reverse ? "flexColumn" : "flexColumnReverse"]: [
                "space-between",
                "middle",
            ],
        },
        row: {
            [reverse ? "flexRowReverse" : "flexRow"]: [
                "space-between",
                "middle",
            ],
        },
        cell: {
            relative: true,
            size: px(CELL_SIZE),
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
        },
        cellDebug: {
            absolute: [percent(50), false, false, percent(50)],
            padding: [rem(0.25)],
            pointerEvents: "none",
            borderRadius: rem(0.5),
            background: rgba(0, 0, 0, 0.5),
            fontSize: rem(1.4),
            fontFamily: "monospace",
            color: "white",
            zIndex: 1000,
            transform: translate(percent(-50), percent(-50)),
        },
        selectedCell: {
            borderColor: "orange",
            boxShadow: ["inset", 0, 0, px(10), "orange"],
        },
    });

    return (
        <div css={styles.container} className={className}>
            {Array.from(new Array(rowSize).keys()).map(i => (
                <div key={`row-${i}`} css={styles.row}>
                    {Array.from(new Array(colSize).keys()).map(j => (
                        <div
                            key={`cell-${i}-${j}`}
                            css={[
                                styles.cell,
                                activeCell?.x === j &&
                                    activeCell?.y === i &&
                                    styles.selectedCell,
                            ]}>
                            {DEBUG_MODE ? (
                                <span css={styles.cellDebug}>
                                    {`${j},${i}`}
                                </span>
                            ) : null}
                            {(cards.find(({x, y}) => x === j && y === i) || {})
                                .card || null}
                            {(
                                overlays.find(({x, y}) => x === j && y === i) ||
                                {}
                            ).overlay || null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

Grid.propTypes = {
    rowSize: PropTypes.number.isRequired,
    colSize: PropTypes.number.isRequired,
    reverse: PropTypes.bool,
    activeCell: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            card: PropTypes.element,
        }),
    ),
    overlays: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            overlay: PropTypes.element,
        }),
    ),
};

export default Grid;
