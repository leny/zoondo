/* leny/zoondo
 *
 * /src/client/components/board/combat.js - Board Components: Combat
 *
 * coded by leny
 * started at 14/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {Player} from "types";

import Box from "components/commons/box";
import CardFaceUp from "components/board/combat-face-up";
import CardFaceDown from "components/board/combat-face-down";

const BoardCombat = ({step, player, attacker, defender}) => {
    const styles = usePwops({
        explain: {
            margin: [0, 0, rem(1)],
            fontSize: rem(1.6),
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

    let explain;

    switch (step) {
        case "choice":
            explain =
                "Veuillez choisir un des coins du Zoon de votre adversaire.";
            break;
        // no default
    }

    return (
        <Box title={"Combat"}>
            <p css={styles.explain}>{explain}</p>

            <div css={styles.ring}>
                {attacker.player === player.id ? (
                    <CardFaceUp {...attacker.card} selectedCornerIndex={0} />
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
};

export default BoardCombat;
