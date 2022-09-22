import strict from "./libs/resumeLayouts/strict.js";
import { 
    expandContractSections, 
    addFunctionalityToExpandButtons, 
    makeActive, 
    resizeResumePreview,
    byID,
    addNavigationArrows
} from "./libs/utils/utilsCommon.js";

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


// Get scroll position for Form
document.getElementById('formDataSection').addEventListener('scroll', (e) => {
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

// Create Accordion
const createAccordion = ({ onExpand, onDelete, title = '', isClosed }) => {

    const accordionSection = document.createElement('section');
    accordionSection.classList.add('accordion');

    const accordionTitleH1 = document.createElement('h1');
    accordionTitleH1.classList.add('accordion-title');

    const accordionTitleSpan = document.createElement('span');
    accordionTitleSpan.innerText = title;

    const accordionArrowButton = document.createElement('button');
    accordionArrowButton.classList.add('accordion-arrow');
    const accordionArrowButtonImg = document.createElement('img');
    accordionArrowButtonImg.src = './images/icons/iconArrowRight.svg';
    accordionArrowButtonImg.addEventListener('click', () => {
        onExpand();
        accordionArrowButtonImg.classList.toggle('closed');
        accordionBodySection.classList.toggle('closed');
    })

    const accordionDeleteButton = document.createElement('button');
    accordionDeleteButton.classList.add('accordion-arrow');

    const deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = './images/icons/iconDelete.svg';

    accordionDeleteButton.append(deleteButtonImg);
    deleteButtonImg.addEventListener('click', () => {
        onDelete()
        accordionSection.remove();
    })

    accordionArrowButton.append(accordionArrowButtonImg);
    accordionTitleH1.append(accordionDeleteButton, accordionTitleSpan, accordionArrowButton);
    accordionSection.append(accordionTitleH1);

    const accordionBodySection = document.createElement('section');
    accordionBodySection.classList.add('accordion-body');
    if (isClosed) {
        accordionBodySection.classList.add('closed')
        accordionArrowButtonImg.classList.add('closed')
    }
    accordionSection.append(accordionBodySection);
    return {
        container: accordionSection,
        body: accordionBodySection,
        title: accordionTitleSpan,
    }
}

// Create duties input
const addInputWithDeleteBtn = ({
    defaultValue,
    onInput,
    onDelete,
    onKeyPress = () => {},
    placeholder = ''
}) => {

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = placeholder;
    newInput.value = defaultValue;
    newInput.addEventListener('input', (e) => { onInput(e.target) })
    newInput.addEventListener('keypress', (e) => { onKeyPress(e) })

    const newBtn = document.createElement('button');
    newBtn.classList.add('primaryBtn');
    newBtn.innerText = '-';
    newBtn.addEventListener('click', () => {
        newDiv.remove();
        onDelete();
    })

    const newDiv = document.createElement('div');
    newDiv.classList.add('field-with-button');

    newDiv.append(newInput, newBtn);
    return newDiv;
}

const addWorkExperience = (data) => {
    const {
        id,
        isClosed,
        position,
        company,
        from,
        to,
        isCurrent,
        isFullTime,
        duties,
    } = data

    // Adding Job Experience Data to Resume
    const positionIsFullTimeH4Resume = document.createElement('h4');
    const positionSpanResume = document.createElement('span');
    positionSpanResume.innerText = position || 'Должность';
    const isFullTimeSpanResume = document.createElement('span');
    isFullTimeSpanResume.innerText = isFullTime ? ' - Полная занятость' : '';
    positionIsFullTimeH4Resume.append(positionSpanResume, isFullTimeSpanResume)

    const companyH4Resume = document.createElement('h4');
    companyH4Resume.innerText = company || 'Организация';

    const fromToH3Resume = document.createElement('h3');
    const fromSpanResume = document.createElement('span');
    fromSpanResume.innerText = from || 'Дата начала'
    const ToSpanResume = document.createElement('span');
    ToSpanResume.innerText = isCurrent ? 'по настоящее время' : to || 'Дата конца'
    fromToH3Resume.append(fromSpanResume, ' - ', ToSpanResume);

    const experienceListUlResume = document.createElement('ul');
    experienceListUlResume.classList.add('exp-class');

    const experienceSectionResume = document.createElement('section');
    experienceSectionResume.style.borderBottom = "solid 1px lightgray"

    experienceSectionResume.append(
        positionIsFullTimeH4Resume,
        companyH4Resume,
        fromToH3Resume,
        experienceListUlResume
    )

    document.getElementById('experienceListResume').append(experienceSectionResume)

    // Add Accordion
    const accordion = createAccordion({
        isClosed,
        title: position || 'Должность',
        onExpand: () => { formData.workExperienceList.forEach( item => { if(item.id === id) item.isClosed = !item.isClosed } ) },
        onDelete: () => {
            experienceSectionResume.remove();
            formData.workExperienceList = formData.workExperienceList.filter( item => item.id !== id)
            if (formData.workExperienceList.length <= 0) {
                document.getElementById('experienceSection').querySelector('.no-data').style.display = 'block';
                document.getElementById('experienceListResumeContainer').style.display = 'none';
            }
        }
    })

    // Adding Job Expirience Data to Form
    const postDiv = createField({
        labelText: 'Должность',
        placeholder: 'Должность',
        inputType: 'text',
        divClass: 'field',
        defaultValue: position,
        onInput: ({ value }) => {
            accordion.title.innerText = value || 'Должность';
            positionSpanResume.innerText = value || 'Должность';
            formData.workExperienceList.forEach( item => { if(item.id === id) item.position = value } )
        }
    });
    const companyDiv = createField({
        labelText: 'Организация',
        placeholder: 'Организация',
        inputType: 'text',
        divClass: 'field',
        defaultValue: company,
        onInput: ({ value }) => {
            companyH4Resume.innerText = value || 'Должность';
            formData.workExperienceList.forEach( item => { if(item.id === id) item.company = value } )
        }
    });

    accordion.body.append(postDiv, companyDiv);

    const fromToSection = document.createElement('section');
    fromToSection.classList.add('double-field');
    const fromDiv = createField({
        labelText: 'Дата Начала',
        placeholder: '',
        inputType: 'date',
        divClass: 'field',
        defaultValue: from,
        onChange: ({ value }) => {
            fromSpanResume.innerText = value || 'Дата начала';
            formData.workExperienceList.forEach( item => { if(item.id === id) item.from = value } )
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
            formData.workExperienceList.forEach( item => { if(item.id === id) item.to = value } )
        }
    });
    fromToSection.append(fromDiv, toDiv);
    accordion.body.append(fromToSection);

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
            formData.workExperienceList.forEach( item => { if(item.id === id) item.isCurrent = checked } )
        }
    });
    const isFullTimeDiv = createField({
        labelText: 'Полная занятость',
        placeholder: '',
        inputType: 'checkbox',
        divClass: 'checkbox',
        defaultChecked: data?.isFullTime,
        onChange: ({ checked }) => {
            formData.workExperienceList.forEach( item => { if(item.id === id) item.isFullTime = checked } )
            isFullTimeSpanResume.innerText = checked ? ' - Полная занятость' : '';
        }
    });
    isCurrentIsFullTimeSection.append(isCurrentDiv, isFullTimeDiv)
    accordion.body.append(isCurrentIsFullTimeSection);

    const jobGoalsDiv = document.createElement('div');
    jobGoalsDiv.classList.add('field');

    const jobGoalLabel = document.createElement('label');
    jobGoalLabel.innerText = 'Должностные обязянности и достижения';

    const goalListDiv = document.createElement('div');

    const fieldWithButton = document.createElement('div');
    fieldWithButton.classList.add('field-with-button');

    const addJobResponsibility = () => {
        const newDuty = { text: addJobGoalInput.value, id: guidGenerator() }

        // Add new duty to resume
        const dutyLi = document.createElement('li');
        dutyLi.innerText = addJobGoalInput.value;
        experienceListUlResume.append(dutyLi);

        // Add new duty to form
        const newDutyFieldDiv = addInputWithDeleteBtn({
            defaultValue: addJobGoalInput.value,
            onInput: ({ value }) => {
                formData.workExperienceList.forEach( item => { if(item.id === id) {
                    item.duties.forEach(duty => { if(duty.id === newDuty.id) duty.text = value } )
                } } )
                dutyLi.innerText = value;
            },
            onDelete: () => {
                dutyLi.remove();
                formData.workExperienceList.forEach( item => { if(item.id === id) {
                    item.duties = item.duties.filter(duty => duty.id !== newDuty.id )
                } } )
            }

        });

        accordion.body.append(newDutyFieldDiv);
        addJobGoalInput.value = '';
        addJobGoalBtn.disabled = true;
        data.duties.push(newDuty);
        addJobGoalInput.focus();
    }

    const addJobGoalBtn = document.createElement('button');
    addJobGoalBtn.disabled = true;
    addJobGoalBtn.classList.add('primaryBtn');
    addJobGoalBtn.innerText = "+";
    addJobGoalBtn.addEventListener('click', addJobResponsibility)

    const addJobGoalInput = document.createElement('input');
    addJobGoalInput.type = 'text';
    addJobGoalInput.placeholder = 'Организация и ведение аудиторских проектов...';
    addJobGoalInput.addEventListener('input', () => {
        const value = addJobGoalInput.value;
        if (!value) { addJobGoalBtn.disabled = true; return }
        addJobGoalBtn.disabled = false;
    })
    addJobGoalInput.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') addJobResponsibility()
    })


    fieldWithButton.append(addJobGoalInput, addJobGoalBtn);
    goalListDiv.append(fieldWithButton);
    jobGoalsDiv.append(jobGoalLabel, goalListDiv);

    // Adding saved duties to form
    data.duties.length > 0 && data.duties.forEach((existingDuty, index) => {

        // Add duties to resume 
        const dutyLi = document.createElement('li');
        dutyLi.innerText = existingDuty.text;
        experienceListUlResume.append(dutyLi);

        const newDutyFieldDiv = addInputWithDeleteBtn({
            defaultValue: existingDuty.text,
            onInput: ({ value }) => {
                formData.workExperienceList.forEach( item => { if(item.id === id) {
                    item.duties.forEach(duty => { if(duty.id === existingDuty.id) duty.text = value } )
                } } )
                experienceListUlResume.querySelectorAll('li')[index].innerText = value;
            },
            onDelete: () => {
                dutyLi.remove();
                formData.workExperienceList.forEach( item => { if(item.id === id) {
                    item.duties = item.duties.filter(duty => duty.id !== existingDuty.id )
                } } )
            }
        });
        jobGoalsDiv.append(newDutyFieldDiv);
    })

    accordion.body.append(jobGoalsDiv);

    if (formData.workExperienceList.length > 0) {
        document.getElementById('experienceSection').querySelector('.no-data').style.display = 'none';
        document.getElementById('experienceListResumeContainer').style.display = 'block';
    }

    document.getElementById('expirienceList').append(accordion.container);
}
const addCustomSection = (data) => {
    const {
        id,
        isClosed,
        title,
        items,
    } = data

    // Adding Job Experience Data to Resume
    const additionalSectionResumeDiv =  document.createElement('div');
    additionalSectionResumeDiv.className = 'left-info-section';
    const additionalSectionResumeTitleH2 =  document.createElement('h2');
    additionalSectionResumeTitleH2.innerText = title || 'Название';
    const additionalSectionItemListDiv =  document.createElement('div');
    additionalSectionItemListDiv.className = 'text';
    const additionalSectionItemListUl =  document.createElement('ul');

    additionalSectionItemListDiv.append(additionalSectionItemListUl);
    additionalSectionResumeDiv.append(additionalSectionResumeTitleH2, additionalSectionItemListDiv)

    document.getElementById('leftInfoContainer').append(additionalSectionResumeDiv)

    // Add Accordion
    const accordion = createAccordion({
        isClosed,
        title: title || 'Название',
        onExpand: () => { formData.customList.forEach( item => { if(item.id === id) item.isClosed = !item.isClosed } ) },
        onDelete: () => {
            additionalSectionResumeDiv.remove();
            formData.customList = formData.customList.filter( item => item.id !== id)
            if (formData.customList.length <= 0) {
                document.getElementById('customSection').querySelector('.no-data').style.display = 'block';
            }
        }
    })

    const addItem = () => {
        const newItem = { title: addItemInput.value, id: guidGenerator() }

        const li = document.createElement('li');
        li.innerText = addItemInput.value;
        additionalSectionItemListUl.append(li);

        // Add new duty to form
        const newItemFieldDiv = addInputWithDeleteBtn({
            defaultValue: addItemInput.value,
            onInput: ({ value }) => {
                formData.customList.forEach( custom => { if(custom.id === id) {
                    custom.items.forEach(item => { if(item.id === newItem.id) item.title = value } )
                } } )
                li.innerText = value;
            },
            onDelete: () => {
                li.remove();
                formData.customList.forEach( custom => { if(custom.id === id) {
                    custom.items = custom.items.filter(item => item.id !== newItem.id )
                } } )
            }

        });

        accordion.body.append(newItemFieldDiv);
        addItemInput.value = '';
        addItemBtn.disabled = true;
        data.items.push(newItem);
        addItemInput.focus();
    }




    const socialURLDiv = createField({
        labelText: 'Название',
        placeholder: '',
        inputType: 'text',
        divClass: 'text',
        defaultValue: title,
        onInput: ({ value }) => {
            additionalSectionResumeTitleH2.innerText = value || 'Название';
            accordion.title.innerText = value || 'Название';
            formData.customList.forEach( item => { if(item.id === id) item.title = value } )
        }
    });

    
    const addItemDiv = document.createElement('div');
    addItemDiv.className = 'field';
    const addItemBtnDiv = document.createElement('div');
    addItemBtnDiv.className = 'field-with-button';
    const addItemBtn = document.createElement('button');
    addItemBtn.disabled = true;
    addItemBtn.className ='primaryBtn';
    addItemBtn.innerText = "+";
    addItemBtn.addEventListener('click', addItem)
    const addItemInput = document.createElement('input');
    addItemInput.type = 'text';
    addItemInput.placeholder = 'описание';
    addItemInput.addEventListener('input', () => {
        const value = addItemInput.value;
        if (!value) { addItemBtn.disabled = true; return }
        addItemBtn.disabled = false;
    })
    addItemInput.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') addItem()
    })


    addItemBtnDiv.append(addItemInput, addItemBtn);
    addItemDiv.append(socialURLDiv, addItemBtnDiv);

    accordion.body.append(addItemDiv);

    // Add existing fields after reload
    items.length > 0 && items.forEach((field, index)=> {
        const li = document.createElement('li');
        li.innerText = field.title;
        additionalSectionItemListUl.append(li);

        // Add new duty to form
        const newItemFieldDiv = addInputWithDeleteBtn({
            defaultValue: field.title,
            onKeyPress : ({key}) => { if (key === 'Enter') addItemBtn.click(); },
            onInput: ({ value }) => {
                formData.customList.forEach( custom => { if(custom.id === id) {
                    custom.items.forEach(item => { if(item.id === field.id) item.title = value } )
                } } )
                li.innerText = value;
            },
            onDelete: () => {
                li.remove();
                formData.customList.forEach( custom => { if(custom.id === id) {
                    custom.items = custom.items.filter(item => item.id !== field.id )
                } } )
            }

        });

        accordion.body.append(newItemFieldDiv);
    } )

    if (formData.customList.length > 0) {
        document.getElementById('customSection').querySelector('.no-data').style.display = 'none';
    }

    document.getElementById('customSection').append(accordion.container);
}

const addSocialNetwork = (newSocialNetwork) => {

    const {
        id, 
        name, 
        url, 
        isClosed 
    } = newSocialNetwork || {};

    // Adding RESUME related course details

    const socialNetworkResumeDiv = document.createElement('div');
    socialNetworkResumeDiv.className = 'social';
    const socialNetworkResumeImg = document.createElement('img');
    socialNetworkResumeImg.src = `./images/icons/social/${name || 'facebook'}.svg`;
    const socialNameSpan = document.createElement('span');
    socialNameSpan.innerText = name || 'facebook';
    const socialBr = document.createElement('br');
    const socialUrlSpan = document.createElement('span');
    socialUrlSpan.innerText = url || 'ссылка';
    const socialNetworkResumeP = document.createElement('p');
    socialNetworkResumeP.append(socialNameSpan, socialBr, socialUrlSpan);

    socialNetworkResumeDiv.append(socialNetworkResumeImg, socialNetworkResumeP)
    document.getElementById('socialListResumeContainer').querySelector('section').append(socialNetworkResumeDiv);

    // Add Accordion

    const accordion = createAccordion({
        isClosed,
        title: name || 'facebook',
        onExpand: () => { formData.socialList.forEach( item => { if(item.id === id) item.isClosed = !item.isClosed } ) },
        onDelete: () => {
            socialNetworkResumeDiv.remove();
            formData.socialList = formData.socialList.filter( item => item.id !== id)
            if (formData.socialList.length <= 0) {
                document.getElementById('socialSection').querySelector('.no-data').style.display = 'block';
                document.getElementById('socialListResumeContainer').style.display = 'none';
            }
        }
    })

    // Adding FORM related course details

    const socialNameAndURLSection = document.createElement('section');
    socialNameAndURLSection.classList.add('double-field');

    const socialURLDiv = createField({
        labelText: 'Ссылка',
        placeholder: '',
        inputType: 'text',
        divClass: 'text',
        defaultValue: url,
        onInput: ({ value }) => {
            socialUrlSpan.innerText = value || 'ссылка';
            formData.socialList.forEach( item => { if(item.id === id) item.url = value } )
        }
    });

    const socialNameSelect = document.createElement('select');
    const options = [
        { value: 'facebook', title: 'Facebook'},
        { value: 'instagram', title: 'Instagram'},
        { value: 'skype', title: 'Skype'},
        { value: 'vk', title: 'VK'}
    ]
    options.forEach((option, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.innerText = option.title;
        socialNameSelect.append(optionElement);
        if ( option.value === name ) socialNameSelect.selectedIndex = index;
    })

    socialNameSelect.addEventListener('change', (e) => {
        const value = e?.target?.value || '';
        socialNameSpan.innerText = value;
        accordion.title.innerText = value;
        socialNetworkResumeImg.src = `./images/icons/social/${value || 'facebook'}.svg`;
        formData.socialList.forEach( item => { if(item.id === id) item.name = value } )

    })

    socialNameAndURLSection.append(socialNameSelect, socialURLDiv);
    accordion.body.append(socialNameAndURLSection);
   

    if (formData.socialList.length > 0) {
        document.getElementById('socialSection').querySelector('.no-data').style.display = 'none';
        document.getElementById('socialListResumeContainer').style.display = 'block';
    }
    document.getElementById('socialList').append(accordion.container);
}

const addNewCourseTaken = (course) => {
    const { 
        id, 
        isClosed 
    } = course || {};

    const title = course.title || 'Название курса';
    const schoolName = course.schoolName || 'Учебное заведение';
    const dateFinished = course.dateFinished || 'Год окончания';

    // Adding RESUME related course details

    const courseItemDiv = document.createElement('div');
    courseItemDiv.className = 'text';

    const titleResumeDiv = document.createElement('p');
    titleResumeDiv.innerText = title;
    const schoolResumeDiv = document.createElement('p');
    schoolResumeDiv.innerText = schoolName;
    const dateFinishedResumeDiv = document.createElement('p');
    dateFinishedResumeDiv.innerText = dateFinished;


    courseItemDiv.append(titleResumeDiv, schoolResumeDiv, dateFinishedResumeDiv);
    document.getElementById('courseListResumeContainer').querySelector('section').append(courseItemDiv);

    // Add accordion

    const accordion = createAccordion({
        isClosed,
        title: title,
        onExpand: () => { formData.courseList.forEach( item => { if(item.id === id) item.isClosed = !item.isClosed } ) },
        onDelete: () => {
            courseItemDiv.remove();
            formData.courseList = formData.courseList.filter( item => item.id !== id)
            if (formData.courseList.length <= 0) {
                document.getElementById('courseTraingSection').querySelector('.no-data').style.display = 'block';
                document.getElementById('courseListResumeContainer').style.display = 'none';
            }
        }
    })

    
    // Adding FORM related course details

    const courseTitleDiv = createField({
        labelText: 'Название курса',
        placeholder: 'Название курса',
        inputType: 'text',
        divClass: 'field',
        defaultValue: course.title,
        onInput: ({ value }) => {
            accordion.title.innerText = value || 'Название курса';
            titleResumeDiv.innerText = value || 'Название курса';
            formData.courseList.forEach( course => { if(course.id === id) course.title = value } )
        }
    });

    const schoolNameDiv = createField({
        labelText: 'Учебное заведение',
        placeholder: 'Учебное заведение',
        inputType: 'text',
        divClass: 'field',
        defaultValue: course.schoolName,
        onInput: ({ value }) => {
            schoolResumeDiv.innerText = value || 'Учебное заведение';
            formData.courseList.forEach( course => { if(course.id === id) course.schoolName = value } )
        }
    });

    const dateFinishedDiv = createField({
        labelText: 'Год окончания',
        placeholder: 'Год окончания',
        inputType: 'date',
        divClass: 'field',
        defaultValue: course.dateFinished,
        onChange: ({ value }) => {
            dateFinishedResumeDiv.innerText = value || 'Год окончания';
            formData.courseList.forEach( course => { if(course.id === id) course.dateFinished = value } )
        }
    });

    if (formData.courseList.length > 0) {
        document.getElementById('courseListResumeContainer').style.display = 'block';
        document.getElementById('courseTraingSection').querySelector('.no-data').style.display = 'none';
    }

    accordion.body.append(courseTitleDiv, schoolNameDiv, dateFinishedDiv);
    document.getElementById('courseList').append(accordion.container);
}

const addNewEducation = (education) => {


    const { 
        id, 
        isClosed 
    } = education || {};

    const level = education.level || 'Степень';
    const schoolName = education.schoolName || 'Учебное заведение';
    const major = education.major || 'Специальность';
    const startDate = education.startDate || 'Дата начала';
    const finishDate = education.finishDate || 'Дата окончания';
    const type = education.type || 'Форма обучения';

    // Adding RESUME related education details

    const educationItemDiv = document.createElement('div');
    const schoolNameResumeH3 = document.createElement('h4');
    schoolNameResumeH3.innerText = schoolName;
    const levelResumeH3 = document.createElement('h3');
    levelResumeH3.innerText = level;
    const majorResumeH3 = document.createElement('h3');
    majorResumeH3.innerText = major;
    const typeResumeH3 = document.createElement('h3');
    typeResumeH3.innerText = type;
    const startDateResumeSpan = document.createElement('span');
    startDateResumeSpan.innerText = startDate;
    const finishDateResumeSpan = document.createElement('span');
    finishDateResumeSpan.innerText = finishDate;
    const startEndDateResumeH3 = document.createElement('h3');
    startEndDateResumeH3.append(startDateResumeSpan, ' - ', finishDateResumeSpan);

    educationItemDiv.append(schoolNameResumeH3, levelResumeH3, majorResumeH3, typeResumeH3, startEndDateResumeH3);
    document.getElementById('educationListResumeContainer').querySelector('section').append(educationItemDiv);

    // Add accordion

    const accordion = createAccordion({
        isClosed,
        title: schoolName,
        onExpand: () => { formData.educationList.forEach( e => { if(e.id === id) e.isClosed = !e.isClosed } ) },
        onDelete: () => {
            educationItemDiv.remove();
            formData.educationList = formData.educationList.filter( education => education.id !== id)
            if (formData.educationList.length <= 0) { 
                document.getElementById('educationListResumeContainer').style.display = 'none'
                document.getElementById('eduSection').querySelector('.no-data').style.display = 'block';
            };
        }
    })


    // Adding FORM related education details

    const schoolNameDiv = createField({
        labelText: 'Учебное заведение',
        placeholder: 'Учебное заведение',
        inputType: 'text',
        divClass: 'field',
        defaultValue: education.schoolName,
        onInput: ({ value }) => {
            accordion.title.innerText = value || schoolName;
            schoolNameResumeH3.innerText = value || schoolName;
            formData.educationList.forEach( item => { if(item.id === id) item.schoolName = value } )
        }
    });

    const levelDiv = createField({
        labelText: 'Степень',
        placeholder: 'Степень',
        inputType: 'text',
        divClass: 'field',
        defaultValue: education.level,
        onInput: ({ value }) => {
            levelResumeH3.innerText = value || level;
            formData.educationList.forEach( item => { if(item.id === id) item.level = value } )
        }
    });

    const majorDiv = createField({
        labelText: 'Специальность',
        placeholder: 'Специальность',
        inputType: 'text',
        divClass: 'field',
        defaultValue: education.major,
        onInput: ({ value }) => {
            majorResumeH3.innerText = value || major;
            formData.educationList.forEach( item => { if(item.id === id) item.major = value } )
        }
    });

    const typeDiv = createField({
        labelText: 'Форма обучения',
        placeholder: 'Форма обучения',
        inputType: 'text',
        divClass: 'field',
        defaultValue: education.type,
        onInput: ({ value }) => {
            typeResumeH3.innerText = value || type;
            formData.educationList.forEach( item => { if(item.id === id) item.type = value } )
        }
    });

    const startFinishSection = document.createElement('section');
    startFinishSection.classList.add('double-field');
    
    const startDateDiv = createField({
        labelText: 'Дата начала',
        placeholder: 'Дата начала',
        inputType: 'date',
        divClass: 'field',
        defaultValue: education.startDate,
        onChange: ({ value }) => {
            startDateResumeSpan.innerText = value || startDate;
            formData.educationList.forEach( item => { if(item.id === id) item.startDate = value } )
        }
    });

    const finishDateDiv = createField({
        labelText: 'Дата окончания',
        placeholder: 'Дата окончания',
        inputType: 'date',
        divClass: 'field',
        defaultValue: education.finishDate,
        onChange: ({ value }) => {
            finishDateResumeSpan.innerText = value || finishDate;
            formData.educationList.forEach( item => { if(item.id === id) item.finishDate = value } )
        }
    });

    startFinishSection.append(startDateDiv, finishDateDiv)

    if (formData.educationList.length > 0) {
        document.getElementById('educationListResumeContainer').style.display = 'block';
        document.getElementById('eduSection').querySelector('.no-data').style.display = 'none';
    }

    accordion.body.append(schoolNameDiv, levelDiv, majorDiv, typeDiv, startFinishSection);
    document.getElementById('educationList').append(accordion.container);
}

const addNewSoftware = (software) => {

    const softwareLi = document.createElement('li');
    softwareLi.innerText = software.title;
    document.getElementById('softwareListResume').append(softwareLi)

    
    const newSoftwareFieldDiv = addInputWithDeleteBtn({
        defaultValue: software.title,
        onKeyPress : ({key, value}) => {
            if (key === 'Enter') document.getElementById('addSoftware').click();
        },
        onInput: ({ value }) => {
            formData.softwareList.forEach( item => { if(item.id === software.id) { item.title = value } } )
            softwareLi.innerText = value;
        },
        onDelete: () => {
            softwareLi.remove();
            formData.softwareList = formData.softwareList.filter( item => item.id !== software.id )
            if (formData.softwareList.length <= 0) {
                document.getElementById('softwareSection').querySelector('.no-data').style.display = 'block';
                document.getElementById('softwareListResumeContainer').style.display = 'none';
            }
        }
    });

    if (formData.softwareList.length > 0) {
        document.getElementById('softwareSection').querySelector('.no-data').style.display = 'none';
        document.getElementById('softwareListResumeContainer').style.display = 'block';
    }

    document.getElementById('softwareList').append(newSoftwareFieldDiv);
    newSoftwareFieldDiv.querySelector('input').focus();
}

const addPersonalQuality = ({data, list, addBtn, ulResume, noDataDiv, sectionResumeContainer, ulForm}) => {

    const liResume = document.createElement('li');
    liResume.innerText = data.title;
    ulResume.append(liResume)

    
    const newInputDiv = addInputWithDeleteBtn({
        defaultValue: data.title,
        onKeyPress : ({key}) => { if (key === 'Enter') addBtn.click(); },
        onInput: ({ value }) => {
            formData[list].forEach( item => { if(item.id === data.id) { item.title = value } } )
            liResume.innerText = value;
        },
        onDelete: () => {
            liResume.remove();
            formData[list] = formData[list].filter( item => item.id !== data.id )
            if (formData[list].length <= 0) {
                noDataDiv.style.display = 'block';
                sectionResumeContainer.style.display = 'none';
            }
        }
    });

    if (formData[list].length > 0) {
        noDataDiv.style.display = 'none';
        sectionResumeContainer.style.display = 'block';
    }

    ulForm.append(newInputDiv);
    newInputDiv.querySelector('input').focus();
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
    // scrollTopPosition: 0,
    activeStepId: 'generalInfoBtn',
    generalInformation: {
        showPhoto: true,
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
        hasChildren: false
    },
    workExperienceList: [],
    socialList: [],
    courseList: [],
    educationList: [],
    softwareList: [],
    personalQualitiesList: [],
    customList: [],
    navToSectionList: [
        { index: 0, buttonId: 'generalInfoBtn', sectionId: 'generalInfoSection', isActive: true},
        { index: 1, buttonId: 'personalInfoBtn', sectionId: 'personalInfoSection', isActive: false},
        { index: 2, buttonId: 'experienceBtn', sectionId: 'experienceSection', isActive: false},
        { index: 3, buttonId: 'eduBtn', sectionId: 'eduSection', isActive: false},
        { index: 4, buttonId: 'socialBtn', sectionId: 'socialSection', isActive: false},
        { index: 5, buttonId: 'courseTraingBtn', sectionId: 'courseTraingSection', isActive: false},
        { index: 6, buttonId: 'softwareBtn', sectionId: 'softwareSection', isActive: false},
        { index: 7, buttonId: 'personalQualitiesBtn', sectionId: 'personalQualitiesSection', isActive: false},
        { index: 8, buttonId: 'customBtn', sectionId: 'customSection', isActive: false},
    ]
};


let formData;


const loadFormData = () => {
    const localStorageObject = JSON?.parse(localStorage?.getItem('formData'));
    if (localStorageObject !== null) formData = { ...initialState, ...localStorageObject}
    else{ formData = initialState }
    window.formData = formData;

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
    document.getElementById('children').checked = formData?.privateInformation?.hasChildren;
    document.getElementById('city').value = formData?.privateInformation?.city || '';
    document.getElementById('сitizenship').value = formData?.privateInformation?.сitizenship || '';
    document.getElementById('DOB').value = formData?.privateInformation?.DOB || '';
    document.getElementById('familyStatus').value = formData?.privateInformation?.familyStatus || '';
    document.getElementById('showPhoto').checked = formData?.generalInformation?.showPhoto;
    // document.getElementById(formData.navToSectionList.find(e => e.isActive).buttonId).classList.add('active-step');

    expandContractSections()
    formData.workExperienceList.forEach(element => addWorkExperience(element))
    formData.socialList.forEach(element => addSocialNetwork(element))
    formData.courseList.forEach(element => addNewCourseTaken(element))
    formData.educationList.forEach(element => addNewEducation(element))
    formData.softwareList.forEach(element => addNewSoftware(element))
    formData.customList.forEach(element => addCustomSection(element))
    formData.personalQualitiesList.forEach(element => addPersonalQuality({
            data : element, 
            list: 'personalQualitiesList', 
            addBtn: document.getElementById('addPersonalQualities'), 
            ulResume: document.getElementById('PersonalQualitiesListResume'),
            noDataDiv: document.getElementById('personalQualitiesSection').querySelector('.no-data'),
            sectionResumeContainer: document.getElementById('personalQualitiesListResumeContainer'),
            ulForm: document.getElementById('personalQualitiesList')
    }))




    // Enter Resume Data
    document.getElementById('firstLastFatherNameResume').innerText = getFullName(formData?.generalInformation);
    document.getElementById('jobTitleResume').innerText = formData?.generalInformation?.jobTitle || 'Менеджер по маркетингу';
    document.getElementById('jobTypeResume').innerText = formData?.generalInformation?.jobType || 'Полная';
    document.getElementById('jobScheduleResume').innerText = formData?.generalInformation?.jobSchedule || 'Полный день';
    document.getElementById('emailResume').innerText = formData?.generalInformation?.email || 'Почта';
    document.getElementById('mobileResume').innerText = formData?.generalInformation?.mobile || 'Телефон';
    document.getElementById('websiteResume').innerText = formData?.generalInformation?.website || 'Мой сайт';
    document.getElementById('childrenResume').innerText = formData?.privateInformation?.hasChildren ? 'Да' : 'Нет';
    document.getElementById('cityResume').innerText = formData?.privateInformation?.city || 'Город';
    document.getElementById('сitizenshipResume').innerText = formData?.privateInformation?.сitizenship || 'Гражданство';
    document.getElementById('DOBResume').innerText = formData?.privateInformation?.DOB || 'Дата рождения';
    document.getElementById('familyStatusResume').innerText = formData?.privateInformation?.familyStatus || 'Женат';
    if (formData?.foto !== null) document.getElementById('fotoResume').style.background = "url(" + formData?.foto + ") no-repeat";
    document.getElementById('fotoResume').style.display = formData.generalInformation.showPhoto ? 'flex' : 'none';
    document.getElementById('fotoResume').style.backgroundSize = "cover";
    if (formData?.foto !== null) document.getElementById('fotoFormHolder').style.background = "url(" + formData?.foto + ") no-repeat";
    document.getElementById('fotoFormHolder').style.backgroundSize = "cover";

}
loadFormData();
resizeResumePreview();
addNavigationArrows();

// On document unload - save data to local storage
window.addEventListener('unload', () => {
    localStorage.setItem('formData', JSON.stringify(formData));
})


//
window.addEventListener('resize', ()=>{
    resizeVh(),
    resizeResumePreview(),
    addNavigationArrows()
});

// Navigation
byID('navButtonContainer').addEventListener('scroll', () => {
    addNavigationArrows()
})
byID('navLeftScrollBtn').addEventListener('click', () => {
    byID('navButtonContainer').scroll({ left: byID('navButtonContainer').scrollLeft - 100, behavior: 'smooth'})
})
byID('navRightScrollBtn').addEventListener('click', () => {
    byID('navButtonContainer').scroll({ left: byID('navButtonContainer').scrollLeft + 100, behavior: 'smooth'})
})



formData.navToSectionList.forEach((data, index) => {

    // Adding actions to collapse/expand buttons
    addFunctionalityToExpandButtons(data);

    // Adding Actions to Navigation buttons
    document.getElementById(data.buttonId).addEventListener('click', (e) => {

        const parent = e.target.parentElement;
        parent.scroll({ left: parent.scrollLeft + e.target.getBoundingClientRect().left, behavior: 'smooth' })
        makeActive(data)
        expandContractSections()
    })
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

document.getElementById('children').addEventListener('change', (e) => {
    formData.privateInformation.hasChildren = e.target.checked;
    document.getElementById('childrenResume').innerText = e.target.checked ? 'Да' : 'Нет';
})

document.getElementById('showPhoto').addEventListener('change', (e) => {
    const checked = e.target.checked;
    formData.generalInformation.showPhoto = checked;
    document.getElementById('fotoResume').style.display = checked ? 'flex' : 'none';
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
    formData.privateInformation.DOB = e.target.value;
    document.getElementById('DOBResume').innerText = date || 'Дата рождения';
})

document.getElementById('familyStatus').addEventListener('input', (e) => {
    formData.privateInformation.familyStatus = e.target.value;
    document.getElementById('familyStatusResume').innerText = e.target.value || 'Женат';
})


document.getElementById("foto").addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function () {
        let base64data = reader.result;
        formData.foto = base64data;
        document.getElementById('fotoResume').style.background = "url(" + base64data + ") no-repeat";
        document.getElementById('fotoResume').style.backgroundSize = "cover";
        document.getElementById('fotoFormHolder').style.background = "url(" + base64data + ") no-repeat";
        document.getElementById('fotoFormHolder').style.backgroundSize = "cover";        
    }
})


document.getElementById('addSocial').addEventListener('click', (e) => {
    let newSocial = {
        id: guidGenerator(),
        name: 'facebook',
        url:  '',
        isClosed: false
    }
    formData.socialList.push(newSocial);
    addSocialNetwork(newSocial)
})

document.getElementById('addPreviousJob').addEventListener('click', (e) => {
    const newWorkExpirience = {
        id: guidGenerator(),
        isClosed: false,
        position: '',
        company: '',
        from: '',
        to: '',
        isCurrent: false,
        isFullTime: false,
        duties: []
    }
    formData.workExperienceList.push(newWorkExpirience);
    addWorkExperience(newWorkExpirience);
})

document.getElementById('addPreviousCourseTaken').addEventListener('click', (e) => {
    const newCourse = {
        id: guidGenerator(),
        title: '',
        schoolName: '',
        finishedDate: '',
        isClosed: false,
    }
    formData.courseList.push(newCourse);
    addNewCourseTaken(newCourse);
})

document.getElementById('addPreviousEducation').addEventListener('click', (e) => {
    const newEducation = {
        id: guidGenerator(),
        level: '',
        schoolName: '',
        major: '',
        startDate: '',
        finishDate: '',
        type: '',
        isClosed: false,
    }
    formData.educationList.push(newEducation);
    addNewEducation(newEducation);
})

document.getElementById('addSoftware').addEventListener('click', (e) => {
    const newSoftware = {
        id: guidGenerator(),
        title: '',
    }
    formData.softwareList.push(newSoftware);
    addNewSoftware(newSoftware);
})

document.getElementById('addPersonalQualities').addEventListener('click', (e) => {
    const newPersonalQualities = {
        id: guidGenerator(),
        title: '',
    }
    formData.personalQualitiesList.push(newPersonalQualities);
    addPersonalQuality({
        data : newPersonalQualities, 
        list: 'personalQualitiesList', 
        addBtn: e.target, 
        ulResume: document.getElementById('PersonalQualitiesListResume'),
        noDataDiv: document.getElementById('personalQualitiesSection').querySelector('.no-data'),
        sectionResumeContainer: document.getElementById('personalQualitiesListResumeContainer'),
        ulForm: document.getElementById('personalQualitiesList')
    });
})

document.getElementById('addCustomBtn').addEventListener('click', (e) => {
    const newCustomSection = {
        id: guidGenerator(),
        isClosed: false,
        title: '',
        items: []
    }
    formData.customList.push(newCustomSection);
    addCustomSection(newCustomSection);
})

const fontUrl = window.location.origin;

document.getElementById('downloadResumeBtn').addEventListener('click', () => {
    const pdfMake = window.pdfMake;
    pdfMake.fonts = {
        Silkscreen: {
          normal: `${fontUrl}/assets/fonts/Silkscreen/Silkscreen-Regular.ttf`,
          bolditalics: `${fontUrl}/assets/fonts/Silkscreen/Silkscreen-Regular.ttf`,
          italics: `${fontUrl}/assets/fonts/Silkscreen/Silkscreen-Regular.ttf`,
          bold: `${fontUrl}/assets/fonts/Silkscreen/Silkscreen-Bold.ttf`,
        },
        Montserrat: {
          normal: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
          bolditalics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
          italics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
          bold: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Bold.ttf`,
        },
     }
    const resumeDocDefinition = strict(formData, 'Montserrat');
    pdfMake.createPdf(resumeDocDefinition).open();
})


// Preview resume
document.getElementById('preview').addEventListener('click', () => {
    document.getElementById('formDataSection').style.display = 'none';
    document.getElementById('resumeContainer').style.display = 'block';
    document.getElementById('back').style.display = 'block';
    document.getElementById('preview').style.display = 'none';
    document.getElementById('formSteps').style.display = 'none';
    resizeResumePreview();
})

// Go Back
document.getElementById('back').addEventListener('click', () => {
    document.getElementById('formDataSection').style.display = 'block';
    document.getElementById('resumeContainer').style.display = 'none';
    document.getElementById('back').style.display = 'none';
    document.getElementById('preview').style.display = 'block';
    document.getElementById('formSteps').style.display = 'block';
})



