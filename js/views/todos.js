var app = app || {};

app.TodoView = Backbone.View.extend({

    tagName: 'li',
    template: _.template ( $('#item-template').html() ),
    events: {
        'click .toggle': 'togglecompleted',
        'dblclick label': 'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    toggleVisible: function() {
        this.$el.toggleClass( 'hidden', this.isHidden() );
    },

    isHidden: function() {
        var isCompleted = this.model.get('completed');
        return (
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && TodoFilter === 'active')
        );
    },

    togglecompleted: function() {
        this.model.toggle();
    },

    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        this.$input = this.$('.edit');
        return this;
    },

    edit: function() {
        this.$el.addClass('editing');
        this.$el.focus();
    },

    close: function() {
        var value = this.$input.val().trim();
        if ( value ) {
            this.model.save({ title: value });
        }

        this.$el.removeClass('editing');
    },

    updateonEnter: function(e) {
        if (e.which === ENTER_KEY) {
            this.close();
        }
    },

    clear: function() {
        this.model.destroy();
    }

});