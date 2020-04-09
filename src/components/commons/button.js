/* leny/zoondo
 *
 * /src/components/commons/button.js - Commons components: Button
 *
 * coded by leny
 * started at 08/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {noop} from "utils";
import {BORDER_COLOR} from "core/constants";

import {px, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const Button = ({className, children, onClick = noop}) => {
    const styles = usePwops({
        button: {
            display: "inline-block",
            padding: [rem(0.5), rem(1)],
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
            fontSize: rem(1.6),
            background: "transparent",
            color: "white",
            cursor: "pointer",
        },
    });

    return (
        <button
            className={className}
            css={styles.button}
            type={"button"}
            onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};

export default Button;
