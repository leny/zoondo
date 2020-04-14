/* leny/zoondo
 *
 * /src/client/components/tools/game-infos.js - GameInfos
 *
 * coded by leny
 * started at 08/04/2020
 */

import React from "react";
import {Turn} from "types";

import Button from "components/commons/button";
import Box from "components/commons/box";

import {NBSP} from "core/constants";

import {rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const GameInfos = ({className, turn}) => {
    const {count, activePlayer, phase, timer} = turn || {};
    const styles = usePwops({
        activePlayer: {
            marginBottom: rem(0.5),
            fontSize: rem(2),
            textAlign: "center",
        },
        timer: {
            marginBottom: rem(1),
            fontSize: rem(3.6),
            textAlign: "center",
        },
        tips: {
            marginBottom: rem(1),
            fontSize: rem(1.4),
            fontStyle: "italic",
            textAlign: "center",
        },
        tools: {
            flexRow: ["space-around", "center"],
        },
    });

    let $activePlayer, tips, $tools;

    switch (phase) {
        case "waiting":
            tips = "En attente d'un second joueur…";
            break;

        case "main":
            $activePlayer = (
                <div css={styles.activePlayer}>
                    <span>
                        {"Joueur actif :"}
                        {NBSP}
                        <strong>{activePlayer.name}</strong>
                    </span>
                </div>
            );
            tips = "Cliquez sur une carte ou choisissez une action ci-dessous.";
            $tools = (
                <div css={styles.tools}>
                    <Button>{"Voir mes atouts"}</Button>
                    <Button>{"Voir mes renforts"}</Button>
                </div>
            );
            break;

        // no default
    }

    return (
        <Box
            className={className}
            title={`Partie${count ? ` - tour ${count}` : ""}`}>
            {$activePlayer}

            <div css={styles.timer}>
                <span>{`${timer}`.padStart(2, "0")}</span>
            </div>

            <div css={styles.tips}>
                <span>{tips}</span>
            </div>

            {$tools}
        </Box>
    );
};

GameInfos.propTypes = {
    turn: Turn,
};

export default GameInfos;
