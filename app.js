var app = angular.module('myApp',["ngRoute"]);
app.config(function($routeProvider,$locationProvider){
    Stamplay.init("ankitrajblogit");
   localStorage.removeItem('https://blogit-uncommoner.c9users.io-jwt');
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/',{
    templateUrl : 'templates/home.html',
    controller : "HomeCtrl"
    })
    .when('/login',{
        templateUrl : 'templates/login.html',
        controller : "LoginCtrl"
    })
    .when('/signup',{
        templateUrl : 'templates/signup.html',
        controller : "SignUpCtrl"
    })
    .when('/viewBlogs',{
        templateUrl:'templates/viewblogs.html',
        controller:"ViewBlogsCtrl"
    })
});
app.controller('ViewBlogsCtrl',function($scope){
    
});
app.controller('LoginCtrl',function($scope,$location,$timeout){
    $scope.user={};
    $scope.login=function(){
        Stamplay.User.currentUser()
            .then(function(res){
            console.log(res);
            if(res.user){
                
                $timeout(function(){
                    $location.path('/viewBlogs');
                },0);
                console.log("already logged in");
            }
            else{
                Stamplay.User.login($scope.user)
                .then(function(res){
                    console.log("logged In "+res);
                    $timeout(function(){
                        $location.path('/viewBlogs');
                    },0);
                },function(err){
                    console.log(err);
                })
            }
        })
    }
});
app.controller('HomeCtrl',function($scope){
    
});
app.controller('SignUpCtrl',function($scope){
    $scope.newUser={};
    $scope.signup = function(){
        if($scope.newUser.firstName && $scope.newUser.lastName && $scope.newUser.email && $scope.newUser.password && $scope.newUser.confirmPassword) {
            console.log("All Fields Are Valid!");
            
            if($scope.newUser.password == $scope.newUser.confirmPassword)
                console.log("All Set Let's Signup!");
            else
                console.log("Passwords Do Not Match");
        }
        else
            console.log("Some Fields Are Invalid!");
        Stamplay.User.signup($scope.newUser)
        .then(function(response){
            console.log(response);
            console.log("Success");
        },function(error){
            console.log(error);
        });
        
    }
});
