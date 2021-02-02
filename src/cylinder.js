import { cloneDeep } from "lodash";
import * as math from "mathjs";

import { BASE_TRANSFORMATION, translationMatrix } from "./main";

const NUMBER_BASE_NODES = 25;

const radiansBetweenNodes = math.tau / NUMBER_BASE_NODES;
const totalNodes = NUMBER_BASE_NODES * 2;

export const FACES = [];
export const EDGES = [];
for (let i = 0; i < totalNodes; i++) {
    EDGES.push([i, (i + 2) % totalNodes]);
}
for (let i = 0; i < totalNodes; i += 2) {
    FACES.push([
        i,
        (i + 1) % totalNodes,
        (i + 3) % totalNodes,
        (i + 2) % totalNodes,
    ]);
}

export function createCylinder(x, y, z, radius, height) {
    const transformation = cloneDeep(BASE_TRANSFORMATION);
    const translation = translationMatrix(x, y, z);
    return {
        nodes: getOriginNodes(radius, height),
        transformation,
        translation,
        faces: FACES,
        edges: EDGES,
    };
}

function getOriginNodes(radius, height) {
    const halfHeight = height / 2;

    const bottomY = -halfHeight;
    const topY = halfHeight;

    let nodes = [];
    for (let i = 0; i < NUMBER_BASE_NODES; i++) {
        const radians = i * radiansBetweenNodes;
        const nodeX = Math.cos(radians) * radius;
        const nodeZ = Math.sin(radians) * radius;
        nodes.push([nodeX, bottomY, nodeZ, 1]);
        nodes.push([nodeX, topY, nodeZ, 1]);
    }

    return nodes;
}
