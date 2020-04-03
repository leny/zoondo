/* leny/zoondo
 *
 * /src/components/board/board.js - Board Components: Board
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import PropTypes from "prop-types";
import {size, px, border, flexrow, flexbox} from "koutla-swiss";

const ROW_SIZE = 6;
const COL_SIZE = 6;
const CASE_SIZE = 120;
const GAP_SIZE = 4;

const styles = {
    board: {
        ...size(
            px(CASE_SIZE * COL_SIZE + (COL_SIZE - 1) * GAP_SIZE),
            px(CASE_SIZE * ROW_SIZE + (ROW_SIZE - 1) * GAP_SIZE),
        ),
        ...flexbox("column-reverse", "space-between", "middle"),
    },
    row: {
        ...flexrow("space-between", "middle"),
    },
    case: {
        ...size(px(CASE_SIZE)),
        ...border(px(1), "solid", "#666"),
        borderRadius: px(3),
    },
};

const Board = ({cards = []}) => (
    <div css={styles.board}>
        {Array.from(new Array(ROW_SIZE).keys()).map(i => (
            <div key={`row-${i}`} css={styles.row}>
                {Array.from(new Array(COL_SIZE).keys()).map(j => (
                    <div key={`case-${i}-${j}`} css={styles.case}>
                        {(cards.find(({x, y}) => x === j && y === i) || {})
                            .card || null}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

Board.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            card: PropTypes.element.isRequired,
        }),
    ),
};

export default Board;
