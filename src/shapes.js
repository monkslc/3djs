import * as math from "mathjs";

import { rotationMatrix } from "./main";

export function rotateShape(shape, x, y, z) {
    let rM = rotationMatrix(x, y, z);
    const transformation = math.multiply(rM, shape.transformation);
    return {
        ...shape,
        transformation,
    };
}

export { createPyramid } from "./pyramid";
export { createCube } from "./cube";
export { createCone } from "./cone";
