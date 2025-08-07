import {checkCanvasSize, 
        getShapes, TestResults, advanceToFrame, TestRectangle, checkBackgroundIsCalledInDraw, testShapesMatchInOrder, canvasStatus } from "../../lib/test-utils.js";

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

function testFrame(eX, eY) {
    mouseX = eX;
    mouseY = eY;
    advanceToFrame(frameCount+1);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const actualShapes = getShapes();
    const eW = (eX - 300) * 2;
    const eH = (eY - 300) * 2;
    const testRect = new TestRectangle(300, 300, eW, eH, CENTER);
    if (actualShapes.length === 1) {
        if (testShapesMatchInOrder([testRect], actualShapes, false)) {
            TestResults.addPass(`When the mouse is at ${eX}, ${eY}, your sketch matches the expected output.`);
        } else {
            TestResults.addFail(`When the mouse is at ${eX}, ${eY}, your sketch does not match the expected output. The sketch should have a rectangle at ${eX}, ${eY} (in CENTER mode) with a width of ${eW} and a height of ${eH}. Your sketch contains a ${actualShapes[0].type} at ${actualShapes[0].x + actualShapes[0].w / 2}, ${actualShapes[0].y + actualShapes[0].h / 2}, with a width of ${actualShapes[0].w} and a height of ${actualShapes[0].h}`);
        }
    }
    else {
        TestResults.addFail(`When ${frameCount} frames have elapsed, your sketch should still only have one shape. Your sketch was found to have ${actualShapes.length}. Did you forget to call <code>background()</code> in <code>draw()</code>?`);
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(600, 600);
    checkBackgroundIsCalledInDraw();
    const actualShapes = getShapes();
    if (actualShapes.length === 0) {
        TestResults.addFail("Expected 1 rectangle. No shapes have been drawn. Not running any further tests.");
    }
    else {
        testFrame(300, 300);
        testFrame(0, 160);
        testFrame(400, 10);
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
