/* leny/zoondo
 *
 * /src/containers/root.js - Root Container
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";

import StylesGlobal from "components/styles/global";
import Game from "containers/structure/game";

const RootContainer = () => (
    <>
        <StylesGlobal />
        <Game />
    </>
);

export default RootContainer;
