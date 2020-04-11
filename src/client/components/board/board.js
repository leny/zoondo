/* leny/zoondo
 *
 * /src/client/components/board/board.js - Board Components: Board
 *
 * coded by leny
 * started at 03/04/2020
 */

import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {Player} from "types";
import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {BORDER_COLOR, NBSP} from "core/constants";

const ROW_SIZE = 6;
const COL_SIZE = 6;
const CASE_SIZE = 120;
const GAP_SIZE = 4;

const Board = ({className, cards = [], activeCell, opponent, player}) => {
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
            [player.isFirstPlayer ? "flexColumnReverse" : "flexColumn"]: [
                "space-between",
                "middle",
            ],
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
        selectedCell: {
            borderColor: "orange",
            boxShadow: ["inset", 0, 0, px(10), "orange"],
        },
    });

    let $opponent;

    if (opponent) {
        $opponent = (
            <>
                <span>{"Adversaire :"}</span>
                {NBSP}
                <strong>{opponent.name}</strong>
                {NBSP}
                <span>{`(${opponent.tribe})`}</span>
            </>
        );
    } else {
        $opponent = <span>{"En attente d'un adversaire..."}</span>;
    }

    return (
        <div css={styles.container} className={className}>
            <div css={styles.player}>{$opponent}</div>
            <div css={styles.board}>
                {Array.from(new Array(ROW_SIZE).keys()).map(i => (
                    <div key={`row-${i}`} css={styles.row}>
                        {Array.from(new Array(COL_SIZE).keys()).map(j => (
                            <div
                                key={`cell-${i}-${j}`}
                                css={[
                                    styles.cell,
                                    activeCell?.x === j &&
                                        activeCell?.y === i &&
                                        styles.selectedCell,
                                ]}>
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
    activeCell: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            card: PropTypes.element.isRequired,
        }),
    ),
    player: Player,
    opponent: Player,
};

export default Board;
