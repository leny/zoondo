/* leny/zoondo
 *
 * /src/client/components/disposition/zoon.js - Components: DispositionZoon
 *
 * coded by leny
 * started at 23/04/2020
 */

import React, {useMemo} from "react";
import PropTypes from "prop-types";

import {rem, px} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {CELL_SIZE, BORDER_COLOR} from "core/constants";

import {preventDefault} from "core/utils";
import {resolveCard, resolveType} from "data/utils";

const DispositionZoon = ({
    className,
    type,
    tribe,
    slug,
    onClick,
    onDragStart,
}) => {
    const styles = usePwops({
        container: {
            display: "block",
            size: px(CELL_SIZE),
            flexColumn: ["space-around", "center"],
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
            background: "black",
            textDecoration: "none",
        },
        name: {
            display: "block",
            margin: [0, "auto"],
            fontSize: rem(1.4),
            color: "white",
        },
        image: {
            display: "block",
            size: px(60),
            margin: [0, "auto"],
            pointerEvents: "none",
        },
        type: {
            display: "block",
            fontSize: rem(1.1),
            color: "white",
            textTransform: "uppercase",
        },
    });
    const card = useMemo(() => resolveCard({type, tribe, slug}), [
        tribe,
        type,
        slug,
    ]);

    return (
        <a
            css={styles.container}
            draggable={onDragStart ? "true" : "false"}
            className={className}
            href={"#"}
            onDragStart={onDragStart}
            onClick={preventDefault(() => onClick({type, tribe, slug}))}>
            <strong css={styles.name}>{card.name}</strong>
            <img
                css={styles.image}
                src={`/assets/tribes/${tribe}/${card.slug}.png`}
                alt={card.name}
            />
            <span css={styles.type}>{resolveType(card.type)}</span>
        </a>
    );
};

DispositionZoon.propTypes = {
    type: PropTypes.oneOf(["fighters", "trumps"]),
    tribe: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func,
};

export default DispositionZoon;
