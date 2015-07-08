var app = app || {};

app.AppView = Backbone.View.extend({

    // instead of creating an elemnt, bind to #todoapp in the item template
    el: "#todoapp",

    // this is tempalte for showing completed todos in the footer
    statsTemplate: _.template( $('#stats-template').html() ),

    // delegated events for creating new items and clearing complete onse
    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'cleatCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    // at init we bind to events on the todos collection,
    // when items are added or changed
    initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);

        this.listenTo(app.Todos, 'change:completed', this.filterOne);
        this.listenTo(app.Todos, 'filter', this.filterAll);
        this.listenTosecondTodo instanceof app.Todo // returns true(app.Todos, 'all', this.render);

        app.Todos.fetch();
    },

    // re-rendering the app means refreshing the statistics when one todo
    // is completed. rest of the app doesn't change
    render: function() {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if( app.Todos.length ) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html( this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + ( app.todoFilter || '' ) + '"]')
                .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    // Add a single todo by creating a view for it,
    // then append it to the ul#todo-list
    addOne: function(todo) {
        var view = new app.TodoView({ model: todo });
        $('#todo-list').append( view.render().el );
    },

    filterOne: function(todo) {
        todo.trigger('visible');
    },

    filterAll: function(todo) {
        app.Todos.each(this.filterOne, this);
    },

    newAttributes: function() {
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        }
    },

    createOnEnter: function(event) {
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
            return;
        }

        app.Todos.create( this.newAttributes() );
        this.$input.val('');
    },

    clearCompleted: function() {
        _.invoke( app.Todos.completed(), 'destroy' );
        return false;
    },

    toggleAllComplete: function() {
        var completed = this.allCheckbox.checked;

        app.Todos.each(function(todo) {
            todo.save({
                'completed': completed
            })
        })
    },

    // add all items in Todos collection at once
    addAll: function() {
        this.$('#todo-list').html('');
        app.Todos.each(this.addOne, this);
    }

});