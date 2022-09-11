

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
}

const isOverflown = (element) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

export const expandSection = (e) => {
    document.getElementById(e.buttonId).classList.add("active-step")
    document.getElementById(e.sectionId).querySelector('.expand-btn').classList.add('active')
    document.getElementById(e.sectionId).querySelector('.sub-section-body').classList.add('active')
    document.getElementById(e.sectionId).querySelector('.sub-section-body').parentElement.scrollIntoView({ behavior: 'smooth' })
}

export const contractSection = (e) => {
    document.getElementById(e.buttonId).classList.remove("active-step")
    document.getElementById(e.sectionId).querySelector('.expand-btn').classList.remove('active');
    document.getElementById(e.sectionId).querySelector('.sub-section-body').classList.remove('active')
}

export const expandContractSections = () => {
    const { navToSectionList } = formData || [];
    navToSectionList && navToSectionList?.length > 0 && navToSectionList.forEach(e => {
            if (e.isActive) expandSection(e)
            if (!e.isActive) contractSection(e)
        })
} 

export const makeActive = (data) => {
    const updatedList = formData.navToSectionList.map( e => {
        if (data.index === e.index && !e.isActive) e.isActive = true
        else { e.isActive = false }
        return e
    })
    formData = { 
        ...formData,
        navToSectionList: updatedList
    }
}

export const addFunctionalityToExpandButtons = (thisMenu) => {
    document.getElementById(thisMenu.sectionId).querySelector('.expand-btn').addEventListener('click', () => {
        makeActive(thisMenu)
        expandContractSections()
    })
}

export const resizeResumePreview = () => {
    const PADDING = 24;
    const resumeBox = document.getElementById('resumeContainer');
    const resume = document.querySelector('.resume-size');
    if ( resume.offsetWidth > resumeBox.offsetWidth - (2 * PADDING) ) {
        const scaleDownValue =  Math.floor((resumeBox.offsetWidth - (2 * PADDING)) / resume.offsetWidth * 100) + '%'
        const transformStyle = `scale(${scaleDownValue})`;
        resume.style.transform = transformStyle;
    } else { console.log('more')}
}

