import { generateRoundPhoto } from "../utils/utilsCommon.js";
import socialIconsList from "./jsToSvg/socialIcons.js";

const EMPTY_SMALL_SPACE = () => ({ text: `\n`, style: 'emptySpaceSM' });
const EMPTY_MEDIUM_SPACE = () => ({ text: `\n`, style: 'emptySpaceMED' });
const EMPTY_LARGE_SPACE = () => ({ text: `\n`, style: 'emptySpaceLG' });

const DIVIDER = () => ({ svg : '<svg width="180" height="1" viewBox="0 0 180 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="1" fill="#BCBDC0"/></svg>'});

// Text
const SECTION_TITLE = (title) => ({ text: `${title}\n`, style: 'h7' });
const SECTION_H4 = (title) => ( { text: `${title}\n`, style: 'h4' });
const SECTION_H8 = (title) => ( { text: `${title}\n`, style: 'h8' });
const SECTION_CURSIVE = (title) => ( { text: `${title}\n`, style: 'h9' });


// Adding Content
const addSocialNetworksToDoc = (list) => {
    const result = [];
    list.map(element => {
        result.push({
            columns: [
                { width: 20, svg: socialIconsList[element?.name || 'facebook']},
                SECTION_H4(`${element?.name || 'facebook'}\n${element?.url || 'ссылка'}`)
            ]
        }),
        result.push(EMPTY_MEDIUM_SPACE())
    })
    return result;
}

const addCoursesToDoc = (list) => {
    const result = [];
    list.map(element => {
        result.push([
            SECTION_H8(element?.title || 'Название курса'),
            EMPTY_SMALL_SPACE,
            SECTION_CURSIVE(element?.schoolName || 'Учебное заведение'),
            EMPTY_SMALL_SPACE,
            SECTION_CURSIVE(element?.finishedDate || 'Год окончания'),
            EMPTY_MEDIUM_SPACE()
        ])
    })
    return result;
}


const addSoftwareSkillsToDoc = (list) => {
    const result = [];
    list.map(element => { result.push(SECTION_CURSIVE(element?.title)) })
    return { ul: result };
}

const addPersonalQualitiesToDoc = (list) => {
    const result = [];
    list.map(element => { result.push(SECTION_CURSIVE(element?.title)) })
    return { ul: result };
}

const addcustomFieldsToDoc = (list) => {
    const result = [];
    list.map(element => { 
        const items = [];
        element.items.forEach(item => { items.push(SECTION_CURSIVE(item?.title)) })
        result.push([
            SECTION_TITLE(element?.title || ''),
            EMPTY_SMALL_SPACE(),
            DIVIDER(),
            EMPTY_MEDIUM_SPACE(),
            { ul: items },
            EMPTY_MEDIUM_SPACE(),
            DIVIDER(),
            EMPTY_LARGE_SPACE()
        ])
    })
    return result
}


const generateDocDefinition = (formData, font) => {
    const leftSide = [ ];

    // Adding Photo
    if (formData.generalInformation.showPhoto && formData.foto) 
        leftSide.push([
            { image: generateRoundPhoto(formData.foto).toDataURL(), width: 150, height: 150 },
            EMPTY_LARGE_SPACE()
        ]) 

    // Adding Social Networks
    if ( formData.socialList.length > 0 ) {
        leftSide.push([ 
            SECTION_TITLE('Соцсети'),
            EMPTY_SMALL_SPACE(),
            DIVIDER(),
            EMPTY_MEDIUM_SPACE(),
            addSocialNetworksToDoc(formData.socialList),
            DIVIDER(),
            EMPTY_LARGE_SPACE()
        ])
    }

    // Adding Courses
    if ( formData.courseList.length > 0 ) {
        leftSide.push([ 
            SECTION_TITLE('Курсы и тренинги'),
            EMPTY_SMALL_SPACE(),
            DIVIDER(),
            EMPTY_MEDIUM_SPACE(),
            addCoursesToDoc(formData.socialList),
            DIVIDER(),
            EMPTY_LARGE_SPACE()
        ])
    }

    // Adding Software List
    if ( formData.softwareList.length > 0 ) {
        leftSide.push([ 
            SECTION_TITLE('Компьютерные навыки'),
            EMPTY_SMALL_SPACE(),
            DIVIDER(),
            EMPTY_MEDIUM_SPACE(),
            addSoftwareSkillsToDoc(formData.softwareList),
            EMPTY_MEDIUM_SPACE(),
            DIVIDER(),
            EMPTY_LARGE_SPACE()
        ])
    }

    // Adding Software List
    if ( formData.personalQualitiesList.length > 0 ) {
        leftSide.push([ 
            SECTION_TITLE('Личные качества'),
            EMPTY_SMALL_SPACE(),
            DIVIDER(),
            EMPTY_MEDIUM_SPACE(),
            addPersonalQualitiesToDoc(formData.personalQualitiesList),
            EMPTY_MEDIUM_SPACE(),
            DIVIDER(),
            EMPTY_LARGE_SPACE()
        ])
    }


    // Adding Custom Fields List
    if ( formData.customList.length > 0 ) {
        leftSide.push([ addcustomFieldsToDoc(formData.customList) ])
    }
    



    const rightSide = [ 
        { text: `${formData.generalInformation.firstName || 'Имя'} ${formData.generalInformation.lastName || 'Фамилия'}\n`, style: 'h1' },
        { text: `${formData.generalInformation.jobTitle || 'Должность'}\n`, style: 'h2' },
        {
            columns : [
                { width: 'auto', text: `Занятость: ${formData.generalInformation.jobType}\t`, style: 'h3' },
                { text: `График работы: ${formData.generalInformation.jobSchedule}\n`, style: 'h3' },
            ],
            columnGap: 8,
        },
        { text: `\n`, style: 'emptySpaceSM' },
        { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
        { text: `\n`, style: 'emptySpaceMED' },
        { columns: [
            { width: '*', text: ``},
            {
                width: 14,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg>',
            },
            { width: 'auto', text: `${formData.generalInformation.mobile || 'Телефон'}\t`, style: 'h4' },
            { width: 4, text: ``,},
            {
                width: 14,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"/></svg>',
            },
            { width: 'auto', text: `${formData.generalInformation.email || 'Почта'}`, style: 'h4' },
            { width: 4, text: ``,},
            {
                width: 14,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M573.1 75.25l-144 384c-4.703 12.53-16.67 20.77-29.95 20.77c-.4062 0-.8125 0-1.219-.0156c-13.77-.5156-25.66-9.797-29.52-23.03L288 178.3l-81.28 278.7c-3.859 13.23-15.75 22.52-29.52 23.03c-13.75 .4687-26.33-7.844-31.17-20.75l-144-384c-6.203-16.55 2.188-34.98 18.73-41.2C37.31 27.92 55.75 36.23 61.97 52.78l110.2 293.1l85.08-291.7C261.3 41.41 273.8 32.01 288 32.01s26.73 9.396 30.72 23.05l85.08 291.7l110.2-293.1c6.219-16.55 24.67-24.86 41.2-18.73C571.8 40.26 580.2 58.7 573.1 75.25z"/></svg>',
            },
            { width: 'auto', text: `${formData.generalInformation.website || 'Сайт'}\t`, style: 'h4' },
            { width: '*', text: ``,},
            
        ],
        columnGap: 4, },
        { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
        { text: `\n`, style: 'emptySpaceLG' },
        { text: `Обо мне\n`, style: 'h7' },
        { text: `\n`, style: 'emptySpaceSM' },
        { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
        { text: `\n`, style: 'emptySpaceSM' },
        { columns: [
            { width: 'auto', stack: [
                    { text : `Дата рождения`, style: 'h5' },
                    { text : `${formData.privateInformation.DOB || 'Дата рождения' } `, style: 'h6' },
            ]},
            { width: 'auto', stack: [
                    { text : `Город`, style: 'h5' },
                    { text : `${formData.privateInformation.city || 'Город' } `, style: 'h6' },
            ]},
            { width: 'auto', stack: [
                    { text : `Дети`, style: 'h5' },
                    { text : `${formData.privateInformation.hasChildren ? 'Есть' : 'Нет' } `, style: 'h6' },
            ]},
            { width: 'auto', stack: [
                    { text : `Гражданство`, style: 'h5' },
                    { text : `${formData.privateInformation.сitizenship || 'Гражданство' } `, style: 'h6' },
            ]},
            { width: 'auto', stack: [
                    { text : `Сем. Положение`, style: 'h5' },
                    { text : `${formData.privateInformation.familyStatus || 'Сем. Положение' } `, style: 'h6' },
            ]}
        ],
        columnGap: 12, },
    ]

    // Adding Work Expirience
    if (formData.workExperienceList.length > 0) {
        rightSide.push([
            { text: `\n`, style: 'emptySpaceLG' },
            { text: `Опыт работы\n`, style: 'h7' },
            { text: `\n`, style: 'emptySpaceSM' },
            { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
        ])
        formData.workExperienceList.forEach(element => {
            rightSide.push([
                { text: `\n`, style: 'emptySpaceMED' },
                { text: ` ${element.position || 'Должность'}${element.isFullTime ? ' - Полная занятость' : ''}`, style: 'h8' },
                { text: `\n`, style: 'emptySpaceSM' },
                { text: `${element.company || 'Организация'}`, style: 'h8' },
                { text: `\n`, style: 'emptySpaceSM' },
                { text: `${element.from || 'Дата Начала'} — ${element.isCurrent ? 'по настоящее время' : element.to || 'Дата Конца'}`, style: 'h9' },
            ]);
            if (element.duties.length > 0) {
                const duties = [];
                element.duties.forEach(duty => {
                    duties.push(duty.text)
                })
                rightSide.push([ 
                    { text: `\n`, style: 'emptySpaceSM' },
                    { ul: duties }
                ])
    
            }
            rightSide.push([
                { text: `\n`, style: 'emptySpaceMED' },
                { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
            ])
        })
    }


    // Adding Education
    if (formData.educationList.length > 0){
        rightSide.push([
            { text: `\n`, style: 'emptySpaceLG' },
            { text: `Образование\n`, style: 'h7' },
            { text: `\n`, style: 'emptySpaceSM' },
            { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
        ])
        formData.educationList.forEach(element => {
            rightSide.push([
                { text: `\n`, style: 'emptySpaceMED' },
                { text: ` ${element.position || 'Учебное заведение'}`, style: 'h8' },
                { text: `\n`, style: 'emptySpaceSM' },
                { text: `${element.company || 'Степень'}`, style: 'h9' },
                { text: `\n`, style: 'emptySpaceSM' },
                { text: `${element.major || 'Специальность'}`, style: 'h9' },
                { text: `\n`, style: 'emptySpaceSM' },
                { text: `${element.type || 'Форма обучения'}`, style: 'h9' },
                { text: `\n`, style: 'emptySpaceSM' },
                { text: `${element.startDate || 'Дата Начала'} — ${element.finishDate || 'Дата Конца'}`, style: 'h9' },
                { text: `\n`, style: 'emptySpaceMED' },
                { svg : '<svg width="310" height="1" viewBox="0 0 310 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="310" height="1" fill="#BCBDC0"/></svg>'},
            ])
        })
    }


    const docDefinition = {
        pageSize: { width: 620, height: 877 },
        pageOrientation: 'portrait',
        pageMargins: 42,
        // defaultStyle: {
        //     font: 'Montserrat'
        // },
        content: [
                {
                    columns: [
        
                        {
                            width: 200,
                            stack: leftSide,
                        },
                        {
                            width: 'auto',
                            stack: rightSide,
                        },
                    ],
                    columnGap: 12
                }
        ],
        styles: {
            h1: {
              fontSize: 25,
              bold: true,
              lineHeight: 1.2
            },
            h2: {
                fontSize: 16,
                bold: true,
                lineHeight: 1.2
              },
            h3: {
                fontSize: 10,
                color: '#5A5A5A'
            },
            line: {
                fontSize: 10,
                lineHeight: 1.5
            },
            emptySpaceSM: {
                fontSize: 4,
            },
            emptySpaceMED: {
                fontSize: 8,
            },
            emptySpaceLG: {
                fontSize: 12,
            },
            emptySpaceLXL: {
                fontSize: 20,
            },
            h4: {
                fontSize: 10,
                bold: true
            },
            h5: {
                fontSize: 8,
                bold: true,
                lineHeight: 1.2
            },
            h6: {
                fontSize: 8,
                color: '#404041'
            },
            h7: {
                fontSize: 16,
                bold: true,
                color: '#000000'
            },
            h8: {
                fontSize: 12,
                bold: true,
                color: '#000000'
            },
            h9: {
                fontSize: 12,
                italics: true,
                color: '#5A5A5A'
            },
        },
        defaultStyle: {
            font
        }
    };

    return docDefinition
}

export default generateDocDefinition;