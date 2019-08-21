const TaskBl = require("../src/business/task-bl");

const { executeInTest, knex } = require("../src/data");

afterAll(() => {
  knex.destroy();
});

test("Should get a task", async () => {
  const task = await new TaskBl().getTask(1);
  expect(task.description).toEqual("buy a pair of glasses");
  expect(task.completed).toEqual(false);
});

test("Should create a task", async () => {
  await executeInTest(async trx => {
    const taskBl = new TaskBl(trx);
    const tasksBefore = await taskBl.getTasks(1);

    await taskBl.createTask({
      userId: 1,
      description: "Some new task!",
      completed: false
    });
    const tasksAfter = await taskBl.getTasks(1);

    expect(tasksAfter.length - tasksBefore.length).toEqual(1);
  });
});

test("Should delete a task", async () => {
  await executeInTest(async trx => {
    const taskBl = new TaskBl(trx);
    const tasksBefore = await taskBl.getTasks(1);

    await taskBl.deleteTask(tasksBefore[0].id);

    const tasksAfter = await taskBl.getTasks(1);
    expect(tasksBefore.length - tasksAfter.length).toEqual(1);
  });
});

test("Should mark a task as completed", async () => {
  await executeInTest(async trx => {
    const taskBl = new TaskBl(trx);
    const task = await taskBl.getTask(1);

    expect(task.completed).toEqual(false);

    task.completed = true;
    await taskBl.updateTask(task);

    const taskUpdated = await taskBl.getTask(1);
    expect(taskUpdated.completed).toEqual(true);
  });
});
