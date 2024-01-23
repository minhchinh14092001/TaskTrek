const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;

  // Check if the text is empty
  if (!text || text.trim() === '') {
    return res.status(400).send("Task cannot be empty");
  }

  ToDoModel.create({ text })
    .then((data) => {
      console.log("Added Successfully...");
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error("Error adding todo:", error);
      res.status(500).send("Internal Server Error");
    });
};

module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Updated Successfully..."))
    .catch((err) => console.log(err));
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Successfully..."))
    .catch((err) => console.log(err));
};
