/* leny/zoondo
 *
 * /src/data/utils.js - Data-scoped utils
 *
 * coded by leny
 * started at 12/04/2020
 */

import tribes from "data/tribes";

export const resolveCard = card => {
    const {tribe, type} = card;
    const [slug, variant] = card.slug.split(":");

    const tribeData = tribes.get(tribe);

    const cardData = {
        ...tribeData[type][slug],
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
            .map(([pX, pY, ...position]) => [
                invert ? x - pX : x + pX,
                invert ? y - pY : y + pY,
                ...position,
            ])
            .filter(([pX, pY]) => 0 <= pX && pX <= 5 && 0 <= pY && pY <= 5),
    );
