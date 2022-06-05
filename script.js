// Resize hack for mobile Safari for 100vh
const resizeVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
resizeVh();
//

// On document load - load data from local storage
let formData = {
    generalInformation: {
        firstName: '',
        lastName: '',
        fatherName: '',
    }
};

const loadFormData = () => {
    localStorageObject = JSON.parse(localStorage.getItem('formData'));
    if(localStorageObject){
        formData = localStorageObject;
        document.getElementById('firstName').value = localStorageObject?.generalInformation?.firstName || '';
        document.getElementById('lastName').value = localStorageObject?.generalInformation?.lastName || '';
        document.getElementById('fatherName').value = localStorageObject?.generalInformation?.fatherName || '';
    }
}
loadFormData();
//

// On document unload - save data to local storage

window.onbeforeunload = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
}
//

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


// Saving Data on input

document.getElementById('firstName').addEventListener('input', (e) => {
    formData.generalInformation.firstName = e.target.value;
})

document.getElementById('lastName').addEventListener('input', (e) => {
    formData.generalInformation.lastName = e.target.value;
})

document.getElementById('fatherName').addEventListener('input', (e) => {
    formData.generalInformation.fatherName = e.target.value;
})



