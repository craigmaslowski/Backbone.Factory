var factory = Backbone.Factory({
    all: {
        foo: 'bar'
    }, 

    model: {
        foo: 'baz', 
        free: 'beer'
    },

    router: {
        free: 'willy'
    },

    view: { 
        color: 'black' 
    }
});

describe('Backbone.Factory', function () {
    describe('Collection', function () {
        var Collection = factory.Collection.extend();
        var collection = new Collection();

        it('should have a foo property', function ()
        {
            expect(collection.foo).toBeDefined();
        });

        it('should have a foo property with value of "bar"', function ()
        {
            expect(collection.foo).toEqual("bar");
        });

        it('should not have a free property', function () {
            expect(collection.free).toBeUndefined();
        });

        it('should not have a color property', function () {
            expect(collection.color).toBeUndefined();
        });
    });

    describe('Model', function () {
        var Model = factory.Model.extend();
        var model = new Model();

        it('should have a foo property', function ()
        {
            expect(model.foo).toBeDefined();
        });

        it('should have a foo property with value of "baz"', function ()
        {
            expect(model.foo).toEqual("baz");
        });

        it('should have a free property', function () {
            expect(model.free).toBeDefined();
        });

        it('should have a free property with value of "beer"', function ()
        {
            expect(model.free).toEqual("beer");
        });

        it('should not have a color property', function () {
            expect(model.color).toBeUndefined();
        });
    });

    describe('Router', function () {
        var Router = factory.Router.extend();
        var router = new Router();

        it('should have a foo property', function ()
        {
            expect(router.foo).toBeDefined();
        });

        it('should have a foo property with value of "bar"', function ()
        {
            expect(router.foo).toEqual("bar");
        });

        it('should have a free property', function () {
            expect(router.free).toBeDefined();
        });

        it('should have a free property with value of "willy"', function ()
        {
            expect(router.free).toEqual("willy");
        });

        it('should not have a color property', function () {
            expect(router.color).toBeUndefined();
        });
    });

    describe('View', function () {
        var View = factory.View.extend();
        var view = new View();

        it('should have a foo property', function ()
        {
            expect(view.foo).toBeDefined();
        });

        it('should have a foo property with value of "bar"', function ()
        {
            expect(view.foo).toEqual("bar");
        });

        it('should not have a free property', function () {
            expect(view.free).toBeUndefined();
        });

        it('should have a color property', function () {
            expect(view.color).toBeDefined();
        });

        it('should have a color property with value of "black"', function ()
        {
            expect(view.color).toEqual("black");
        });
    });
});

