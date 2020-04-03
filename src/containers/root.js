/* leny/zoondo
 *
 * /src/containers/root.js - Root Container
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import StylesGlobal from "../components/styles/global";

import BoardCard from "../components/board/card";
import boarixCoat from "../assets/tribes/boarix/coat.png";
import warusCoat from "../assets/tribes/warus/coat.png";

const RootContainer = () => (
    <div>
        <StylesGlobal />

        <BoardCard isOwn coat={boarixCoat} />
        <BoardCard coat={warusCoat} />
    </div>
);

export default RootContainer;
