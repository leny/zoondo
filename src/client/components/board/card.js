/* leny/zoondo
 *
 * /src/client/components/board/card.js - Board Components: Card
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {px, rotateX, deg} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import cardBack from "assets/game/card-back-board.png";
import cardBackAlt from "assets/game/card-back-board-alt.png";

const BoardCard = ({tribe, isOwn = false}) => {
    const styles = usePwops({
        card: {
            size: px(120),
            position: "relative",
        },
        coat: {
            size: px(40),
            absolute: [px(47), 0, 0, px(41)],
            zIndex: 5,
        },
        decoration: {
            display: "block",
            relative: true,
            size: [px(120)],
            zIndex: 10,
        },
        opponentCard: {
            transform: rotateX(deg(180)),
            transformOrigin: "preserve-3d",
        },
    });

    return (
        <div css={[styles.card, isOwn || styles.opponentCard]}>
            <img
                css={styles.coat}
                src={`/assets/tribes/${tribe}/coat.png`}
                alt={"Blason de la tribu"}
            />
            <img css={styles.decoration} src={isOwn ? cardBack : cardBackAlt} />
        </div>
    );
};

BoardCard.propTypes = {
    tribe: PropTypes.string.isRequired,
    isOwn: PropTypes.bool,
};

export default BoardCard;