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

export const expandSection = (e) => {
    document.getElementById(e.sectionId).querySelector('.expand-btn').classList.remove('closed');
    document.getElementById(e.sectionId).querySelector('.sub-section-body').classList.remove('closed');
}

export const contractSection = (e) => {
    document.getElementById(e.sectionId).querySelector('.expand-btn').classList.add('closed');
    document.getElementById(e.sectionId).querySelector('.sub-section-body').classList.add('closed');
}

export const expandContractSections = (e) => {
    if (!e.isExpanded) contractSection(e);
    if (e.isExpanded) expandSection(e);
} 