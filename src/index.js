import { rotateShape, createCube, createPyramid } from "./shapes";

const canvas = document.getElementById("3djs-playground");
const ctx = canvas.getContext("2d");

let shapes = [
    createCube(400, 400, 900, 100),
    createCube(200, 100, 500, 50),
    createPyramid(500, 100, 500, 50, 50),
    createPyramid(800, 300, 500, 150, 150),
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
        const nodes = shape.getNodes();

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
