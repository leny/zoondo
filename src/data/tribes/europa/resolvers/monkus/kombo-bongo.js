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
    const resolvePower = (choice, message) => {
        game._updateCardOnBoard(choice, {x: source.x, y: source.y});
        game._updateCardOnBoard(source, {x: choice.x, y: choice.y});
        game._sendMessageToPlayer(source.player, message);
        game._sendMessageToPlayer(
            target.player,
            `**Kombo Bongo** (en _${[source.x, source.y].join(
                ",",
            )}_) a échangé sa position avec **King** ou **Kong** (en _${[
                choice.x,
                choice.y,
            ].join(",")}_).`,
        );
        next();
    };

    if (!choices.length) {
        game._sendMessage(
            `**King** _et_ **Kong** ne sont plus présents sur le champ de bataille. Kombo Bongo conserve sa position.`,
        );
        next();
        return;
    }

    if (choices.length === 1) {
        const card = resolveCard(choices[0]);

        resolvePower(
            choices[0],
            `Seul **${card.name}** est encore présent sur le champ de bataille. Il échange sa position avec **Kombo Bongo**.`,
        );
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
            const cardChoice = game._getCardAtPosition(choice);
            const card = resolveCard(cardChoice);

            resolvePower(
                card,
                `Vous avez choisi **${card.name}**. Il échange sa position avec **Kombo Bongo**.`,
            );
        },
    });
    next();
};
