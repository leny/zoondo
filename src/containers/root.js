/* leny/zoondo
 *
 * /src/containers/root.js - Root Container
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import StylesGlobal from "../components/styles/global";
import "@pwops/mixins";

import Board from "../components/board/board";
import BoardCard from "../components/board/card";

const RootContainer = () => (
    <div>
        <StylesGlobal />

        <Board
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
    </div>
);

export default RootContainer;
