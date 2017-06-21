angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


.controller('HomeCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate,$timeout) {
 
   $scope.slideHasChanged = function(index) {
            $ionicSlideBoxDelegate.cssClass = 'fade-in'
            $scope.slideIndex = index;
            if (($ionicSlideBoxDelegate.count() - 1) == index) {
                $timeout(function() {
                    $ionicSlideBoxDelegate.slide(0);

                }, $scope.interval);
            }
        };
         $scope.interval = 5000;
        $scope.homeSlider = {};
        $scope.homeSlider.data = [];
        $scope.homeSlider.currentPage = 0;

        $scope.setupSlider = function() {

            //some options to pass to our slider
            $scope.homeSlider.sliderOptions = {
                initialSlide: 0,
                direction: 'horizontal', //or vertical
                speed: 300,

                autoplay: "5000",
                effect: 'fade',

            };


            //create delegate reference to link with slider
            $scope.homeSlider.sliderDelegate = null;

            //watch our sliderDelegate reference, and use it when it becomes available
            $scope.$watch('homeSlider.sliderDelegate', function(newVal, oldVal) {
                if (newVal != null) {
                    $scope.homeSlider.sliderDelegate.on('slideChangeEnd', function() {
                        $scope.homeSlider.currentPage = $scope.homeSlider.sliderDelegate.activeIndex;
                        //use $scope.$apply() to refresh any content external to the slider
                        $scope.$apply();
                    });
                }
            });
        };

        $scope.setupSlider();



        //detect when sliderDelegate has been defined, and attatch some event listeners
        $scope.$watch('sliderDelegate', function(newVal, oldVal) {
            if (newVal != null) {
                $scope.sliderDelegate.on('slideChangeEnd', function() {
                    console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
                    $scope.$apply();
                });
            }
        });
})

.controller('CategoryCtrl', function($scope, $stateParams) {
})

.controller('ProductsCtrl', function($scope, $stateParams) {
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
