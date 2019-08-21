const {Model} = require(".");

const Task = require('./task');

 class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "users.id",
          to: "tasks.user_id"
        }
      }
    };
  }
};

module.exports = User;
