/* leny/zoondo
 *
 * /src/components/tools/card-infos.js - CardInfo
 *
 * coded by leny
 * started at 07/04/2020
 */

import React from "react";
import PropTypes from "prop-types";
import {FighterShape} from "types";
import {NBSP, CARD_TYPES, BORDER_COLOR} from "core/constants";

import {px, rem, percent, translateY} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import CardCorners from "components/tools/card-corners";
import CardMoves from "components/tools/card-moves";

const CardInfos = ({
    tribe,
    // type,
    slug,
    data,
}) => {
    const styles = usePwops({
        container: {
            relative: true,
            padding: [rem(2), rem(1), rem(1)],
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
        },
        name: {
            absolute: [0, false, false, rem(1)],
            display: "inline-block",
            background: "black",
            padding: [0, rem(1)],
            fontSize: rem(1.6),
            transform: translateY(percent(-50)),
        },
        params: {
            flexRow: ["space-between", "stretch"],
        },
        illustration: {
            flex: "none",
            width: rem(20),
            marginRight: rem(2),
        },
        image: {
            width: percent(100),
        },
        infos: {
            flex: [1, 0, 0],
            flexColumn: ["space-between", "center"],
            padding: [rem(2), 0],
        },
        details: {
            marginTop: rem(1),
            fontSize: rem(1.6),
        },
    });

    let $details;

    if (data.power) {
        $details = (
            <div css={styles.details}>
                <strong>{"Power:"}</strong>
                {NBSP}
                {data.power}
            </div>
        );
    }

    return (
        <div css={styles.container}>
            <span css={styles.name}>
                {"Carte active:"}
                {NBSP}
                <span>
                    <strong>{data.name}</strong>
                    {NBSP}
                    {`(${data.type}, ${tribe})`}
                </span>
            </span>

            <div css={styles.params}>
                <figure css={styles.illustration}>
                    <img
                        css={styles.image}
                        src={`/assets/tribes/${tribe}/${slug}.png`}
                        alt={data.name}
                    />
                </figure>

                <div css={styles.infos}>
                    <CardCorners corners={data.corners} />
                    <CardMoves moves={data.moves} />
                </div>
            </div>
            {$details}
        </div>
    );
};

CardInfos.propTypes = {
    tribe: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(CARD_TYPES)).isRequired,
    slug: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([FighterShape]).isRequired,
};

export default CardInfos;
