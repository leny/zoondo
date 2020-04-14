/* leny/zoondo
 *
 * /src/client/components/tools/chat.js - Chat
 *
 * coded by leny
 * started at 08/04/2020
 */

import React, {useRef, useState, useEffect} from "react";

import {percent} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";
import {useSocket} from "use-socketio";

import ChatMessage from "components/tools/chat-message";
import Box from "components/commons/box";

const Chat = ({className}) => {
    const [messages, setMessages] = useState([]);
    useSocket("message", message =>
        setMessages([
            ...messages,
            {
                id: message.id,
                isSystem: message.system,
                message: message.content,
                timestamp: message.timestamp,
            },
        ]),
    );
    const list = useRef(null);

    const styles = usePwops({
        box: {
            flexColumn: ["space-between", "stretch"],
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
        <Box className={className} css={styles.box} title={"Chat"}>
            <div css={styles.holder}>
                <ul css={styles.messages} ref={list}>
                    {messages.map(message => (
                        <li key={message.id} css={styles.message}>
                            <ChatMessage {...message} />
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );
};

export default Chat;
