/* leny/zoondo
 *
 * /src/client/components/menu/tribe-selector.js - Components: TribeSelector
 *
 * coded by leny
 * started at 16/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {rem, px, percent, url} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {noop} from "utils";

import {editions} from "data/tribes";

import Tribe from "components/menu/tribe";
import logo from "assets/logo.png";

const TribeSelectorMenu = ({name, onSelectTribe = noop}) => {
    const styles = usePwops({
        container: {
            width: px(1200),
            minHeight: percent(100),
            margin: [rem(5), "auto", 0],
            flexColumn: ["flex-start", "center"],
        },
        title: {
            size: [px(600 / 3), px(432 / 3)],
            margin: [0, "auto", rem(3)],
            textIndent: px(-9999),
            background: ["transparent", url(logo), "center", "no-repeat"],
            backgroundSize: "cover",
        },
        content: {
            width: px(640),
            margin: [0, "auto", rem(2.5)],
            fontSize: rem(1.6),
            color: "white",
        },
        edition: {
            margin: [rem(2), "auto"],
        },
        editionTitle: {
            margin: [0, "auto", rem(1.6)],
            fontSize: rem(2),
        },
    });

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>{"Zoondo"}</h1>

            <div css={styles.content}>
                <p>{`Salut ${name}! Choisis ta tribu :`}</p>

                {Array.from(editions.values()).map(edition => (
                    <div key={edition.slug} css={styles.edition}>
                        <h2 css={styles.editionTitle}>{edition.name}</h2>

                        <ul css={styles.tribes}>
                            {edition.tribes.map(tribe => (
                                <Tribe
                                    key={tribe.slug}
                                    tribe={tribe}
                                    onClick={slug => onSelectTribe(slug)}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

TribeSelectorMenu.propTypes = {
    name: PropTypes.string.isRequired,
    onSelectTribe: PropTypes.func,
};

export default TribeSelectorMenu;
