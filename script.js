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
    if (info.firstName && info.lastName && info.fatherName) return `${info.firstName} ${info.lastName} ${info.fatherName}`
    if (info.firstName && info.lastName) return `${info.firstName} ${info.lastName}`
    if (info.firstName && info.fatherName) return `${info.firstName} ${info.fatherName}`
    if (info.lastName && info.fatherName) return `${info.lastName} ${info.fatherName}`
    if (info.firstName) return `${info.firstName}`
    if (info.lastName) return `${info.lastName}`
    if (info.fatherName) return `${info.fatherName}`
}

const refreshResumeDuties = () => {
    document.querySelector('.exp-class > ul').innerHTML = '';
    Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyToResume(duty) })
}

// Get scroll position for Form
document.getElementById('formData').addEventListener('scroll', (e) => {
    formData.scrollTopPosition = e.target.scrollTop;
})

// Create duties input
const addNewDutyForm = (duty) => {
    const newId = Object.values(duty)[0]
    const value = Object.values(duty)[1]

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Организация и ведение аудиторских проектов... '
    newInput.value = value;
    newInput.addEventListener('input', (e) => {
        formData.workExperience.duties[id] = e.target.value;
        refreshResumeDuties(e, newId);
    })

    const newBtn = document.createElement('button');
    newBtn.classList.add('primaryBtn');
    newBtn.innerText = '-';
    newBtn.addEventListener('click', () => {
        document.getElementById(newId).remove();
        delete formData?.workExperience?.duties[newId];
        refreshResumeDuties();
    })

    const newDiv = document.createElement('div');
    newDiv.classList.add('field-with-button');
    newDiv.id = newId;

    newDiv.append(newInput, newBtn);
    document.getElementById('goalsList').append(newDiv);
    formData.workExperience.duties[newId] = value;

}

// Create duties LI in resume
const addNewDutyToResume = (duty) => {
    const value = Object.values(duty)[1]
    const newLi = document.createElement('li');
    newLi.innerText = value;
    document.querySelector('.exp-class > ul').append(newLi);
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
    scrollTopPosition: 0,
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
        education: '',
        faculty: '',
        specialization: '',
        additionalEducation: '',
        formOfTraining: '',
    },
    privateInformation: {
        city: '',
        сitizenship: '',
        DOB: '',
        familyStatus: '',
        hasChildren: false,
        army: false,
    },

    workExperience: {
        isFullTime: false,
        post: '',
        company: '',
        from: '',
        to: '',
        isCurrent: false,
        duties: {}
    }
};

const loadFormData = () => {
    localStorageObject = JSON?.parse(localStorage?.getItem('formData'));

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
    document.getElementById('city').value = formData?.privateInformation?.city || '';
    document.getElementById('сitizenship').value = formData?.privateInformation?.сitizenship || '';
    document.getElementById('DOB').value = formData?.privateInformation?.DOB || '';
    document.getElementById('familyStatus').value = formData?.privateInformation?.familyStatus || '';
    document.getElementById('education').value = formData?.generalInformation?.education || '';
    document.getElementById('faculty').value = formData?.generalInformation?.education || '';
    document.getElementById('specialization').value = formData?.generalInformation?.specialization || '';
    document.getElementById('additionalEducation').value = formData?.generalInformation?.additionalEducation || '';
    document.getElementById('formOfTraining').value = formData?.generalInformation?.formOfTraining || 'Дистанционная';
    document.getElementById('isFullTime').checked = formData?.workExperience?.isFullTime;
    document.getElementById('post').value = formData?.workExperience?.post || '';
    document.getElementById('accordionTitle').innerText = formData?.workExperience?.post || '';
    document.getElementById('company').value = formData?.workExperience?.company || '';
    document.getElementById('from').value = formData?.workExperience?.from || '';
    document.getElementById('to').value = formData?.workExperience?.to || '';
    document.getElementById('isCurrent').checked = formData?.workExperience?.isCurrent;
    document.getElementById('army').checked = formData?.privateInformation?.army;
    Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyForm(duty); })


    // Enter Resume Data
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData?.generalInformation);
    document.getElementById('jobTitleResume').innerText = formData?.generalInformation?.jobTitle || 'Менеджер по маркетингу';
    document.getElementById('jobTypeResume').innerText = formData?.generalInformation?.jobType || 'Полная';
    document.getElementById('jobScheduleResume').innerText = formData?.generalInformation?.jobSchedule || 'Полный день';
    document.getElementById('emailResume').innerText = formData?.generalInformation?.email || 'Почта';
    document.getElementById('mobileResume').innerText = formData?.generalInformation?.mobile || 'Телефон';
    document.getElementById('websiteResume').innerText = formData?.generalInformation?.website || 'Мой сайт';
    document.getElementById('сourseNameResume').innerText = formData?.generalInformation?.сourseNameResume || 'Массажное дело';
    document.getElementById('personalQualitiesResume').innerText = formData?.generalInformation?.personalQualitiesResume || 'Пунктуальный, Ответственный, Быстрообучаемый';
    document.getElementById('childrenResume').innerText = formData?.privateInformation?.hasChildren ? 'Да' : 'Нет';
    document.getElementById('cityResume').innerText = formData?.privateInformation?.city || 'Москва';
    document.getElementById('сitizenshipResume').innerText = formData?.privateInformation?.сitizenship || 'РФ';
    document.getElementById('DOBResume').innerText = formData?.privateInformation?.DOB || 'Дата рождения';
    document.getElementById('familyStatusResume').innerText = formData?.privateInformation?.familyStatus || 'Женат';
    document.getElementById('educationResume').innerText = formData?.generalInformation?.educationResume || 'Высшее';
    document.getElementById('facultyResume').innerText = formData?.generalInformation?.facultyResume || 'Экономический Факультет МГУ';
    document.getElementById('specializationResume').innerText = formData?.generalInformation?.specializationResume || 'Экономист';
    document.getElementById('additionalEducationResume').innerText = formData?.generalInformation?.additionalEducationResume || 'Институт Профессионального Массажа';
    document.getElementById('formOfTrainingResume').innerText = formData?.generalInformation?.formOfTrainingResume || 'Очная';
    document.getElementById('formOfTrainingResume').innerText = formData?.generalInformation?.formOfTrainingResume || 'Очная';
    document.getElementById('isFullTimeResume').innerText = formData?.workExperience?.isFullTime ? ' - Полная занятость' : '';
    document.getElementById('postResume').innerText = formData?.workExperience?.post || 'Должность';
    document.getElementById('companyResume').innerText = formData?.workExperience?.company || 'Организация';
    document.getElementById('fromResume').innerText = formData?.workExperience?.from || '';
    document.getElementById('toResume').innerText = formData?.workExperience?.to || '';
    if (formData?.workExperience?.isCurrent) document.getElementById('toResume').innerText = 'по настоящее время';
    document.getElementById('armyResume').innerText = formData?.privateInformation?.army ? 'Служил' : 'Не служил';
    document.getElementById('armyResume').innerText = formData?.privateInformation?.army ? 'Служил' : 'Не служил';
    Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyToResume(duty) })

    document.getElementById('formData').scroll({
        top: formData.scrollTopPosition,
        behavior: 'smooth'
    })

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

document.getElementById('email').addEventListener('input', (e) => {
    formData.generalInformation.email = e.target.value;
    document.getElementById('emailResume').innerText = e.target.value || 'Почта';
})

document.getElementById('mobile').addEventListener('input', (e) => {
    formData.generalInformation.mobile = e.target.value;
    document.getElementById('mobileResume').innerText = e.target.value || 'Телефон';
})

document.getElementById('website').addEventListener('input', (e) => {
    formData.generalInformation.website = e.target.value;
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

document.getElementById('city').addEventListener('input', (e) => {
    formData.privateInformation.city = e.target.value;
    document.getElementById('cityResume').innerText = e.target.value || 'Город';
})

document.getElementById('сitizenship').addEventListener('input', (e) => {
    formData.privateInformation.сitizenship = e.target.value;
    document.getElementById('сitizenshipResume').innerText = e.target.value || 'Гражданство';
})

document.getElementById('DOB').addEventListener('change', (e) => {
    const date = e.target.value.split('-').reverse().join('-');
    formData.privateInformation.DOB = date;
    document.getElementById('DOBResume').innerText = date || 'Дата рождения';
})

document.getElementById('familyStatus').addEventListener('input', (e) => {
    formData.privateInformation.familyStatus = e.target.value;
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

document.getElementById('post').addEventListener('input', (e) => {
    formData.workExperience.post = e.target.value;
    document.getElementById('postResume').innerText = e.target.value || 'Должность';
    document.getElementById('accordionTitle').innerText = e.target.value || 'Должность';
})

document.getElementById('company').addEventListener('input', (e) => {
    formData.workExperience.company = e.target.value;
    document.getElementById('companyResume').innerText = e.target.value || 'Организация';
})

document.getElementById('from').addEventListener('change', (e) => {
    const date = e.target.value.split('-').reverse().join('-');
    formData.workExperience.from = e.target.value;
    document.getElementById('fromResume').innerText = date || '';
})

document.getElementById('to').addEventListener('change', (e) => {
    const date = e.target.value.split('-').reverse().join('-');
    formData.workExperience.to = e.target.value;
    document.getElementById('toResume').innerText = date || '';
})

document.getElementById('isCurrent').addEventListener('change', (e) => {
    formData.workExperience.isCurrent = e.target.checked;
    document.getElementById('to').disabled = e.target.checked;
    if (formData.workExperience.isCurrent) document.getElementById('toResume').innerText = 'по настоящее время'
    else { document.getElementById('toResume').innerText = document.getElementById('to').value }
})

document.getElementById('army').addEventListener('change', (e) => {
    formData.privateInformation.army = e.target.checked;
    document.getElementById('armyResume').innerText = e.target.checked ? 'Служил' : 'Не служил';
})

document.getElementById("foto").addEventListener('change', (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    document.getElementById('fotoResume').style.background = "url(" + url + ") no-repeat";
})

document.getElementById('addJobGoalBtn').addEventListener('click', (e) => {
    const newId = guidGenerator();
    addNewDutyForm([newId, document.getElementById('addJobGoalLast').value]);
    document.getElementById('addJobGoalLast').value = '';
    document.querySelector('.exp-class > ul').innerHTML = '';
    Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyToResume(duty) })
})
document.getElementById('addPreviousJob').addEventListener('click', (e) => {
    const accordionSection = document.createElement('section');
    accordionSection.classList.add('accordion');

    const accordionTitleH1 = document.createElement('h1');
    accordionTitleH1.classList.add('accordion-title');

    const accordionTitleSpan = document.createElement('span');
    accordionTitleSpan.id = accordionTitle;

    const accordionArrowButton = document.createElement('button');
    accordionTitleSpan.classList.add('accordion-arrow');

    document.getElementById('expirienceList').append();
})




{/* <section class="accordion">
    <h1 class="accordion-title">
        <span id="accordionTitle"></span>
        <button class="accordion-arrow">
            <img src="./images/icons/iconArrowRight.svg" alt="" id="accordionArrow">
        </button>
    </h1>
    <section class="accordion-body">
        <div class="field">
            <label for="post">Должность</label>
            <input type="text" id="post" placeholder="Директор">
        </div>
        <div class="field">
            <label for="company">Организация</label>
            <input type="text" id="company" placeholder="ООО Фортепьяно г. Москва">
        </div>
        <section class="double-field">
            <section class="field">
                <label for="from">Дата Начала: </label>
                <input type="date" id="from" name="date" />
            </section>
            <section class="field">
                <label for="to">Дата конца: </label>
                <input type="date" id="to" name="date" />
            </section>
        </section>
        <section class="double-field">
            <div class="checkbox ">
                <input type="checkbox" id="isCurrent">
                <label for="isCurrent" class="text"> По настоящее время </label>
            </div>
            <div class="checkbox">
                <input type="checkbox" id="isFullTime">
                <label for="isFullTime" class="text"> Полная занятость </label>
            </div>
        </section>

        <div class="field" id="jobGoals">
            <label for="Post">Должностные обязянности и достижения</label>
            <div id="goalsList">
                <div class="field-with-button">
                    <input type="text" id="addJobGoalLast"
                        placeholder="Организация и ведение аудиторских проектов... ">
                    <button class="primaryBtn" id="addJobGoalBtn">+</button>
                </div>
            </div>
        </div>
    </section>
</section> */}


document.getElementById('accordionArrow').addEventListener('click', (e) => {
    document.getElementById('accordionArrow').classList.toggle('closed');
    document.querySelector('.accordion-body').classList.toggle('closed');
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



