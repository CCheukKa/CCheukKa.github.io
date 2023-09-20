function fullHexToRGB(hex) {
    return [hex >> 24 & 0xFF, hex >> 16 & 0xFF, hex >> 8 & 0xFF];
}

function bufferToArray(imageBuffer) {
    let array = [];
    for (let x = 0; x < imageBuffer.getWidth(); x++) {
        array[x] = [];
        for (let y = 0; y < imageBuffer.getHeight(); y++) {
            array[x][y] = new Pixel(...fullHexToRGB(imageBuffer.getPixelColour(x, y)));
        }
    }
    return array;
}

function highlightCombined(imageArray) {
    /* //!-------------------------------------------------------------------------- */
    /* //!                                   MAIN                                    */
    /* //!-------------------------------------------------------------------------- */
    const HIGHLIGHT_PERCENTAGE = 0.2;
    const HIGHLIGHT_COUNT = imageArray.length * imageArray[0].length * HIGHLIGHT_PERCENTAGE / 100;

    // const IMAGE_PIXEL_COUNT = imageArray.length * imageArray[0].length;

    // score pixels
    //? score = red percentage * value
    let scoredPixels = [];
    for (let x = 0; x < imageArray.length; x++) {
        for (let y = 0; y < imageArray[x].length; y++) {
            let pixel = imageArray[x][y];
            let redPercentage = pixel.r / (pixel.r + pixel.g + pixel.b);
            let value = pixel.value / 255;
            // sortedPixels.push({ x: pixel.x, y: pixel.y, score: redPercentage * (imageArray[pixel.x][pixel.y].value / 255) * index / IMAGE_PIXEL_COUNT });
            scoredPixels.push({ x, y, score: redPercentage * value });
        }
    }
    scoredPixels.sort((a, b) => b.score - a.score);
    //$

    // highlight pixels
    let highlightedPixels = [];
    for (let i = 0; i < HIGHLIGHT_COUNT; i++) {
        let pixel = scoredPixels[i];
        highlightedPixels.push({ x: pixel.x, y: pixel.y });
    }

    /* //!-------------------------------------------------------------------------- */


    // add highlights to image
    let outputArray = imageArray;
    for (let x = 0; x < outputArray.length; x++) {
        for (let y = 0; y < outputArray[x].length; y++) {
            outputArray[x][y] = outputArray[x][y].scale(0.2);
        }
    }

    for (let i = 0; i < highlightedPixels.length; i++) {
        let pixel = highlightedPixels[i];
        // imageArray[pixel.x][pixel.y].value = (HIGHLIGHT_COUNT - i) / HIGHLIGHT_COUNT * 255;
        outputArray[pixel.x][pixel.y].value = (HIGHLIGHT_COUNT - i) / HIGHLIGHT_COUNT * 255;
    }

    return outputArray;
}