/* leny/zoondo
 *
 * /src/client/components/tools/chat-message.js - ChatMessage
 *
 * coded by leny
 * started at 10/04/2020
 */

/* eslint-disable react/no-danger */

import React from "react";
import PropTypes from "prop-types";

import {NBSP} from "core/constants";

import marked from "marked";
import dayjs from "dayjs";
import {rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

const getAuthorColor = (isSystem, isSelf) => {
    if (isSystem) {
        return "#c30";
    }
    return isSelf ? "cyan" : "orange";
};

const ChatMessage = ({
    className,
    author,
    timestamp,
    message,
    isSelf,
    isSystem,
}) => {
    const styles = usePwops({
        container: {
            flexRow: ["space-between", "flex-start"],
            marginBottom: rem(0.5),
            fontSize: rem(1.4),
        },
        infos: {
            flex: "none",
            marginRight: rem(1),
        },
        author: {
            fontWeight: "bold",
            color: getAuthorColor(isSystem, isSelf),
        },
        date: {
            color: "silver",
        },
        content: {flex: [1, 0, 0]},
        message: {
            "em, i": {fontStyle: "italic"},
            "strong, b": {fontWeight: "bold"},
            a: {
                color: "cyan",
                textDecoration: "none",
                "&:hover": {textDecoration: "underline"},
            },
        },
    });

    return (
        <div css={styles.container} className={className}>
            <div css={styles.infos}>
                <time css={styles.date} dateTime={dayjs(timestamp).format()}>
                    {dayjs(timestamp).format("HH:mm")}
                </time>
                {NBSP}
                <strong css={styles.author}>{isSystem ? "Jeu" : author}</strong>
                {":"}
            </div>
            <div css={styles.content}>
                <div
                    css={styles.message}
                    dangerouslySetInnerHTML={{__html: marked(message)}}
                />
            </div>
        </div>
    );
};

ChatMessage.propTypes = {
    author: PropTypes.string,
    timestamp: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    isSelf: PropTypes.bool,
    isSystem: PropTypes.bool,
};

export default ChatMessage;
