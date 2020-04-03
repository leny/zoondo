/* leny/zoondo
 *
 * /src/components/board/card.js - Board Components: Card
 *
 * coded by leny
 * started at 03/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import cardBack from "../../assets/game/card-back-board.png";
import cardBackAlt from "../../assets/game/card-back-board-alt.png";

const BoardCard = ({coat, isOwn = false}) => (
    <div>
        <img src={coat} alt={"Blason de la tribu"} />
        <img src={isOwn ? cardBack : cardBackAlt} />
    </div>
);

BoardCard.propTypes = {
    coat: PropTypes.string.isRequired,
    isOwn: PropTypes.bool,
};

export default BoardCard;
