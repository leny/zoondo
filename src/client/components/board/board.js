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

import Grid from "./grid";

import {resolveTribe} from "data/utils";

import {NBSP, CELL_SIZE, GAP_SIZE} from "core/constants";
import {BOARD_ROW_SIZE, BOARD_COL_SIZE} from "data/constants";

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
            CELL_SIZE * BOARD_COL_SIZE + (BOARD_COL_SIZE - 1) * GAP_SIZE,
            CELL_SIZE * BOARD_ROW_SIZE + (BOARD_ROW_SIZE - 1) * GAP_SIZE,
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
            margin: [px(5), 0],
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
            <Grid
                css={styles.board}
                rowSize={BOARD_ROW_SIZE}
                colSize={BOARD_COL_SIZE}
                activeCell={activeCell}
                reverse={!player.isFirstPlayer}
                cards={cards}
                overlays={overlays}
            />
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
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
