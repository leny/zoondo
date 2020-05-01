/* leny/zoondo
 *
 * /src/client/components/board/combat.js - Board Components: Combat
 *
 * coded by leny
 * started at 14/04/2020
 */

/* eslint-disable no-extra-parens */ // will be fixed on cleaning

import React from "react";
import PropTypes from "prop-types";

import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {Player} from "types";
import {resolveCard} from "data/utils";

import {NBSP} from "core/constants";

import Box from "components/commons/box";
import CardFaceUp from "components/board/combat-face-up";
import CardFaceDown from "components/board/combat-face-down";

const BoardCombat = ({
    step,
    player,
    attacker,
    defender,
    winner,
    powerOwner,
    onAction,
}) => {
    const styles = usePwops({
        explain: {
            margin: [0, 0, rem(1)],
            fontSize: rem(1.6),
            textAlign: "center",
        },
        power: {
            margin: [rem(1), 0],
            fontSize: rem(1.8),
        },
        observation: {
            margin: [rem(1), 0, rem(1)],
            fontSize: rem(1.6),
            fontStyle: "italic",
            textAlign: "center",
        },
        ring: {
            flexRow: ["space-between", "center"],
        },
        card: {
            relative: true,
            size: [px(240)],
        },
        vs: {
            display: "block",
            margin: [0, rem(1.5)],
            fontSize: rem(3.6),
        },
    });

    let explain, details, $content;

    switch (step) {
        case "choice":
            explain =
                "Veuillez choisir un des coins du Zoon de votre adversaire.";
            details =
                "(les cartes ont été plusieurs fois tournées aléatoirement à 180º)";

            $content = (
                <div css={styles.ring}>
                    {attacker.player === player.id ? (
                        <CardFaceUp
                            {...attacker.card}
                            corners={attacker.corners}
                        />
                    ) : (
                        <CardFaceDown
                            isAltColor={player.isFirstPlayer}
                            {...attacker.card}
                            selectableCorners
                            onCornerSelected={index =>
                                onAction("choose", {index})
                            }
                        />
                    )}
                    <span css={styles.vs}>{"VS"}</span>
                    {defender.player === player.id ? (
                        <CardFaceUp
                            {...defender.card}
                            corners={defender.corners}
                        />
                    ) : (
                        <CardFaceDown
                            isAltColor={player.isFirstPlayer}
                            {...defender.card}
                            selectableCorners
                            onCornerSelected={index =>
                                onAction("choose", {index})
                            }
                        />
                    )}
                </div>
            );
            break;

        case "wait":
            explain = "Attente du choix de votre adversaire…";

            $content = (
                <div css={styles.ring}>
                    {attacker.player === player.id ? (
                        <CardFaceUp {...attacker.card} />
                    ) : (
                        <CardFaceDown
                            isAltColor={player.isFirstPlayer}
                            {...attacker.card}
                        />
                    )}
                    <span css={styles.vs}>{"VS"}</span>
                    {defender.player === player.id ? (
                        <CardFaceUp {...defender.card} />
                    ) : (
                        <CardFaceDown
                            isAltColor={player.isFirstPlayer}
                            {...defender.card}
                        />
                    )}
                </div>
            );
            break;

        case "resolve": {
            let $power;

            if (winner === "draw") {
                explain =
                    "Le combat se solde par une égalité. Le Zoon attaquant recule d'une case suivant son déplacement.";
            } else if (winner === "power") {
                const card = resolveCard(
                    (powerOwner === "attacker" ? attacker : defender).card,
                );

                explain = `Le pouvoir du ${name} ${
                    powerOwner === "attacker" ? "attaquant" : "défenseur"
                } se déclenche :`;

                $power = (
                    <p css={styles.power}>
                        <strong>{"Pouvoir :"}</strong>
                        {NBSP}
                        {card.power}
                    </p>
                );
            } else {
                explain = `Le ${
                    resolveCard(
                        (winner === "attacker" ? attacker : defender).card,
                    ).name
                } ${
                    winner === "attacker" ? "attaquant" : "defenseur"
                } remporte le combat.`;
            }

            $content = (
                <>
                    <div css={styles.ring}>
                        <CardFaceUp
                            {...attacker.card}
                            corners={attacker.corners}
                            selectedCornerIndex={attacker.cornerIndex}
                        />
                        <span css={styles.vs}>{"VS"}</span>
                        <CardFaceUp
                            {...defender.card}
                            corners={defender.corners}
                            selectedCornerIndex={defender.cornerIndex}
                        />
                    </div>

                    {$power}

                    <p css={styles.observation}>
                        {"La partie continue dans 5 secondes…"}
                    </p>
                </>
            );
            break;
        }
        // no default
    }

    return (
        <Box title={"Combat"}>
            <p css={styles.explain}>
                {explain}
                {details ? (
                    <>
                        <br />
                        <small>{details}</small>
                    </>
                ) : (
                    ""
                )}
            </p>

            {$content}
        </Box>
    );
};

BoardCombat.propTypes = {
    step: PropTypes.string.isRequired,
    player: Player,
    attacker: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        player: PropTypes.string,
        card: PropTypes.shape({
            tribe: PropTypes.string,
            type: PropTypes.string,
            slug: PropTypes.string,
        }),
    }),
    defender: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        player: PropTypes.string,
        card: PropTypes.shape({
            tribe: PropTypes.string,
            type: PropTypes.string,
            slug: PropTypes.string,
        }),
    }),
    winner: PropTypes.string,
    powerOwner: PropTypes.string,
    onAction: PropTypes.func,
};

export default BoardCombat;
