/* leny/zoondo
 *
 * /src/client/components/tools/card-moves.js - CardMoves
 *
 * coded by leny
 * started at 07/04/2020
 */

/* eslint-disable arrow-body-style */

import React, {useCallback, useMemo, useEffect, useRef} from "react";
import PropTypes from "prop-types";

import {Moves} from "types";

const CELL_SIZE = 12;
const CELL_GAP = 2;
const GRID_SIZE = 5;
const OFFSET = 5;

const CardMoves = ({
    className,
    moves,
    isShooting = false,
    cellSize = CELL_SIZE,
    cellGap = CELL_GAP,
    gridSize = GRID_SIZE,
}) => {
    const size = useMemo(
        () => gridSize * cellSize + (cellGap * gridSize - 1) + OFFSET * 2,
        [],
    );
    const getPositionFromCoordinates = useCallback(
        (x, y) => [
            x * cellSize + x * cellGap + 0.5 + OFFSET,
            y * cellSize + y * cellGap + 0.5 + OFFSET,
        ],
        [cellSize, cellGap],
    );
    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");

        // clean previous grid
        ctx.clearRect(0, 0, size, size);

        // draw grid
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1;
        Array.from(new Array(gridSize).keys()).forEach(i => {
            Array.from(new Array(gridSize).keys()).forEach(j => {
                const [x, y] = getPositionFromCoordinates(i, j);

                ctx.strokeRect(x, y, cellSize, cellSize);
            });
        });

        // draw moves (cells)
        moves.forEach(move => {
            move.forEach(([x, y, direct = false]) => {
                const [mx, my] = getPositionFromCoordinates(2 + x, 2 - y);
                if (isShooting) {
                    const textSize = 24;
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 2;
                    ctx.font = `${textSize}px Arial`;
                    ctx.textBaseline = "middle";
                    const gradient = ctx.createRadialGradient(0, 0, 0, 2, 2, 2);
                    gradient.addColorStop(0, "yellow");
                    gradient.addColorStop(1, "orange");
                    ctx.fillStyle = gradient;
                    const textCoords = [
                        mx - CELL_SIZE / 4,
                        my + CELL_SIZE / 1.5,
                    ];
                    ctx.strokeText("✹", ...textCoords);
                    ctx.fillText("✹", ...textCoords);
                } else {
                    ctx.fillStyle = direct ? "forestgreen" : "yellow";
                    ctx.fillRect(mx, my, cellSize, cellSize);
                    ctx.fillStyle = "black";
                    ctx.beginPath();
                    ctx.ellipse(
                        mx + cellSize / 2,
                        my + cellSize / 2,
                        cellSize / 3.1,
                        cellSize / 3.1,
                        0,
                        0,
                        2 * Math.PI,
                    );
                    ctx.fill();
                    ctx.closePath();
                }
            });
        });

        // draw moves (paths)
        moves.forEach(move => {
            move.forEach(([x, y, direct = false], i, arr) => {
                const [mx, my] = getPositionFromCoordinates(2 + x, 2 - y);
                if (!direct) {
                    const [fx, fy] = getPositionFromCoordinates(
                        ...(i === 0 ? [0, 0] : arr[i - 1]).map((a, j) => {
                            return j ? 2 - a : 2 + a;
                        }),
                    );
                    ctx.strokeStyle = isShooting ? "white" : "black";
                    ctx.lineWidth = 3;
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(fx + cellSize / 2, fy + cellSize / 2);
                    ctx.lineTo(mx + cellSize / 2, my + cellSize / 2);
                    ctx.stroke();
                    ctx.closePath();
                }
            });
        });

        // draw center cell
        const [cx, cy] = getPositionFromCoordinates(2, 2);
        ctx.fillStyle = "mediumaquamarine";
        ctx.fillRect(cx, cy, cellSize, cellSize);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "deeppink";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(
            cx + cellSize / 2,
            cy + cellSize / 2,
            cellSize / 3,
            cellSize / 3,
            0,
            0,
            2 * Math.PI,
        );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }, [moves, cellSize, cellGap, gridSize]);

    return (
        <canvas
            className={className}
            id={"grid"}
            ref={canvas}
            width={size}
            height={size}
        />
    );
};

CardMoves.propTypes = {
    moves: Moves.isRequired,
    isShooting: PropTypes.bool,
    cellSize: PropTypes.number,
    cellGap: PropTypes.number,
    gridSize: PropTypes.number,
};

export default CardMoves;
