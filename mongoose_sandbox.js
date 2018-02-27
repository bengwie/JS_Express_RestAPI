'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err) {
   console.error("connection error:" , err);
});

db.once("open", function() {
   console.log("db connection successful");
   // All database communication goes here
   var schema = mongoose.Schema;
   var animalSchema = new schema({
      type: {type: String, default: "goldfish"},
      size: {type: String, default: "small"},
      color: {type: String, default: "golden"},
      mass: {type: Number, default: 0.007},
      name: {type: String, default: "Angela"}
   });

   var Animal = mongoose.model("Binatang", animalSchema);
   var elephant = new Animal({
      type: "elephant",
      size: "big",
      color: "gray",
      mass: 6000,
      name: "Lawrence"
   });

   var whale = new Animal({
      type: "whale",
      size: "big",
      mass: 190500,
      name: "Fig"
   });

   var animal = new Animal({}); //Goldfish
   var animalDatas = [
      {type: "wolf",
       mass: 1000,
       name: "Wolfey"
      },
      elephant,
      whale,
      animal
   ];

   Animal.remove({}, function(err) {
      if (err) console.error("Save failed.", err);
      Animal.create(animalDatas, function(err, animals) {
         if (err) console.error("Save failed.", err);
         Animal.find({size: "big"}, function(err, animals) {
            console.log("animals is: " + animals);
            animals.forEach(function(animal){
               console.log(animal.name + " the " + animal.color +
                     " " + animal.type);
            });
            db.close(function() {
               console.log("Connection is closed"); 
            });
         });
      });
   });
});
