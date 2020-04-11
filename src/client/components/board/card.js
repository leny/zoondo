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
import {noop, preventDefault} from "utils";

import cardBack from "assets/game/card-back-board.png";
import cardBackAlt from "assets/game/card-back-board-alt.png";

const BoardCard = ({tribe, isOwn = false, onSelect = noop}) => {
    const styles = usePwops({
        card: {
            size: px(120),
            position: "relative",
            display: "block",
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

    const $content = (
        <>
            <img
                css={styles.coat}
                src={`/assets/tribes/${tribe}/coat.png`}
                alt={"Blason de la tribu"}
            />
            <img css={styles.decoration} src={isOwn ? cardBack : cardBackAlt} />
        </>
    );

    if (isOwn) {
        return (
            <a
                href={"#"}
                onClick={preventDefault(onSelect)}
                css={[styles.card, isOwn || styles.opponentCard]}>
                {$content}
            </a>
        );
    }

    return (
        <span css={[styles.card, isOwn || styles.opponentCard]}>
            {$content}
        </span>
    );
};

BoardCard.propTypes = {
    tribe: PropTypes.string.isRequired,
    isOwn: PropTypes.bool,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default BoardCard;
