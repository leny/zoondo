/* leny/zoondo
 *
 * /src/components/board/board.js - Board Components: Board
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import PropTypes from "prop-types";
import {px} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {BORDER_COLOR} from "../../core/constants";

const ROW_SIZE = 6;
const COL_SIZE = 6;
const CASE_SIZE = 120;
const GAP_SIZE = 4;

const Board = ({cards = []}) => {
    const styles = usePwops({
        board: {
            size: [
                px(CASE_SIZE * COL_SIZE + (COL_SIZE - 1) * GAP_SIZE),
                px(CASE_SIZE * ROW_SIZE + (ROW_SIZE - 1) * GAP_SIZE),
            ],
            flexColumnReverse: ["space-between", "middle"],
        },
        row: {
            flexRow: ["space-between", "middle"],
        },
        cell: {
            size: px(CASE_SIZE),
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
        },
    });

    return (
        <div css={styles.board}>
            {Array.from(new Array(ROW_SIZE).keys()).map(i => (
                <div key={`row-${i}`} css={styles.row}>
                    {Array.from(new Array(COL_SIZE).keys()).map(j => (
                        <div key={`case-${i}-${j}`} css={styles.cell}>
                            {(cards.find(({x, y}) => x === j && y === i) || {})
                                .card || null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

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
