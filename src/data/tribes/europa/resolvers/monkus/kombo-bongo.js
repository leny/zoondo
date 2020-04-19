/* leny/zoondo
 *
 * /src/data/tribes/europa/resolvers/monkus/kombo-bongo.js - Tribes data: Monkus' Kombo Bongo power resolver
 *
 * coded by leny
 * started at 18/04/2020
 */

import {ACTIONS} from "data/constants";
import {resolveCard} from "data/utils";

// Le combat se solde par une égalité.
// Kombo Bongo et King ou Kong (au choix) échangent leur position sur le champ de bataille.
// Si King et Kong ne sont plus sur le champ de bataille, Kombo Bongo conserve sa position.

export default (game, {source, target}, next) => {
    const choices = game.board.filter(
        ({player, card: {slug}}) =>
            player === source.player && ["king", "kong"].includes(slug),
    );

    if (!choices.length) {
        game._sendMessage(
            `**King** _et_ **Kong** ne sont plus présents sur le champ de bataille. Kombo Bongo conserve sa position.`,
        );
        next();
        return;
    }

    if (choices.length === 1) {
        const card = choices[0];

        game._swapCardsOnBoard(source, card);
        game._sendMessageToPlayer(
            source.player,
            `Seul **${
                resolveCard(card.card).name
            }** est encore présent sur le champ de bataille. Il échange sa position avec **Kombo Bongo**.`,
        );
        game._sendMessageToPlayer(
            target.player,
            `**Kombo Bongo** (en _${[source.x, source.y].join(
                ",",
            )}_) a échangé sa position avec **King** ou **Kong** (en _${[
                card.x,
                card.y,
            ].join(",")}_).`,
        );
        next();
        return;
    }

    game.stack.unshift({
        type: ACTIONS.SELECT_CARD,
        options: {
            player: source.player,
            source,
            choices,
            text: "Veuillez choisir **King** ou **Kong**.",
        },
        next: choice => {
            if (!choices.find(({x, y}) => choice.x === x && choice.y === y)) {
                throw new Error("WTF"); // cheating?
                // TODO: handle this
            }

            const card = game._getCardAtPosition(choice);

            game._swapCardsOnBoard(source, card);
            game._sendMessageToPlayer(
                source.player,
                `Vous avez choisi **${
                    resolveCard(card.card).name
                }**. Il échange sa position avec **Kombo Bongo**.`,
            );
            game._sendMessageToPlayer(
                target.player,
                `**Kombo Bongo** (en _${[source.x, source.y].join(
                    ",",
                )}_) a échangé sa position avec **King** ou **Kong** (en _${[
                    card.x,
                    card.y,
                ].join(",")}_).`,
            );
            next();
        },
    });
    next();
};
