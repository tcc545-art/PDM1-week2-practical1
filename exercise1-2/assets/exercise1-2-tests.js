import { TestRectangle, TestResults, getShapes, testHasShape, testShapesMatchWithoutOrder, canvasStatus } from "../../lib/test-utils.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

function matchRectangles(actualShapes) {
    const rect1 = new TestRectangle(0, 0, width / 2, height);
    const rect2 = new TestRectangle(width / 2, 0, width / 2, height / 2);
    const rect3 = new TestRectangle(width / 2, height / 2, width / 4, height / 2);
    const rect4 = new TestRectangle(width * 0.75, height / 2, width / 4, height / 4);
    const rect5 = new TestRectangle(width * 0.75, height * 0.75, width / 4, height / 4);
    const allMatch = testShapesMatchWithoutOrder([rect1, rect2, rect3, rect4, rect5], actualShapes, false);
    if (allMatch) {
        TestResults.addPass(`When the canvas is ${width} x ${height}, the rectangles have the expected proportions.`);
    } else {
        if (actualShapes.length > 5) {
            TestResults.addFail(`When the canvas is ${width} x ${height}, there should be five rectangles. Found ${actualShapes.length} shapes. This sometimes happens when you forget to call <code>background()</code> and p5.js keeps drawing shapes on top of the existing shapes.`);
        } else {
            let message = `When the canvas is ${width} x ${height}, the following rectangles were not found:<ul>`;
            if (!testHasShape(rect1, true)) {
                message += "<li>x = 0, y = 0, width = half the canvas width, height = canvas height</li>";
            }
            if (!testHasShape(rect2, true)) {
                message += "<li>x = half the canvas width, y = 0, width = half the canvas width, height = half the canvas height</li>";
            }
            if (!testHasShape(rect3, true)) {
                message += "<li>x = half the canvas width, y = half the canvas height, width = a quarter of the canvas width, height = half the canvas height</li>";
            }
            if (!testHasShape(rect4, true)) {
                message += "<li>x = three quarters of the canvas width, y = half the canvas height, width = one quarter of the canvas width, height = one quarter of the canvas height</li>";
            }
            if (!testHasShape(rect5, true)) {
                message += "<li>x = three quarters of the canvas width, y = three quarters of the canvas height, width = one quarter of the canvas width, height = one quarter of the canvas height</li>";
            }
            message += "</ul>";
            TestResults.addFail(message);
        }
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    let actualShapes = getShapes();
    const chosenWidth = width;
    const chosenHeight = height;
    if (actualShapes.length === 0) {
        TestResults.addFail("Expected 5 shapes, found 0. Not running any more tests.");
    } else {
        // The student's own choice
        matchRectangles(actualShapes);
        if (chosenWidth !== 600 || chosenHeight !== 600) {
            resizeCanvas(600, 600);
            matchRectangles(getShapes());
        }
        if (chosenWidth !== 550 || chosenHeight !== 100) {
            resizeCanvas(550, 100);
            matchRectangles(getShapes());
        }
        if (chosenWidth !== 273 || chosenHeight !== 412) {
            resizeCanvas(273, 412);
            matchRectangles(getShapes());
        }
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
