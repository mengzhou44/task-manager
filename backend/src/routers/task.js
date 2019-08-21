const express = require("express");
const Joi = require("joi");

const router = new express.Router();

const TaskBl = require("../business/task-bl");

const auth = require("../auth");
const { tryRun } = require("./_helper");

router.get("/api/tasks", auth, async (req, res) => {
  await tryRun(req, res, async () => {
    const tasks = await new TaskBl().getTasks(req.user.id);
    res.status(200).send(tasks);
  });
});

router.put("/api/task", auth, async (req, res) => {
  await tryRun(req, res, async () => {
    const task = await new TaskBl().updateTask(req.body);
    res.status(200).send(task);
  });
});

router.post("/api/tasks", auth, async (req, res) => {
  tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        description: Joi.string().required(),
        completed: Joi.bool().required
      })
    );

    let task = {
      ...req.body,
      userId: req.user.id
    };
    new TaskBl().createTask(task);
    return res.status(200).send("Task is created succssfully!");
  });
});

router.delete("/tasks/:id", auth, async (req, res) => {
  tryRun(req, res, async () => {
    await new TaskBl().deleteTask(req.params.id);
    res.status(200).send(task);
  });
});

module.exports = router;
