/* leny/zoondo
 *
 * /src/data/tribes/europa-rhinogoths.js - Tribes data: Europa Rhinogoths
 *
 * coded by leny
 * started at 17/04/2020
 */

import ouistitiResolver from "./resolvers/rhinogoths/ouistiti";
import triceRatopsResolver from "./resolvers/rhinogoths/trice-ratops";
import bigothResolver from "./resolvers/rhinogoths/bigoth";
import furieResolver from "./resolvers/rhinogoths/furie";
import binomeDeChocResolver from "./resolvers/rhinogoths/binome-de-choc";
import poudreDEscampetteResolver from "./resolvers/rhinogoths/poudre-descampette";

export default {
    slug: "europa-rhinogoths",
    edition: "europa",
    name: "Rhinogoths",
    description:
        "Cette tribu humanoïde pachydermique a développé une forme de culture de type médiévale. Sédentaires par tradition, ils sont devenus nomades par nécessité : leur nature boulimique les conduit à mener une quête sans fin de racines et de feuillages. Les besoins alimentaires engendrés par leur forte corpulence et la raréfaction des ressources dans leur région d'origine soint à l'origine du relatif développement de leur civilisation. Contraints de traverser les vastes landes des terres centrales, ils ont développé l'élevage des animaux de trait et construit des moyens de transport adaptés à leur errance. Bien que peu belliqueux, les Rhinogoths sont redoutés par les tribus vivant sur les terres qu'ils visitent. Nous souhaitons que cette tribu débonnaire puisse un jour trouver un moyen durable de calmer son interminable fringale.",
    fighters: {
        "goolgoth-1": {
            slug: "goolgoth-1",
            name: "Goolgoth I",
            type: "CHIEF",
            corners: [5, 4, 2, 3],
            value: 24,
            moves: [
                [[-1, 1]],
                [
                    [0, 1],
                    [0, 2],
                ],
                [[1, 1]],
                [[1, -1]],
                [[-1, -1]],
            ],
        },
        "oto-von-rhino": {
            slug: "oto-von-rhino",
            name: "Oto von Rhino",
            type: "HERO",
            corners: [5, 3, 0, 3],
            value: 16,
            moves: [
                [
                    [0, 1],
                    [0, 2],
                ],
                [[1, -1]],
                [[-1, -1]],
            ],
        },
        bigoth: {
            slug: "bigoth",
            name: "Bigoth",
            type: "PRIEST",
            corners: [2, 6, "*", 0],
            power:
                "Le combat se solde par une égalité. Tu recules un de tes Zoons sur une case libre adjacente de la rangée située derrière lui.",
            resolver: bigothResolver,
            value: 15,
            moves: [
                [
                    [-1, 1],
                    [-2, 2],
                ],
                [
                    [1, 1],
                    [2, 2],
                ],
                [[1, -1]],
                [[0, -1]],
                [[-1, -1]],
            ],
        },
        trice: {
            slug: "trice",
            name: "Trice",
            type: "MONSTER",
            corners: [8, 4, 0, "*"],
            power:
                "Le combat se solde par une égalité. Ton adversaire recule son Zoon sur l'une des trois cases adjacentes de la rangée située derrière lui. Toutefois, si aucune case n'est libre ou si ce mouvement fait sortir le Zoon du champ de bataille, il conserve sa position.",
            resolver: triceRatopsResolver,
            value: 15,
            moves: [[[-1, 1]], [[0, 1]], [[1, 1]]],
        },
        ratops: {
            slug: "ratops",
            name: "Ratops",
            type: "MONSTER",
            corners: [4, 8, "*", 0],
            power:
                "Le combat se solde par une égalité. Ton adversaire recule son Zoon sur l'une des trois cases adjacentes de la rangée située derrière lui. Toutefois, si aucune case n'est libre ou si ce mouvement fait sortir le Zoon du champ de bataille, il conserve sa position.",
            resolver: triceRatopsResolver,
            value: 15,
            moves: [[[-1, 1]], [[0, 1]], [[1, 1]]],
        },
        rhinogore: {
            slug: "rhinogore",
            name: "Rhinogore",
            type: "ELITE",
            variants: [{corners: [5, 4, 1, 2]}, {corners: [4, 5, 2, 1]}],
            value: 20,
            moves: [
                [[-1, 0]],
                [[-1, 1]],
                [[0, 1]],
                [[1, 1]],
                [[1, 0]],
                [[0, -1]],
            ],
        },
        rhino: {
            slug: "rhino",
            name: "Rhino",
            type: "SOLDIER",
            variants: [{corners: [3, 2, 0, 1]}, {corners: [2, 3, 1, 0]}],
            value: 8,
            moves: [[[-1, 0]], [[0, 1]], [[1, 0]]],
        },
        ouistiti: {
            slug: "ouistiti",
            name: "Ouistiti",
            type: "EMBLEM",
            corners: [0, 0, 0, "*"],
            power:
                "Le combat se solde par une égalité. Déplace ton Ouistiti sur une case adjacente libre de ton choix. Si aucune case n'est libre, ton Ouistiti conserve sa position.",
            resolver: ouistitiResolver,
            value: 0,
            moves: [],
        },
    },
    trumps: {
        furie: {
            slug: "furie",
            name: "Furie",
            type: "COMBAT",
            usage: "ONCE",
            text: "Déplace un de tes Soldats. Il double son score de touche.",
            value: 1,
            resolver: furieResolver,
        },
        "binome-de-choc": {
            slug: "binome-de-choc",
            name: "Binôme de choc",
            type: "TACTICAL",
            usage: "ONCE",
            text:
                "Déplace jusqu'à deux de tes Élites ou Monstres, l'un après l'autre.",
            value: 2,
            resolver: binomeDeChocResolver,
        },
        "poudre-descampette": {
            slug: "poudre-descampette",
            name: "Poudre d'escampette",
            type: "TACTICAL",
            usage: "ONCE",
            text:
                "Recule jusqu'à trois de tes Zoons, chacun sur une case adjacente libre de la rangée située derrière lui.",
            value: 3,
            resolver: poudreDEscampetteResolver,
        },
    },
    composition: {
        fighters: [
            "goolgoth-1",
            "oto-von-rhino",
            "trice",
            "ratops",
            "rhinogore:0|0",
            "rhinogore:1|1",
            "rhino:0|0",
            "rhino:0|1",
            "rhino:0|2",
            "rhino:1|3",
            "rhino:1|4",
            "ouistiti",
        ],
        trumps: ["furie", "binome-de-choc", "poudre-descampette"],
    },
    disposition: [
        [
            "rhino:0",
            "ratops",
            "goolgoth-1",
            "oto-von-rhino",
            "trice",
            "rhino:1",
        ],
        [
            "rhino:1",
            "rhinogore:0",
            "ouistiti",
            "rhino:0",
            "rhinogore:1",
            "rhino:0",
        ],
    ],
};
