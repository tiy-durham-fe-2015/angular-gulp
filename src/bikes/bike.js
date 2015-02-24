app.factory('Bike', function () {
  // And we return our constructor function.
  return Bike;

  // Here, we define our Invoice constructor
  function Bike (spec) {
    spec = spec || {};

    var self = {
    name: spec.brand || 'Unknown Company',
    price: spec.price || 0,
    year: spec.year || 1941,
    previousOwners: spec.previousOwners || 'Superman',
    lineItems: spec.lineItems || [LineItem()],

    // lineItems: [{
    //   description: 'bullet-proofing',
    //   cost: 1000
    //   },
    //   {
    //   description: 'invisibility',
    //   cost: 10000
    //   },
    // ],

    get total () {
      return self.lineItems.reduce(function (total, item) {
        return total + item.cost;
      }, Number(self.price));
    },

      addLineItem: function (description, cost) {
        alert("HELLLO");
        self.lineItems.push(LineItem({
          description: description,
          cost: cost
        }));
      },

      deleteLineItem: function (item) {
        var index = self.lineItems.indexOf(item);

        if (index >= 0) {
          self.lineItems.splice(index, 1);
        }

        // Don't allow 0 line items
        if (!self.lineItems.length) {
          self.lineItems.push(LineItem());
        }
      }
    };

    return self;
  }

  // The LineItem class represents a single line item in
  // an invoice
  function LineItem (spec) {
    spec = spec || {};

    return {
      description: spec.description || 'Enter description',
      cost: spec.cost || 0
    };
  }

});
