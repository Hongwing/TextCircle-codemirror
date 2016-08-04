
Template.editor.helpers({
  docid: function () {
    var doc = Documents.findOne();
    if (doc) {
      return doc._id;
    }else {
      return undefined;
    }
  },
  config: function () {
    return function (editor) {
      editor.setOption("lineNumbers", true);
      editor.setOption("mode", "html");
      editor.setOption("theme", "cobalt");
      editor.on("change", function (cm_editor, info) {
        $("#meframe").contents().find("html").html(cm_editor.getValue());
        // EditingUsers.insert
        Meteor.call("addEditingUser");
      })
    };
  }
});

Template.editingUser.helpers({
  users: function () {
    var doc, users, eusers;
    doc = Documents.findOne();
    if (!doc) {// give up
      return ;
    }
    eusers = EditingUsers.findOne({docid: doc._id});
    if (!eusers) {// give up
      return ;
    }
    users = new Array();
    var i = 0;
    for (var user_id in eusers.users) {
      users[i] = fixObjectKey(eusers.users[user_id]);
      i++;
    }
    return users;
  }
});

Template.netease.helpers({
  Current: function () {
    if (Meteor.user()) {
      return true;
    }else
    {
        return false;
    }
  }
});

// fix '-' with first-name and last-name
function fixObjectKey (obj) {
  var newObj = {};
  for (var key in obj) {
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
};
