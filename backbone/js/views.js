var PropertyShowView = Backbone.View.extend({
    tagName: 'article',
    className: 'property',
    template: loadTemplate("property-show"),
    render: function () {
        this.el.innerHTML = this.template(this.model.attributes);
        return this;
    }
});