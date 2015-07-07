var app = app || {};

app.AppView = Backbone.View.extend({

    // instead of creating an elemnt, bind to #todoapp in the item template
    el: "#todoapp",

    // this is tempalte for showing completed todos in the footer
    statsTemplate: _.template( $('#stats-template').html() ),

    // at init we bind to events on the todos collection,
    // when items are added or changed
    initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);
    },

    // Add a single todo by creating a view for it,
    // then append it to the ul#todo-list
    addOne: function(todo) {
        var view = new app.TodoView({ model: todo });
        $('#todo-list').append( view.render().el );
    },

    // add all items in Todos collection at once
    addAll: function() {
        this.$('#todo-list').html('');
        app.Todos.each(this.addOne, this);
    }

});