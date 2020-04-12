/* leny/zoondo
 *
 * /src/client/components/board/overlay.js - Board Components: Overlay
 *
 * coded by leny
 * started at 12/04/2020
 */

import React from "react";
import PropTypes from "prop-types";

import {px, rem, percent, translate} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {noop, preventDefault} from "utils";

const BoardOverlay = ({
    className,
    isJump = false,
    isCombat = false,
    onSelect = noop,
}) => {
    const styles = usePwops({
        container: {
            display: "block",
            absolute: [px(3)],
            background: "yellow",
            zIndex: 100,
            borderRadius: px(3),
        },
        jumpContainer: {
            background: "forestgreen",
        },
        centerCircle: {
            absolute: [percent(50), false, false, percent(50)],
            size: [percent(50)],
            background: "black",
            borderRadius: percent(100),
            transform: translate(percent(-50), percent(-50)),
            flexColumn: ["center", "center"],
        },
        combatIcon: {
            fontSize: rem(4.8),
        },
    });

    return (
        <a
            href={"#"}
            onClick={preventDefault(onSelect)}
            className={className}
            css={[styles.container, isJump && styles.jumpContainer]}>
            <span css={[styles.centerCircle, isCombat && styles.combatIcon]}>
                {isCombat ? "⚔" : ""}
            </span>
        </a>
    );
};

BoardOverlay.propTypes = {
    isJump: PropTypes.bool,
    isCombat: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default BoardOverlay;
