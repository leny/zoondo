/* leny/zoondo
 *
 * /src/client/components/tools/hand-holder.js - HandHolder
 *
 * coded by leny
 * started at 28/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import Box from "components/commons/box";
import Card from "components/board/card";

import {noop, isTruthy} from "utils";
import {CARD_TYPES, BORDER_COLOR} from "core/constants";

import {rem, px} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const HandHolder = ({className, trumps, activeCard, onSelectTrump = noop}) => {
    const styles = usePwops({
        trumps: {
            relative: true,
            margin: [rem(1), "auto"],
            flexRow: ["space-around", "center"],
        },
        noTrump: {
            margin: [rem(1), "auto"],
            textAlign: "center",
        },
        trump: {
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
        },
    });

    let $content;

    if ((trumps || []).length) {
        $content = (
            <div css={styles.trumps}>
                {trumps.map(({tribe, type, slug}) => (
                    <Card
                        key={slug}
                        css={styles.trump}
                        tribe={tribe}
                        type={type}
                        slug={slug}
                        isOwn
                        isSelected={[
                            activeCard?.tribe === tribe,
                            activeCard?.type === type,
                            activeCard?.slug === slug,
                        ].every(isTruthy)}
                        onSelect={() =>
                            onSelectTrump({
                                x: `${tribe}-${type}-${slug}`,
                                y: `${tribe}-${type}-${slug}`,
                                tribe,
                                type,
                                slug,
                            })
                        }
                    />
                ))}
            </div>
        );
    } else {
        $content = (
            <div css={styles.noTrump}>
                <p>{"Vous n'avez plus d'atout."}</p>
            </div>
        );
    }

    return (
        <Box className={className} title={"Atouts"}>
            {$content}
        </Box>
    );
};

HandHolder.propTypes = {
    activeCard: PropTypes.shape({
        tribe: PropTypes.string,
        type: PropTypes.oneOf(Object.values(CARD_TYPES)),
        slug: PropTypes.string,
    }),
    trumps: PropTypes.arrayOf(
        PropTypes.shape({
            tribe: PropTypes.string,
            type: PropTypes.oneOf(Object.values(CARD_TYPES)),
            slug: PropTypes.string,
        }),
    ),
    onSelectTrump: PropTypes.func,
};

export default HandHolder;
