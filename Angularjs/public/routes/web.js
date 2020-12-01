app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/login/login.html",
            controller: 'login',
            css:'views/login/login.css',
        })
        .when("/admin/dashboard", {
            templateUrl : "views/admin/dashboard/dashboard.html",
            controller: 'dashboard',
            css:'views/admin/dashboard/dashboard.css',
        })
        .when("/admin/product/list", {
            templateUrl : "views/admin/product/list/list.html",
            controller: 'product',
            css:'views/admin/product/list/list.css'
        }).when("/admin/product/add", {
            templateUrl : "views/admin/product/add/add.html",
            controller: 'product',
            css:'views/admin/product/add/add.css'
        }).when("/admin/category/add", {
            templateUrl : "views/admin/category/add/add.html",
            controller: 'category',
            css:'views/admin/category/category.css'
        }).when("/admin/category/list", {
            templateUrl : "views/admin/category/list/list.html",
            controller: 'category',
            css:'views/admin/category/category.css'
        })
        .otherwise({
            redirectTo: "/"
        });
});