/* leny/zoondo
 *
 * /src/client/containers/structure/game.js - Structure containers: Game
 *
 * coded by leny
 * started at 06/04/2020
 */

import React, {useEffect, useState} from "react";
import {Player} from "types";

import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {useSocket} from "use-socketio";

import Header from "components/header";
import Board from "components/board/board";
import BoardCard from "components/board/card";
import BoardOverlay from "components/board/overlay";
import CardInfos from "components/tools/card-infos";
import GameInfos from "components/tools/game-infos";
import Chat from "components/tools/chat";

const Game = ({player: rawPlayer}) => {
    const [player, setPlayer] = useState(rawPlayer);
    const [opponent, setOpponent] = useState(null);
    const [turn, setTurn] = useState(null);
    const [board, setBoard] = useState([]);
    const [overlays, setOverlays] = useState([]);
    const [activeCard, setActiveCard] = useState(null);
    const {socket} = useSocket();
    const styles = usePwops({
        container: {
            width: px(1200),
            margin: [px(10), "auto", 0],
        },
        main: {
            flexRow: ["space-between", "stretch"],
        },
        board: {
            flex: "none",
        },
        tools: {
            flex: [1, 0, 0],
            flexColumn: ["space-between", "stretch"],
            padding: [rem(2.1), 0],
            marginLeft: rem(2),
        },
        cardInfos: {flex: "none"},
        gameInfos: {flex: "none", margin: [rem(2), 0]},
        chat: {flex: [1, 0, 0]},
    });

    useEffect(() => {
        // init game
        socket.emit("register", {player});
    }, []);

    useEffect(() => {
        console.log("activeCard has changed");
        if (turn?.activePlayer?.id === player.id && turn?.phase === "main") {
            console.log("I'm the active player & in my main phase");
            // TODO: resolve moves, display on board
            setOverlays([]);
        }
    }, [activeCard]);

    useSocket("state", state => {
        console.log("new game state:", state);
        setPlayer(state.player);
        setOpponent(state.opponent);
        setBoard(state.board);
        setTurn(state.turn);
    });

    return (
        <div css={styles.container}>
            <Header round={1} player={player} opponent={opponent} />

            <main css={styles.main}>
                <Board
                    css={styles.board}
                    player={player}
                    opponent={opponent}
                    activeCell={{x: activeCard?.x, y: activeCard?.y}}
                    overlays={overlays.map(([x, y, isJump, isCombat]) => ({
                        x,
                        y,
                        overlay: (
                            <BoardOverlay
                                isJump={isJump}
                                isCombat={isCombat}
                                onSelect={() =>
                                    console.log("Selected overlay:", {x, y})
                                }
                            />
                        ),
                    }))}
                    cards={board.map(({player: playerId, x, y, card}) => ({
                        x,
                        y,
                        card: (
                            <BoardCard
                                {...card}
                                isOwn={player.id === playerId}
                                onSelect={() => setActiveCard({x, y, ...card})}
                            />
                        ),
                    }))}
                />
                <div css={styles.tools}>
                    <CardInfos css={styles.cardInfos} card={activeCard} />

                    <GameInfos css={styles.gameInfos} turn={turn} />

                    <Chat css={styles.chat} />
                </div>
            </main>
        </div>
    );
};

Game.propTypes = {player: Player};

export default Game;
