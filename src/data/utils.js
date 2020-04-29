/* leny/zoondo
 *
 * /src/data/utils.js - Data-scoped utils
 *
 * coded by leny
 * started at 12/04/2020
 */

import tribes from "data/tribes";

export const resolveTribe = tribe => tribes.get(tribe);

export const resolveCard = card => {
    const {tribe, type, originalType} = card;
    const [rawSlug] = card.slug.split("|");
    const [slug, variant] = rawSlug.split(":");

    const tribeData = tribes.get(tribe);

    const cardData = {
        ...tribeData[type !== "obstacles" ? type : originalType][slug],
        slug,
        tribe: tribeData.name,
    };

    if (Array.isArray(cardData.variants) && !isNaN(+variant)) {
        return {
            ...cardData,
            ...cardData.variants[+variant],
        };
    }

    return cardData;
};

export const resolveMoves = ({x, y}, moves = [], invert = false) =>
    moves.map(move =>
        move
            .map(([pX, pY, isJump, isAbsolute = false]) => [
                isAbsolute ? pX : invert ? x - pX : x + pX,
                isAbsolute ? pY : invert ? y - pY : y + pY,
                isJump,
            ])
            .filter(([pX, pY]) => 0 <= pX && pX <= 5 && 0 <= pY && pY <= 5),
    );

export const resolveType = type =>
    ({
        CHIEF: "Chef",
        HERO: "Héros",
        PRIEST: "Prêtre",
        MONSTER: "Monstre",
        ELITE: "Élite",
        SOLDIER: "Soldat",
        EMBLEM: "Emblème",
        OBSTACLE: "Obstacle",
        SHOOTING: "Atout de tir",
        PROTECTION: "Atout de protection",
        COMBAT: "Atout de combat",
        TACTICAL: "Atout tactique",
    }[type]);
