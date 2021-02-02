import { cloneDeep } from "lodash";

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
    const translation = translationMatrix(x, y, z);
    return {
        transformation,
        translation,
        nodes: getOriginNodes(baseWidth, height),
        faces: PYRAMID_FACES,
        edges: PYRAMID_EDGES,
    };
}

function getOriginNodes(baseWidth, height) {
    const halfWidth = baseWidth / 2;
    const halfHeight = height / 2;

    return [
        [-halfWidth, -halfHeight, -halfWidth, 1],
        [-halfWidth, -halfHeight, halfWidth, 1],
        [halfWidth, -halfHeight, halfWidth, 1],
        [halfWidth, -halfHeight, -halfWidth, 1],
        [0, halfHeight, 0, 1],
    ];
}
