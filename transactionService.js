angular.module("expensesCalcApp").factory("transactionService", transactionServiceFunction);

transactionServiceFunction.$inject = ["$http", "$q"];

function transactionServiceFunction ($http, $q) {
  return {
    getList: function (onSuccess) {
      var deferred = $q.defer();
      $http.get('transactionList.json').success(function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  }
}

