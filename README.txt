npm init —> This is to start the package.json file. Can also be linked to git repository
npm install —> This is to install whatever specified as dependencies in package.json
npm install -g —> This is to install global package, ie. Http-server
npm install -g http-server

npm install express@1.1.12

npm uninstall
npm uninstall -g


Package.json:

{
  "name": "jhidayat",
  "version": "1.0.0",
  "description": "Learning Javascript",
  "main": ".eslintrc.js",
  "dependencies": {
    "ejs": "^2.5.6",
    "express": "^4.16.2",
    "jquery": "^3.2.1",
    "nodemon": "^1.11.0",
    "pug": "^2.0.0-rc.4"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jeffry Hidayat",
  "license": "MIT"
}


******** NOTE on dependencies:
    "ejs": "^2.5.6" —> 2.5.6 represents: Major release, minor release, patch

^ will let you install anything on latest minor release, but it doesn’t let you go above version 2 on major release for above example. It can go to 2.6.0, 2.6.12
~ will let you install anything on latest patch release but it doesn’t let you go above version 5 on minor release for above example. It can go to 2.5.9, 2.5.10



————————————————
Express

MongoDB: install and run Mongo DB first:
jhidayat-m01:~ jhidayat$ cd mongodb
jhidayat-m01:mongodb jhidayat$ ls
mongodb-osx-ssl-x86_64-3.6.2.tgz	mongodb-osx-x86_64-3.6.2
jhidayat-m01:mongodb jhidayat$ cd mongodb-osx-x86_64-3.6.2/
jhidayat-m01:mongodb-osx-x86_64-3.6.2 jhidayat$ ls
GNU-AGPL-3.0		README			bin
MPL-2			THIRD-PARTY-NOTICES
jhidayat-m01:mongodb-osx-x86_64-3.6.2 jhidayat$ pwd
/Users/jhidayat/mongodb/mongodb-osx-x86_64-3.6.2
jhidayat-m01:mongodb-osx-x86_64-3.6.2 jhidayat$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/jhidayat/mongodb/bin
jhidayat-m01:mongodb-osx-x86_64-3.6.2 jhidayat$ export PATH=$PATH:/Users/jhidayat/mongodb/mongodb-osx-x86_64-3.6.2/bin
jhidayat-m01:mongodb-osx-x86_64-3.6.2 jhidayat$ mongod


Run the program:
jhidayat-m01:express_rest_api jhidayat$ node mongoose_sandbox.js 
db connection successful
Saved!
Connection is closed
jhidayat-m01:express_rest_api jhidayat$ mongod —dbpath ./.    
> use sandbox
switched to db sandbox
> db.getCollectionNames()
[ "animals" ]
> db.animals.find()
{ "_id" : ObjectId("5a8f19cdcd1ce16b307caa7b"), "type" : "elephant", "size" : "big", "color" : "gray", "mass" : 6000, "name" : "Lawrence", "__v" : 0 }

