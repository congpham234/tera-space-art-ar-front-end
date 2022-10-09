
export const calcImageSides = (width, height, frameSize, imageFrameOffset) => {
    var imageWidth = width;
    var imageHeight = height;
    var sideResult = frameSize - imageFrameOffset;
    var actualImageWidth = parseFloat(width);
    var actualImageHeight = parseFloat(height);
    if (actualImageWidth > actualImageHeight) {
        imageWidth = sideResult;
        imageHeight = sideResult * (actualImageHeight / actualImageWidth);
    } else {
        imageWidth = sideResult * (actualImageWidth / actualImageHeight);;
        imageHeight = sideResult;
    }

    return {imageWidth, imageHeight};
}