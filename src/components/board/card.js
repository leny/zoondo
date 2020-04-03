/* leny/zoondo
 *
 * /src/components/board/card.js - Board Components: Card
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {px, absolute, relative, size} from "koutla-swiss";

import cardBack from "../../assets/game/card-back-board.png";
import cardBackAlt from "../../assets/game/card-back-board-alt.png";

const styles = {
    card: {
        ...size(px(120)),
        ...relative(),
    },
    coat: {
        ...size(px(40)),
        ...absolute(px(41), 0, 0, px(41)),
        zIndex: 5,
    },
    decoration: {
        display: "block",
        ...relative(),
        ...size(px(120)),
        zIndex: 10,
    },
};

const BoardCard = ({coat, isOwn = false}) => (
    <div css={styles.card}>
        <img css={styles.coat} src={coat} alt={"Blason de la tribu"} />
        <img css={styles.decoration} src={isOwn ? cardBack : cardBackAlt} />
    </div>
);

BoardCard.propTypes = {
    coat: PropTypes.string.isRequired,
    isOwn: PropTypes.bool,
};

export default BoardCard;
