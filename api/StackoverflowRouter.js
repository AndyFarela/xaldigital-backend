module.exports = StackoverflowRouter;

const StackOverflowService = require('../services/stackoverflow/main')

function StackoverflowRouter(router){
    router.get('/',async (req, res, next) =>{
        try {
            const items = await StackOverflowService.getItems();

            res.send({success: true, data: items})   
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los items'));
        }
    });

    router.get('/solve-not-solve-answers', async (req, res, next) => {
        try {
            const numberSolveAnswers = await StackOverflowService.getSolveAnswers();
            const numberNotSolveAnswers = await StackOverflowService.getNoSolveAnswers();

            res.send({success: true, solveAnswers: numberSolveAnswers, notSolveAnswers: numberNotSolveAnswers})
            
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los items'));
        }
    })

    router.get('/best-answer', async (req, res, next) => {
        try {
            const bestAnswer = await StackOverflowService.getBestAnswer();

            res.send({success: true, bestAnswer: bestAnswer})
            
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los items'));
        }
    })

    router.get('/least-seen-answer', async (req, res, next) => {
        try {
            const leastViewAnswer = await StackOverflowService.leastSeenQuestion();

            res.send({success: true, leastViewAnswer: leastViewAnswer})
            
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los items'));
        }
    })

    router.get('/newest-older-questions', async (req, res, next) => {
        try {
            const olderQuestion = await StackOverflowService.olderQuestion();
            const newestQuestion = await StackOverflowService.newestQuestion();

            res.send({success: true, olderQuestion: olderQuestion, newestQuestion: newestQuestion})
            
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los items'));
        }
    })

    return router;
}