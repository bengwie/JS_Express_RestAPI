'user strict';
var express = require("express");
var router = express.Router();
var Question = require("./models").Question;

router.param("id", function(req, res, next, id) {
   Question.findById(id, function(err, doc) {
      if (err) return next(err);
      if (!doc) {
         err = new Error("Not Found");
         err.status = 404;
         return next(err);
      }
      req.question = doc;
      next();
   });
});

router.param("aid", function(req, res, next, id){
   req.answer = req.question.answers.id(id);
   if (!req.answer) {
      console.log("Hi I am here!");
      var err = new Error("Not Found");
      err.status = 404;
      return next(err);
   }
   console.log("answer is found!");
   next();
});

// GET /questions
// Route for questions collections
router.get("/", (req, res, next) => {
   Question.find({}, null, {sort:{createdAt: -1}}, function(err, questions) {
      if (err) return next(err);
      res.json(questions);
   })
   //res.json({response : "You sent me GET request!"});
});


// POST /questions
// Route for questions collections
router.post("/", (req, res, next) => {
   var question = new Question(req.body);
   question.save(function(err, question) {
      if (err) return next(err);
      res.status(201);
      res.json(question);
   });
});

router.get("/:id", (req, res, next) => {
   res.json(req.question);
});

router.get("/:id/answers", (req, res, next) => {
   res.json(req.question.answers);
});

router.get("/:id/answers/:aid", (req, res, next) => {
   res.json(req.answer)
});

module.exports = router;

// POST /questions/:qID/answers
// Route for creating an answer
router.post("/:id/answers", (req, res, next) => {
   req.question.answers.push(req.body);
   req.question.save(function(err, question) {
      if(err) return next(err);
      res.status(201);
      res.json(question);
   });
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put("/:id/answers/:aid", (req, res, next) => {
   req.answer.update(req.body, function(err, result) {
      if (err) return next(err);
      res.json(result);
   });
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete("/:id/answers/:aid", (req, res, next) => {
   req.answer.remove(function(err){
      req.question.save(function(err, question) {
         if (err) return next(err);
         res.json(question);
      });
   });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post("/:id/answers/:aid/vote-:dir", (req, res, next) => {
   console.log(req.url);
   if (req.params.dir.search(/^(up|down)$/) === -1) {
      console.log("not found");
      var err = new Error("Not Found");
      err.status = 303;
      next(err);
   } else {
      console.log("test 1");
      req.vote = req.params.dir;
      console.log("vote is " + req.vote);
      next();
   }}, (req, res) => {
      console.log("test 2");
      req.answer.vote(req.vote, function(err, question){
         if (err) {
            console.log("Found an error: " + err.message);
            return next(err);
         }
         res.json(question);
      });
   }
);
