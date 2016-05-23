// Code goes here
(function () {
  angular.module("expensesCalcApp", ['ngRoute', 'expensesCalcControllers'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/adminLogin', {
        templateUrl: 'transaction-list.html',
        controller: 'TransactionListCtrl', 
        controllerAs: 'tl'
      }).
      when('/userLogin', {
        templateUrl: 'expense-detail.html',
        controller: 'ExpensesDetailCtrl',
        controllerAs: 'ed'
      }).
      when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
  })();
