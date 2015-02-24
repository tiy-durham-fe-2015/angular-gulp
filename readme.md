# Week 7 in-class app

A basic Angular + Gulp app

## Something non-standard that I do...

In angular, you need to declare your modules:

    angular.module('app', []);
    angular.module('users', []);

And so on... Then, you may want to add several controllers or factories or
whatnot to your module:

    angular.module('app').controller('MyCtrl', function () { });

And so on... But you have to remember not to put the [] in the angular.module
call when you're referring to an existing module, otherwise you'll blow the
module away.

Furthermore, if you forget to ever call angular.module('foo', []), and instead
only ever do angular.module('foo'), you'll get errors!

In addition to all of that, you also have to remember to register your modules
with the application's root module (whichever one you passed to ng-app).

And trust me *you will forget to register your modules*. I always forget, and
it takes me way too long to figure out why my modules aren't loading.

What a PITA!

### No modules

In this application, I'm just sticking everything into a single module ('app').

### A solution

In the real world, you'll probably have many modules per application.

I don't care if it's not "best practices". Here's what I do.

I create an object that has a module method, so I can just always call it
like this:

    app.module('mymodulename').controller // or whatevz

Then, after all of my scripts are loaded, I call `app.init()`, and my handy
object goes ahead and registers all modules with the root ('app') module
and sets everything up.

So, instead of doing something like this:

    var app = angular.module('app', [
      'ngRoute',
      'ngAnimate',
      'ghApi',
      // And a million other module names here...
      'users'
      ]);

    // Somewhere else this:
    angular.module('users', []);

    // And somewhere else this:
    angular.module('ghApi', []);

    // And somewhere else this:
    angular.module('users').controller('FooCtrl', function () { });

I can just do this:

    app.module('users').controller('FooCtrl', function () { });

And everything just works.

    var app = (function () {
      // Go ahead and register ngRoute, ngAnimate and any other standard Angular
      // dependencies here. This is a hash that will track all of our modules,
      // both external and internal.
      var registeredModules = {
        'ngRoute': true,
        'ngAnimate': true
      };

      return {
        // Registers an angular module and auto-injects it as a dependency of app
        module: function (name) {
          // If the module has already been defined, return it
          if (registeredModules[name]) {
            return angular.module(name);
          }

          // Otherwise, define it and return it
          registeredModules[name] = true;
          return angular.module(name, []);
        },

        // This should run after all angular modules have been declared
        // It basically declares the 'app' module and sticks all of the
        // other modules we've created into it as dependencies... It also
        // sets up the 404 handler...
        init: function () {
          angular.module('app', Object.keys(registeredModules))
            .config(['$routeProvider', function ($routeProvider) {
              $routeProvider.otherwise({
                controller: 'Error404Ctrl',
                controllerAs: 'vm',
                templateUrl: 'errors/404/error-404.html'
              });
            }]);
        }
      };
    })();
