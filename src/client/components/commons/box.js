/* leny/zoondo
 *
 * /src/client/components/commons/box.js - Commons Components: Box
 *
 * coded by leny
 * started at 14/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {BORDER_COLOR} from "core/constants";
import {px, rem, percent, translateY} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const CommonBox = ({className, children, title}) => {
    const styles = usePwops({
        container: {
            relative: true,
            padding: [rem(2), rem(1), rem(1)],
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
        },
        title: {
            absolute: [0, false, false, rem(1)],
            display: "inline-block",
            background: "black",
            padding: [0, rem(1)],
            fontSize: rem(1.6),
            transform: translateY(percent(-50)),
        },
    });

    return (
        <div css={styles.container} className={className}>
            <span css={styles.title}>{title}</span>
            {children}
        </div>
    );
};

CommonBox.propTypes = {
    title: PropTypes.node.isRequired,
};

export default CommonBox;
