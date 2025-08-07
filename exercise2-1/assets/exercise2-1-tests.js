import {checkCanvasSize, canvasStatus,
        getShapes, TestResults, advanceToFrame, checkBackgroundIsCalledInDraw, testShapesMatchInOrder, TestCircle } from "../../lib/test-utils.js";

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

function testFrame(frameNum) {
    advanceToFrame(frameNum);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const actualShapes = getShapes();
    const testCircle = new TestCircle(frameNum - 1, frameNum - 1, 40);
    if (actualShapes.length === 1) {
        const match = testShapesMatchInOrder([testCircle], actualShapes, false);
        if (match) {
            TestResults.addPass(`At frame ${frameNum}, the circle is in the expected position.`);
        } else {
            TestResults.addFail(`At frame ${frameNum}, a 40px circle should be at ${frameNum - 1}, ${frameNum - 1}. In your sketch, the ${actualShapes[0].type} was at ${actualShapes[0].x}, ${actualShapes[0].y}. If the coordinates are correct, check the type of shape and the dimensions are correct.`);
        }
    } else {
        TestResults.addFail(`At frame ${frameNum}, there should be one circle. Your sketch has ${actualShapes.length} shapes.`);
    }
}


async function runTests(canvas) {
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(600, 600);
    checkBackgroundIsCalledInDraw();
    const actualShapes = getShapes();
    if (actualShapes.length === 0) {
        TestResults.addFail("Expected 1 circle. No shapes have been drawn. Not running any further tests.");
    }
    else {
        testFrame(1);
        testFrame(300);
        testFrame(600);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
