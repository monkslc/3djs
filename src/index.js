import {
    rotateShape,
    createCube,
    createPyramid,
    createCone,
    createCylinder,
} from "./shapes";
import * as math from "mathjs";

const canvas = document.getElementById("3djs-playground");
const ctx = canvas.getContext("2d");

let shapes = [
    createCube(200, 100, 500, 50),
    createCube(100, 400, 900, 100),
    createPyramid(600, 200, 500, 50, 50),
    createPyramid(500, 500, 500, 150, 150),
    createCone(1000, 100, 500, 50, 75),
    createCone(900, 400, 100, 50, 200),
    createCylinder(1400, 200, 400, 50, 100),
    createCylinder(1300, 500, 400, 100, 200),
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

let mouseDown = false;

canvas.onmousedown = () => (mouseDown = true);
canvas.onmouseup = () => (mouseDown = false);
canvas.onmousemove = (e) => {
    if (mouseDown) {
        const newShapes = [];
        for (let shape of shapes) {
            const newShape = rotateShape(
                shape,
                e.movementY / 100,
                -e.movementX / 100,
                0
            );
            newShapes.push(newShape);
        }
        shapes = newShapes;
        render();
    }
};

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let shape of shapes) {
        const nodes = [];
        for (let node of shape.nodes) {
            nodes.push(math.multiply(shape.translation, shape.transformation, node));
        }

        ctx.fillStyle = "rgba(200, 100, 150, 1)";
        for (let face of shape.faces) {
            ctx.beginPath();
            const start = nodes[face[0]];
            ctx.moveTo(start[0], start[1]);

            for (let nodeIndex of face.slice(1)) {
                ctx.lineTo(nodes[nodeIndex][0], nodes[nodeIndex][1]);
            }

            ctx.fill();
        }

        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.beginPath();
        for (let edge of shape.edges) {
            const start = nodes[edge[0]];
            ctx.moveTo(start[0], start[1]);

            const end = nodes[edge[1]];
            ctx.lineTo(end[0], end[1]);
        }
        ctx.stroke();
    }
}

render();
