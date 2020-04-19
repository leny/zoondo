/* leny/zoondo
 *
 * /src/client/components/tools/game-infos.js - GameInfos
 *
 * coded by leny
 * started at 08/04/2020
 */

/* eslint-disable react/no-danger */

import React from "react";
import PropTypes from "prop-types";
import {Turn, Player} from "types";

import Button from "components/commons/button";
import Box from "components/commons/box";

import {noop, preventDefault} from "utils";
import {NBSP} from "core/constants";
import {ACTIONS} from "data/constants";
import {resolveCard} from "data/utils";
import marked from "marked";

import {rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const GameInfos = ({className, turn, player, onValidateAction = noop}) => {
    const {count, activePlayer, phase, timer} = turn || {};
    const styles = usePwops({
        activePlayer: {
            marginBottom: rem(0.5),
            fontSize: rem(2),
            textAlign: "center",
        },
        powerSource: {
            marginBottom: rem(0.5),
            fontSize: rem(2),
            textAlign: "center",
        },
        powerText: {
            marginBottom: rem(1),
            fontSize: rem(1.4),
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
            "em, i": {fontStyle: "normal"},
            "strong, b": {fontWeight: "bold"},
        },
        tools: {
            flexRow: ["space-around", "center"],
        },
    });

    let $content;

    switch (phase) {
        case "waiting":
            $content = (
                <div css={styles.tips}>
                    <span>{"En attente d'un second joueur…"}</span>
                </div>
            );
            break;

        case "action": {
            const {
                type,
                options: {player: targetPlayer, source, text},
            } = turn.action;
            const card = resolveCard(source.card);
            let $timer, $tools, tips;

            switch (type) {
                case ACTIONS.SELECT_CARD:
                    $timer = (
                        <div css={styles.timer}>
                            <span>{`${timer}`.padStart(2, "0")}</span>
                        </div>
                    );

                    if (player.id === targetPlayer.id) {
                        tips = text;
                        $tools = (
                            <div css={styles.tools}>
                                <Button
                                    onClick={preventDefault(onValidateAction)}>
                                    {"Confirmer mon choix"}
                                </Button>
                            </div>
                        );
                    } else {
                        tips = "En attente du choix de votre adversaire…";
                    }

                    break;

                // no default
            }

            $content = (
                <>
                    <div css={styles.powerSource}>
                        <span>
                            {"Pouvoir :"}
                            {NBSP}
                            <strong>{card.name}</strong>
                        </span>
                    </div>
                    <div css={styles.powerText}>{card.power}</div>
                    {$timer}
                    <div
                        css={styles.tips}
                        dangerouslySetInnerHTML={{__html: marked(tips)}}
                    />
                    {$tools}
                </>
            );

            break;
        }

        case "combat":
            $content = (
                <div css={styles.timer}>
                    <span>{`${timer}`.padStart(2, "0")}</span>
                </div>
            );
            break;

        case "main": {
            let $actions;

            if (player.id === turn.activePlayer.id) {
                $actions = (
                    <>
                        <div css={styles.tips}>
                            <span>
                                {
                                    "Cliquez sur une carte ou choisissez une action ci-dessous."
                                }
                            </span>
                        </div>

                        <div css={styles.tools}>
                            <Button>{"Voir mes atouts"}</Button>
                            <Button>{"Voir mes renforts"}</Button>
                        </div>
                    </>
                );
            }

            $content = (
                <>
                    <div css={styles.activePlayer}>
                        <span>
                            {"Joueur actif :"}
                            {NBSP}
                            <strong>{activePlayer.name}</strong>
                        </span>
                    </div>

                    <div css={styles.timer}>
                        <span>{`${timer}`.padStart(2, "0")}</span>
                    </div>

                    {$actions}
                </>
            );
            break;
        }

        // no default
    }

    return (
        <Box
            className={className}
            title={`Partie${count ? ` - tour ${count}` : ""}`}>
            {$content}
        </Box>
    );
};

GameInfos.propTypes = {
    turn: Turn,
    player: Player,
    onValidateAction: PropTypes.func,
};

export default GameInfos;
