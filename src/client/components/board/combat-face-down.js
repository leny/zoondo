/* leny/zoondo
 *
 * /src/client/components/board/combat-opponent.js - Board Components: Combat opponent card
 *
 * coded by leny
 * started at 14/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {px} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {noop, preventDefault} from "utils";
import {NBSP} from "core/constants";

import cardBack from "assets/game/card-back-combat.png";
import cardBackAlt from "assets/game/card-back-combat-alt.png";

const BoardCombatCardFaceDown = ({
    className,
    tribe,
    isAltColor,
    onCornerSelected = noop,
}) => {
    const styles = usePwops({
        container: {
            relative: true,
            size: [px(240)],
            flexColumn: ["space-around", "center"],
        },
        decoration: {
            display: "block",
            relative: true,
            size: px(240),
            zIndex: 10,
        },
        coat: {
            size: px(80),
            absolute: [px(94), false, false, px(82)],
            zIndex: 5,
        },
        zone: {
            display: "block",
            size: px(80),
            absolute: true,
            zIndex: 20,
            textDecoration: "none",
        },
        zoneTopLeft: {top: 0, left: 0},
        zoneTopRight: {top: 0, right: 0},
        zoneBottomRight: {bottom: 0, right: 0},
        zoneBottomLeft: {bottom: 0, left: 0},
    });

    const stylesMapping = [
        "zoneTopLeft",
        "zoneTopRight",
        "zoneBottomRight",
        "zoneBottomLeft",
    ];

    return (
        <div css={styles.container} className={className}>
            <img
                css={styles.coat}
                src={`/assets/tribes/${tribe}/coat.png`}
                alt={"Blason de la tribu"}
            />
            <img
                css={styles.decoration}
                src={isAltColor ? cardBackAlt : cardBack}
            />
            {Array.from(new Array(4).keys()).map(i => (
                <a
                    key={`zone-${i}`}
                    css={[styles.zone, styles[stylesMapping[i]]]}
                    href={"#"}
                    onClick={preventDefault(() => onCornerSelected(i))}>
                    {NBSP}
                </a>
            ))}
        </div>
    );
};

BoardCombatCardFaceDown.propTypes = {
    tribe: PropTypes.string,
    isAltColor: PropTypes.bool,
    onCornerSelected: PropTypes.func,
};

export default BoardCombatCardFaceDown;
