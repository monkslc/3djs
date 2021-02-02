import { cloneDeep } from "lodash";
import * as math from "mathjs";

import { BASE_TRANSFORMATION, translationMatrix } from "./main";

const NUMBER_BASE_NODES = 50;

export const FACES = [];
export const EDGES = [];
for (let i = 0; i < NUMBER_BASE_NODES; i++) {
    EDGES.push([i, (i + 1) % NUMBER_BASE_NODES]);
    FACES.push([i, (i + 1) % NUMBER_BASE_NODES, NUMBER_BASE_NODES]);
}

export function createCone(x, y, z, baseRadius, height) {
    const transformation = cloneDeep(BASE_TRANSFORMATION);
    return {
        baseCenter: [x, y, z],
        baseRadius,
        height,
        transformation,
        getNodes,
        faces: FACES,
        edges: EDGES,
    };
}

function getNodes() {
    const { baseCenter, baseRadius, height, transformation } = this;
    const [x, y, z] = baseCenter;
    const translationToCenter = translationMatrix(x, y, z);
    const halfHeight = height / 2;
    let nodesAtOrigin = [];
    const incrementRadians = math.tau / NUMBER_BASE_NODES;
    for (let radians = 0; radians < math.tau; radians += incrementRadians) {
        const nodeX = Math.cos(radians) * baseRadius;
        const nodeZ = Math.sin(radians) * baseRadius;
        const nodeY = -halfHeight;
        nodesAtOrigin.push([nodeX, nodeY, nodeZ, 1]);
    }
    nodesAtOrigin.push([0, halfHeight, 0, 1]);

    const nodes = [];
    for (let node of nodesAtOrigin) {
        const [newX, newY, newZ] = math.multiply(
            translationToCenter,
            transformation,
            node
        );
        nodes.push([newX, newY, newZ]);
    }

    return nodes;
}
