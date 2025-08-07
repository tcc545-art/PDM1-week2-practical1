import { TestResults, TestSquare, advanceToFrame, checkBackgroundIsCalledInDraw, getShapes, testHasShape, testShapesMatchWithoutOrder, canvasStatus } from "../../lib/test-utils.js";

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

function testCanvas() {
    // At least 500 x 500
    if (width >= 500 && height >= 500) {
        TestResults.addPass("The canvas is at least 500 x 500 pixels.");
    } else {
        TestResults.addFail(`The canvas should be at least 500 by 500 pixels. Your canvas is ${width} by ${height} pixels.`)
    }
}

function testFrame(eX, eY) {
    const centreSq = new TestSquare(eX, eY, 100, CENTER);
    const leftSq = new TestSquare(eX - 100, eY - 100, 100, CENTER);
    const rightSq = new TestSquare(eX + 100, eY + 100, 100, CENTER);
    mouseX = eX;
    mouseY = eY;
    advanceToFrame(frameCount + 1);
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    const actualShapes = getShapes();
    const shapesMatch = testShapesMatchWithoutOrder([centreSq, leftSq, rightSq], actualShapes);
    if (shapesMatch) {
        TestResults.addPass(`When the mouse is at ${eX}, ${eY}, the squares are in the expected positions.`);
    } else {
        // Check for corner mode
        const hasCentre = testHasShape(centreSq);
        if (hasCentre) {
            if (actualShapes.length !== 3) {
                TestResults.addFail(`When the mouse is at ${eX}, ${eY}, a square is centred under the mouse as expected, but there are ${actualShapes.length} shapes when 3 squares were expected.`);
            } else {
                TestResults.addFail(`When the mouse is at ${eX}, ${eY}, a square is centred under the mouse as expected, but the other shapes do not meet the requirements.`);
            }
        }
        TestResults.addFail(`When the mouse is at ${eX}, ${eY}, the shapes do not match the expected output. This could mean that they are the wrong type (squares expected), one or more shape is in the wrong place, or one or more shape has the wrong dimensions. Make sure that you have 3 squares, that their locations are relative to the mouse coordinates, and that they are 100 pixels wide.`);
    }
}



async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    // Check the canvas is at least 500 x 500
    testCanvas();
    // Check the background is set in draw
    checkBackgroundIsCalledInDraw();
    // Check there are three shapes
    let actualShapes = getShapes();
    if (actualShapes.length === 0) {
        TestResults.addFail("Expected 3 squares, 0 shapes found. Not running any more tests.")
    } else {
        testFrame(0, 0);
        testFrame(width / 2, height / 2);
        testFrame(200, 300);
        // Check that one is under the mouse
        // Check the other two are diagonally across
        // Check that all shapes actually move
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
