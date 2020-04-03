/* leny/zoondo
 *
 * /src/containers/root.js - Root Container
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import StylesGlobal from "../components/styles/global";

import Board from "../components/board/board";
import BoardCard from "../components/board/card";
import boarixCoat from "../assets/tribes/boarix/coat.png";
import warusCoat from "../assets/tribes/warus/coat.png";

const RootContainer = () => (
    <div>
        <StylesGlobal />

        <Board
            cards={[
                {x: 0, y: 0, card: <BoardCard isOwn coat={boarixCoat} />},
                {x: 5, y: 5, card: <BoardCard coat={warusCoat} />},
            ]}
        />
    </div>
);

export default RootContainer;
