app.controller('MainCtrl', function($scope, $routeParams, $route, $location)
{
    $scope.$watch(function()
        {
            return ($route.current && $route.current.css) ? $route.current.css : 'views/category/category.css';
        },
        function(value)
        {
            $scope.css = value;
        });
});

app.controller('category', function($scope,$location,$http,$route,$filter) {
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
        $http.get('api/viewcategory.php').then(function(response) {
            $scope.names = response.data;
        });
    };

    $scope.add_category = function () {
        let form_data = new FormData();
        form_data.append('category_name',$scope.category_name)

        $http.post('api/addcategory.php', form_data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined,'Process-Data': false}
        }).then(function(response){
            if(response.data.status == "success"){
                $scope.success = "Data Insert successfully";
                $scope.category_name = ""
            }else{
                $scope.error = "unsuccessfull";
            }
        })


    }


});