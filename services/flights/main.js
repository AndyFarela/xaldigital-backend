require('dotenv').config();
const db = require('../../config/db');

module.exports = {
    getFlights,
    getAirportMostFlights,
    getAirlineMostFlights,
    getDayMostFlights,
    flightsForDay
}

function to10 (n) {
    if(n < 10) return '0'.concat(n);
    return String(n);
}

function toSQL (date = new Date()) {
    date = new Date(date)
    return date.getFullYear() + '-' + to10(date.getMonth() + 1) + '-' + to10(date.getDate());
}

async function getFlights(){
    const flights = await db.query('select * from vuelos');

    return flights
}

async function getAirportMostFlights(){
    let Query = `
        SELECT v.id_aeropuerto, a.nombre_aeropuerto,  
            (SELECT COUNT(*) FROM vuelos WHERE id_aeropuerto = v.id_aeropuerto) AS numVuelos 
        FROM vuelos v 
        LEFT JOIN aeropuertos a ON a.id_aeropuerto = v.id_aeropuerto 
        GROUP BY v.id_aeropuerto 
        ORDER BY numVuelos ASC;
    `
    let flights = await db.query(Query)
    
    let first = flights[0]
    let medium = flights[Math.trunc((flights.length - 1) / 2)]
    let last = flights[flights.length - 1]
    let max = first

    if(medium.numVuelos > max.numVuelos) max = medium

    if(last.numVuelos > max.numVuelos) max = last

    return max
}

async function getAirlineMostFlights(){
    let Query = `
        SELECT v.id_aerolinea, a.nombre_aerolinea,  
            (SELECT COUNT(*) FROM vuelos WHERE id_aerolinea = v.id_aerolinea) AS numVuelos 
        FROM vuelos v 
        LEFT JOIN aerolineas a ON a.id_aerolinea = v.id_aerolinea 
        GROUP BY v.id_aerolinea
        ORDER BY numVuelos ASC;
    `
    let flights = await db.query(Query)

    let first = flights[0]
    let medium = flights[Math.trunc((flights.length - 1) / 2)]
    let last = flights[flights.length - 1]
    let max = first

    if(medium.numVuelos > max.numVuelos) max = medium

    if(last.numVuelos > max.numVuelos) max = last

    return max
}

async function getDayMostFlights(){
    let Query = `
        SELECT v.dia,
            (SELECT COUNT(*) FROM vuelos WHERE dia = v.dia) AS numVuelos 
        FROM vuelos v 
        GROUP BY v.dia
        ORDER BY numVuelos ASC;
    `
    let flights = await db.query(Query)

    let first = flights[0]
    let medium = flights[Math.trunc((flights.length - 1) / 2)]
    let last = flights[flights.length - 1]
    let max = first

    if(medium.numVuelos > max.numVuelos) max = medium

    if(last.numVuelos > max.numVuelos) max = last

    max.dia = toSQL(new Date(max.dia)) 

    return max
}

async function flightsForDay(){
    let Query = `
        select a.nombre_aerolinea, 
            (select count(id_vuelo) from vuelos where dia = v.dia and id_aerolinea = v.id_aerolinea) as flightsByAirline, 
            v.dia 
        from vuelos v 
        left join aerolineas a on a.id_aerolinea = v.id_aerolinea;
    `
    const flightsByDay = 2
    const flights = await db.query(Query)

    let airlines = {}

    flights.map((f, i) => {
        if(f.flightsByAirline > flightsByDay){
            airlines[f.nombre_aerolinea] = {vuelos: f.flightsByAirline, dia: f.dia}
        }
    })

    return airlines
}