/* leny/zoondo
 *
 * /src/client/containers/root.js - Root Container
 *
 * coded by leny
 * started at 03/04/2020
 */

import React, {useState} from "react";

import StylesGlobal from "components/styles/global";
import HomeMenu from "components/menu/home";
import TribeSelectorMenu from "components/menu/tribe-selector";
import TribeDispositionMenu from "components/menu/tribe-disposition";
import Game from "containers/structure/game";
import {SocketIOProvider} from "use-socketio";

import {SERVER_PATH} from "core/constants";

const RootContainer = () => {
    const [mode, setMode] = useState(null);
    const [name, setName] = useState(null);
    const [tribe, setTribe] = useState(null);
    const [disposition, setDisposition] = useState(null);

    let $content;

    switch (mode) {
        case "game":
            $content = (
                <SocketIOProvider url={SERVER_PATH}>
                    <Game
                        player={{
                            name,
                            tribe,
                            disposition,
                        }}
                    />
                </SocketIOProvider>
            );
            break;

        case "tribe-selector":
            $content = (
                <TribeSelectorMenu
                    name={name}
                    onSelectTribe={slug => {
                        setTribe(slug);
                        setMode("tribe-disposition");
                    }}
                />
            );
            break;

        case "tribe-disposition":
            $content = (
                <TribeDispositionMenu
                    name={name}
                    tribeSlug={tribe}
                    onSelectDisposition={tribeDisposition => {
                        setDisposition(tribeDisposition);
                        setMode("game");
                    }}
                />
            );
            break;

        default:
            $content = (
                <HomeMenu
                    onSelectName={s => {
                        setName(s);
                        setMode("tribe-selector");
                    }}
                />
            );
            break;
    }

    return (
        <>
            <StylesGlobal />

            {$content}
        </>
    );
};

export default RootContainer;
