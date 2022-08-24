export const generateRoundPhoto = (photo) => {
    // Adding photo
    var tmpCanvas = document.createElement('canvas'),
    tmpCtx = tmpCanvas.getContext('2d'),
    image = new Image();
    
    
    image.src = photo;
    const diametr = 600;
    tmpCanvas.width = diametr;
    tmpCanvas.height = diametr;
    
    // draw the cached images to temporary canvas and return the context
    tmpCtx.save();
    tmpCtx.beginPath();
    tmpCtx.arc(diametr/2, diametr/2, diametr/2, 0, Math.PI*2, true);
    tmpCtx.closePath();
    tmpCtx.clip();

    tmpCtx.drawImage(image, 0, 0, diametr, diametr);
    
    tmpCtx.beginPath();
    tmpCtx.arc(0, 0, 2, 0, Math.PI*2, true);
    tmpCtx.clip();
    tmpCtx.closePath();
    tmpCtx.restore();
    return tmpCanvas;

    console.log(tmpCanvas)
}