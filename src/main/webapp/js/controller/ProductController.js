/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Angular code
(function () {
    //Application module

    angular.module('pharmacyApp').controller("ProductController", ['$scope','$http', '$filter', '$window', '$cookies', 'accessService', 'userConnected', function ($scope, $http, $filter, $window, $cookies, accessService, userConnected) {
        $scope.productsArray = new Array();
       /* $scope.productToSel = new Product();
        $scope.productToSel = $scope.productsArray[0];  */  
	$scope.showForm=0;
	$scope.reviewsArray = new Array();
	$scope.usersArray = new Array();
	$scope.filmsArray = new Array();
	//Pagination variables
	$scope.pageSize = 2;
	$scope.currentPage = 1;  
        //////
        $scope.showForm=0;
        $scope.add=false;
        $scope.tapprice="";
        $scope.tapname="";
        
		$scope.$watch("nameSearch+priceSearch", function (){
	                $scope.filteredData = $filter('filter')
	                        ($scope.productsArray,
	                                {name: $scope.nameSearch,
                                         price: $scope.priceSearch}
	                        );
	});           
        
        this.loadProducts = function () {
            //Server conenction to verify user's data
            var promise = accessService.getData("MainController",
                    true, "POST", {controllerType: 1, action: 10000, JSONData: {products: ''} });

            promise.then(function (outputData) {
                if (outputData[0] === true) {
                    for (var i=0; i<outputData[1].length; i++) {
                        var productObj = new Product();
                        productObj.construct(outputData[1][i].id, outputData[1][i].name, outputData[1][i].price);
                        $scope.productsArray.push(productObj);
                    }
                    //$scope.selectedProduct = $scope.productsArray[0];
                    $scope.filteredData =$scope.productsArray;
                    $scope.reviewsModArray=$scope.productsArray;
                    //$scope.filteredData = $scope.reviewsModArray;                   
                } else {
                    if (angular.isArray(outputData[1])) {
                        console.log(outputData);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });          
        }
        
        /*************INICIO COPYPASTEO**************/
        
            /*$scope.addReview = function () {
			var film = new Review();
			film.construct(0,$scope.reviewsArray[0].getId(),$scope.usersArray[0].getId(),"",0,"",false,false, []);
			$scope.filmsArray.push(film);
		}*/
                
                $scope.addProduct = function(){
                    $scope.newProduct = new Product();
                    $scope.newProduct.setId(0);
                    $scope.newProduct.setName($scope.tapname);
                    $scope.newProduct.setPrice($scope.tapprice);
                    console.log($scope.newProduct);
				var conf=confirm("Are you sure you want to add this product with id "+$scope.newProduct.getName()+"?");
				if (conf){
                                        var toAdd=angular.copy($scope.newProduct);
					var promise = accessService.getData("MainController",
		      true, "POST", {controllerType: 1, action: 10200, JSONData: JSON.stringify(toAdd)});
					promise.then(function (outputData) {
						console.log(outputData);
						if(outputData[0] === true) {
							alert("Added succesfully");
                                                        location.reload();
                                                        ////de momento un reload y va ke chuta
                                                        //tengo por ahí una función hecha de insertedId 
                                                        //con generatedKeys bastante guapa
                                                        //ke buskaré si tengo tiempo, porké 
                                                        //lastinserted id no es correcto
                                                        //si la bdd es atacada por más de un cliente
							}
						else {
                                                    
							if(angular.isArray(outputData[1])) {
								alert(outputData[1]);
							}
							else {
								alert("There has been an error in the server, try later");
							}
						}
					});
				}                                                                                                                                        
                }
                
		$scope.removeReview = function (indexReview)
		{
                    var positionToRemove;
			if($scope.filmsArray.length ==1) {alert("At least one film must be inserted")}
			else {
				var conf=confirm("Are you sure you want to remove this product with id "+indexReview+"?");
				if (conf){
                                        
                                        for(var i=0; i<$scope.productsArray.length;i++){
                                            if($scope.productsArray[i].getId()==indexReview){
                                               var toRemove=new Product();
                                                toRemove=angular.copy($scope.productsArray[i]); 
                                                positionToRemove=i;
                                            }                                                
                                        }
					/*var toRemove=new Product();
					toRemove=angular.copy($scope.productsArray[indexReview]);*/
                                        console.log(toRemove);

					var promise = accessService.getData("MainController",
		      true, "POST", {controllerType: 1, action: 10100, JSONData: JSON.stringify(toRemove)});
					promise.then(function (outputData) {
						console.log(outputData);
						if(outputData[0] === true) {
							alert("Removed succesfully");
                                                        $scope.productsArray.splice(positionToRemove,1);
							}
						else {
                                                    
							if(angular.isArray(outputData[1])) {
								alert("You can't remove this product, currently we have a purchase with it!");
							}
							else {
								alert("There has been an error in the server, try later");
							}
						}
					});
				}
			}
		}

		$scope.modReviews = function () {
                    console.log("working");
      var productsArray = angular.copy($scope.productsArray);
			console.log($scope.reviewsModArray);
			var promise = accessService.getData("MainController", true, "POST", {controllerType:1, action:10300 ,JSONData: JSON.stringify(productsArray)});
			promise.then(function (outPutData) {
                            console.log(outPutData);
				if(outPutData[0]=== true)
				{
          //Form Initialize
					$scope.modReviewsForm.$setPristine();

					$scope.shomForm=0;

					alert("Products modfied correctly");
				}
				else
				{
					if(angular.isArray(outPutData[1]))
					{
                                             alert(outPutData[1]);
					}
					else {alert("There has been an error in the server, try later");}
				}

			});
			//alert("hello");
		}     
        
        /***************FIN COPYPASTEO****************/
        
    }]);


})();

