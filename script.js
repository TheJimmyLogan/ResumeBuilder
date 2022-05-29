const resizeVH = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

resizeVH();

window.addEventListener('resize', resizeVH);