/* leny/zoondo
 *
 * /src/data/tribes/europa-warus.js - Tribes data: Europa Warus
 *
 * coded by leny
 * started at 17/04/2020
 */

import berserkorseResolver from "./resolvers/warus/berserkorse";

export default {
    slug: "europa-warus",
    edition: "europa",
    name: "Warus",
    description:
        "Navigateurs barbares venus des régions polaires du globe, les Warus ont bâti leur civilisation sur un rêve impossible : de nature mystique et superstitiueuse, ils sont persuadés, à juste titre, d'avoir autrefois été capables d'évoluer en toute liberté dans le milieu aquatique. Dans leur étrange mythologie, ce pouvoir leur aurait été dérobé et caché par les dieux pour les mettre à l'épreuve. Aussi passent-ils le plus clair de leur temps à explorer les mers et les continents en quête de leur bonheur perdu. Ce sont des êtres belliqueux et irascibles qui n'hésitent pas à confisquer les terres et les habitations d'autrui. Nous pensons que ce peuple primitif et peu clairvoyant n'a aucune chance de se développer s'il conserve un tel état d'esprit. Nous espérons que l'un de leurs futurs voyages leur ouvre de nouvelles perspectives.",
    fighters: {
        "harold-de-jarl": {
            slug: "harold-de-jarl",
            name: "Harold de Jarl",
            type: "CHIEF",
            corners: [4, 3, 2, 2],
            value: 20,
            moves: [
                [[-1, 0]],
                [[-1, 1]],
                [[0, 1]],
                [[1, 1]],
                [[1, 0]],
                [[1, -1]],
                [[0, -1]],
                [[-1, -1]],
            ],
        },
        jorund: {
            slug: "jorund",
            name: "Jorund",
            type: "HERO",
            corners: [6, 6, 1, 1],
            value: 22,
            moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]],
        },
        mourse: {
            slug: "mourse",
            name: "Mourse",
            type: "MONSTER",
            variants: [{corners: [3, 4, 2, 1]}, {corners: [4, 3, 1, 2]}],
            value: 17,
            moves: [
                [[-1, 0]],
                [[-1, 1]],
                [
                    [0, 1],
                    [0, 2],
                ],
                [[1, 1]],
                [[1, 0]],
                [[0, -1]],
            ],
        },
        berserkorse: {
            slug: "berserkorse",
            name: "Berserkorse",
            type: "ELITE",
            variants: [{corners: [2, 3, 1, "*"]}, {corners: [3, 2, "*", 1]}],
            power: "Le Berserkorse élimine le Zoon ennemi.",
            resolver: berserkorseResolver,
            value: 10,
            moves: [[[-1, 0]], [[-1, 1]], [[0, 1]], [[1, 1]], [[1, 0]]],
        },
        korse: {
            slug: "korse",
            name: "Korse",
            type: "SOLDIER",
            variants: [{corners: [2, 1, 0, 1]}, {corners: [1, 2, 1, 0]}],
            value: 8,
            moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]],
        },
        draknar: {
            slug: "draknar",
            name: "Draknar",
            type: "EMBLEM",
            corners: [3, 2, 0, 1],
            value: 12,
            moves: [],
        },
    },
    trumps: {
        "hache-virevoltante": {
            slug: "hache-virevoltante",
            name: "Hache virevoltante",
            type: "SHOOTING",
            usableBy: ["SOLDIER"],
            usage: "UNLIMITED",
            corners: [3, 2, "X", 0],
            target: [[[0, 1, true]]],
            value: 1,
        },
        "fleche-petard": {
            slug: "fleche-petard",
            name: "Flèche pétard",
            type: "SHOOTING",
            usableBy: ["SOLDIER"],
            usage: "UNLIMITED",
            corners: [3, 4, 0, "X"],
            target: [[[0, 2, true]]],
            value: 2,
        },
        "conque-de-charge": {
            slug: "conque-de-charge",
            name: "Conque de charge",
            type: "TACTICAL",
            usage: "ONCE",
            text: "Déplace jusqu'à trois de tes Zoons, l'un après l'autre.",
            value: 3,
        },
    },
    composition: [
        "harold-de-jarl",
        "jorund",
        "mourse:0|0",
        "mourse:1|1",
        "berserkorse:0|0",
        "berserkorse:1|1",
        "berserkorse:1|2",
        "korse:0|0",
        "korse:0|1",
        "korse:1|2",
        "korse:1|3",
        "draknar",
    ],
    disposition: [
        [
            "berserkorse:1",
            "korse:0",
            "berserkorse:0",
            "jorund",
            "korse:0",
            "berserkorse:1",
        ],
        [
            "korse:1",
            "mourse:0",
            "harold-de-jarl",
            "draknar",
            "mourse:1",
            "korse:1",
        ],
    ],
};
