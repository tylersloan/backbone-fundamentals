// create Toto model
var Todo = Backbone.Model.extend({
    
});

// new (blank) instance of Todo model
var todo1 = new Todo();

// log todo1
console.log(JSON.stringify(todo1));

// new instance of Todo model
var todo2 = new Todo({
    title: 'Learn Backbone',
    completed: true
});

// log todo1
console.log(JSON.stringify(todo2));

