
app.controller('MainCtrl', function($scope, $routeParams, $route, $location)
{
    $scope.$watch(function()
        {
            return ($route.current && $route.current.css) ? $route.current.css : 'views/product/product.css';
        },
        function(value)
        {
            $scope.css = value;
        });
});

app.directive("imageInput", function($parse){
    return{
        link: function($scope, element, attrs){
            element.on("change", function(event){
                var fileName = $(this).val().split("\\").pop();
                $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
                let files = event.target.images;
                $parse(attrs.imageInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
});

app.directive("fileInput", function($parse){
    return{
        link: function($scope, element, attrs){
            element.on("change", function(event){
                var fileName = $(this).val().split("\\").pop();
                $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
                let files = event.target.files;
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
});

app.controller('product', function($scope,$location,$http,$route,$filter) {
    if(sessionStorage.isAuthenticated === "true"){
        $scope.useremail = sessionStorage.user
    }else{
        $location.path('/');
    }

    $scope.logout = function () {
        sessionStorage.clear();
        $location.path('/');
    };

    $scope.list = function () {
        $http.get('api/viewproduct.php').then(function(response) {
            $scope.names = response.data;
        });
    };

    $scope.add_product = function() {
        let from_date = $filter('date')($scope.from_date, "dd-MM-yyyy");
        let to_date = $filter('date')($scope.to_date, "dd-MM-yyyy");

        var form_data = new FormData();

        angular.forEach($scope.images, function(file){
            form_data.append('image', file);
        });

        angular.forEach($scope.files, function(file){
            form_data.append('file', file);
        });

        form_data.append('product_name',$scope.product_name);
        form_data.append('description',$scope.description);
        form_data.append('short_description',$scope.short_description);
        form_data.append('price',$scope.price);

        if($scope.product_name === undefined || $scope.product_name === "undefined" || $scope.product_name === '' || $scope.product_name === null){
            $scope.error = "Enter Product Name";
        }else if($scope.description === undefined || $scope.description === "undefined" || $scope.description === '' || $scope.description === null) {
            $scope.error = "Enter Description";
        }else if($scope.short_description === undefined || $scope.short_description === "undefined" || $scope.short_description === '' || $scope.short_description === null) {
            $scope.error = "Enter Description";
        }else if($scope.price === undefined || $scope.price === "undefined" || $scope.price === '' || $scope.price === null) {
            $scope.error = "Enter Description";
        }else if($scope.discount !== undefined){
            if((from_date === undefined || from_date === "undefined" || from_date === '' || from_date === null) || (to_date === undefined || to_date === "undefined" || to_date === '' || to_date === null)){
                $scope.error = "Enter Date"
            }
            if(from_date > to_date){
                $scope.error = "Invalid to date"
            }
            else{
                form_data.append('discount',$scope.discount);
                form_data.append('from_date',$filter('date')($scope.from_date, "dd-MM-yyyy"));
                form_data.append('to_date',$filter('date')($scope.to_date, "dd-MM-yyyy"));
            }
        } else{
            console.log("else part")
            $http.post('api/addproduct.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined,'Process-Data': false}
                }).then(function(response){
                    console.log(response.data)
                //alert(response);
            });
        }
    };
});