import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (!Documents.findOne()) {
    console.log("load date...");
    Documents.insert({"title": "deepin new post"});
  }
});
