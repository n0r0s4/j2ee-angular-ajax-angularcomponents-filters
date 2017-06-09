/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Angular code
(function () {
    //Application module

    angular.module('pharmacyApp').controller("PurchaseController", ['$http', '$scope', '$window', '$cookies', 'accessService', 'userConnected', function ($http, $scope, $window, $cookies, accessService, userConnected) {
        $scope.purchase = new Purchase();
        $scope.purchase.setDeliveryDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
        //$scope.purchasesArray = new Array();
        $scope.idUser = $scope.$parent.idUser;
        $scope.productsArray=[];
        $scope.productToSell = new Product();
        //Scope variables
        $scope.showForm = 0;
        $scope.specialRequests = ["Delivery at the main hospital", "Fragil material, must be sended in a special vehicle", "Product easily contamined, special protection nedded"];
        var sr="";
        //Date pickers scope variables and functions
        $scope.minDeliveryDate = new Date((new Date()).setDate((new Date()).getDate() + 1));
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.dateOptions = {
            dateDisabled: "",
            formatYear: 'yyyy',
            maxDate: "",
            minDate: $scope.minDeliveryDate,
            startingDay: 1
        };

        $scope.deliveryDate = {
            opened: false
        };

        $scope.openDeliveryDate = function () {
            $scope.deliveryDate.opened = true;
        };
        
        $scope.specialReqMng = function (indexChecked) {
            if($("#specialReq"+indexChecked).is(":checked")) {
                $scope.purchase.addSpecialRequests($scope.specialRequests[indexChecked]);
            } else {
                $scope.purchase.removeSpecialRequests($scope.specialRequests[indexChecked]);
            }
        }
        
        this.addPurchase = function () {
            sr=prepareSpecialRequests();
            console.log(sr);
            
            $scope.purchase.specialRequestsFinal=sr;
            $scope.purchase.setIdUser(parseInt($scope.$parent.idUser));
            $scope.purchase.setIdProduct($scope.productToSell.getId());
            var dateInMils = $scope.purchase.getDeliveryDate().getTime();
            $scope.purchase.setDeliveryDate(dateInMils);
            console.log(dateInMils);
            console.log($scope.purchase);
            $scope.purchase = angular.copy($scope.purchase);
            // Server conenction to verify user's data.
            var promise = accessService.getData("MainController",
                    true, "POST", {controllerType: 2, action: 10000, JSONData: JSON.stringify($scope.purchase)});

            promise.then(function (outputData) {
                
                console.log(outputData);
                if (outputData[0] === true) {
                    alert("Your purchase was done succesfully!");
                    location.reload();
                } else {
                    if (angular.isArray(outputData[1])) {
                        console.log(outputData);
                    }
                }
            });
        }
        
        function prepareSpecialRequests(){
            var sr=":";
            var specialRequests=$scope.purchase.getSpecialRequests();
            for (var i=0; i<$scope.purchase.getSpecialRequests().length; i++){
                sr+=specialRequests[i];
                sr+=(":");
            }
            return sr;
        }
               console.log($scope.$parent.idUser)
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
                    $scope.productToSell = $scope.productsArray[0];
                    
                } else {
                    if (angular.isArray(outputData[1])) {
                        console.log(outputData);
                    } else {
                        alert("There has been an error in the server, try later");
                    }
                }
            });

        }
        this.loadProducts();
        
        
        }]);//end controller

})();

