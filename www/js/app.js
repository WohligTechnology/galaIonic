// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'starter.services', 'angular-flexslider'])

  .run(function ($ionicPlatform,$state) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

    });
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($.jStorage.get('profile')) {
        if ($state.current.name == "app.home") {
          console.log("showstate",$state.current.name)
          navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else {
          console.log("showstate",$state.current.name)
          window.history.back();
        }
      } else {
        if ($state.current.name == "login") {
          console.log("showstate",$state.current.name)
          navigator.app.exitApp();
        } else {
          console.log("showstate",$state.current.name)
          window.history.back();
        }
      }
    }, 100);
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        cache: false,
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })



      .state('app.home', {
        url: '/home',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('app.search', {
        url: '/search',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl'
          }
        }
      })

      .state('app.division', {
        url: '/division',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/division.html',
            controller: 'DivisionCtrl'
          }
        }
      })
      .state('app.category', {
        url: '/category/:company/:category',
        views: {
          'menuContent': {
            templateUrl: 'templates/category.html',
            controller: 'CategoryCtrl'
          }
        }
      })

      .state('app.products', {
        url: '/products/:company',
        views: {
          'menuContent': {
            templateUrl: 'templates/products.html',
            controller: 'ProductsCtrl'
          }
        }
      })

      .state('app.divisions', {
        url: '/products/:company',
        views: {
          'menuContent': {
            templateUrl: 'templates/divisions.html',
            controller: 'DivisionsCtrl'
          }
        }
      })

      .state('app.productdetails', {
        url: '/productdetails/:product',
        views: {
          'menuContent': {
            templateUrl: 'templates/productdetails.html',
            controller: 'ProductDetailsCtrl'
          }
        }
      })

      .state('app.aboutus', {
        url: '/aboutus',
        views: {
          'menuContent': {
            templateUrl: 'templates/aboutus.html',
            controller: 'AboutUsCtrl'
          }
        }
      })

      .state('app.contact', {
        url: '/contact',
        views: {
          'menuContent': {
            templateUrl: 'templates/contact.html',
            controller: 'ContactCtrl'
          }
        }
      })

      .state('app.gallery', {
        url: '/gallery',
        views: {
          'menuContent': {
            templateUrl: 'templates/gallery.html',
            controller: 'GalleryCtrl'
          }
        }
      })

     .state('app.showroom', {
        url: '/showroom',
        views: {
          'menuContent': {
            templateUrl: 'templates/showroom.html',
            controller: 'ShowroomCtrl'
          }
        }
      })

      .state('signup', {
        url: '/signup',
        cache: false,
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
      })
      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  })
  .filter('uploadpath', function () {
    return function (input, width, height, style) {
      var other = "";
      if (width && width != "") {
        other += "&width=" + width;
      }
      if (height && height != "") {
        other += "&height=" + height;
      }
      if (style && style != "") {
        other += "&style=" + style;
      }
      if (input) {
        if (input.indexOf('https://') == -1) {
          return imgpath + input + other;

        } else {
          return input;
        }
      }
    }
  })

  .directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);
