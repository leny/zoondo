/* leny/zoondo
 *
 * /src/client/containers/root.js - Root Container
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";

import StylesGlobal from "components/styles/global";
import Game from "containers/structure/game";
import {SocketIOProvider} from "use-socketio";

import {SERVER_PATH} from "core/constants";

const player = {
    name: `Player (${Math.round(Math.random() * 100)})`,
    tribe: [
        "europa-boarix",
        "europa-warus",
        "europa-monkus",
        "europa-rhinogoths",
    ][Math.floor(Math.random() * 100) % 4],
};

const RootContainer = () => (
    <>
        <StylesGlobal />
        <SocketIOProvider url={SERVER_PATH}>
            <Game player={player} />
        </SocketIOProvider>
    </>
);

export default RootContainer;
