require('dotenv').config()
var mysql = require('mysql')
var db = module.exports = {}

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: true
});

connection.connect();

connection.on('error', function(err){
    if(err.code === "PROTOCOL_CONNECTION_LOST"){    
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        process.exit()
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        process.exit()
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        process.exit()
    }

    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
    }

    else{
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        process.exit()
    }
});

connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return escape(values[key]);
        }
        return txt;
    }.bind(this));
};


function escape(val) {
    if (val instanceof SecureSQL) return val.getValue();
    return mysql.escape(val);
}

function query(sql, data) {
    return new Promise((resolve, reject) => {
        if (!data) {
            return connection.query(sql, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        }

        connection.query(sql, data, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });

    })
}


function SecureSQL(str) {
    this.getValue = function () {
        return str;
    }
    this.str = str;
}

db.trust = function (str) {
    return new SecureSQL(str)
}

db.connection = connection;
db.query = query;