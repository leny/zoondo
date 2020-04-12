/* leny/zoondo
 *
 * /src/client/components/tools/card-infos.js - CardInfo
 *
 * coded by leny
 * started at 07/04/2020
 */

import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {NBSP, CARD_TYPES, BORDER_COLOR} from "core/constants";

import {px, rem, percent, translateY} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {resolveCard} from "data/utils";

import CardCorners from "components/tools/card-corners";
import CardMoves from "components/tools/card-moves";

const CardInfos = ({className, card}) => {
    const data = useMemo(() => {
        if (!card) {
            return null;
        }

        return resolveCard(card);
    }, [card]);

    const styles = usePwops({
        container: {
            relative: true,
            minHeight: rem(24),
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
        empty: {
            padding: [rem(4.8), 0],
            fontSize: rem(1.4),
            textAlign: "center",
        },
    });

    let $content, $details;

    if (data) {
        if (data.power) {
            $details = (
                <div css={styles.details}>
                    <strong>{"Pouvoir :"}</strong>
                    {NBSP}
                    {data.power}
                </div>
            );
        }

        $content = (
            <>
                <span css={styles.name}>
                    {"Carte active:"}
                    {NBSP}
                    <span>
                        <strong>{data.name}</strong>
                        {NBSP}
                        {`(${data.type}, ${data.tribe})`}
                    </span>
                </span>

                <div css={styles.params}>
                    <figure css={styles.illustration}>
                        <img
                            css={styles.image}
                            src={`/assets/tribes/${card.tribe}/${data.slug}.png`}
                            alt={data.name}
                        />
                    </figure>

                    <div css={styles.infos}>
                        <CardCorners corners={data.corners} />
                        <CardMoves moves={data.moves} />
                    </div>
                </div>
                {$details}
            </>
        );
    } else {
        $content = (
            <>
                <span css={styles.name}>{"Carte active:"}</span>
                <p css={styles.empty}>
                    {
                        "Cliquez sur une de vos cartes pour avoir plus d'informations."
                    }
                </p>
            </>
        );
    }

    return (
        <div css={styles.container} className={className}>
            {$content}
        </div>
    );
};

CardInfos.propTypes = {
    card: PropTypes.shape({
        tribe: PropTypes.string,
        type: PropTypes.oneOf(Object.values(CARD_TYPES)),
        slug: PropTypes.string,
    }),
};

export default CardInfos;
