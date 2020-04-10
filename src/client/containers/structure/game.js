/* leny/zoondo
 *
 * /src/client/containers/structure/game.js - Structure containers: Game
 *
 * coded by leny
 * started at 06/04/2020
 */

import React, {useEffect} from "react";
import {Player} from "types";

import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {useSocket} from "use-socketio";

import {CARD_TYPES} from "core/constants";
import {fighters} from "../../../data/tribes/europa-boarix.json";

import Header from "components/header";
import Board from "components/board/board";
import BoardCard from "components/board/card";
import CardInfos from "components/tools/card-infos";
import GameInfos from "components/tools/game-infos";
import Chat from "components/tools/chat";

const Game = ({player}) => {
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
    }, [player]);

    useSocket("state", state => {
        console.log("new game state:", state);
    });

    return (
        <div css={styles.container}>
            <Header round={1} player={player} />

            <main css={styles.main}>
                <Board
                    css={styles.board}
                    player={{name: "Leny", tribe: "Boarix", score: 0}}
                    opponent={{name: "Tibus", tribe: "Warus", score: 0}}
                    cards={[
                        {
                            x: 0,
                            y: 0,
                            card: <BoardCard isOwn tribe={"boarix"} />,
                        },
                        {
                            x: 5,
                            y: 5,
                            card: <BoardCard tribe={"warus"} />,
                        },
                    ]}
                />
                <div css={styles.tools}>
                    <CardInfos
                        css={styles.cardInfos}
                        tribe={"boarix"}
                        type={CARD_TYPES.FIGHTER}
                        slug={"cloboulon"}
                        data={fighters.cloboulon}
                    />

                    <GameInfos
                        css={styles.gameInfos}
                        activePlayer={"Leny"}
                        timer={30}
                    />

                    <Chat css={styles.chat} />
                </div>
            </main>
        </div>
    );
};

Game.propTypes = {player: Player};

export default Game;
