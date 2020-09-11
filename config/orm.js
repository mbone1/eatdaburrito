const connection = require("./connection.js");

//For loop to make an array of question marks and turn it into a string.
function printQuestionMarks(num) {
    let qMarks = [];

    for (let i = 0; i < num; i++) {
        qMarks.push("?");
        console.log(qMarks);
    }

    return qMarks.toString();
}
// function that converts object to SQL syntax
function objToSql(ob) {
    var arr = [];

    //for loop to push key and value as a string into array
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // this adds quotes around strings with spaces
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // {name: 'Hiroshi Yoshimura'} => ["name='Hiroshi Yoshimura'"]

            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//Object to make the SQL statement functions

let orm = {
    //function for selecting all items in a table
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //function for inserting a new
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    // An example of objColVals would be {burrito_name: california, devoured: true}
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
};

module.exports = orm;