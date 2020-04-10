/* leny/zoondo
 *
 * /src/client/components/tools/chat.js - Chat
 *
 * coded by leny
 * started at 08/04/2020
 */

import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";

import {BORDER_COLOR} from "core/constants";
import {px, rem, percent, translateY} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import ChatMessage from "components/tools/chat-message";

const Chat = ({className, messages = []}) => {
    const list = useRef(null);

    const styles = usePwops({
        container: {
            relative: true,
            flexColumn: ["space-between", "stretch"],
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
        holder: {overflow: "auto", flex: [1, 0, 0]},
        messages: {
            minHeight: percent(100),
            flexColumn: ["flex-end", "stretch"],
        },
        message: {},
    });

    useEffect(() => {
        list.current &&
            list.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end",
            });
    }, [list.current, messages]);

    return (
        <div css={styles.container} className={className}>
            <span css={styles.name}>{"Chat"}</span>
            <div css={styles.holder}>
                <ul css={styles.messages} ref={list}>
                    {messages.map(message => (
                        <li
                            key={`${message.timestamp}-${message.author}`}
                            css={styles.message}>
                            <ChatMessage {...message} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

Chat.propTypes = {
    messages: PropTypes.array,
};

export default Chat;
