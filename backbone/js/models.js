var Property = Backbone.Model.extend({
    star: function() {
        this.set("starred", !this.get("starred"));
        this.save();
    }
});