/* leny/zoondo
 *
 * /src/client/components/menu/tribe.js - Components: Tribe
 *
 * coded by leny
 * started at 18/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {rem, px, percent, s} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {noop, preventDefault} from "utils";
import {BORDER_COLOR} from "core/constants";

const Tribe = ({className, tribe, onClick = noop}) => {
    const styles = usePwops({
        container: {
            width: percent(100),
            margin: [rem(2), 0],
        },
        link: {
            display: "block",
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(5),
            padding: [rem(1)],
            transition: ["border-color", s(0.25), "ease-in-out"],
            color: "white",
            textDecoration: "none",
            "&:hover": {borderColor: "orange"},
        },
        title: {
            margin: [0, "auto", rem(1)],
            fontSize: rem(2),
        },
        content: {
            flexRow: ["space-between", "flex-start"],
        },
        figure: {
            flex: "none",
            width: rem(20),
            marginRight: rem(1),
        },
        image: {
            width: percent(100),
        },
        description: {
            fontSize: rem(1.2),
        },
    });

    const chief = Object.values(tribe.fighters)[0];

    return (
        <li css={styles.container} className={className}>
            <a
                css={styles.link}
                href={"#"}
                onClick={preventDefault(() => onClick(tribe.slug))}>
                <h3 css={styles.title}>
                    {`${tribe.name} - Tribu de ${chief.name}`}
                </h3>

                <div css={styles.content}>
                    <figure css={styles.figure}>
                        <img
                            css={styles.image}
                            src={`/assets/tribes/${tribe.slug}/${chief.slug}.png`}
                            alt={chief.name}
                        />
                    </figure>
                    <p css={styles.description}>{tribe.description}</p>
                </div>
            </a>
        </li>
    );
};

Tribe.propTypes = {
    onClick: PropTypes.func,
};

export default Tribe;
