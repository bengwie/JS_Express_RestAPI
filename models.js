'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sortMe = function(a, b) {
   if (a.votes === b.votes){
      return b.updatedAt - a.updatedAt;
   } else {
      return b.votes - a.votes;
   }
};

var AnswerSchema = new Schema({
   text: String,
   createdAt: {type: Date, default: Date.now},
   updatedAt: {type: Date, default: Date.now},
   votes: {type: Number, default: 0}}
);

AnswerSchema.methods.update = function(updates, callback) {
   Object.assign(this, updates, {updatedAt: new Date()});
   this.parent().save(callback);
};

AnswerSchema.method("vote", function(vote, callback) {
   if (vote === "up") {
      console.log("adding vote by 1");
      this.votes += 1;
   } else {
      console.log("reducing vote by 1");
      this.votes -= 1;
   }
   this.parent().save(callback);
});

var QuestionSchema = new Schema({
   text: String,
   createdAt: {type: Date, default: Date.now},
   answers: [AnswerSchema]
});

QuestionSchema.pre("save", function(next) {
   this.answers.sort(sortMe);
   next();
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question; 
