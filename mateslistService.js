angular.module("expensesCalcApp")
.factory("mateslistService", mateslistServiceFunction);

mateslistServiceFunction.$inject = ["$http", "$q"];

function mateslistServiceFunction ($http, $q) {
  return {
    getList: function (onSuccess) {
      var deferred = $q.defer();
      $http.get('matesList.json').success(function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  }
}
