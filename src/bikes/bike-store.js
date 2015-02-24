app.factory('bikeStore', function () {
  // We'll capture this variable in a closure, and use it
  // as our global array of invoices.
  var bikes = [];

  return {
    all: function () {
      return bikes;
    },

    add: function (bike) {
      bikes.push(bike);
    },

    remove: function (bike) {
      var index = bikes.indexOf(bike);

      if (index >= 0) {
        bikes.splice(index, 1);
      }
    }
  };

});
