app.controller('MainCtrl', function($scope, $routeParams, $route, $location)
{
    $scope.$watch(function()
        {
            return ($route.current && $route.current.css) ? $route.current.css : 'views/admin/dashboard/dashboard.css';
        },
        function(value)
        {
            $scope.css = value;
        });
});


app.controller('dashboard', function($scope,$location,$route) {
    if(sessionStorage.isAuthenticated === "true"){
        $scope.useremail = sessionStorage.user
    }else{
        $location.path('/');
    }

    $scope.logout = function () {
        sessionStorage.clear();
        $location.path('/');
    }
});