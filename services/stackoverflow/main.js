require('dotenv').config();
module.exports = {
    getItems,
    getSolveAnswers,
    getNoSolveAnswers,
    getBestAnswer,
    leastSeenQuestion,
    olderQuestion,
    newestQuestion
}

/**
 * Estructure of external api response
 * 
 * @return {Object} items [
 *  {
        tags: [
            "regex",
            "perl"
        ],
        owner: {
            reputation: @type {Number},
            user_id: @type {Number},
            user_type: @type {String},
            accept_rate: @type {Number},
            profile_image: @type {String},
            display_name: @type {String},
            link: @type {String}
        },
        is_answered: @type {Boolean},
        view_count: @type {Number},
        accepted_answer_id: @type {Number},
        answer_count: @type {Number},
        score: @type {Number},
        last_activity_date: @type {Number},
        creation_date: @type {Number},
        last_edit_date: @type {Number},
        question_id: @type {Number},
        content_license: @type {String},
        link: @type {String},
        title: @type {String}
        },
 * ]
 * 
 * 
 */



const base_api = process.env.API_STACKOVERFLOW
const axios = require('axios')

async function getResponse(){
    const items = await axios.get(base_api)
    return items.data;
}

async function getItems(){
    const items = await axios.get(base_api)
    return items.data.items;
}

async function getSolveAnswers(){
    const items = await getItems()
    const solveAnswer = items.filter(a => a.is_answered)
    return solveAnswer.length;    
}

async function getNoSolveAnswers(){
    const items = await getItems()
    const noSolveAnswer = items.filter(a => !a.is_answered)
    return noSolveAnswer.length;    
}

async function getBestAnswer(){
    const items = await getItems()
    let answers = {}
    const answers_ = items.map(a => {
        return answers[a.question_id] = a.score
    })

    const maxScore = Math.max.apply(null, answers_)
    
    for (const [question, max] of Object.entries(answers)) {
        if (max == maxScore) {
            return items.filter(a => a.question_id == question)
        }
    }
}

async function leastSeenQuestion(){
    const items = await getItems()
    let answers = {}
    const answers_ = items.map(a => {
        return answers[a.question_id] = a.view_count
    })

    const minView = Math.min.apply(null, answers_)
    
    for (const [question, max] of Object.entries(answers)) {
        if (max == minView) {
            return items.filter(a => a.question_id == question)
        }
    }
}

async function olderQuestion(){
    const items = await getItems()
    let answers = {}
    const answers_ = items.map(a => {
        return answers[a.question_id] = a.creation_date
    })

    const oldQ = Math.min.apply(null, answers_)
    
    for (const [question, max] of Object.entries(answers)) {
        if (max == oldQ) {
            return items.filter(a => a.question_id == question)
        }
    }
}

async function newestQuestion(){
    const items = await getItems()
    let answers = {}
    const answers_ = items.map(a => {
        return answers[a.question_id] = a.creation_date
    })

    const newQ = Math.max.apply(null, answers_)
    
    for (const [question, max] of Object.entries(answers)) {
        if (max == newQ) {
            return items.filter(a => a.question_id == question)
        }
    }
}