app.factory('invoiceStore', function () {
  // We'll capture this variable in a closure, and use it
  // as our global array of invoices.
  var invoices = [];

  return {
    all: function () {
      return invoices;
    },

    add: function (invoice) {
      invoices.push(invoice);
    },

    remove: function (invoice) {
      var index = invoices.indexOf(invoice);

      if (index >= 0) {
        invoices.splice(index, 1);
      }
    }
  };

});
