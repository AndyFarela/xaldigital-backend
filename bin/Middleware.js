const db  = require('../config/db')
const mid = {}
module.exports = mid;

mid.initialize = function() {
    return function(req, res, next) {
        req.$ctx = {$data:{}}
        next();
    }
}

mid.send = function(vArrayToSend) {
    return function(req, res, next) {
        const data = {}
        vArrayToSend.forEach(key => data[key] = req.$ctx.$data[key])
        res.send(data)
    }
}