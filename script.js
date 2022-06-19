// Resize hack for mobile Safari for 100vh
const resizeVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
resizeVh();
//

// Helper functions
const getFullName = (info) => {
    if (!info) return 'Имя Фамилия Отчество'
    if (!info.firstName && !info.lastName && !info.fatherName) return 'Имя Фамилия Отчество'
    if (info.firstName && info.lastName) return `${info.firstName} ${info.lastName}`
    if (info.firstName && info.fatherName) return `${info.firstName} ${info.fatherName}`
    if (info.lastName && info.fatherName) return `${info.lastName} ${info.fatherName}`
    if (info.firstName) return `${info.firstName}`
    if (info.lastName) return `${info.lastName}`
    if (info.fatherName) return `${info.fatherName}`
}

const guidGenerator = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
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
        city: '',
        birth: '',
        сitizen: '',
        familyStatus: '',
        education: '',
        faculty: '',
        specialization: '',
        additionalEducation: '',
        formOfTraining: '',
    },
    privateInformation: {
        hasChildren: false
    },

    workExperience: {
        isFullTime: false,
        post: '',
        company: '',
        from: '',
        to: '',
        isCurrent: false,
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
    document.getElementById('jobSchedule').value = formData?.generalInformation?.jobSchedule || 'Полный день';
    document.getElementById('email').value = formData?.generalInformation?.email || '';
    document.getElementById('mobile').value = formData?.generalInformation?.mobile || '';
    document.getElementById('website').value = formData?.generalInformation?.website || '';
    document.getElementById('сourseName').value = formData?.generalInformation?.сourseName || '';
    document.getElementById('personalQualities').value = formData?.generalInformation?.personalQualities || '';
    document.getElementById('children').checked = formData?.privateInformation?.hasChildren;
    document.getElementById('city').value = formData?.generalInformation?.city || '';
    document.getElementById('birth').value = formData?.generalInformation?.birth || '';
    document.getElementById('citizen').value = formData?.generalInformation?.citizen || '';
    document.getElementById('familyStatus').value = formData?.generalInformation?.familyStatus || '';
    document.getElementById('education').value = formData?.generalInformation?.education || '';
    document.getElementById('faculty').value = formData?.generalInformation?.education || '';
    document.getElementById('specialization').value = formData?.generalInformation?.specialization || '';
    document.getElementById('additionalEducation').value = formData?.generalInformation?.additionalEducation || '';
    document.getElementById('formOfTraining').value = formData?.generalInformation?.formOfTraining || 'Дистанционная';
    document.getElementById('isFullTime').value = formData?.workExperience?.isFullTime;
    document.getElementById('post').value = formData?.workExperience?.post || '';
    document.getElementById('company').value = formData?.workExperience?.company || '';
    document.getElementById('from').value = formData?.workExperience?.from || '';
    document.getElementById('to').value = formData?.workExperience?.to || '';
    document.getElementById('isCurrent').value = formData?.workExperience?.isCurrent;

    // Enter Resume Data
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData?.generalInformation);
    document.getElementById('jobTitleResume').innerText = formData?.generalInformation?.jobTitle || 'Менеджер по маркетингу';
    document.getElementById('jobTypeResume').innerText = formData?.generalInformation?.jobType || 'Полная';
    document.getElementById('jobScheduleResume').innerText = formData?.generalInformation?.jobScheduleResume || 'Полный день';
    document.getElementById('emailResume').innerText = formData?.generalInformation?.emailResume || 'Почта';
    document.getElementById('mobileResume').innerText = formData?.generalInformation?.mobileResume || 'Телефон';
    document.getElementById('websiteResume').innerText = formData?.generalInformation?.websiteResume || 'Мой сайт';
    document.getElementById('сourseNameResume').innerText = formData?.generalInformation?.сourseNameResume || 'Массажное дело';
    document.getElementById('personalQualitiesResume').innerText = formData?.generalInformation?.personalQualitiesResume || 'Пунктуальный, Ответственный, Быстрообучаемый';
    document.getElementById('childrenResume').innerText = formData?.privateInformation?.hasChildren ? 'Да' : 'Нет';
    document.getElementById('cityResume').innerText = formData?.generalInformation?.cityResume || 'Москва';
    document.getElementById('birthResume').innerText = formData?.generalInformation?.birthResume || 'Дата рождения';
    document.getElementById('citizenResume').innerText = formData?.generalInformation?.citizenResume || 'РФ';
    document.getElementById('familyStatusResume').innerText = formData?.generalInformation?.familyStatusResume || 'Женат';
    document.getElementById('educationResume').innerText = formData?.generalInformation?.educationResume || 'Высшее';
    document.getElementById('facultyResume').innerText = formData?.generalInformation?.facultyResume || 'Экономический Факультет МГУ';
    document.getElementById('specializationResume').innerText = formData?.generalInformation?.specializationResume || 'Экономист';
    document.getElementById('additionalEducationResume').innerText = formData?.generalInformation?.additionalEducationResume || 'Институт Профессионального Массажа';
    document.getElementById('formOfTrainingResume').innerText = formData?.generalInformation?.formOfTrainingResume || 'Очная';
    document.getElementById('formOfTrainingResume').innerText = formData?.generalInformation?.formOfTrainingResume || 'Очная';
    document.getElementById('isFullTimeResume').innerText = formData?.workExperience?.isFullTime ? ' - Полная занятость' : '';
    document.getElementById('postResume').innerText = formData?.workExperience?.post || 'Должность';
    document.getElementById('companyResume').innerText = formData?.workExperience?.company || 'Организация';
    document.getElementById('fromResume').innerText = formData?.workExperience?.fromResume || '';
    document.getElementById('toResume').innerText = formData?.workExperience?.toResume || '';
    if (formData?.workExperience?.isCurrent) document.getElementById('toResume').innerText = 'по настоящее время';

}
loadFormData();
//

// On document unload - save data to local storage

window.addEventListener('unload', () => {
    console.log(formData);
    debugger;
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
    formData.privateInformation.hasChildren = e.target.checked;
    document.getElementById('childrenResume').innerText = e.target.checked ? 'Да' : 'Нет';
})

document.getElementById('isFullTime').addEventListener('change', (e) => {
    formData.workExperience.isFullTime = e.target.checked;
    document.getElementById('isFullTimeResume').innerText = e.target.checked ? ' - Полная занятость' : '';;
})

document.getElementById('city').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('cityResume').innerText = e.target.value || 'Город';
})

document.getElementById('birth').addEventListener('change', (e) => {
    const date = e.target.value.split('-').reverse().join('-');
    formData.generalInformation.jobSchedule = date;
    document.getElementById('birthResume').innerText = date || 'Дата рождения';
})

document.getElementById('citizen').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('citizenResume').innerText = e.target.value || 'Гражданство';
})

document.getElementById('familyStatus').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('familyStatusResume').innerText = e.target.value || 'Женат';
})

document.getElementById('education').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('educationResume').innerText = e.target.value || 'Образование';
})

document.getElementById('faculty').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('facultyResume').innerText = e.target.value || 'Учебное заведение';
})

document.getElementById('specialization').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('specializationResume').innerText = e.target.value || 'Специальность';
})

document.getElementById('additionalEducation').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('additionalEducationResume').innerText = e.target.value || 'Учебное заведение';
})

document.getElementById('formOfTraining').addEventListener('change', (e) => {
    formData.generalInformation.jobSchedule = e.target.value;
    document.getElementById('formOfTrainingResume').innerText = e.target.value || 'Форма Обучения';
})

document.getElementById('post').addEventListener('change', (e) => {
    formData.workExperience.post = e.target.value;
    document.getElementById('postResume').innerText = e.target.value || 'Должность';
})

document.getElementById('company').addEventListener('change', (e) => {
    formData.workExperience.company = e.target.value;
    document.getElementById('companyResume').innerText = e.target.value || 'Организация';
})

document.getElementById('from').addEventListener('change', (e) => {
    const date = e.target.value.split('-').reverse().join('-');
    formData.workExperience.from = date;
    document.getElementById('fromResume').innerText = date || '';
})

document.getElementById('to').addEventListener('change', (e) => {
    const date = e.target.value.split('-').reverse().join('-');
    formData.workExperience.to = date;
    document.getElementById('toResume').innerText = date || '';
})

document.getElementById('isCurrent').addEventListener('change', (e) => {
    formData.workExperience.isCurrent = e.target.checked;
    document.getElementById('to').disabled = e.target.checked;
    if (formData.workExperience.isCurrent) document.getElementById('toResume').innerText = 'по настоящее время'
    else { document.getElementById('toResume').innerText = document.getElementById('to').value }
})

document.getElementById('addJobGoalBtn').addEventListener('click', (e) => {

    const newId = guidGenerator();

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Организация и ведение аудиторских проектов... '
    newInput.value = document.getElementById('addJobGoalLast').value;

    const newBtn = document.createElement('button');
    newBtn.classList.add('primaryBtn');
    newBtn.innerText = '-';
    newBtn.addEventListener('click', () => { document.getElementById(newId).remove() })

    const newDiv = document.createElement('div');
    newDiv.classList.add('field-with-button');
    newDiv.id = newId;

    newDiv.append(newInput, newBtn);


    document.getElementById('addJobGoalLast').value = '';
    document.getElementById('goalsList').append(newDiv);
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



