/* leny/zoondo
 *
 * /src/client/components/tools/chat.js - Chat
 *
 * coded by leny
 * started at 08/04/2020
 */

import React from "react";

import {BORDER_COLOR} from "core/constants";

import {px, rem, percent, translateY} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const Chat = ({className}) => {
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
    });

    return (
        <div css={styles.container} className={className}>
            <span css={styles.name}>{"Chat"}</span>
            {"TODO"}
        </div>
    );
};

export default Chat;
