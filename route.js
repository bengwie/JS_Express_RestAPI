'user strict';
var express = require("express");
var router = express.Router();
var Question = require("./models").Question;

// GET /questions
// Route for questions collections
router.get("/", (req, res, next) => {
   Question.find({}, null, {sort:{createdAt: -1}}, function(err, questions) {
      if (err) next(err);
      res.json(questions);
   })
   //res.json({response : "You sent me GET request!"});
});


// POST /questions
// Route for questions collections
router.post("/", (req, res) => {
   res.json({
         response : "You sent me POST request!",
         body : req.body});
});

router.get("/:id", (req, res) => {
   res.json({
         response : "You sent me GET request with ID: " + req.params.id}); 
});
module.exports = router;

// POST /questions/:qID/answers
// Route for creating an answer
router.post("/:qID/answers", (req, res) => {
   res.json({
         response : "You sent me POST request!",
         questionId: req.params.qID,
         body : req.body});
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put("/:qID/answers/:aID", (req, res) => {
   res.json({
         response : "You sent me PUT request!",
         questionId: req.params.qID,
         answerId: req.params.aID,
         body : req.body});
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete("/:qID/answers/:aID", (req, res) => {
   res.json({
         response : "You sent me DELETE request!",
         questionId: req.params.qID,
         answerId: req.params.aID,
   });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post("/:qID/answers/:aID/vote-:dir", (req, res, next) => {
   console.log(req.url);
   if (req.params.dir.search(/^(up|down)$/) === -1) {
      console.log("not found");
      var err = new Error("Not Found");
      err.status = 303;
      next(err);
   } else {
      res.json({
            response : "You sent me POST request to /vote-" + req.params.dir,
            questionId: req.params.qID,
            answerId: req.params.aID,
            vote: req.params.dir
      });
   }
});

