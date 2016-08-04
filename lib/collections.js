// new mongo collection
this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

Meteor.methods({
  addEditingUser: function () {
    var doc, user, eusers;
    doc = Documents.findOne();
    if (!doc) {// no doc give up
      return;
    }
    if (!this.userId) {// no logged in user give up
      return;
    }
    // now i have a doc and possibly logged user
    user = Meteor.user().profile;// have logged in
    eusers = EditingUsers.findOne({docid: doc._id});
    if (!eusers) {
      eusers = {
        docid: doc._id,
        users: {},
      };
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;

    EditingUsers.upsert({_id: eusers._id}, eusers);
  }
});
