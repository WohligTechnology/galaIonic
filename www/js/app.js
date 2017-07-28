// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-flexslider'])

  .run(function ($ionicPlatform) {
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
          navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else {
          window.history.back();
        }
      } else {
        if ($state.current.name == "login") {
          navigator.app.exitApp();
        } else {
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
  });
