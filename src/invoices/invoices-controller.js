app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    controller: 'InvoicesCtrl',
    controllerAs: 'vm',
    templateUrl: 'invoices/invoices.html'
  };

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/invoices', routeDefinition);
}]).controller('InvoicesCtrl', ['invoiceStore', function(invoiceStore) {
  var self = this;

  self.all = invoiceStore.all;

  self.removeInvoice = invoiceStore.remove;

}]);
