/* leny/zoondo
 *
 * /src/client/components/board/card.js - Board Components: Card
 *
 * coded by leny
 * started at 03/04/2020
 */

import React, {useState} from "react";
import PropTypes from "prop-types";

import {px, rotateX, deg, rem, important, percent} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {noop, preventDefault} from "utils";
import {CELL_SIZE, BORDER_COLOR} from "core/constants";
import {resolveCard, resolveType} from "data/utils";

import cardBack from "assets/game/card-back-board.png";
import cardBackAlt from "assets/game/card-back-board-alt.png";

import CardCorners from "components/tools/card-corners";
import CardMoves from "components/tools/card-moves";

const BoardCard = ({
    className,
    tribe,
    type,
    originalType,
    slug,
    isFaceUp = false,
    bottomCard,
    isOwn = false,
    isSelected = false,
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
        obstacle: {
            flexColumn: ["space-between", "center"],
        },
        selectedContainer: {
            borderColor: important("orange"),
            boxShadow: ["inset", 0, 0, px(10), "orange"],
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
            textAlign: "center",
        },
        obstacleName: {
            width: percent(100),
            padding: [rem(0.25), 0],
            background: BORDER_COLOR,
            color: "black",
            textAlign: "center",
            borderRadius: [px(3), px(3), 0, 0],
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
        obstacleType: {
            width: percent(100),
            padding: [rem(0.25), 0],
            background: BORDER_COLOR,
            color: "black",
            textAlign: "center",
            borderRadius: [0, 0, px(3), px(3)],
        },
        corners: {
            absolute: [CELL_SIZE * 0.05, null, null, CELL_SIZE * 0.05],
            size: [CELL_SIZE * 0.9, CELL_SIZE * 0.9],
            zIndex: 10,
        },
    });

    if (type === "obstacles") {
        const card = resolveCard({
            type: originalType,
            tribe,
            slug,
        });
        let $onTopOfCard;

        if (bottomCard) {
            $onTopOfCard = (
                <>
                    <br />
                    {`(${resolveCard(bottomCard).name})`}
                </>
            );
        }

        return (
            <span
                className={className}
                css={[
                    styles.container,
                    styles.obstacle,
                    isSelected && styles.selectedContainer,
                ]}>
                <strong css={[styles.name, styles.obstacleName]}>
                    {card.name}
                    {$onTopOfCard}
                </strong>
                <img
                    css={styles.image}
                    src={`/assets/tribes/${tribe}/${card.slug}.png`}
                    alt={card.name}
                />
                <span css={[styles.type, styles.obstacleType]}>
                    {"Obstacle"}
                </span>
            </span>
        );
    }

    if (isOwn || isFaceUp) {
        const card = resolveCard({
            type,
            tribe,
            slug,
        });
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

        if (hover && (card.corners || card.moves || card.target)) {
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
            } else {
                $content.push(
                    <img
                        key={"image"}
                        css={styles.image}
                        src={`/assets/tribes/${tribe}/${card.slug}.png`}
                        alt={card.name}
                    />,
                );
            }
        }

        return (
            <a
                href={"#"}
                draggable={onDragStart ? "true" : "false"}
                className={className}
                css={[styles.container, isSelected && styles.selectedContainer]}
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
            css={[
                styles.container,
                isOwn || styles.opponentCard,
                isSelected && styles.selectedContainer,
            ]}>
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
    type: PropTypes.oneOf(["fighters", "trumps", "obstacles"]),
    originalType: PropTypes.string,
    tribe: PropTypes.string.isRequired,
    slug: PropTypes.string,
    bottomCard: PropTypes.object,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func,
    isOwn: PropTypes.bool,
    isFaceUp: PropTypes.bool,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default BoardCard;
