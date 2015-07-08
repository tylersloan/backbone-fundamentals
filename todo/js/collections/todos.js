var app = app || {};

var TodoList = Backbone.Collection.extend({
    // This collection's model is Todo
    model: app.Todo,

    // Instead of a backend, save all todos under LocalStorage namespaced 'todos-backbone'
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // filter out all the Todos that are completed
    completed: function() {
        return this.filter(function(todo) {
            return todo.get('completed');
        });
    },

    // filter out the todo items that are not completed, rather 'remaining'
    remaining: function() {
        return this.without.apply( this, this.completed() )
    },

    // This keeps todos in sequential order by giving each one a number
    nextOrder: function() {
        if ( !this.length ) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // sort the todos by their original insertion order
    comparator: function(todo) {
        return todo.get('order');
    }

});

app.Todos = new TodoList();