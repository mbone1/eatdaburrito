let orm = require("../config/orm.js"); //importing the ORM to bring in functions

let burrito = {
    selectAll: function(cb) {
        orm.selectAll("burritos", function(res) {
            cb(res);
        });
    },
    //the variables of cols/vals = arrays
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burritos", cols, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColVals, devoured, cb) {
        orm.updateOne("burritos", objColVals, devoured,
            function(res) {
                cb(res);
            });
    },

};

//exported to burritos_controller.js

module.exports = burrito;