var Backbone.Factory = function (options) {
    var defaults = {
            all: {},
            collection: {},
            model: {},
            router: {},
            view: {}
        },
        config = $.extend(true, {}, options, defaults);

    var collection = Backbone.Collection.extend(config.all).extend(config.collection),
        model = Backbone.Model.extend(config.all).extend(config.model),
        router = Backbone.Router.extend(config.all).extend(config.router),
        view = Backbone.View.extend(config.all).extend(config.view);
  
    return {
        Collection: collection,
        Model: model,
        Router: router,
        View: view
    };
};