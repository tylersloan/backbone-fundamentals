// create Toto model
var Todo = Backbone.Model.extend({
    initialize: function () {
        console.log('Todo is initialized!');
    }
});

// new (blank) instance of Todo model
var newTodo = new Todo();