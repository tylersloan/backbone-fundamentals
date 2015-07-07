var app = app || {};

// Todo Model
app.Todo = Backbone.Model.extend({

    // defaults ensure all models have these attributes
    defaults: {
        title: '',
        completed: false
    },

    // toggle completed state of item
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }

});