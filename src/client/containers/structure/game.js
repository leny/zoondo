/* leny/zoondo
 *
 * /src/client/containers/structure/game.js - Structure containers: Game
 *
 * coded by leny
 * started at 06/04/2020
 */

import React, {useCallback, useEffect, useState} from "react";
import {Player} from "types";

import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {useSocket} from "use-socketio";
import {resolveMoves, resolveCard} from "data/utils";

import {DEBUG_MODE, NBSP} from "core/constants";
import {ACTIONS} from "data/constants";

import Header from "components/header";
import Board from "components/board/board";
import BoardCard from "components/board/card";
import BoardOverlay from "components/board/overlay";
import CardInfos from "components/tools/card-infos";
import GameInfos from "components/tools/game-infos";
import Chat from "components/tools/chat";
import Combat from "components/board/combat";

const Game = ({player: rawPlayer}) => {
    const [player, setPlayer] = useState(rawPlayer);
    const [opponent, setOpponent] = useState(null);
    const [turn, setTurn] = useState(null);
    const [trumps, setTrumps] = useState(null);
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
            minHeight: px(720),
        },
        content: {
            flex: [1, 0, 0],
            flexRow: ["center", "center"],
        },
        tools: {
            width: px(440),
            flex: "none",
            flexColumn: ["space-between", "stretch"],
            padding: [rem(2.1), 0],
            marginLeft: rem(2),
        },
        cardInfos: {flex: "none"},
        gameInfos: {flex: "none", margin: [rem(2), 0]},
        chat: {flex: [1, 0, 0]},
        waiting: {
            fontSize: rem(4.8),
            textAlign: "center",
        },
    });

    const selectActiveCard = useCallback(
        ({x, y, ...card}) => {
            if (activeCard?.x === x && activeCard?.y === y) {
                setActiveCard(null);
                return;
            }

            setActiveCard({x, y, ...card});
        },
        [activeCard, setActiveCard],
    );

    const sendMovement = useCallback(
        ({x, y}) =>
            socket.emit("move", {card: activeCard, destination: {x, y}}),
        [activeCard],
    );

    const sendCombatAction = useCallback(
        (action, params) => {
            socket.emit("combat", {action, ...params});
            setTurn({...turn, combat: {...turn.combat, step: "wait"}});
        },
        [turn, setTurn],
    );

    const sendActionValue = useCallback(
        value => {
            const {type} = turn.action;

            socket.emit("action", {type, value});
        },
        [turn],
    );

    useEffect(() => {
        // init game
        document.title = `Zoondo - ${player.name}`;
        socket.emit("register", {player});
    }, []);

    useEffect(() => {
        if (
            !activeCard &&
            turn?.phase === "action" &&
            turn?.action.options.player.id === player.id &&
            turn?.action.type === ACTIONS.MOVE_CARD &&
            turn?.action.options.choices.length === 1
        ) {
            const [{x, y, card}] = turn.action.options.choices;
            setActiveCard({x, y, ...card});
        }
    }, [turn, activeCard]);

    useEffect(() => {
        if (
            (activeCard &&
                turn?.activePlayer?.id === player.id &&
                turn?.phase === "main") ||
            (turn?.phase === "action" &&
                turn?.action.options.player.id === player.id &&
                turn?.action.type === ACTIONS.MOVE_CARD &&
                turn?.action.options.choices.find(
                    ({x, y}) => activeCard?.x === x && activeCard?.y === y,
                ))
        ) {
            const card = resolveCard(activeCard);
            const isMoveCardAction =
                turn?.phase === "action" &&
                turn?.action?.type === ACTIONS.MOVE_CARD;
            const moves = resolveMoves(
                activeCard,
                (isMoveCardAction && turn.action.options.moves) || card.moves,
                !(isMoveCardAction
                    ? turn.action.options.player
                    : turn.activePlayer
                ).isFirstPlayer,
            );
            setOverlays(
                moves.reduce((arr, move) => {
                    move.reduce((keep, [x, y, isJump = false]) => {
                        if (keep) {
                            const cardAtPosition = board.find(
                                crd => crd.x === x && crd.y === y,
                            );

                            if (cardAtPosition) {
                                if (
                                    isMoveCardAction &&
                                    turn.action.options.onlyFreeCells
                                ) {
                                    return false;
                                }

                                if (
                                    cardAtPosition.player !==
                                    (isMoveCardAction
                                        ? turn.action.options.player.id
                                        : turn.activePlayer.id)
                                ) {
                                    arr.push([x, y, isJump, true]);
                                }

                                return false;
                            }

                            arr.push([x, y, isJump]);
                        }

                        return keep;
                    }, true);

                    return arr;
                }, []),
            );
        } else {
            setOverlays([]);
        }
    }, [activeCard]);

    useSocket("state", state => {
        DEBUG_MODE && console.log("state:", state);
        document.title = `Zoondo - ${player.name}${
            state.turn?.activePlayer?.id === player.id ? " - actif" : ""
        }`;
        setPlayer(state.player);
        setOpponent(state.opponent);
        setBoard(state.board);
        setTurn(state.turn);
        setTrumps(state.trumps);
        setOverlays([]);
        if (state.turn.phase === "combat") {
            ["attacker", "defender"].forEach(side => {
                if (state.turn.combat[side].player === state.player.id) {
                    setActiveCard(state.turn.combat[side].card);
                }
            });
        } else {
            setActiveCard(null);
        }
    });

    let $content;

    switch (turn?.phase) {
        case "main":
            $content = (
                <Board
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
                                onSelect={() => sendMovement({x, y})}
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
                                onSelect={() =>
                                    selectActiveCard({x, y, ...card})
                                }
                            />
                        ),
                    }))}
                />
            );
            break;

        case "combat":
            $content = (
                <Combat
                    player={player}
                    {...(turn.combat || {})}
                    onAction={sendCombatAction}
                />
            );
            break;

        case "action": {
            const {
                type,
                options: {player: targetPlayer, choices},
            } = turn.action;

            switch (type) {
                case ACTIONS.MOVE_CARD:
                    $content = (
                        <Board
                            player={player}
                            opponent={opponent}
                            activeCell={{x: activeCard?.x, y: activeCard?.y}}
                            overlays={
                                targetPlayer.id === player.id
                                    ? [].concat(
                                          choices.map(({x, y}) => ({
                                              x,
                                              y,
                                              overlay: (
                                                  <BoardOverlay
                                                      clickThrough
                                                      isChoice
                                                      isSelected={
                                                          activeCard?.x === x &&
                                                          activeCard?.y === y
                                                      }
                                                  />
                                              ),
                                          })),
                                          overlays.map(
                                              ([x, y, isJump, isCombat]) => ({
                                                  x,
                                                  y,
                                                  overlay: (
                                                      <BoardOverlay
                                                          isJump={isJump}
                                                          isCombat={isCombat}
                                                          onSelect={() =>
                                                              sendMovement({
                                                                  x,
                                                                  y,
                                                              })
                                                          }
                                                      />
                                                  ),
                                              }),
                                          ),
                                      )
                                    : []
                            }
                            cards={board.map(
                                ({player: playerId, x, y, card}) => ({
                                    x,
                                    y,
                                    card: (
                                        <BoardCard
                                            {...card}
                                            isOwn={player.id === playerId}
                                            onSelect={() =>
                                                selectActiveCard({
                                                    x,
                                                    y,
                                                    ...card,
                                                })
                                            }
                                        />
                                    ),
                                }),
                            )}
                        />
                    );
                    break;

                case ACTIONS.SELECT_CARD:
                    $content = (
                        <Board
                            player={player}
                            opponent={opponent}
                            activeCell={{x: activeCard?.x, y: activeCard?.y}}
                            overlays={
                                targetPlayer.id === player.id
                                    ? choices.map(({x, y}) => ({
                                          x,
                                          y,
                                          overlay: (
                                              <BoardOverlay
                                                  isChoice
                                                  isSelected={
                                                      activeCard?.x === x &&
                                                      activeCard?.y === y
                                                  }
                                                  onSelect={() =>
                                                      selectActiveCard({
                                                          x,
                                                          y,
                                                          ...board.find(
                                                              cell =>
                                                                  cell.x ===
                                                                      x &&
                                                                  cell.y === y,
                                                          ).card,
                                                      })
                                                  }
                                              />
                                          ),
                                      }))
                                    : []
                            }
                            cards={board.map(
                                ({player: playerId, x, y, card}) => ({
                                    x,
                                    y,
                                    card: (
                                        <BoardCard
                                            {...card}
                                            isOwn={player.id === playerId}
                                            onSelect={() =>
                                                selectActiveCard({
                                                    x,
                                                    y,
                                                    ...card,
                                                })
                                            }
                                        />
                                    ),
                                }),
                            )}
                        />
                    );
                    break;

                // no default
            }

            break;
        }

        case "waiting":
            $content = (
                <div css={styles.waiting}>{"En attente d'un adversaire…"}</div>
            );
            break;

        case "end":
            $content = (
                <div css={styles.waiting}>
                    {"Partie terminée."}
                    <br />
                    {"Vainqueur:"}
                    {NBSP}
                    <strong>{turn.winner.name}</strong>
                </div>
            );

        // no default
    }

    return (
        <div css={styles.container}>
            <Header round={1} player={player} opponent={opponent} />

            <main css={styles.main}>
                <div css={styles.content}>{$content}</div>
                <div css={styles.tools}>
                    <CardInfos css={styles.cardInfos} card={activeCard} />

                    <GameInfos
                        css={styles.gameInfos}
                        turn={turn}
                        trumps={trumps}
                        player={player}
                        activeCard={activeCard}
                        onSelectTrump={selectActiveCard}
                        onValidateAction={sendActionValue}
                    />

                    <Chat css={styles.chat} />
                </div>
            </main>
        </div>
    );
};

Game.propTypes = {player: Player};

export default Game;
