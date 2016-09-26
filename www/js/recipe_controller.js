angular.module("recipe.controller",[])

.controller("recipeController", function($scope, $sce, $http, $rootScope, $ionicHistory){

	$rootScope.recipes = []
	$rootScope.recipe = {}

	$scope.findRecipes = function() {
		var post = { "ingredients": $scope.items };
		console.log(angular.toJson(post));
		$http.post("http://localhost:3000/api/ingredients", angular.toJson(post))
		.then(function(response){
      console.log(response);
      $rootScope.recipes = (response.data.body);
    })
	};

	$scope.getRecipe = function(id) {
		var recipe_id = { "id": id }
		$http.post("http://localhost:3000/api/recipe", angular.toJson(recipe_id))
		.then(function(response){
			$rootScope.recipe = response.data.body
			console.log($rootScope.recipe)
		})
	}

	$scope.renderHTML = function(html_code){
        return $sce.trustAsHtml(html_code);
    };

})

