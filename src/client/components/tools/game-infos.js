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
import {NBSP, CARD_TYPES} from "core/constants";
import {ACTIONS} from "data/constants";
import {resolveCard} from "data/utils";
import marked from "marked";

import {rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const GameInfos = ({
    className,
    turn,
    player,
    activeCard,
    activeCell,
    onValidateAction = noop,
    onUseTrump = noop,
}) => {
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
                options: {player: targetPlayer, source, text, choices},
            } = turn.action;
            const card = resolveCard(source.card);
            let $timer, $tools, tips;

            switch (type) {
                case ACTIONS.MOVE_CARD:
                    $timer = (
                        <div css={styles.timer}>
                            <span>{`${timer}`.padStart(2, "0")}</span>
                        </div>
                    );

                    tips =
                        player.id === targetPlayer.id
                            ? text
                            : "En attente de votre adversaire…";
                    break;

                case ACTIONS.SELECT_CELL:
                    $timer = (
                        <div css={styles.timer}>
                            <span>{`${timer}`.padStart(2, "0")}</span>
                        </div>
                    );

                    if (player.id === targetPlayer.id) {
                        tips = text;
                        if (
                            choices.find(
                                ({x, y}) =>
                                    x === activeCell?.x && y === activeCell?.y,
                            )
                        ) {
                            $tools = (
                                <div css={styles.tools}>
                                    <Button
                                        onClick={preventDefault(() =>
                                            onValidateAction(activeCell),
                                        )}>
                                        {"Confirmer mon choix"}
                                    </Button>
                                </div>
                            );
                        }
                    } else {
                        tips = "En attente du choix de votre adversaire…";
                    }
                    break;

                case ACTIONS.SELECT_CARD:
                    $timer = (
                        <div css={styles.timer}>
                            <span>{`${timer}`.padStart(2, "0")}</span>
                        </div>
                    );

                    if (player.id === targetPlayer.id) {
                        tips = text;
                        if (
                            choices.find(
                                choice =>
                                    choice.x === activeCard?.x &&
                                    choice.y === activeCard?.y,
                            )
                        ) {
                            $tools = (
                                <div css={styles.tools}>
                                    <Button
                                        onClick={preventDefault(() =>
                                            onValidateAction(activeCard),
                                        )}>
                                        {"Confirmer mon choix"}
                                    </Button>
                                </div>
                            );
                        }
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
                if (activeCard?.type === "trumps") {
                    $actions = (
                        <div css={styles.tools}>
                            <Button onClick={onUseTrump}>
                                {`Utiliser ${resolveCard(activeCard).name}`}
                            </Button>
                        </div>
                    );
                } else {
                    $actions = (
                        <div css={styles.tips}>
                            {
                                "Cliquez sur une carte ou choisissez une action ci-dessous."
                            }
                        </div>
                    );
                }
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
    activeCell: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    activeCard: PropTypes.shape({
        tribe: PropTypes.string,
        type: PropTypes.oneOf(Object.values(CARD_TYPES)),
        slug: PropTypes.string,
    }),
    onValidateAction: PropTypes.func,
    onUseTrump: PropTypes.func,
};

export default GameInfos;
