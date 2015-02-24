app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    controller: 'BikesCtrl',
    controllerAs: 'vm',
    templateUrl: 'bikes/bikes.html'
  };

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/bikes', routeDefinition);
}]).controller('BikesCtrl', ['bikeStore', function(bikeStore) {
  var self = this;

  self.all = bikeStore.all;

  self.removeBike = bikeStore.remove;

}]);
