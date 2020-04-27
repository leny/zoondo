/* leny/zoondo
 *
 * /src/client/components/board/card.js - Board Components: Card
 *
 * coded by leny
 * started at 03/04/2020
 */

import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";

import {px, rotateX, deg, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {noop, preventDefault} from "utils";
import {CELL_SIZE} from "core/constants";
import {resolveCard, resolveType} from "data/utils";

import cardBack from "assets/game/card-back-board.png";
import cardBackAlt from "assets/game/card-back-board-alt.png";

import CardCorners from "components/tools/card-corners";
import CardMoves from "components/tools/card-moves";

const BoardCard = ({
    className,
    tribe,
    type,
    slug,
    isFaceUp = false,
    isOwn = false,
    onSelect = noop,
    onDragStart = noop,
}) => {
    const [hover, setHover] = useState(false);
    const styles = usePwops({
        container: {
            size: px(CELL_SIZE),
            relative: [px(-1), null, null, px(-1)],
            display: "block",
            flexColumn: ["space-around", "center"],
            textDecoration: "none",
        },
        coat: {
            size: px(CELL_SIZE / 3),
            absolute: [
                px(Math.round(CELL_SIZE / 2.553191489)),
                0,
                0,
                px(Math.round(CELL_SIZE / 2.926829268)),
            ],
            zIndex: 5,
        },
        decoration: {
            display: "block",
            relative: true,
            size: [px(CELL_SIZE)],
            zIndex: 10,
        },
        opponentCard: {
            transform: rotateX(deg(180)),
            transformOrigin: "preserve-3d",
        },
        name: {
            display: "block",
            margin: [0, "auto"],
            fontSize: rem(1.4),
            color: "white",
        },
        image: {
            display: "block",
            size: px(CELL_SIZE / 2),
            margin: [0, "auto"],
            pointerEvents: "none",
        },
        type: {
            display: "block",
            fontSize: rem(1.1),
            color: "white",
            textTransform: "uppercase",
        },
        corners: {
            absolute: [CELL_SIZE * 0.05, null, null, CELL_SIZE * 0.05],
            size: [CELL_SIZE * 0.9, CELL_SIZE * 0.9],
            zIndex: 10,
        },
    });

    if (isOwn || isFaceUp) {
        const card = useMemo(() => resolveCard({type, tribe, slug}), [
            tribe,
            type,
            slug,
        ]);

        let $content = (
            <>
                <strong css={styles.name}>{card.name}</strong>
                <img
                    css={styles.image}
                    src={`/assets/tribes/${tribe}/${card.slug}.png`}
                    alt={card.name}
                />
                <span css={styles.type}>{resolveType(card.type)}</span>
            </>
        );

        if (hover) {
            $content = [];

            if (card.corners) {
                $content.push(
                    <CardCorners
                        key={"corners"}
                        css={styles.corners}
                        corners={card.corners}
                    />,
                );
            }

            if (card.moves || card.target) {
                $content.push(
                    <CardMoves
                        key={"moves"}
                        moves={card.moves || card.target}
                    />,
                );
            }
        }

        return (
            <a
                href={"#"}
                draggable={onDragStart ? "true" : "false"}
                className={className}
                css={[styles.container]}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onDragStart={onDragStart}
                onClick={preventDefault(onSelect)}>
                {$content}
            </a>
        );
    }

    return (
        <span
            className={className}
            css={[styles.container, isOwn || styles.opponentCard]}>
            <img
                css={styles.coat}
                src={`/assets/tribes/${tribe}/coat.png`}
                alt={"Blason de la tribu"}
            />
            <img css={styles.decoration} src={isOwn ? cardBack : cardBackAlt} />
        </span>
    );
};

BoardCard.propTypes = {
    type: PropTypes.oneOf(["fighters", "trumps"]),
    tribe: PropTypes.string.isRequired,
    slug: PropTypes.string,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func,
    isOwn: PropTypes.bool,
    isFaceUp: PropTypes.bool,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default BoardCard;
