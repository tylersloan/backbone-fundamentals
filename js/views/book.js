app.BookView = Backbone.View.extend({
   tagname: 'div',
    className: 'bookContainer',
    template: _.template( $('#bookTemplate').html() ),

    render: function() {
        // use this.$el to have access to jquery html()
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },

    events: {
        'click .delete': 'deleteBook'
    },

    deleteBook: function() {
        // actually delete the model
        this.model.destroy();

        // remove from dom
        this.remove();
    }
});