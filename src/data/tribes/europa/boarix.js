/* leny/zoondo
 *
 * /src/data/tribes/europa-boarix.js - Tribes data: Europa Boarix
 *
 * coded by leny
 * started at 17/04/2020
 */

import cloboulonResolver from "./resolvers/boarix/cloboulon";
import goldHureResolver from "./resolvers/boarix/gold-hure";
import bouclefeuilleResolver from "./resolvers/boarix/bouclefeuille";

export default {
    slug: "europa-boarix",
    edition: "europa",
    name: "Boarix",
    description:
        "Cette tribu porcine à la culture primitive s'est développée dans les sombres forêts des terres basses, près des côtes du grand océan. L'habitat traditionnel des Boarix tient plus de la bauge des sangliers de l'ère prénucléaire que de la hutte rudimentaire d'usage courant chez les peuplades forestières. Partageant leur temps entre les rites shamaniques et les bains de boue, les membres de cette tribu figurent parmi les combattants les plus craints du vieux continent. Leur mauvaise humeur légendaire les rend réfractaures à toute forme d'autorité et les entraîne dans d'interminables conflits avec leur voisinage. Bien qu'elle se soit toujours montrée peu encline à l'expansionnisme, nous émetons des doutes quant à la pérénnité à long terme de cette tribu, compte tenu de son caractère guerrier et irrascible.",
    fighters: {
        cloboulon: {
            slug: "cloboulon",
            name: "Cloboulon",
            type: "CHIEF",
            corners: [4, 5, "*", 2],
            power:
                "Le combat se solde par une égalité. Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.",
            resolver: cloboulonResolver,
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
        "gold-hure": {
            slug: "gold-hure",
            name: "Gold-Hure",
            type: "HERO",
            corners: [4, 4, 2, "*"],
            power:
                "Le combat se solde par une égalité. Si tu viens de déplacer Gold-Hure, tu le déplaces à nouveau.",
            resolver: goldHureResolver,
            value: 24,
            moves: [
                [[-1, 0]],
                [
                    [-1, 1],
                    [-2, 2],
                ],
                [
                    [0, 1],
                    [0, 2],
                ],
                [
                    [1, 1],
                    [2, 2],
                ],
                [[1, 0]],
                [[1, -1]],
                [
                    [0, -1],
                    [0, -2],
                ],
                [[-1, -1]],
            ],
        },
        bouclefeuille: {
            slug: "bouclefeuille",
            name: "Bouclefeuille",
            type: "PRIEST",
            corners: [2, 0, 0, "*"],
            resolver: bouclefeuilleResolver,
            power:
                "Le combat se solde par une égalité. Tu déplaces Bouclefeuille dans une case libre du champ de bataille.",
            value: 2,
            moves: [[[-1, 0]], [[1, 0]]],
        },
        grognard: {
            slug: "grognard",
            name: "Grognard",
            type: "ELITE",
            variants: [{corners: [3, 4, 2, 1]}, {corners: [4, 3, 1, 2]}],
            value: 16,
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
            ],
        },
        kassin: {
            slug: "kassin",
            name: "Kassin",
            type: "SOLDIER",
            variants: [{corners: [1, 2, 0, 0]}, {corners: [2, 1, 0, 0]}],
            value: 7,
            moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]],
        },
        sacrechene: {
            slug: "sacrechene",
            name: "Sacrechêne",
            type: "EMBLEM",
            corners: [4, 2, 0, 0],
            value: 12,
            moves: [],
        },
    },
    trumps: {
        "pluie-de-menhirs": {
            slug: "pluie-de-menhirs",
            name: "Pluie de menhirs",
            type: "SHOOTING",
            usage: "ONCE",
            corners: [6, 4, 0, 2],
            text: "Vise un Zoon ennemi situé dans ton camp.",
            value: 1,
        },
        "mur-darbres": {
            slug: "mur-darbres",
            name: "Mur d'arbres",
            type: "PROTECTION",
            usage: "ONCE",
            text:
                "Place le Mur d'Arbres sur une case libre du champ de bataille. Cette case devient un Obstacle jusqu'à la fin de la partie.",
            value: 2,
        },
        "cage-de-racines": {
            slug: "cage-de-racines",
            name: "Cage de racines",
            type: "PROTECTION",
            usableBy: ["PRIEST"],
            usage: "ONCE",
            text:
                "Place la Cage de racines sur un Zoon ennemi situé dans ta zone de déploiement. Il devient un Obstacle sans déplacement jusqu'à la fin de la partie.",
            value: 3,
        },
    },
    composition: [
        "cloboulon",
        "gold-hure",
        "bouclefeuille",
        "grognard:0",
        "grognard:0",
        "grognard:1",
        "grognard:1",
        "kassin:0",
        "kassin:0",
        "kassin:1",
        "kassin:1",
    ],
    disposition: [
        [
            "gold-hure",
            "grognard:0",
            "kassin:0",
            "kassin:1",
            "grognard:1",
            "cloboulon",
        ],
        [
            "sacrechene",
            "grognard:1",
            "bouclefeuille",
            "grognard:0",
            "kassin:1",
            "kassin:0",
        ],
    ],
};
