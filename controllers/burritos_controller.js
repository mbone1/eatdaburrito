let express = require("express");

let router = express.Router();

// Import the model (cat.js) to use its database functions.
let burrito = require("../models/burrito.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burrito.selectAll(function(data) {
        let hbsObj = {
            burritos: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

router.post("/api/burritos", function(req, res) {
    burrito.insertOne([
        "burrito_name", "devoured"
    ], [
        req.body.burrito_name, req.body.devoured
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/burritos/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    // console.log("devoured", devoured);

    burrito.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;