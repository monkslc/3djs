import { cloneDeep } from "lodash";
import * as math from "mathjs";

import { BASE_TRANSFORMATION, translationMatrix } from "./main";

export const PYRAMID_FACES = [
    [0, 1, 2, 3],
    [0, 1, 4],
    [1, 2, 4],
    [2, 3, 4],
    [3, 0, 4],
];

export const PYRAMID_EDGES = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
];

export function createPyramid(x, y, z, baseWidth, height) {
    const transformation = cloneDeep(BASE_TRANSFORMATION);
    return {
        baseCenter: [x, y, z],
        baseWidth,
        height,
        transformation,
        getNodes: getPyramidNodes,
        faces: PYRAMID_FACES,
        edges: PYRAMID_EDGES,
    };
}

function getPyramidNodes() {
    const { baseCenter, baseWidth, height, transformation } = this;
    const [x, y, z] = baseCenter;
    const translationToPyramidCenter = translationMatrix(x, y, z);
    const halfWidth = baseWidth / 2;
    const halfHeight = height / 2;
    const nodesAtOrigin = [
        [-halfWidth, -halfHeight, -halfWidth, 1],
        [-halfWidth, -halfHeight, halfWidth, 1],
        [halfWidth, -halfHeight, halfWidth, 1],
        [halfWidth, -halfHeight, -halfWidth, 1],
        [0, halfHeight, 0, 1],
    ];

    const nodes = [];
    for (let node of nodesAtOrigin) {
        const [newX, newY, newZ] = math.multiply(
            translationToPyramidCenter,
            transformation,
            node
        );
        nodes.push([newX, newY, newZ]);
    }

    return nodes;
}
