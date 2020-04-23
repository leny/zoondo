/* leny/zoondo
 *
 * /src/client/components/menu/tribe-disposition.js - Components: TribeDisposition
 *
 * coded by leny
 * started at 23/04/2020
 */

import React, {useCallback, useMemo, useState} from "react";
import PropTypes from "prop-types";

import {rem, px, percent, url, translate} from "@pwops/core";
import {usePwops} from "@pwops/react-hooks";

import {BOARD_COL_SIZE} from "data/constants";
import {noop, preventDefault} from "utils";
import {tribes} from "data/tribes";

import Grid from "components/board/grid";
import Button from "components/commons/button";
import DispositionZoon from "components/disposition/zoon";
import CardInfos from "components/tools/card-infos";

import logo from "assets/logo.png";

const TribeDispositionMenu = ({
    name,
    tribeSlug,
    onSelectDisposition = noop,
}) => {
    const styles = usePwops({
        container: {
            width: px(1200),
            minHeight: percent(100),
            margin: [rem(3), "auto", 0],
            flexColumn: ["flex-start", "center"],
        },
        title: {
            size: [px(600 / 4), px(432 / 4)],
            margin: [0, "auto", rem(2.5)],
            textIndent: px(-9999),
            background: ["transparent", url(logo), "center", "no-repeat"],
            backgroundSize: "cover",
        },
        explain: {
            margin: [0, "auto", rem(1.6)],
            fontSize: rem(1.6),
        },
        board: {
            margin: [0, "auto", rem(2.4)],
        },
        holder: {
            width: px(960),
            flexRow: ["space-between", "flex-start"],
        },
        zoons: {
            width: percent(54),
            flexRow: ["flex-start", "flex-start"],
            flexWrap: "wrap",
        },
        zoon: {
            margin: [0, rem(0.25), rem(0.5)],
        },
        infos: {
            width: percent(44),
            marginRight: percent(2),
        },
        tools: {
            flexRow: ["space-around", "center"],
            margin: [0, "auto", rem(2)],
        },
        zoonOnBoard: {
            transform: translate(px(-1), px(-1)),
        },
    });
    const tribe = useMemo(() => tribes.get(tribeSlug), [tribeSlug]);
    const [activeCard, setActiveCard] = useState(null);
    const [disposition, setDisposition] = useState([]);
    const handleCellDrop = useCallback(
        (event, {x, y}) => {
            let data;

            try {
                data = JSON.parse(event.dataTransfer.getData("text/plain"));
            } catch {
                data = [];
            }

            const [slug, fromGrid] = data;

            if (fromGrid) {
                const index = disposition.findIndex(cell => cell.slug === slug);

                if (index > -1) {
                    disposition.splice(index, 1);
                }
            }

            const index = disposition.findIndex(
                position => position.x === x && position.y === y,
            );

            if (index > -1) {
                disposition.splice(index, 1);
            }

            setDisposition([...disposition, {x, y, slug}]);
        },
        [disposition, setDisposition],
    );
    const handleDragStart = useCallback(
        (slug, fromGrid = false) => event => {
            event.dataTransfer.dropEffect = "copy";
            event.dataTransfer.setData(
                "text/plain",
                JSON.stringify([slug, fromGrid]),
            );
        },
        [],
    );
    const handleRandomDisposition = useCallback(
        preventDefault(() => {
            const roster = Array.from(tribe.composition).sort(
                () => Math.random() - 0.5,
            );
            const d = [];

            [0, 1].forEach(y =>
                [0, 1, 2, 3, 4, 5].forEach(x =>
                    d.push({x, y, slug: roster.pop()}),
                ),
            );
            setDisposition(d);
        }),
        [setDisposition],
    );
    const handleSelectDisposition = useCallback(
        preventDefault(() => {
            const d = [[], []];

            [0, 1].forEach(y =>
                [0, 1, 2, 3, 4, 5].forEach(x => {
                    d[y][x] = disposition.find(
                        pos => pos.x === x && pos.y === y,
                    ).slug;
                }),
            );

            onSelectDisposition(d);
        }),
        [disposition],
    );

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>{"Zoondo"}</h1>

            <div css={styles.explain}>
                <p>
                    {`${name}, il est temps de placer les membres de votre tribu sur le plateau de jeu.`}
                    <br />
                    {"Les Zoons surnuméraires deviendront des renforts"}
                </p>
            </div>

            <Grid
                css={styles.board}
                rowSize={2}
                colSize={BOARD_COL_SIZE}
                cards={disposition.map(({x, y, slug}) => ({
                    x,
                    y,
                    card: (
                        <DispositionZoon
                            css={styles.zoonOnBoard}
                            key={`${x}-${y}-${tribeSlug}-${slug}`}
                            tribe={tribeSlug}
                            slug={slug}
                            onClick={setActiveCard}
                            onDragStart={handleDragStart(slug, {x, y})}
                        />
                    ),
                }))}
                onCellDrop={handleCellDrop}
            />

            <div css={styles.holder}>
                <div css={styles.zoons}>
                    {tribe.composition
                        .filter(s => !disposition.find(({slug}) => s === slug))
                        .map(slug => (
                            <DispositionZoon
                                css={styles.zoon}
                                key={`${tribeSlug}-${slug}`}
                                tribe={tribeSlug}
                                slug={slug}
                                onClick={setActiveCard}
                                onDragStart={handleDragStart(slug)}
                            />
                        ))}
                </div>
                <div css={styles.infos}>
                    <div css={styles.tools}>
                        <Button
                            disabled={disposition.length === 0}
                            onClick={preventDefault(() => setDisposition([]))}>
                            {"Vider la grille"}
                        </Button>
                        <Button onClick={handleRandomDisposition}>
                            {"Au hasard"}
                        </Button>
                        <Button
                            disabled={disposition.length !== 12}
                            onClick={handleSelectDisposition}>
                            {"Valider ma disposition"}
                        </Button>
                    </div>
                    <CardInfos card={activeCard} />
                </div>
            </div>
        </div>
    );
};

TribeDispositionMenu.propTypes = {
    name: PropTypes.string.isRequired,
    tribeSlug: PropTypes.string.isRequired,
    onSelectDisposition: PropTypes.func,
};

export default TribeDispositionMenu;
