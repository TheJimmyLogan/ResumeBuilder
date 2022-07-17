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

const createField = ({
    labelText,
    placeholder,
    inputType,
    divClass,
    onInput = () => { },
    onChange = () => { },
    defaultValue = '',
    defaultChecked = false,
    isDisabled = false,
}) => {
    const newId = guidGenerator();

    const div = document.createElement('div');
    div.classList.add(divClass);

    const label = document.createElement('label');
    label.innerText = labelText;
    label.setAttribute('for', newId);

    const input = document.createElement('input');
    input.id = newId;
    input.value = defaultValue;
    input.disabled = isDisabled;
    input.setAttribute('type', inputType);
    input.setAttribute('placeholder', placeholder);
    input.addEventListener('input', (e) => { onInput(e.target) })
    input.addEventListener('change', (e) => { onChange(e.target) })

    if (inputType === "checkbox") {
        input.checked = defaultChecked;
        div.append(input, label)
    }
    else div.append(label, input);

    return div;
}

// Create duties input
const addNewDutyInput = ({
    defaultValue,
    onInput,
    onDelete,
    placeholder = ''
}) => {

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = placeholder;
    newInput.value = defaultValue;
    newInput.addEventListener('input', (e) => { onInput(e.target) })

    const newBtn = document.createElement('button');
    newBtn.classList.add('primaryBtn');
    newBtn.innerText = '-';
    newBtn.addEventListener('click', () => {
        newDiv.remove();
        onDelete();
        // delete formData?.workExperience?.duties[newId];
        // refreshResumeDuties();
    })

    const newDiv = document.createElement('div');
    newDiv.classList.add('field-with-button');

    newDiv.append(newInput, newBtn);
    // formData.workExperience.duties[newId] = value;
    return newDiv;

}

const createWorkExperience = (data) => {

    const newId = guidGenerator()
    data.id = newId;

    // Adding Job Expirience Data to Resume
    const positionIsFullTimeH4Resume = document.createElement('h4');
    const positionSpanResume = document.createElement('span');
    positionSpanResume.innerText = data.position || 'Должность';
    const isFullTimeSpanResume = document.createElement('span');
    isFullTimeSpanResume.innerText = data.isFullTime ? ' - Полная занятость' : '';
    positionIsFullTimeH4Resume.append(positionSpanResume, isFullTimeSpanResume)

    const companyH4Resume = document.createElement('h4');
    companyH4Resume.innerText = data.company || 'Организация';

    const fromToH3Resume = document.createElement('h3');
    const fromSpanResume = document.createElement('span');
    fromSpanResume.innerText = data.from || 'Дата начала'
    const ToSpanResume = document.createElement('span');
    ToSpanResume.innerText = data.isCurrent ? 'по настоящее время' : data.to || 'Дата конца'
    fromToH3Resume.append(fromSpanResume, ' - ', ToSpanResume);

    const experienceListUlResume = document.createElement('ul');
    experienceListUlResume.classList.add('exp-class');
    data.duties.length > 0 && data.duties.forEach(duty => {
        const dutyLi = document.createElement('li');
        dutyLi.innerText = duty.text;
        experienceListUlResume.append(dutyLi);
    })

    const experienceSectionResume = document.createElement('section');
    experienceSectionResume.style.borderBottom = "solid 1px lightgray"

    experienceSectionResume.append(
        positionIsFullTimeH4Resume,
        companyH4Resume,
        fromToH3Resume,
        experienceListUlResume
    )

    document.getElementById('experienceListResume').append(experienceSectionResume)




    // document.getElementById('experienceListResume').innerHTML += `
    //     <h4>
    //         <span>${data.position}</span>
    //         <span>${data.isFullTime ? ` - По настоящее время` : ``}</span>
    //     </h4>
    //     <h4>${data.company}</h4>

    //     <h3>Период работы / <span>${data.from}</span> - <span>${ data.isCurrent ? 'по настоящее время' : data.to}</span></h3>

    //     <div class="exp-class">
    //         <ul>
    //         ${ data.duties.map(duty => `<li>${duty.text}</li>`).join('') }
    //         </ul>
    //     </div>
    // `


    // Adding Job Expirience Data to Form

    const accordionSection = document.createElement('section');
    accordionSection.classList.add('accordion');

    const accordionTitleH1 = document.createElement('h1');
    accordionTitleH1.classList.add('accordion-title');

    const accordionTitleSpan = document.createElement('span');
    accordionTitleSpan.innerText = data?.position || 'Должность';

    const accordionArrowButton = document.createElement('button');
    accordionArrowButton.classList.add('accordion-arrow');
    const accordionArrowButtonImg = document.createElement('img');
    accordionArrowButtonImg.src = './images/icons/iconArrowRight.svg';
    accordionArrowButtonImg.addEventListener('click', () => {
        data.isClosed = !data.isClosed;
        accordionArrowButtonImg.classList.toggle('closed');
        accordionBodySection.classList.toggle('closed');
    })

    const accordionDeleteButton = document.createElement('button');
    accordionDeleteButton.classList.add('accordion-arrow');

    const deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = './images/icons/iconDelete.svg';

    accordionDeleteButton.append(deleteButtonImg);
    deleteButtonImg.addEventListener('click', () => {
        experienceSectionResume.remove();
        accordionSection.remove();
        const pos = formData.workExperience.map((e) => { return e.id; }).indexOf(newId);
        formData.workExperience.splice(pos, 1);
    })

    accordionArrowButton.append(accordionArrowButtonImg);
    accordionTitleH1.append(accordionTitleSpan, accordionDeleteButton, accordionArrowButton);
    accordionSection.append(accordionTitleH1);

    const accordionBodySection = document.createElement('section');
    accordionBodySection.classList.add('accordion-body');
    if (data.isClosed) {
        accordionBodySection.classList.add('closed')
        accordionArrowButtonImg.classList.add('closed')
    }

    accordionSection.append(accordionBodySection);

    const postDiv = createField({
        labelText: 'Должность',
        placeholder: 'Должность',
        inputType: 'text',
        divClass: 'field',
        defaultValue: data?.position,
        onInput: ({ value }) => {
            accordionTitleSpan.innerText = value || 'Должность';
            positionIsFullTimeH4Resume.innerText = value || 'Должность';
            data.position = value;
        }
    });
    const companyDiv = createField({
        labelText: 'Организация',
        placeholder: 'Организация',
        inputType: 'text',
        divClass: 'field',
        defaultValue: data?.company,
        onInput: ({ value }) => {
            companyH4Resume.innerText = value || 'Должность';
            data.company = value;
        }
    });

    accordionBodySection.append(postDiv, companyDiv);

    const fromToSection = document.createElement('section');
    fromToSection.classList.add('double-field');

    const fromDiv = createField({
        labelText: 'Дата Начала',
        placeholder: '',
        inputType: 'date',
        divClass: 'field',
        defaultValue: data?.from,
        onChange: ({ value }) => {
            fromSpanResume.innerText = value || 'Дата начала';
            data.from = value;
        }
    });
    const toDiv = createField({
        labelText: 'Дата конца',
        placeholder: '',
        inputType: 'date',
        divClass: 'field',
        defaultValue: data?.to,
        isDisabled: data?.isCurrent,
        onChange: ({ value }) => {
            ToSpanResume.innerText = value || 'Дата конца';
            data.to = value;
        }
    });

    fromToSection.append(fromDiv, toDiv);

    accordionBodySection.append(fromToSection);

    const isCurrentIsFullTimeSection = document.createElement('section');
    isCurrentIsFullTimeSection.classList.add('double-field');

    const isCurrentDiv = createField({
        labelText: 'По настоящее время',
        placeholder: '',
        inputType: 'checkbox',
        divClass: 'checkbox',
        defaultChecked: data?.isCurrent,
        onChange: ({ checked }) => {
            ToSpanResume.innerText = checked ? 'по настоящее время' : toDiv.querySelector('input').value;
            toDiv.querySelector('input').disabled = checked;
            data.isCurrent = checked;
        }
    });
    const isFullTime = createField({
        labelText: 'Полная занятость',
        placeholder: '',
        inputType: 'checkbox',
        divClass: 'checkbox',
        defaultChecked: data?.isFullTime,
        onChange: ({ checked }) => {
            isFullTimeSpanResume.innerText = checked ? ' - Полная занятость' : '';
            data.isFullTime = checked;
        }
    });

    isCurrentIsFullTimeSection.append(isCurrentDiv, isFullTime)

    accordionBodySection.append(isCurrentIsFullTimeSection);

    const jobGoalsDiv = document.createElement('div');
    jobGoalsDiv.classList.add('field');

    const jobGoalLabel = document.createElement('label');
    jobGoalLabel.innerText = 'Должностные обязянности и достижения';

    const goalListDiv = document.createElement('div');

    const fieldWithButton = document.createElement('div');
    fieldWithButton.classList.add('field-with-button');

    const addJobGoalBtn = document.createElement('button');
    addJobGoalBtn.disabled = true;
    addJobGoalBtn.classList.add('primaryBtn');
    addJobGoalBtn.innerText = "+";

    addJobGoalBtn.addEventListener('click', (e) => {
        const newDuty = { text: addJobGoalInput.value }

        // Add new duty to resume
        const dutyLi = document.createElement('li');
        dutyLi.innerText = addJobGoalInput.value;
        experienceListUlResume.append(dutyLi);

        // Add new duty to form
        const newDutyFieldDiv = addNewDutyInput({
            defaultValue: addJobGoalInput.value,
            onInput: ({ value }) => {
                newDuty.text = value;
                dutyLi.innerText = value;
            },
            onDelete: () => {
                dutyLi.remove();
                newDuty.text = '';
            }

        });


        jobGoalsDiv.append(newDutyFieldDiv);
        addJobGoalInput.value = '';
        addJobGoalBtn.disabled = true;
        data.duties.push(newDuty);
        // document.querySelector('.exp-class > ul').innerHTML = '';
        // Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyToResume(duty) })
    })

    const addJobGoalInput = document.createElement('input');
    addJobGoalInput.type = 'text';
    addJobGoalInput.placeholder = 'Организация и ведение аудиторских проектов...';
    addJobGoalInput.addEventListener('input', () => {
        const value = addJobGoalInput.value;
        if (!value) { addJobGoalBtn.disabled = true; return }
        addJobGoalBtn.disabled = false;
    })

    fieldWithButton.append(addJobGoalInput, addJobGoalBtn);
    goalListDiv.append(fieldWithButton);
    jobGoalsDiv.append(jobGoalLabel, goalListDiv);

    // Adding saved duties to form
    data.duties.length > 0 && data.duties.forEach((duty, index) => {
        const newDutyFieldDiv = addNewDutyInput({
            defaultValue: duty.text,
            onInput: ({ value }) => {
                duty.text = text;
                experienceListUlResume.querySelectorAll('li')[index].innerText = value;
            },
            onDelete: () => {
                experienceListUlResume.querySelectorAll('li')[index].remove();
                duty.text = '';
            }
        });
        jobGoalsDiv.append(newDutyFieldDiv);
    })

    accordionBodySection.append(jobGoalsDiv);
    document.getElementById('expirienceList').append(accordionSection);
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
let initialState = {
    foto: null,
    scrollTopPosition: 0,
    activeStepId: 'generalInfoBtn',
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
        army: false
    },
    workExperience: [],
    social: []
};

let formData = initialState;

const clearDataBtn = document.createElement('button');
clearDataBtn.innerText = 'Clear';
clearDataBtn.addEventListener('click', () => { formData = initialState })
document.body.prepend(clearDataBtn)


const loadFormData = () => {
    localStorageObject = JSON?.parse(localStorage?.getItem('formData'));

    if (localStorageObject !== null) formData = localStorageObject;
    formData.workExperience.forEach(experience => {
        experience.duties = experience.duties.filter(({ text }) => text)
    })

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
    document.getElementById(formData.activeStepId).classList.add('active-step');
    formData.workExperience.forEach(expirience => createWorkExperience(expirience))
    // document.getElementById('isFullTime').checked = formData?.workExperience?.isFullTime;
    // document.getElementById('post').value = formData?.workExperience?.post || '';
    // document.getElementById('accordionTitle').innerText = formData?.workExperience?.post || '';
    // document.getElementById('company').value = formData?.workExperience?.company || '';
    // document.getElementById('from').value = formData?.workExperience?.from || '';
    // document.getElementById('to').value = formData?.workExperience?.to || '';
    // document.getElementById('isCurrent').checked = formData?.workExperience?.isCurrent;
    document.getElementById('army').checked = formData?.privateInformation?.army;
    // Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyForm(duty); })



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
    // document.getElementById('isFullTimeResume').innerText = formData?.workExperience?.isFullTime ? ' - Полная занятость' : '';
    // document.getElementById('postResume').innerText = formData?.workExperience?.post || 'Должность';
    // document.getElementById('companyResume').innerText = formData?.workExperience?.company || 'Организация';
    // document.getElementById('fromResume').innerText = formData?.workExperience?.from || '';
    // document.getElementById('toResume').innerText = formData?.workExperience?.to || '';
    // if (formData?.workExperience?.isCurrent) document.getElementById('toResume').innerText = 'по настоящее время';
    document.getElementById('armyResume').innerText = formData?.privateInformation?.army ? 'Служил' : 'Не служил';
    document.getElementById('armyResume').innerText = formData?.privateInformation?.army ? 'Служил' : 'Не служил';
    // Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyToResume(duty) })
    if (formData?.foto !== null) document.getElementById('fotoResume').style.background = "url(" + formData?.foto + ") no-repeat";
    document.getElementById('fotoResume').style.backgroundSize = "cover";

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

// Steps

document.getElementById('generalInfoBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '1';
    formData.activeStepId = e.target.id;
    document.getElementById('generalInfoSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('personalInfoBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '2';
    formData.activeStepId = e.target.id;
    document.getElementById('personalInfoSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('experienceBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '3';
    formData.activeStepId = e.target.id;
    document.getElementById('experienceSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('eduBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '4';
    formData.activeStepId = e.target.id;
    document.getElementById('eduSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('socialBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '5';
    formData.activeStepId = e.target.id;
    document.getElementById('socialSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('courseTraingBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '6';
    formData.activeStepId = e.target.id;
    document.getElementById('courseTraingSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('languageBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '7';
    formData.activeStepId = e.target.id;
    document.getElementById('languageSection').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('additionalBtn').addEventListener('click', (e) => {
    document.querySelector('.active-step').classList.remove("active-step");
    e.target.classList.add('active-step');
    document.getElementById('stepCount').innerText = '8';
    formData.activeStepId = e.target.id;
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

// document.getElementById('isFullTime').addEventListener('change', (e) => {
//     formData.workExperience.isFullTime = e.target.checked;
//     document.getElementById('isFullTimeResume').innerText = e.target.checked ? ' - Полная занятость' : '';;
// })

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
    formData.privateInformation.DOB = e.target.value;
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

// document.getElementById('post').addEventListener('input', (e) => {
//     formData.workExperience.post = e.target.value;
//     document.getElementById('postResume').innerText = e.target.value || 'Должность';
//     document.getElementById('accordionTitle').innerText = e.target.value || 'Должность';
// })

// document.getElementById('company').addEventListener('input', (e) => {
//     formData.workExperience.company = e.target.value;
//     document.getElementById('companyResume').innerText = e.target.value || 'Организация';
// })

// document.getElementById('from').addEventListener('change', (e) => {
//     const date = e.target.value.split('-').reverse().join('-');
//     formData.workExperience.from = e.target.value;
//     document.getElementById('fromResume').innerText = date || '';
// })

// document.getElementById('to').addEventListener('change', (e) => {
//     const date = e.target.value.split('-').reverse().join('-');
//     formData.workExperience.to = e.target.value;
//     document.getElementById('toResume').innerText = date || '';
// })

// document.getElementById('isCurrent').addEventListener('change', (e) => {
//     formData.workExperience.isCurrent = e.target.checked;
//     document.getElementById('to').disabled = e.target.checked;
//     if (formData.workExperience.isCurrent) document.getElementById('toResume').innerText = 'по настоящее время'
//     else { document.getElementById('toResume').innerText = document.getElementById('to').value }
// })

document.getElementById('army').addEventListener('change', (e) => {
    formData.privateInformation.army = e.target.checked;
    document.getElementById('armyResume').innerText = e.target.checked ? 'Служил' : 'Не служил';
})

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

// document.getElementById('addJobGoalLast').addEventListener('input', (e) => {
//     const value = e.target.value;
//     if (!value) { document.getElementById('addJobGoalBtn').disabled = true; return }
//     document.getElementById('addJobGoalBtn').disabled = false;
// })

document.getElementById("foto").addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function () {
        let base64data = reader.result;
        formData.foto = base64data;
        document.getElementById('fotoResume').style.background = "url(" + base64data + ") no-repeat";
        document.getElementById('fotoResume').style.backgroundSize = "cover";
    }
})

// document.getElementById('addJobGoalBtn').addEventListener('click', (e) => {
//     const newId = guidGenerator();
//     addNewDutyForm([newId, document.getElementById('addJobGoalLast').value]);
//     document.getElementById('addJobGoalLast').value = '';
//     document.getElementById('addJobGoalBtn').disabled = true;
//     document.querySelector('.exp-class > ul').innerHTML = '';
//     Object.entries(formData?.workExperience?.duties).forEach(duty => { addNewDutyToResume(duty) })
// })



document.getElementById('addSocial').addEventListener('click', (e) => {
    const newSocial = {
        name: '',
        url: ''
    }

    const newSocialDiv = addNewDutyInput({
        defaultValue: document.getElementById('socialURL').value,
        placeholder: 'Ссылка',
        onInput: ({ value }) => {

        },
        onDelete: () => {
        }
    });

    newSocial.url = document.getElementById('socialURL').value;
    formData.social.push(newSocial)

    document.getElementById('socialList').append(newSocialDiv);
    document.getElementById('socialURL').value = '';
    document.getElementById('socialURL').focus();

})
document.getElementById('addPreviousJob').addEventListener('click', (e) => {
    const newWorkExpirience = {
        isClosed: false,
        position: '',
        company: '',
        from: '',
        to: '',
        isCurrent: false,
        isFullTime: false,
        duties: []
    }
    createWorkExperience(newWorkExpirience);
    formData.workExperience.push(newWorkExpirience);
})


// document.getElementById('accordionArrow').addEventListener('click', (e) => {
//     document.getElementById('accordionArrow').classList.toggle('closed');
//     document.querySelector('.accordion-body').classList.toggle('closed');
// })

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



