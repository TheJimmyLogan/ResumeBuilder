import { generateRoundPhoto } from "../utils/utilsCommon.js";
import icons from "./jsToSvg/icons.js";

const { socialIconsList, generalIconsList } = icons || {};

const EMPTY_SMALL_SPACE = () => ({ text: `\n`, style: 'emptySpaceSM' });
const EMPTY_MEDIUM_SPACE = () => ({ text: `\n`, style: 'emptySpaceMED' });
const EMPTY_LARGE_SPACE = () => ({ text: `\n`, style: 'emptySpaceLG' });

const DIVIDER = () => ({ svg : '<svg width="150" height="0.1" viewBox="0 0 150 0.1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="0.1" fill="#BCBDC0"/></svg>'});
const DIVIDER_LARGE = () => ({ svg : '<svg width="350" height="0.1" viewBox="0 0 350 0.1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="350" height="0.1" fill="#BCBDC0"/></svg>'});

// Text
const SECTION_TITLE = (title) => ({ text: `${title}\n`, style: 'h7' });
const SECTION_H2 = (title) => ( { text: `${title}\n`, style: 'h2' });
const SECTION_H3 = (title) => ( { text: `${title}\n`, style: 'h3' });
const SECTION_H4 = (title) => ( { text: `${title}\n`, style: 'h4' });
const SECTION_H5 = (title) => ( { text: `${title}\n`, style: 'h5' });
const SECTION_H6 = (title) => ( { text: `${title}\n`, style: 'h6' });
const SECTION_H8 = (title) => ( { text: `${title}\n`, style: 'h8' });
const SECTION_CURSIVE = (title) => ( { text: `${title}\n`, style: 'h9' });

let leftSide = [];
let rightSide = [];


// Utility funcions to add content
const addPhoto = (generalInformation, foto) => {
    if (generalInformation.showPhoto && foto) 
            return([ { image: generateRoundPhoto(foto).toDataURL(), width: 140, height: 140 }, EMPTY_LARGE_SPACE() ]) 
    return [];
}

const addLeftSideSection = ({ list = [], defaultTitle = '', layoutFunction = () => {} }) => {
    if(list.length > 0){
        leftSide.push([ 
            SECTION_TITLE(defaultTitle),
            EMPTY_SMALL_SPACE(),
            DIVIDER(),
            EMPTY_MEDIUM_SPACE(),
            layoutFunction(list),
            EMPTY_MEDIUM_SPACE(),
            DIVIDER(),
            EMPTY_LARGE_SPACE()
        ])
    }
}

const addSocialNetworksToDoc = (list) => {
    const result = [];
    list.map((element, index) => {
        result.push({
            columns: [
                { width: 20, svg: socialIconsList[element?.name || 'facebook']},
                SECTION_H4(`${element?.name || 'facebook'}\n${element?.url || 'ссылка'}`),
            ],
            columnGap: 12,
        });
        if (list.length !== index+1 ) result.push(EMPTY_MEDIUM_SPACE())
    })
    return result;
}

const addCoursesToDoc = (list) => {
    const result = [];
    list.map((element, index) => {
        result.push([
            SECTION_H8(element?.title || 'Название курса'),
            EMPTY_SMALL_SPACE,
            SECTION_CURSIVE(element?.schoolName || 'Учебное заведение'),
            EMPTY_SMALL_SPACE,
            SECTION_CURSIVE(element?.finishedDate || 'Год окончания'),
        ]);
        if (list.length !== index+1 ) result.push(EMPTY_MEDIUM_SPACE())
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
    if (list.length > 0) {
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
    }
    return result
}

const addFullName = (formData, font) => {
    const { generalInformation: {firstName, lastName, fatherName} } = formData;
    let nameString = [];
    let currentWord = '';
    let letterArray = [];
    [firstName, lastName, fatherName].forEach((word) => {
        if (word) letterArray.push(...word.split(''), ' ')
    })
    letterArray.pop();

    letterArray.forEach(letter => {
        currentWord += letter;
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.font=`25px ${font}`;
        if (context.measureText(currentWord).width > 330 || letter === ' ')
            {
                if(currentWord) nameString.push(currentWord);
                currentWord = '';
            }
    });
    if(currentWord) nameString.push(currentWord);
    let resultName = nameString.join('');

    if (resultName.replaceAll(' ', '') === '') resultName = 'Имя Фамилия';
    return ({ text: resultName, style: 'h1' })
}

const addPhoneEmailWebsite = (generalInformation) => {
    const addIconWithText = (icon, text) => ([
        { width: 14, svg: icon },
        { width: 'auto', text: text, style: 'h4' },
        { width: 4, text: ``,},
    ])
    return { 
        columns: [
            { width: '*', text: ``},
            ...addIconWithText(generalIconsList.phoneIcon, generalInformation.mobile || 'Телефон'),
            ...addIconWithText(generalIconsList.emailIcon, generalInformation.email || 'Почта'),
            ...addIconWithText(generalIconsList.webIcon, generalInformation.website || 'Сайт'),
            { width: '*', text: ``,},
        ],
        columnGap: 4 
    }
}

const addAboutSection = (privateInformation) => {
    return ([ 
        { columns: [
            { width: 'auto', stack: [ SECTION_H5('Дата рождения'),  SECTION_H6(privateInformation.DOB || 'Дата рождения') ]},
            { width: 'auto', stack: [ SECTION_H5('Город'),  SECTION_H6(privateInformation.city || 'Город') ]},
            { width: 'auto', stack: [ SECTION_H5('Дети'),  SECTION_H6(privateInformation.hasChildren ? 'Есть' : 'Нет') ]},
            { width: 'auto', stack: [ SECTION_H5('Гражданство'),  SECTION_H6(privateInformation.сitizenship || 'Гражданство') ]},
            { width: 'auto', stack: [ SECTION_H5('ГоСем. Положениерод'),  SECTION_H6(privateInformation.familyStatus || 'Сем. Положение') ]},
        ],
        columnGap: 12, },
    ])
}

const addWorkExperienceSection = (workExperienceList) => {

    const addWorkDuties = (element) => {
        if (element.duties.length > 0) {
            const duties = element.duties.map(duty => { duty.text })
            return([ EMPTY_SMALL_SPACE(), { ul: duties } ])
        }
        return []
    }
        if (workExperienceList.length > 0) {
            const result = [];
            result.push([
                EMPTY_LARGE_SPACE(),
                SECTION_TITLE('Опыт работы'),
                EMPTY_SMALL_SPACE(),
                DIVIDER_LARGE(),
            ])
            workExperienceList.forEach(element => {
                result.push([
                    EMPTY_MEDIUM_SPACE(),
                    SECTION_H8(`${element.position || 'Должность'}${element.isFullTime ? ' - Полная занятость' : ''}`),
                    EMPTY_SMALL_SPACE(),
                    SECTION_H8(element.company || 'Организация'),
                    EMPTY_SMALL_SPACE(),
                    SECTION_CURSIVE(`${element.from || 'Дата Начала'} — ${element.isCurrent ? 'по настоящее время' : element.to || 'Дата Конца'}`),
                    ...addWorkDuties(element),
                    EMPTY_MEDIUM_SPACE(),
                    DIVIDER_LARGE()
                ]);
            })
            return result;
        }
}

const addEducationSection = (educationList) => {
    if (educationList.length > 0){
        const result = []
        result.push([
            EMPTY_LARGE_SPACE(),
            SECTION_TITLE('Образование'),
            EMPTY_SMALL_SPACE(),
            DIVIDER_LARGE(),
        ])
        educationList.forEach(element => {
            rightSide.push([
                EMPTY_MEDIUM_SPACE(),
                SECTION_H8(element.position || 'Учебное заведение'),
                EMPTY_SMALL_SPACE(),
                SECTION_H8(element.company || 'Степень'),
                EMPTY_SMALL_SPACE(),
                SECTION_H8(element.major || 'Специальность'),
                EMPTY_SMALL_SPACE(),
                SECTION_H8(element.type || 'Форма обучения'),
                EMPTY_SMALL_SPACE(),
                SECTION_H8(`${element.startDate || 'Дата Начала'} — ${element.finishDate || 'Дата Конца'}`),
                EMPTY_MEDIUM_SPACE(),
                DIVIDER_LARGE()
            ])
        })
        return result;
    }
}



const generateDocDefinition = (formData, font) => {

    const {
        generalInformation,
        privateInformation,
        workExperienceList,
        socialList,
        courseList,
        softwareList,
        personalQualitiesList,
        customList
    } = formData || {};

    // Creating Layout for LEFT SIDE
    // Nulify layout before each download
    leftSide = [];

    leftSide.push([ addPhoto(generalInformation, formData.foto) ])
    leftSide.push([
        addLeftSideSection({ defaultTitle: 'Соцсети', list: socialList, layoutFunction: addSocialNetworksToDoc }),
        addLeftSideSection({ defaultTitle: 'Курсы и тренинги', list: courseList, layoutFunction: addCoursesToDoc }),
        addLeftSideSection({ defaultTitle: 'Компьютерные навыки', list: softwareList, layoutFunction: addSoftwareSkillsToDoc }),
        addLeftSideSection({ defaultTitle: 'Личные качества', list: personalQualitiesList, layoutFunction: addPersonalQualitiesToDoc }),
        addcustomFieldsToDoc(customList),
    ])


    // Creating Layout for RIGHT SIDE
    rightSide = [];



    rightSide.push([
        addFullName(formData, font),
        SECTION_H2(generalInformation.jobTitle || 'Должность'),
        { columns : [
            SECTION_H3(`Занятость: ${generalInformation.jobType || 'Полная'}`),
            SECTION_H3(`Занятость: ${generalInformation.jobSchedule || 'Полный день'}`),
        ],
        columnGap: 8 },
        EMPTY_SMALL_SPACE(),
        DIVIDER_LARGE(),
        EMPTY_MEDIUM_SPACE(),
        addPhoneEmailWebsite(generalInformation),
        EMPTY_MEDIUM_SPACE(),
        DIVIDER_LARGE(),
        EMPTY_LARGE_SPACE(),
        SECTION_TITLE('Обо мне'),
        EMPTY_SMALL_SPACE(),
        DIVIDER_LARGE(),
        EMPTY_SMALL_SPACE(),
        addAboutSection(privateInformation),
        addWorkExperienceSection(workExperienceList),
        addEducationSection(educationList),  
    ])


    const docDefinition = {
        pageSize: { width: 620, height: 877 },
        pageOrientation: 'portrait',
        pageMargins: 40,
        content: [
                {
                    columns: [
        
                        {
                            width: 150,
                            stack: leftSide,
                        },
                        {
                            width: 350,
                            stack: rightSide,
                        },
                    ],
                    columnGap: 40
                }
        ],
        styles: {
            h1: {
              fontSize: 25,
              bold: true,
              characterSpacing: 1.2,
              lineHeight: 1.2,
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