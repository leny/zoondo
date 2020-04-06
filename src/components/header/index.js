/* leny/zoondo
 *
 * /src/components/header/index.js - Header Components: Header
 *
 * coded by leny
 * started at 06/04/2020
 */

import React from "react";
import PropTypes from "prop-types";
import {PlayerShape} from "types";

import {percent, rem} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {NBSP} from "core/constants";

const Header = ({player, opponent, round}) => {
    const styles = usePwops({
        container: {
            width: percent(100),
            margin: [0, "auto", rem(2)],
        },
        title: {
            fontSize: rem(1.2),
            textAlign: "center",
        },
        match: {
            margin: [rem(1), "auto"],
            fontSize: rem(2.4),
            textAlign: "center",
        },
        score: {
            fontSize: rem(1.6),
            textAlign: "center",
        },
    });

    return (
        <header css={styles.container}>
            <h1 css={styles.title}>{"Zoondo"}</h1>

            <h2 css={styles.match}>
                <strong>{player.name}</strong>
                {NBSP}
                <span>{"vs"}</span>
                {NBSP}
                <strong>{opponent.name}</strong>
            </h2>

            <div css={styles.score}>
                <span>{`Manche : ${round}`}</span>
                {NBSP}
                {"-"}
                {NBSP}
                <span>{`Score : ${player.score} / ${opponent.score}`}</span>
            </div>
        </header>
    );
};

Header.propTypes = {
    round: PropTypes.number.isRequired,
    player: PlayerShape.isRequired,
    opponent: PlayerShape.isRequired,
};

export default Header;
