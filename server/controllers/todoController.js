const Todo = require("../models/Todo.js");

// get all todos
// route - Get /api/todos
// access private

exports.getTodos = async (req, res)=>{
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
};

// create new Todo
// post /api/todos
// access private

exports.createTodo = async (req, res)=>{
    if(!req.body.task){
        return res.status(400).json({
            message:"Please add task field"
        });
    }

    const newTodo = new Todo({
        task: req.body.task,
        userId: req.user.id 
    });

    await newTodo.save();
    res.status(200).json(newTodo);
};

// update Todo
// put /api/todos/:id
// access private

exports.updateTodo = async(req,res)=>{
    const updatedTodo = await Todo.findOneAndUpdate(
        {_id: req.params.id, userId: req.user.id},
        {completed: req.body.completed},
        {new: true}
    );

    if(!updatedTodo){
        return res.status(404).json({
            message:"todo not found or not authorized"
        });
    }

    res.json(updatedTodo);
};


// delete todo

exports.deleteTodo = async (req, res) =>{
    const todo = await Todo.findOneAndDelete({_id:req.params.id, userId: req.user.id});

    if(!todo){
        return res.status(404).json({
            message:"Todo not found or not autorized"
        });
    }

    res.json({id:req.params.id , message:"Deleted successfully"});
}

