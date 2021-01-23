import { cloneDeep } from "lodash";
import * as math from "mathjs";

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
    const center = [x, y, z];

    return {
        center,
        size,
        transformation,
        getNodes: getCubeNodes,
        faces: CUBE_FACES,
        edges: CUBE_EDGES,
    };
}

function getCubeNodes() {
    const { center, size, transformation } = this;
    const [x, y, z] = center;

    const translationMatrixToCubeCenter = translationMatrix(x, y, z);

    const nodes = [];
    const halfEdge = size / 2;
    for (let xi of [-1, 1]) {
        let xOffset = xi * halfEdge;
        for (let yi of [-1, 1]) {
            let yOffset = yi * halfEdge;
            for (let zi of [-1, 1]) {
                let zOffset = zi * halfEdge;
                const node = [xOffset, yOffset, zOffset, 1];
                const [newX, newY, newZ] = math.multiply(
                    translationMatrixToCubeCenter,
                    transformation,
                    node
                );
                nodes.push([newX, newY, newZ]);
            }
        }
    }

    return nodes;
}
