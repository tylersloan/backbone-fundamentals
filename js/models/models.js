// create Todo model
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

// new instance of model with default values
var newTodo = new Todo();

// todo instance with title but using default 'completed' property of false
var anotherTodo = new Todo({
    title: 'Todo item here'
});

console.log(anotherTodo.toJSON());