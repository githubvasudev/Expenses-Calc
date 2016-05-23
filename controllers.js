(function () {
  angular.module("expensesCalcControllers", [])
  .controller("LoginCtrl", LoginCtrlFunction)
  .controller("TransactionListCtrl", TransactionListCtrlFunction)
  .controller("ExpensesDetailCtrl", ExpensesDetailCtrlFunction)
  
  
  LoginCtrlFunction.$inject = ["$scope","$rootScope","mateslistService","$location"];
   function LoginCtrlFunction ($scope, $rootScope, mateslistService,$location) {
    var ml = this;
    $rootScope.fullHeaderList = [];
    $rootScope.matesList = [];
    $rootScope.headerList = [];
    $rootScope.fullHeaderValueList = [];
    mateslistService.getList().then(onSuccess);
    function onSuccess (data) {
    $rootScope.fullHeaderValueList = data;
    ml.allList = data;
    for (var j=0; j < data.length; j++) {
      var headerName=data[j].header; 
      var value=data[j].value; 
      if(j<4){
         $rootScope.headerList.push(headerName);
      }else{
        $rootScope.matesList.push(headerName);
      }
      $rootScope.fullHeaderList.push(headerName);
      }
    }
     $scope.submit = function() {
      if($scope.userName == 'admin' && $scope.password == 'admin'){
        $location.path('/adminLogin');
      }
      if($scope.userName == 'user' && $scope.password == 'user'){
        $location.path('/userLogin');
      }
      };
  }
  
  TransactionListCtrlFunction.$inject = ["$http", "$rootScope", "transactionService"];
  function TransactionListCtrlFunction ($http, $rootScope, transactionService) {
    var vm = this;
     transactionService.getList().then(onSuccess);
    function onSuccess (data) {
      vm.transactions = data;
    }
  }
  
  ExpensesDetailCtrlFunction.$inject = ["$scope", "$rootScope"];
  function ExpensesDetailCtrlFunction ($scope, $rootScope) {
     var edd = this;
    $scope.date= new Date();
    $scope.mates = [];
    edd.selected=[];
    edd.transactions = [];
   
    
    angular.forEach($rootScope.matesList,function(mateName){
       $scope.mates.push({name:mateName});
    });
     
    $scope.toggleSelection = function(mate) {
      edd.givenTo="";
      var idx = edd.selected.indexOf(mate);
      if (idx > -1) {
      edd.selected.splice(idx, 1);
      }
      else {
      edd.selected.push(mate);
      }
      
     
    };
    
    
    $scope.submitExpenses = function(){
       var vasuShare = "0";
      var maniShare = "0";
      var suriShare = "0";
      var arunShare = "0";
       angular.forEach(edd.selected,function(mate){
          var share = $scope.amount/edd.selected.length;
          edd.givenTo = edd.givenTo+" "+mate;
          if(mate == "Vasu"){
            vasuShare = share;
          }
          if(mate == "Mani"){
            maniShare = share;
          }
          if(mate == "Suri"){
            suriShare = share;
          }
          if(mate == "Arun"){
            arunShare = share;
          }
      });
      
      edd.transactions.push({date:$scope.date,amount:$scope.amount,givenBy:$scope.givenBy.name,givenTo:edd.givenTo,Vasu:vasuShare,Mani:maniShare,Suri:suriShare,Arun:arunShare,reason:$scope.reason,other:$scope.other});
      //var aa = JSON.stringify(edd.transactions);
      var aa = angular.toJson(edd.transactions);
    console.log("aa = "+aa);
    };
  }
})();
