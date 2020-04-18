/* leny/zoondo
 *
 * /src/client/components/menu/home.js - Components: Menu Home
 *
 * coded by leny
 * started at 16/04/2020
 */

import React, {useState} from "react";
import PropTypes from "prop-types";

import {rem, px, percent, url} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {noop, preventDefault} from "utils";
import {BORDER_COLOR} from "core/constants";

import Button from "components/commons/button";
import logo from "assets/logo.png";

const HomeMenu = ({onSelectName = noop}) => {
    const [name, setName] = useState("");
    const styles = usePwops({
        container: {
            width: px(1200),
            minHeight: percent(100),
            margin: [rem(5), "auto", 0],
            flexColumn: ["flex-start", "center"],
        },
        title: {
            size: [px(600), px(432)],
            margin: [0, "auto", rem(5)],
            textIndent: px(-9999),
            background: ["transparent", url(logo), "center", "no-repeat"],
        },
        form: {
            width: px(320),
        },
        control: {
            margin: [0, "auto", rem(2.5)],
        },
        label: {
            display: "block",
            margin: [0, "auto", rem(1)],
            fontSize: rem(1.6),
        },
        input: {
            display: "block",
            width: percent(100),
            background: "transparent",
            border: [px(1), "solid", BORDER_COLOR],
            borderRadius: px(3),
            padding: [rem(0.5), rem(1)],
            fontSize: rem(1.4),
            color: "white",
        },
        actions: {
            textAlign: "center",
        },
    });

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>{"Zoondo"}</h1>

            <form
                css={styles.form}
                action={"#"}
                onSubmit={preventDefault(
                    () => name.trim() && onSelectName(name),
                )}>
                <div css={styles.control}>
                    <label css={styles.label} htmlFor={"name"}>
                        {"Choose your nickname:"}
                    </label>
                    <input
                        css={styles.input}
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        value={name}
                        placeholder={"Aa"}
                        autoFocus
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div css={styles.actions}>
                    <Button type={"submit"}>{"Valider"}</Button>
                </div>
            </form>
        </div>
    );
};

HomeMenu.propTypes = {
    onSelectName: PropTypes.func,
};

export default HomeMenu;
