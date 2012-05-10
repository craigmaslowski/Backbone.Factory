Backbone.Factory
================

Adds a Factory object to Backbone which ensures that Backbone collections, models, routers, and views will contain certain properties.

## What does it do?

Backbone.Factory allows you to define properties which Backbone objects (Collections, Models, Routers, and Views) will include.

```JavaScript
var factory = Backbone.Factory({
	all: {
		everyWhereProperty: 'My everywhere property'
	}
});

var MyModel = factory.Model.extend({
	initialize: function () {
		console.log(this.everyWhereProperty); // 'My everywhere property'
	}
});

var MyView = factory.View.extend({
	initialize: function () {
		console.log(this.everyWhereProperty); // 'My everywhere property'
	}
});
```

Backbone.Factory also let's you specify properties which only certain types of Backbone objects should include.

```JavaScript
var factory = Backbone.Factory({
	all: {
		everyWhereProperty: 'My everywhere property'
	}, 

	collection: {
		collectionOnlyProperty: 'My collection property'
	},

	model: {
		modelOnlyProperty: 'My model property'
	},

	router: {
		routerOnlyProperty: 'My router property'
	},

	view: {
		mviewOnlyProperty: 'My view property'
	}
});

var MyCollection = factory.Collection.extend({
	initialize: function () {
		console.log(this.everyWhereProperty); // 'My everywhere property'
		console.log(this.collectionOnlyProperty); // 'My collection property'
		console.log(this.modelOnlyProperty); // undefined
		console.log(this.routerOnlyProperty); // undefined
		console.log(this.viewOnlyProperty); // undefined
	}
});

var MyModel = factory.Model.extend({
	initialize: function () {
		console.log(this.everyWhereProperty); // 'My everywhere property'
		console.log(this.collectionOnlyProperty); // undefined
		console.log(this.modelOnlyProperty); // 'My model property'
		console.log(this.routerOnlyProperty); // undefined
		console.log(this.viewOnlyProperty); // undefined
	}
});

var MyRouter = factory.Router.extend({
	initialize: function () {
		console.log(this.everyWhereProperty); // 'My everywhere property'
		console.log(this.collectionOnlyProperty); // undefined
		console.log(this.modelOnlyProperty); // undefined
		console.log(this.routerOnlyProperty); // 'My router property'
		console.log(this.viewOnlyProperty); // undefined
	}
});

var MyView = factory.View.extend({
	initialize: function () {
		console.log(this.everyWhereProperty); // 'My everywhere property'
		console.log(this.collectionOnlyProperty); // undefined
		console.log(this.modelOnlyProperty); // undefined
		console.log(this.routerOnlyProperty); // undefined
		console.log(this.viewOnlyProperty); // 'My view property'
	}
});
```

## Why do I need this?

You don't, of course, but read on to understand the motivation behind this extension to Backbone.

Let's say you understand the importance of building a loosely coupled system, so your application uses an event broker which your modules use to communicate with each other. You could access this broker from inside of your Backbone objects in a number of ways, but these methods either don't read well, or aren't very DRY.

You could reference the broker from the global object.

```JavaScript
var MyModel = Backbone.Model.extend({
	initialize: function() {
		// reads ok, but there must be a better way
		window.broker.subscribe('someEvent', function() {
			// do something
		}); 
	}
});

var MyOtherModel = Backbone.Model.extend({
	initialize: function() {
		// reads ok, but there must be a better way
		window.broker.subscribe('someEvent', function() {
			// do something
		}); 
	}
});
```
You could pass the broker to the Backbone object as an option.

```JavaScript
var MyModel = Backbone.Model.extend({});
	initialize: function() {
		// doesn't read well
		this.options.broker.subscribe('someEvent', function() {
			// do something
		}); 
	}
});

var MyOtherModel = Backbone.Model.extend({
	initialize: function() {
		// doesn't read well
		this.options.broker.subscribe('someEvent', function() {
			// do something
		}); 
	}
});

var myModel = new MyModel({}, {broker: window.broker}); // not very DRY
var myOtherModel = new MyOtherModel({}, {broker: window.broker}); // not very DRY
```

You could hardcode a property which references the var from the global object:

```JavaScript
var MyModel = Backbone.Model.extend({
	broker: window.broker, // not very DRY

	initialize: function() {
		// reads well
		this.broker.subscribe('someEvent', function() {
			// do something
		}); 
	}
});

var MyOtherModel = Backbone.Model.extend({
	broker: window.broker, // not very DRY

	initialize: function() {
		// reads well
		this.broker.subscribe('someEvent', function() {
			// do something
		}); 
	}
});
```

Here's how it would look using Backbone.Factory

```JavaScript
var factory = Backbone.Factory({
    all: {
        broker: window.broker
    }
});

var MyModel = factory.Model.extend({
    initialize: function () {
        this.broker.subscribe('someEvent', function() {
			// do something
		}); // like magic!
    }
});

var MyOtherModel = factory.Model.extend({
    initialize: function () {
        this.broker.subscribe('someEvent', function() {
			// do something
		}); // shows up here too!
    }
});
```

An added benefit to using Backbone.Factory is the ability to easily mock these properties when testing without changing any of your Backbone code.

```JavaScript
var mockBroker = {
	subscribe: function(channel, callback) {
		var mockResponse = {
			some: 'mock data'
		}
		callback(mockResponse);
	};
}

var factory = Backbone.Factory({ 
	all: {
		broker: mockBroker
	}
});
```