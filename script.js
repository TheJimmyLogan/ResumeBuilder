// Resize hack for mobile Safari for 100vh
const resizeVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
resizeVh();
//

// Helper functions
const getFullName = (info) => {
    if (!info) return 'Иван Иванов Иванович'
    if (!info.firstName && !info.lastName && !info.fatherName) return 'Иван Иванов Иванович'
    if (info.firstName && info.lastName) return `${info.firstName} ${info.lastName}`
    if (info.firstName && info.fatherName) return `${info.firstName} ${info.fatherName}`
    if (info.lastName && info.fatherName) return `${info.lastName} ${info.fatherName}`
    if (info.firstName) return `${info.firstName}`
    if (info.lastName) return `${info.lastName}`
    if (info.fatherName) return `${info.fatherName}`
}
//

// On document load - load data from local storage
let formData = {
    generalInformation: {
        firstName: '',
        lastName: '',
        fatherName: '',
        jobTitle: '',
        jobType: '',
        jobSchedule: '',
        email: '',
        mobile: '',
        website: '',
        сourseName: '',
        personalQualities: '',
        children: '',
    }
};

const loadFormData = () => {
    localStorageObject = JSON.parse(localStorage.getItem('formData'));

    if (localStorageObject !== null) formData = localStorageObject;

    // Enter Form Data
    document.getElementById('firstName').value = formData?.generalInformation?.firstName || '';
    document.getElementById('lastName').value = formData?.generalInformation?.lastName || '';
    document.getElementById('fatherName').value = formData?.generalInformation?.fatherName || '';
    document.getElementById('jobTitle').value = formData?.generalInformation?.jobTitle || '';
    document.getElementById('jobType').value = formData?.generalInformation?.jobType || 'Полная';
    document.getElementById('jobSchedule').value = formData?.generalInformation?.jobSchedule || 'Полный';
    document.getElementById('email').value = formData?.generalInformation?.email || 'Почта';
    document.getElementById('mobile').value = formData?.generalInformation?.mobile || 'Телефон';
    document.getElementById('website').value = formData?.generalInformation?.website || 'Мой сайт';
    document.getElementById('сourseName').value = formData?.generalInformation?.сourseName || 'Массажное дело';
    document.getElementById('personalQualities').value = formData?.generalInformation?.personalQualities || 'Личные качества';
    document.getElementById('children').value = formData?.generalInformation?.children || 'Есть';

    // Enter Resume Data
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData?.generalInformation);
    document.getElementById('jobTitleResume').innerText = formData?.generalInformation?.jobTitle || 'Менеджер по маркетингу';
    document.getElementById('jobTypeResume').innerText = formData?.generalInformation?.jobType || 'Полная';
    document.getElementById('jobScheduleResume').innerText = formData?.generalInformation?.jobScheduleResume || 'Полный день';
    document.getElementById('emailResume').innerText = formData?.generalInformation?.emailResume || 'Почта';
    document.getElementById('mobileResume').innerText = formData?.generalInformation?.mobileResume || 'Телефон';
    document.getElementById('websiteResume').innerText = formData?.generalInformation?.websiteResume || 'Мой сайт';
    document.getElementById('сourseNameResume').innerText = formData?.generalInformation?.сourseNameResume || 'Массажное дело';
    document.getElementById('personalQualitiesResume').innerText = formData?.generalInformation?.personalQualitiesResume || 'Личные качества';
    document.getElementById('childrenResume').innerText = formData?.generalInformation?.childrenResume || 'Нет';
}
loadFormData();
//

// On document unload - save data to local storage

window.addEventListener('unload', () => {
    localStorage.setItem('formData', JSON.stringify(formData));
})
//

window.addEventListener('resize', resizeVh);
document.getElementById('generalInfoBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '1';
    document.getElementById('generalInfoSection').scrollIntoView({ behavior: 'smooth' });
})

window.addEventListener('resize', resizeVh);
document.getElementById('personalInfoBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '2';
    document.getElementById('personalInfoSection').scrollIntoView({ behavior: 'smooth' });
})

window.addEventListener('resize', resizeVh);
document.getElementById('experienceBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '3';
    document.getElementById('experienceSection').scrollIntoView({ behavior: 'smooth' });
})

window.addEventListener('resize', resizeVh);
document.getElementById('eduBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '4';
    document.getElementById('eduSection').scrollIntoView({ behavior: 'smooth' });
})

window.addEventListener('resize', resizeVh);
document.getElementById('courseTraingBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '5';
    document.getElementById('courseTraingSection').scrollIntoView({ behavior: 'smooth' });
})

window.addEventListener('resize', resizeVh);
document.getElementById('languageBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '6';
    document.getElementById('languageSection').scrollIntoView({ behavior: 'smooth' });
})

window.addEventListener('resize', resizeVh);
document.getElementById('additionalBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '7';
    document.getElementById('additionalSection').scrollIntoView({ behavior: 'smooth' });
})

// Saving Data on input

document.getElementById('firstName').addEventListener('input', (e) => {
    formData.generalInformation.firstName = e.target.value;
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData.generalInformation);
})

document.getElementById('lastName').addEventListener('input', (e) => {
    formData.generalInformation.lastName = e.target.value;
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData.generalInformation);
})

document.getElementById('fatherName').addEventListener('input', (e) => {
    formData.generalInformation.fatherName = e.target.value;
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData.generalInformation);
})

document.getElementById('jobTitle').addEventListener('input', (e) => {
    formData.generalInformation.jobTitle = e.target.value;
    document.getElementById('jobTitleResume').innerText = e.target.value || 'Менеджер по маркетингу';
})

document.getElementById('jobType').addEventListener('change', (e) => {
    formData.generalInformation.jobType = e.target.value;
    document.getElementById('jobTypeResume').innerText = e.target.value || 'Полная';
})

document.getElementById('jobSchedule').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('jobScheduleResume').innerText = e.target.value || 'Полный день';
})

document.getElementById('email').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('emailResume').innerText = e.target.value || 'Почта';
})

document.getElementById('mobile').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('mobileResume').innerText = e.target.value || 'Телефон';
})

document.getElementById('website').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('websiteResume').innerText = e.target.value || 'Мой сайт';
})

document.getElementById('сourseName').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('сourseNameResume').innerText = e.target.value || 'Массажное дело';
})

document.getElementById('personalQualities').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('personalQualitiesResume').innerText = e.target.value || 'Личные качества';
})

document.getElementById('children').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('childrenResume').innerText = e.target.value || 'Дети';
})

// Preview resume

document.getElementById('preview').addEventListener('click', () => {
    document.getElementById('formData').style.display = 'none';
    document.getElementById('resumeContainer').style.display = 'block';
    document.getElementById('back').style.display = 'block';
    document.getElementById('preview').style.display = 'none';
    document.getElementById('formSteps').style.display = 'none';
    document.getElementById('resumeSteps').style.display = 'block';

})

// Go Back

document.getElementById('back').addEventListener('click', () => {
    document.getElementById('formData').style.display = 'block';
    document.getElementById('resumeContainer').style.display = 'none';
    document.getElementById('back').style.display = 'none';
    document.getElementById('preview').style.display = 'block';
    document.getElementById('formSteps').style.display = 'block';
    document.getElementById('resumeSteps').style.display = 'none';
})



