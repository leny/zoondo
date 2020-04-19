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
    isChoice = false,
    isSelected = false,
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
        choiceContainer: {
            absolute: [px(-1)],
            background: "transparent",
            border: [px(1), "solid", "cyan"],
            boxShadow: ["inset", 0, 0, px(10), "cyan"],
        },
        selectedChoiceContainer: {
            border: [px(1), "solid", "green"],
            boxShadow: ["inset", 0, 0, px(10), "green"],
        },
    });

    return (
        <a
            href={"#"}
            onClick={preventDefault(onSelect)}
            className={className}
            css={[
                styles.container,
                isJump && styles.jumpContainer,
                isChoice && styles.choiceContainer,
                isSelected && styles.selectedChoiceContainer,
            ]}>
            <span
                css={[
                    !isChoice && styles.centerCircle,
                    isCombat && styles.combatIcon,
                ]}>
                {isCombat ? "⚔" : ""}
            </span>
        </a>
    );
};

BoardOverlay.propTypes = {
    isChoice: PropTypes.bool,
    isSelected: PropTypes.bool,
    isJump: PropTypes.bool,
    isCombat: PropTypes.bool,
    onSelect: PropTypes.func,
};

export default BoardOverlay;
