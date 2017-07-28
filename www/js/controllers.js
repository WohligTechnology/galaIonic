angular.module('starter.controllers', ['starter.services'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout,$state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
       $scope.logout = function () {
      // alert("hi");
      $.jStorage.flush();
      $state.go('login')
    }
  })

  .controller('HomeCtrl', function ($scope, $stateParams, MyServices, $ionicSlideBoxDelegate, $timeout) {
    MyServices.HomeBanner(function (data) {
      if (data.value) {
        $scope.homebanner = data.data.results;
      }
    })

    MyServices.companyBanner(function (data) {
      if (data.value) {
        $scope.companyBanner = data.data.results;
        $scope.companyBanner = _.chunk($scope.companyBanner, 2);

      }
    })
    $scope.slideHasChanged = function (index) {
      $ionicSlideBoxDelegate.cssClass = 'fade-in'
      $scope.slideIndex = index;
      if (($ionicSlideBoxDelegate.count() - 1) == index) {
        $timeout(function () {
          $ionicSlideBoxDelegate.slide(0);

        }, $scope.interval);
      }
    };
    $scope.interval = 5000;
    $scope.homeSlider = {};
    $scope.homeSlider.data = [];
    $scope.homeSlider.currentPage = 0;
    $scope.category = [{
      name: "uro veener world",
      id: "uroveenerworld",
      url: "img/homenew/1.jpg"
    }, {
      name: "wood & mouldings",
      id: "woodmouldings",
      url: "img/homenew/2.jpg"
    }, {
      name: " bath world",
      id: "bathworld",
      url: "img/homenew/3.jpg"
    }, {
      name: " gala hardware worlds",
      id: "galahardwareworlds",
      url: "img/homenew/4.jpg"
    }, {
      name: " gala stone worlds",
      id: "galastoneworlds",
      url: "img/homenew/5.jpg"
    }, {
      name: " gala furniture worlds",
      id: "galafurnitureworlds",
      url: "img/homenew/6.jpg"
    }, {
      name: "euro lighting world",
      id: "eurolightingworld",
      url: "img/homenew/7.jpg"
    }, {
      name: "gala drapes world",
      id: "galadrapesworld",
      url: "img/homenew/8.jpg"
    }, {
      name: "gala kitchen world",
      id: "galakitchenworld",
      url: "img/homenew/9.jpg"
    }, {
      name: "mahavir corporation (India)",
      id: "mahavircorporation",
      url: "img/homenew/10.jpg"
    }];

    //chunk//
    $scope.homecategory = _.chunk($scope.category, 2);
    $scope.setupSlider = function () {

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
      $scope.$watch('homeSlider.sliderDelegate', function (newVal, oldVal) {
        if (newVal != null) {
          $scope.homeSlider.sliderDelegate.on('slideChangeEnd', function () {
            $scope.homeSlider.currentPage = $scope.homeSlider.sliderDelegate.activeIndex;
            //use $scope.$apply() to refresh any content external to the slider
            $scope.$apply();
          });
        }
      });
    };

    $scope.setupSlider();



    //detect when sliderDelegate has been defined, and attatch some event listeners
    $scope.$watch('sliderDelegate', function (newVal, oldVal) {
      if (newVal != null) {
        $scope.sliderDelegate.on('slideChangeEnd', function () {
          console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
          $scope.$apply();
        });
      }
    });
  })

  .controller('ProductsCtrl', function ($scope, $stateParams, MyServices) {
    $scope.company = {};
    $scope.company._id = $stateParams.company;
    MyServices.getAllCategoriesOfCompany($scope.company, function (data) {
      if (data.value) {
        $scope.categoriesOfCompany = data.data;
        $scope.categoriesOfCompany = _.chunk($scope.categoriesOfCompany, 2);

      }
    })

    MyServices.getCompanyBanner($scope.company, function (data) {
      if (data.value) {
        $scope.CompanyBanner = data.data;

      }
    })

  })

  .controller('CategoryCtrl', function ($scope, $stateParams, MyServices) {
    $scope.company = {};
    $scope.category = {};
    $scope.company._id = $stateParams.company;
    $scope.category._id = $stateParams.category;
    MyServices.getAllProductWithCategory($scope.category, function (data) {
      if (data.value) {
        $scope.AllProductWithCategory = data.data;
        $scope.AllProductWithCategory = _.chunk($scope.AllProductWithCategory, 2);
      }
    })
    MyServices.getCompanyBanner($scope.company, function (data) {
      if (data.value) {
        $scope.CompanyBanner = data.data;
      }
    })
  })

  .controller('DivisionCtrl', function ($scope, MyServices) {
    MyServices.companyBanner(function (data) {
      if (data.value) {
        $scope.companyBanner = data.data.results;
        $scope.companyBanner = _.chunk($scope.companyBanner, 2);

      }
    })

  })

  .controller('ProductDetailsCtrl', function ($scope, $stateParams, MyServices, $ionicSlideBoxDelegate, $timeout) {
    $scope.product = {};
    $scope.product._id = $stateParams.product;
    $scope.bigImage = {};
    MyServices.getOneProductDetails($scope.product, function (data) {
      if (data.value) {
        $scope.ProductDetails = data.data;
        if ($scope.ProductDetails.images.length != 0) {
          $scope.bigImage = $scope.ProductDetails.images[0].bigImage;
        }
        $scope.proImages = $scope.ProductDetails.images;
      }
    })
    $scope.changebigImage = function (bigImage) {
      $scope.bigImage = bigImage;
    }

    $scope.closePopup = function () {
      $scope.show.close();
    };
    $scope.lockSlide = function () {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    $scope.myActiveSlide = 0;

    $scope.slidePrevious = function (text) {

      $ionicSlideBoxDelegate.$getByHandle(text).previous();
    };

    $scope.slideNext = function (text) {

      $ionicSlideBoxDelegate.$getByHandle(text).next();

    };

    //     $scope.slideHasChanged = function(index) {
    //       $ionicSlideBoxDelegate.cssClass = 'fade-in'
    //     $scope.slideIndex = index;
    //     if ( ($ionicSlideBoxDelegate.count() -1 ) == index ) {
    //         $timeout(function(){
    //             $ionicSlideBoxDelegate.slide(0);

    //         },$scope.interval);
    //     }
    // };
    $scope.interval = 2000;

    $scope.homeSlider = {};
    $scope.homeSlider.data = [];
    $scope.homeSlider.currentPage = 0;
    $scope.setupSlider = function () {

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
      $scope.$watch('homeSlider.sliderDelegate', function (newVal, oldVal) {
        if (newVal != null) {
          $scope.homeSlider.sliderDelegate.on('slideChangeEnd', function () {
            $scope.homeSlider.currentPage = $scope.homeSlider.sliderDelegate.activeIndex;
            //use $scope.$apply() to refresh any content external to the slider
            $scope.$apply();
          });
        }
      });
    };

    $scope.setupSlider();



    //detect when sliderDelegate has been defined, and attatch some event listeners
    $scope.$watch('sliderDelegate', function (newVal, oldVal) {
      if (newVal != null) {
        $scope.sliderDelegate.on('slideChangeEnd', function () {
          console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
          $scope.$apply();
        });
      }
    });

  })

  .controller('ContactCtrl', function ($scope, $stateParams) {})
  .controller('LoginCtrl', function ($scope, $stateParams,MyServices,$state,$ionicPopup) {
     if ($.jStorage.get('profile')) {
      $state.go('app.home');
    }
    $scope.formData = {};

    $scope.login = function (value) {
      console.log("value", value);
      
      MyServices.login(value, function (data) {
        if (data.value == true) {
          $state.go('app.home');
          console.log(data);
          $scope.formData = data.data;
          $.jStorage.set('profile', data.data);
          console.log($scope.formData)
          $scope.formData = {};
        } else {
          $ionicPopup.alert({
            cssClass: 'productspopup',
            title: "Login Incorrect",

          });
        }

      })
    }
  })
  .controller('SignupCtrl', function ($scope, $stateParams,MyServices,$state,$ionicPopup) {

    if ($.jStorage.get('profile')) {
      $state.go('app.home');
    }

    $scope.formData = {};
    $scope.validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    $scope.signupForm = function (value) {
      console.log("value", value);
      // if (!$.jStorage.get('profile')) {

      MyServices.signup(value, function (data) {

        console.log(data);
        $scope.formData = data.data;
        $.jStorage.set('profile', data.data);
        console.log($scope.formData)
        if (data.value == true) {
          $state.go('app.home');
        } else {
          $ionicPopup.alert({
            cssClass: 'productspopup',
            title: "Sign Up Incorrect",

          });
        }
      })

      //}
    }
  })


  .controller('GalleryCtrl', function ($scope, $stateParams) {})

  .controller('AboutUsCtrl', function ($scope, $stateParams) {});
