// TODO:
// Add a new invoice and allow the user to edit it...
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/invoices/new', {
    controller: 'NewInvoiceCtrl',
    controllerAs: 'vm',
    templateUrl: 'invoices/new-invoice.html'
  });
}]).controller('NewInvoiceCtrl', ['$location', 'Invoice', 'invoiceStore', function($location, Invoice, invoiceStore) {
  var self = this;

  self.invoice = Invoice();

  self.doneEditing = function () {
    invoiceStore.add(self.invoice);
    self.goToInvoices();
  };

  self.cancelEditing = function () {
    self.goToInvoices();
  };

  self.goToInvoices = function () {
    $location.path('/invoices');
  };

}]);
