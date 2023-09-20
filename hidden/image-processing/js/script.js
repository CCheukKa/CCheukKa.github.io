const videoElement = document.querySelector("#videoElement");
const inputCanvasElement = document.querySelector("#inputCanvas");
const outputCanvasElement = document.querySelector("#outputCanvas");
inputCanvasElement.width = 640;
inputCanvasElement.height = 480;
outputCanvasElement.width = 640;
outputCanvasElement.height = 480;

const FRAME_RATE = 10;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        videoElement.srcObject = stream;
        setInterval(() => {
            main();
        }, 1000 / FRAME_RATE);
    })
    .catch(function (err0r) {
        window.alert("Failed to get camera access.");
        console.log("Something went wrong!");
    });


var lastFrameTime = new Date().getTime();
function main() {
    inputCanvasElement.getContext("2d").drawImage(videoElement, 0, 0, 640, 480, 0, 0, 640, 480);

    const imageData = inputCanvasElement.getContext("2d").getImageData(0, 0, 640, 480); // imageData.data is a 1D array of RGBA values

    var baseArray = [];

    for (let x = 0; x < 640; x++) {
        baseArray[x] = [];
        for (let y = 0; y < 480; y++) {
            baseArray[x][y] = new Pixel(
                imageData.data[x * 4 + y * 640 * 4 + 0],
                imageData.data[x * 4 + y * 640 * 4 + 1],
                imageData.data[x * 4 + y * 640 * 4 + 2]
            );
        }
    }

    var outputArray = highlightCombined(baseArray);
    var outputData = new ImageData(640, 480);
    for (let x = 0; x < outputArray.length; x++) {
        for (let y = 0; y < outputArray[x].length; y++) {
            outputData.data[x * 4 + y * 640 * 4 + 0] = outputArray[x][y].r;
            outputData.data[x * 4 + y * 640 * 4 + 1] = outputArray[x][y].g;
            outputData.data[x * 4 + y * 640 * 4 + 2] = outputArray[x][y].b;
            outputData.data[x * 4 + y * 640 * 4 + 3] = 255;
            // outputImage.setPixelColour(Jimp.rgbaToInt(...outputArray[x][y].colour, 255), x, y);
        }
    }

    outputCanvasElement.getContext("2d").putImageData(outputData, 0, 0);

    let currentFrameTime = new Date().getTime();
    console.log(`${currentFrameTime - lastFrameTime}/${Math.round(1000 / FRAME_RATE)}ms (${Math.round(1000 / (currentFrameTime - lastFrameTime) * 100) / 100}/${FRAME_RATE}fps)`);
    lastFrameTime = currentFrameTime;
}