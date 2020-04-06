/* leny/zoondo
 *
 * /src/containers/structure/game.js - Structure containers: Game
 *
 * coded by leny
 * started at 06/04/2020
 */

import React from "react";

import {px} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import Header from "components/header";
import Board from "components/board/board";
import BoardCard from "components/board/card";

const Game = () => {
    const styles = usePwops({
        container: {
            width: px(1200),
            margin: [px(10), "auto", 0],
        },
    });

    return (
        <div css={styles.container}>
            <Header
                round={1}
                player={{name: "Leny", tribe: "Boarix", score: 0}}
                opponent={{name: "Tibus", tribe: "Warus", score: 0}}
            />

            <main>
                <Board
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
            </main>
        </div>
    );
};

export default Game;
