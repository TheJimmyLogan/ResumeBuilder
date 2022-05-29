
const resizeVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
resizeVh();

window.addEventListener('resize', resizeVh);
document.getElementById('generalInfoBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('generalInfoSection').scrollIntoView({ behavior: 'smooth'});
})

window.addEventListener('resize', resizeVh);
document.getElementById('personalInfoBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('personalInfoSection').scrollIntoView({ behavior: 'smooth'});
})

window.addEventListener('resize', resizeVh);
document.getElementById('experienceBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('experienceSection').scrollIntoView({ behavior: 'smooth'});
})

window.addEventListener('resize', resizeVh);
document.getElementById('eduBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('eduSection').scrollIntoView({ behavior: 'smooth'});
})

window.addEventListener('resize', resizeVh);
document.getElementById('courseTraingBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('courseTraingSection').scrollIntoView({ behavior: 'smooth'});
})

window.addEventListener('resize', resizeVh);
document.getElementById('languageBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('languageSection').scrollIntoView({ behavior: 'smooth'});
})

window.addEventListener('resize', resizeVh);
document.getElementById('additionalBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('additionalSection').scrollIntoView({ behavior: 'smooth'});
})