/* leny/zoondo
 *
 * /src/client/components/menu/tribe-selector.js - Components: TribeSelector
 *
 * coded by leny
 * started at 16/04/2020
 */

import React, {useState} from "react";
import PropTypes from "prop-types";

import {rem, px, percent, url} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {noop} from "utils";
import {BORDER_COLOR} from "core/constants";

import tribes from "data/tribes";

import Button from "components/commons/button";
import logo from "assets/logo.png";

const TribeSelectorMenu = ({name, onSelectTribe = noop}) => {
    const [tribe, setTribe] = useState("europa-boarix");
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
        content: {
            width: px(320),
            margin: [0, "auto", rem(2.5)],
            fontSize: rem(1.6),
            color: "white",
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
        select: {
            display: "block",
            width: percent(100),
            height: rem(3),
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

    // TODO: disposition

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>{"Zoondo"}</h1>

            <div css={styles.content}>
                <p>{`Hi ${name}!`}</p>
            </div>

            <form
                css={styles.form}
                action={"#"}
                onSubmit={() =>
                    onSelectTribe(tribe, tribes.get(tribe).disposition)
                }>
                <div css={styles.control}>
                    <label css={styles.label} htmlFor={"name"}>
                        {"Choose your tribe:"}
                    </label>

                    <select
                        css={styles.select}
                        id={"tribe"}
                        name={"tribe"}
                        value={tribe}
                        onChange={e => setTribe(e.target.value)}>
                        <option value={"europa-boarix"}>
                            {"(Europa) Boarix"}
                        </option>
                        <option value={"europa-monkus"}>
                            {"(Europa) Monkus"}
                        </option>
                        <option value={"europa-rhinogoths"}>
                            {"(Europa) Rhinogoths"}
                        </option>
                        <option value={"europa-warus"}>
                            {"(Europa) Warus"}
                        </option>
                    </select>
                </div>

                <div css={styles.actions}>
                    <Button type={"submit"}>{"Valider"}</Button>
                </div>
            </form>
        </div>
    );
};

TribeSelectorMenu.propTypes = {
    name: PropTypes.string.isRequired,
    onSelectTribe: PropTypes.func,
};

export default TribeSelectorMenu;
