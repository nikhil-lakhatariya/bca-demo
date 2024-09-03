const { Task } = require('../models/TaskModel');

const createTask = async (req, res) => {
    const { task, assign } = req.body;
    try {

        if (!task) {
            return res.status(404).send({ status: 404, message: "Task is require" });
        }

        if (!assign) {
            return res.status(404).send({ status: 404, message: "Assign is require" });
        }

        const obj = new Task({
            task,
            assign
        })

        let data = await obj.save();
        return res.status(201).send({ status: 201, message: "Task Create Successfully", data });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const taskStatusHandle = async (req, res) => {
    const { taskId, status } = req.body;

    try {
        if (!taskId) {
            return res.status(404).send({ status: 404, message: "TaskId is require" });
        }

        if (!status) {
            return res.status(404).send({ status: 404, message: "Status is require" });
        }

        const existingTask = await Task.findOne({ _id: taskId });
        if (!existingTask) {
            return res.status(404).send({ status: 404, message: "Task Not Found" });
        }

        let data = await Task.findOneAndUpdate({ _id: req.body.taskId }, { status: req.body.status }, { new: true });
        return res.status(200).send({ status: 200, message: "Status Change Successfully", data });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).send({ status: 200, message: "Tasks retrieved successfully", totalData: tasks.length, tasks });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const taskData = await Task.findById({ _id: id });
        if (taskData == null) {
            return res.status(404).send({ status: 404, message: "Task Not Found" });
        }
        return res.status(200).send({ status: 200, message: "Task retrieved successfully", data: taskData });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const getTaskByUserId = async (req, res) => {
    try {
        const taskData = await Task.find({ assign: req.params.userId });
        if (!taskData.length > 0) {
            return res.status(404).send({ status: 404, message: "Task Not Found" });
        }

        return res.status(200).send({ status: 200, message: "Task retrieved successfully", data: taskData });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const updateTask = async (req, res) => {
    try {
        const existingTask = await Task.findOne({ _id: req.body._id });
        if (!existingTask) {
            return res.status(404).send({ status: 404, message: "Task Not Found" });
        }

        let data = await Task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        return res.status(200).send({ status: 200, message: "Task Update Successfully", data });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const taskData = await Task.findOne({ _id: id });
        if (!taskData) {
            return res.status(404).send({ status: 404, message: "Task Not Found" });
        }
        await Task.findOneAndDelete({ _id: id });
        return res.status(200).send({ status: 200, message: `Task Deleted Successfully with Id:${id}` })
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

module.exports = {
    createTask,
    taskStatusHandle,
    getAllTask,
    getTaskById,
    getTaskByUserId,
    updateTask,
    deleteTask
}