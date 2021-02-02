import { cloneDeep } from "lodash";
import * as math from "mathjs";

import { BASE_TRANSFORMATION, translationMatrix } from "./main";

const NUMBER_BASE_NODES = 25;
const radiansBetweenNodes = math.tau / NUMBER_BASE_NODES;

export const FACES = [];
export const EDGES = [];
for (let i = 0; i < NUMBER_BASE_NODES; i++) {
    EDGES.push([i, (i + 1) % NUMBER_BASE_NODES]);
    FACES.push([i, (i + 1) % NUMBER_BASE_NODES, NUMBER_BASE_NODES]);
}

export function createCone(x, y, z, baseRadius, height) {
    const transformation = cloneDeep(BASE_TRANSFORMATION);
    const translation = translationMatrix(x, y, z);
    return {
        nodes: getOriginNodes(baseRadius, height),
        transformation,
        translation,
        faces: FACES,
        edges: EDGES,
    };
}

function getOriginNodes(baseRadius, height) {
    const halfHeight = height / 2;

    const baseCenterY = -halfHeight;
    const tip = halfHeight;

    let nodes = [];
    for (let i = 0; i < NUMBER_BASE_NODES; i++) {
        const radians = i * radiansBetweenNodes;
        const nodeX = Math.cos(radians) * baseRadius;
        const nodeZ = Math.sin(radians) * baseRadius;
        nodes.push([nodeX, baseCenterY, nodeZ, 1]);
    }
    nodes.push([0, tip, 0, 1]);

    return nodes;
}
