/* leny/zoondo
 *
 * /src/data/tribes/europa-monkus.js - Tribes data: Europa Monkus
 *
 * coded by leny
 * started at 17/04/2020
 */

import kingLouisResolver from "./resolvers/monkus/king-louis";
import komboBongoResolver from "./resolvers/monkus/kombo-bongo";
import tortueResolver from "./resolvers/monkus/tortue";
import cocoBoumResolver from "./resolvers/monkus/coco-boum";
import grosseBerthaResolver from "./resolvers/monkus/grosse-bertha";

export default {
    slug: "europa-monkus",
    edition: "europa",
    name: "Monkus",
    description:
        "Ces tribus ont largement exploité les vestiges archéologiques fourmillant sur leur territoire. Leurs membres ont développé des traditions fortement inspirées par l'antiquité. Les Monkus forment un peuple expansionniste. Leur découverte précoce d'un langage primitif et d'un alphabet rudimentaire a rapidement permis à ses élites intellextuelles de saisir certaines applications des objets retrouvés sur leurs sites archéologiques. Hélas, leur soif de connaissance va à l'encontre de leur tendance naturelle à la plaisanterie lourde et au jeu. Le manque de rigueur entraîné par leur humour bête et méchant fait échouer quasi systématiquement leurs tentatives de conquêtes. De plus, leurs incessantes blagues sont souvent vécues comme des provocations par les autres tribus qui leur vouent une haîne sans limite.",
    fighters: {
        "king-louis": {
            slug: "king-louis",
            name: "King Louis",
            type: "CHIEF",
            corners: [5, 5, 2, "*"],
            power:
                "Le combat se solde par une égalité. King Louis et le Zoon ennemi échangent leur position sur le champ de bataille.",
            resolver: kingLouisResolver,
            value: 22,
            moves: [
                [[-1, 0]],
                [
                    [-1, 1],
                    [-2, 2],
                ],
                [[0, 1]],
                [
                    [1, 1],
                    [2, 2],
                ],
                [[1, 0]],
                [[0, -1]],
            ],
        },
        titus: {
            slug: "titus",
            name: "Titus",
            type: "HERO",
            corners: [4, 4, 2, 1],
            value: 21,
            moves: [
                [[-1, 0]],
                [[-2, 1, true]],
                [
                    [0, 1],
                    [0, 2],
                ],
                [[1, 0]],
                [[2, 1, true]],
            ],
        },
        "kombo-bongo": {
            slug: "kombo-bongo",
            name: "Kombo Bongo",
            type: "PRIEST",
            corners: [3, 1, "*", "*"],
            power:
                "Le combat se solde par une égalité. Kombo Bongo et King ou Kong (au choix) échangent leur position sur le champ de bataille. Si King et Kong ne sont plus sur le champ de bataille, Kombo Bongo conserve sa position.",
            resolver: komboBongoResolver,
            value: 10,
            moves: [
                [[-1, 0]],
                [[-1, 1]],
                [[1, 1]],
                [[1, 0]],
                [[1, -1]],
                [[-1, -1]],
            ],
        },
        king: {
            slug: "king",
            name: "King",
            type: "MONSTER",
            corners: [6, 3, 0, 2],
            value: 15,
            moves: [[[-1, 1]], [[0, 2, true]], [[1, 1]]],
        },
        kong: {
            slug: "kong",
            name: "Kong",
            type: "MONSTER",
            corners: [3, 6, 2, 0],
            value: 15,
            moves: [[[-1, 1]], [[0, 2, true]], [[1, 1]]],
        },
        "coco-bang": {
            slug: "coco-bang",
            name: "Coco Bang",
            type: "ELITE",
            variants: [{corners: [3, 2, 1, 2]}, {corners: [2, 3, 2, 1]}],
            value: 12,
            moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]],
        },
        bouga: {
            slug: "bouga",
            name: "Bouga",
            type: "SOLDIER",
            variants: [{corners: [2, 1, 0, 1]}, {corners: [1, 2, 1, 0]}],
            value: 9,
            moves: [
                [[-1, 0]],
                [
                    [0, 1],
                    [0, 2],
                ],
                [[1, 0]],
                [[0, -1]],
            ],
        },
        virzil: {
            slug: "virzil",
            name: "Virzil",
            type: "SOLDIER",
            corners: [3, 3, 0, 0],
            value: 9,
            moves: [[[-1, 1]], [[0, 2, true]], [[1, 1]]],
        },
        "queen-mary": {
            slug: "queen-mary",
            name: "Queen Mary",
            type: "EMBLEM",
            corners: [2, 2, 0, 0],
            value: 16,
            moves: [
                [
                    [-1, 0],
                    [-2, 0],
                ],
                [
                    [1, 0],
                    [2, 0],
                ],
            ],
        },
    },
    trumps: {
        tortue: {
            slug: "tortue",
            name: "Tortue",
            type: "TACTICAL",
            usage: "ONCE",
            text:
                "Déplace jusqu'à deux de tes Soldats, l'un après l'autre. Ils ajoutent un point à leurs scores de touche.",
            value: 1,
            resolver: tortueResolver,
        },
        "coco-boum": {
            slug: "coco-boum",
            name: "Coco Boum",
            type: "SHOOTING",
            usableBy: ["ELITE"],
            usage: "UNLIMITED",
            corners: [3, 2, "X", 0],
            target: [[[-1, 1, true]], [[1, 1, true]]],
            value: 2,
            resolver: cocoBoumResolver,
        },
        "grosse-bertha": {
            slug: "grosse-bertha",
            name: "Grosse Bertha",
            type: "SHOOTING",
            usage: "UNLIMITED",
            corners: [2, 4, 0, "X"],
            text: "Vise un Zoon ennemi situé dans ton camp.",
            value: 3,
            resolver: grosseBerthaResolver,
        },
    },
    composition: {
        fighters: [
            "king-louis",
            "kombo-bongo",
            "king",
            "kong",
            "coco-bang:0|0",
            "coco-bang:0|1",
            "coco-bang:1|2",
            "bouga:0|0",
            "bouga:0|1",
            "bouga:1|2",
            "bouga:1|3",
            "queen-mary",
        ],
        trumps: ["tortue", "coco-boum", "grosse-bertha"],
    },
    disposition: [
        [
            "coco-bang:0",
            "bouga:0",
            "kombo-bongo",
            "bouga:1",
            "coco-bang:0",
            "coco-bang:1",
        ],
        ["bouga:1", "kong", "queen-mary", "king-louis", "king", "bouga:0"],
    ],
};
