/* leny/zoondo
 *
 * /src/components/board/board.js - Board Components: Board
 *
 * coded by leny
 * started at 03/04/2020
 */

import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {PlayerShape} from "types";
import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {BORDER_COLOR, NBSP} from "core/constants";

const ROW_SIZE = 6;
const COL_SIZE = 6;
const CASE_SIZE = 120;
const GAP_SIZE = 4;

const Board = ({className, cards = [], opponent, player}) => {
    const boardSize = useMemo(
        () => [
            CASE_SIZE * COL_SIZE + (COL_SIZE - 1) * GAP_SIZE,
            CASE_SIZE * ROW_SIZE + (ROW_SIZE - 1) * GAP_SIZE,
        ],
        [],
    );
    const styles = usePwops({
        container: {
            flexColumn: ["flex-start", "middle"],
            width: px(boardSize[0]),
        },
        player: {
            flex: "none",
            fontSize: rem(1.6),
            textAlign: "center",
        },
        board: {
            size: boardSize.map(px),
            flexColumnReverse: ["space-between", "middle"],
            margin: [px(5), 0],
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
        <div css={styles.container} className={className}>
            <div css={styles.player}>
                <span>{"Adversaire :"}</span>
                {NBSP}
                <strong>{opponent.name}</strong>
                {NBSP}
                <span>{`(${opponent.tribe})`}</span>
            </div>
            <div css={styles.board}>
                {Array.from(new Array(ROW_SIZE).keys()).map(i => (
                    <div key={`row-${i}`} css={styles.row}>
                        {Array.from(new Array(COL_SIZE).keys()).map(j => (
                            <div key={`case-${i}-${j}`} css={styles.cell}>
                                {(
                                    cards.find(
                                        ({x, y}) => x === j && y === i,
                                    ) || {}
                                ).card || null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div css={styles.player}>
                <span>{"Joueur :"}</span>
                {NBSP}
                <strong>{player.name}</strong>
                {NBSP}
                <span>{`(${player.tribe})`}</span>
            </div>
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
    player: PlayerShape,
    opponent: PlayerShape,
};

export default Board;
