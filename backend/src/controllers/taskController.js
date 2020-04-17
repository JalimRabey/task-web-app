const Task = require("../models/tasks");

module.exports = {
  async getTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async createTask(req, res) {
    try {
      const task = new Task({
        ...req.body,
      });
      await task.save();
      res.status(201).send(task);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateTask(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["task", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
      const task = await Task.findOne({ _id: req.params.id });

      if (!task) {
        return res.status(404).send("Task not found!");
      }

      updates.forEach((update) => (task[update] = req.body[update]));
      await task.save();
      res.status(200).send(task);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteTask(req, res) {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id });

      if (!task) {
        res.status(404).send();
      }

      res.send(task);
    } catch (error) {
      res.status(500).send();
    }
  },
};
