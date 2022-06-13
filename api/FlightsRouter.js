module.exports = FlightsRouter;

const FlightsService = require('../services/flights/main')

function FlightsRouter(router){
    router.get('/',async (req, res, next) =>{
        try {
            const flights = await FlightsService.getFlights();

            res.send({success: true, data: flights})   
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los vuelos'));
        }
    });

    router.get('/airport-most-flights', async (req, res, next) => {
        try {
            const airport = await FlightsService.getAirportMostFlights();

            res.send({success: true, data: airport})
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los vuelos'));
        }
    })

    router.get('/airline-most-flights', async (req, res, next) => {
        try {
            const airline = await FlightsService.getAirlineMostFlights();

            res.send({success: true, data: airline})
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los vuelos'));
        }
    })

    router.get('/day-most-flights', async (req, res, next) => {
        try {
            const day = await FlightsService.getDayMostFlights();

            res.send({success: true, data: day})
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los vuelos'));
        }
    })

    router.get('/flights-for-day', async (req, res, next) => {
        try {
            const airlines = await FlightsService.flightsForDay();

            res.send({success: true, data: airlines})
        } catch (error) {
            console.log(error)
            next(new Error('Error al obtener los vuelos'));
        }
    })

    return router
}