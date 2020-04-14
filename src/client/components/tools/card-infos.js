/* leny/zoondo
 *
 * /src/client/components/tools/card-infos.js - CardInfo
 *
 * coded by leny
 * started at 07/04/2020
 */

import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {NBSP, CARD_TYPES} from "core/constants";

import {rem, percent} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {resolveCard} from "data/utils";

import CardCorners from "components/tools/card-corners";
import CardMoves from "components/tools/card-moves";
import Box from "components/commons/box";

const CardInfos = ({className, card}) => {
    const data = useMemo(() => {
        if (!card) {
            return null;
        }

        return resolveCard(card);
    }, [card]);

    const styles = usePwops({
        params: {
            flexRow: ["space-between", "stretch"],
        },
        illustration: {
            flex: "none",
            size: [rem(20)],
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
        corners: {size: rem(7)},
    });

    let title, $content, $details;

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

        title = (
            <>
                {"Carte active:"}
                {NBSP}
                <span>
                    <strong>{data.name}</strong>
                    {NBSP}
                    {`(${data.type}, ${data.tribe})`}
                </span>
            </>
        );

        $content = (
            <>
                <div css={styles.params}>
                    <figure css={styles.illustration}>
                        <img
                            css={styles.image}
                            src={`/assets/tribes/${card.tribe}/${data.slug}.png`}
                            alt={data.name}
                        />
                    </figure>

                    <div css={styles.infos}>
                        <CardCorners
                            css={styles.corners}
                            corners={data.corners}
                        />
                        <CardMoves moves={data.moves} />
                    </div>
                </div>
                {$details}
            </>
        );
    } else {
        title = "Carte active:";
        $content = (
            <p css={styles.empty}>
                {
                    "Cliquez sur une de vos cartes pour avoir plus d'informations."
                }
            </p>
        );
    }

    return (
        <Box title={title} className={className}>
            {$content}
        </Box>
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
