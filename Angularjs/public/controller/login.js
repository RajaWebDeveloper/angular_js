app.factory('authentication', function() {
    return {
        isAuthenticated: false,
        user: null
    }
});

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller('MainCtrl', function($scope, $routeParams, $route, $location)
{
    $scope.$watch(function()
        {
            return ($route.current && $route.current.css) ? $route.current.css : 'views/login/login.css';
        },
        function(value)
        {
            $scope.css = value;
        });
});


app.controller('login', function($scope,authentication,$location,$http,$route) {
    // sessionStorage.user = JSON.stringify("NULL");
    // sessionStorage.isAuthenticated = JSON.stringify(authentication.isAuthenticated);
    // $scope.css = 'views/login/login.css';
    if(sessionStorage.user !== undefined && sessionStorage.role == -1){
        $location.path('/admin/dashboard');
    }else{
        $location.path('/dashboard');
    }

    $scope.loginform = function () {
        var url = 'api/login.php', data = { username : $scope.username,password : $scope.password };
        $http.post(url, data).then(function (response) {
            if(response.data != "null"){
                authentication.isAuthenticated = true;
                sessionStorage.user = response.data.user_name;
                sessionStorage.role = response.data.role;
                sessionStorage.isAuthenticated = authentication.isAuthenticated;

                if(sessionStorage.role == -1){
                    $location.path('/admin/dashboard');
                }else{
                    $location.path('/dashboard');
                }

            }else{
                $scope.error = "Invalid email and password";
            }
        }, function (response) {
            console.log(response)
        });
    }
});