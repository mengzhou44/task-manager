const Task = require("../data/Task");

module.exports = class TaskBl {
  constructor(trx) {
    this.trx = trx;
  }

  async getTasks(userId) {
    return await Task.query(this.trx).where({ userId });
  }

  async getTask(id) {
    return await Task.query(this.trx).findOne({ id });
  }

  async deleteTask(id) {
    return await Task.query(this.trx)
      .delete()
      .where({ id });
  }

  async createTask(task) {
    return await Task.query(this.trx)
    .allowInsert("[description, completed, userId]")
    .insert(task);
  }

  async updateTask(task) {
    let updated = await Task.query(this.trx).patchAndFetchById(task.id, task);
    return updated;
  }
};
