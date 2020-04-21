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
import {px, rem, percent, rgba, translate} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {resolveTribe} from "data/utils";

import {BORDER_COLOR, NBSP, DEBUG_MODE} from "core/constants";
import {BOARD_ROW_SIZE, BOARD_COL_SIZE} from "data/constants";

const CASE_SIZE = 120;
const GAP_SIZE = 4;

const Board = ({
    className,
    cards = [],
    overlays = [],
    activeCell,
    opponent,
    player,
}) => {
    const playerTribeName = useMemo(() => resolveTribe(player.tribe).name, [
        player,
    ]);
    const opponentTribeName = useMemo(() => resolveTribe(opponent.tribe).name, [
        opponent,
    ]);
    const boardSize = useMemo(
        () => [
            CASE_SIZE * BOARD_COL_SIZE + (BOARD_COL_SIZE - 1) * GAP_SIZE,
            CASE_SIZE * BOARD_ROW_SIZE + (BOARD_ROW_SIZE - 1) * GAP_SIZE,
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
            [player.isFirstPlayer ? "flexRow" : "flexRowReverse"]: [
                "space-between",
                "middle",
            ],
        },
        cell: {
            relative: true,
            size: px(CASE_SIZE),
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

    let $opponent;

    if (opponent) {
        $opponent = (
            <>
                <span>{"Adversaire :"}</span>
                {NBSP}
                <strong>{opponent.name}</strong>
                {NBSP}
                <span>{`(${opponentTribeName})`}</span>
            </>
        );
    } else {
        $opponent = <span>{"En attente d'un adversaire..."}</span>;
    }

    return (
        <div css={styles.container} className={className}>
            <div css={styles.player}>{$opponent}</div>
            <div css={styles.board}>
                {Array.from(new Array(BOARD_ROW_SIZE).keys()).map(i => (
                    <div key={`row-${i}`} css={styles.row}>
                        {Array.from(new Array(BOARD_COL_SIZE).keys()).map(j => (
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
                                {(
                                    cards.find(
                                        ({x, y}) => x === j && y === i,
                                    ) || {}
                                ).card || null}
                                {(
                                    overlays.find(
                                        ({x, y}) => x === j && y === i,
                                    ) || {}
                                ).overlay || null}
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
                <span>{`(${playerTribeName})`}</span>
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
    player: Player,
    opponent: Player,
};

export default Board;
