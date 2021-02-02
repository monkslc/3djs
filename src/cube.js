import { cloneDeep } from "lodash";

import { BASE_TRANSFORMATION, translationMatrix } from "./main";

export const CUBE_EDGES = [
    [0, 1],
    [0, 2],
    [0, 4],
    [1, 3],
    [1, 5],
    [2, 3],
    [2, 6],
    [3, 7],
    [4, 5],
    [4, 6],
    [5, 7],
    [6, 7],
];

export const CUBE_FACES = [
    [0, 1, 5, 4],
    [2, 3, 7, 6],
    [4, 5, 7, 6],
    [0, 1, 3, 2],
    [0, 2, 6, 4],
    [1, 3, 7, 5],
];

export function createCube(x, y, z, size) {
    const transformation = cloneDeep(BASE_TRANSFORMATION);
    const translation = translationMatrix(x, y, z);

    return {
        transformation,
        translation,
        nodes: getOriginNodes(size),
        faces: CUBE_FACES,
        edges: CUBE_EDGES,
    };
}

function getOriginNodes(size) {
    const nodes = [];
    const halfSize = size / 2;
    for (let x of [-halfSize, halfSize]) {
        for (let y of [-halfSize, halfSize]) {
            for (let z of [-halfSize, halfSize]) {
                nodes.push([x, y, z, 1]);
            }
        }
    }

    return nodes;
}
