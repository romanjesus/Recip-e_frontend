angular.module("pantry.controller",[])

.controller("pantryController", function($scope, $ionicModal, $timeout, $http){

	$scope.items = [];
	$scope.item = "";
	$scope.data = {
  	showDelete: false
  };

  $ionicModal.fromTemplateUrl('templates/add_item.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openItemForm = function() {
    $scope.modal.show();
  };

  $scope.closeItemForm = function() {
    $scope.modal.hide();
  };

  $scope.submitItemForm = function() {
    var input = this.item;
    console.log('Adding Item', input);
    if(input.length > 0){
    	$scope.addItem(input);
  	}
    $timeout(function() {
      $scope.closeItemForm();
    }, 100);
    this.item = "";
  };

  $scope.addItem = function (item) {
  	if ($scope.items.indexOf(item) == -1) {
    	$scope.items.push({name: item});
		}
	};

	$scope.removeItem = function (index) {
  	$scope.items.splice(index, 1);
	};


  $scope.getList = function() {
    $http.get("http://localhost:3000/api/pantry")
    .then(function(response){
      console.log(response.data[0]);
      $scope.items = response.data;
      return response
    })
  };

  $scope.saveList = function() {
    var postData = {"ingredients": $scope.items}
    $http.post("http://localhost:3000/api/pantry", angular.toJson(postData))
    .then(function(response) {
      console.log('Successfully saved!')
    })
  }

})
