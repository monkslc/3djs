import {
    CUBE_FACES,
    CUBE_EDGES,
    createCube,
    getCubeNodes,
    rotateCube,
} from "./main";

const canvas = document.getElementById("3djs-playground");
const ctx = canvas.getContext("2d");

let shapes = [createCube(400, 400, 900, 100)];

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
            const newShape = rotateCube(
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
        const nodes = getCubeNodes(shape);

        ctx.fillStyle = "rgba(100, 100, 100, 1)";
        for (let face of CUBE_FACES) {
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
        for (let edge of CUBE_EDGES) {
            const start = nodes[edge[0]];
            ctx.moveTo(start[0], start[1]);

            const end = nodes[edge[1]];
            ctx.lineTo(end[0], end[1]);
        }
        ctx.stroke();

        for (let node of nodes) {
            ctx.beginPath();
            ctx.arc(node[0], node[1], 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

render();
