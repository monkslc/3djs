import * as math from "mathjs";

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
    const transformation = [
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
    ];
    const center = [x, y, z];

    return {
        center,
        size,
        transformation,
    };
}

export function getCubeNodes(cube) {
    const { center, size, transformation } = cube;
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

export function rotateCube(cube, x, y, z) {
    let rM = rotationMatrix(x, y, z);
    const transformation = math.multiply(rM, cube.transformation);
    return {
        ...cube,
        transformation,
    };
}

function rotationMatrix(x, y, z) {
    const rX = [
        [1, 0, 0, 0],
        [0, Math.cos(x), -Math.sin(x), 0],
        [0, Math.sin(x), Math.cos(x), 0],
        [0, 0, 0, 1],
    ];

    const rY = [
        [Math.cos(y), 0, Math.sin(y), 0],
        [0, 1, 0, 0],
        [-Math.sin(y), 0, Math.cos(y), 0],
        [0, 0, 0, 1],
    ];

    const rZ = [
        [Math.cos(z), -Math.sin(z), 0, 0],
        [Math.sin(z), Math.cos(z), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
    return math.multiply(rZ, rY, rX);
}

function translationMatrix(x, y, z) {
    return [
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1],
    ];
}
