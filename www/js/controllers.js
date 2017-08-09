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

   MyServices.CompanyProduct(function (data){
     console.log('hello',data)
     if (data.value) {
        $scope.companyProduct = data.data;
        $scope.companyProduct = _.chunk($scope.companyProduct, 2);
        console.log('sawme',$scope.companyProduct)
      }
   })
    
    MyServices.HomeBanner(function (data) {
      if (data.value) {
        $scope.homebanner = data.data.results;
        console.log('homebanner',$scope.homebanner)
       
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
.controller('ShowroomCtrl', function ($scope, $stateParams, MyServices) {
   $scope.product = {};
    $scope.bigImage = {};
    $scope.name = {};
    MyServices.CompanyProduct( function (data) {
      if (data.value) {
        $scope.ProductDetails = data.data;
        if ($scope.ProductDetails.length != 0) {
          $scope.bigImage = $scope.ProductDetails[0].images[0].bigImage;
                $scope.name = $scope.ProductDetails[0].name;

        }
      }
    })


    $scope.changebigImage = function (bigImage,name) {
      $scope.bigImage = bigImage;
      $scope.name = name;
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

  .controller('GalleryCtrl', function ($scope, $stateParams) {})

  .controller('AboutUsCtrl', function ($scope, $stateParams) {});
