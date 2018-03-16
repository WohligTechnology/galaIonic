angular.module('starter.controllers', ['starter.services', 'ionic', 'ngCordova'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
    $scope.logout = function () {
      $.jStorage.flush();
      $state.go('login')
    }
  })

  .controller('HomeCtrl', function ($scope, $stateParams, MyServices, $ionicSlideBoxDelegate, $timeout, $ionicPlatform, $ionicLoading) {
    // $ionicPlatform.registerBackButtonAction()
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    MyServices.CompanyProduct(function (data) {
      if (data.value) {
        $scope.companyProduct = data.data;
        $scope.companyProduct = _.chunk($scope.companyProduct, 2);
      }
    })

    MyServices.getAllCategories(function (data) {
      $scope.getAllCategory = data.data;
      $scope.data = _.groupBy($scope.getAllCategory, 'company.name');
      _.each($scope.data, function (n, key) {
        $scope.data[key] = _.chunk($scope.data[key], 2);
      });
    })

    MyServices.HomeBanner(function (data) {
      if (data.value) {
        $scope.homebanner = data.data.results;
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide()
      }
    })

    MyServices.companyBanner(function (data) {
      if (data.value) {
        $scope.companyBanner = data.data.results;
        $scope.companyBanner = _.chunk($scope.companyBanner, 2);
        $ionicLoading.hide()

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

    $scope.$watch('sliderDelegate', function (newVal, oldVal) {
      if (newVal != null) {
        $scope.sliderDelegate.on('slideChangeEnd', function () {
          $scope.$apply();
        });
      }
    });

    MyServices.getAllCompanyWithCategory(function (data) {
      if (data.value == true) {
        $scope.productList = data.data;
      } else {
        console.log("ERROR");
      }
    });

    MyServices.BrandsHomeImage(function (data) {
      if (data.value == true) {
        $scope.brandImage = data.data.results[0];
      } else {
        console.log("ERROR");
      }
    });

  })

  .controller('ProductsCtrl', function ($scope, $stateParams, MyServices, $ionicPlatform, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    // $ionicPlatform.registerBackButtonAction()
    $scope.company = {};
    $scope.company._id = $stateParams.company;
    MyServices.getAllCategoriesOfCompany($scope.company, function (data) {
      if (data.value) {
        $scope.categoriesOfCompany = data.data;
        $scope.categoriesOfCompany = _.chunk($scope.categoriesOfCompany, 2);
        $scope.companyBrands = data.data[0].company.brandImage;
        $ionicLoading.hide()
      }
    })

    MyServices.getCompanyBanner($scope.company, function (data) {
      MyServices.getAllCategories(function (data) {
        $scope.getAllCategory = data.data;
        $scope.data = _.groupBy($scope.getAllCategory, 'company.name');
        _.each($scope.data, function (n, key) {
          $scope.data[key] = _.chunk($scope.data[key], 2);
        });

      })
      if (data.value) {
        $scope.CompanyBanner = data.data;
        $ionicLoading.hide()

      }
    })

  })

  .controller('CategoryCtrl', function ($state,$scope, $stateParams, MyServices, $ionicPlatform, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    
    $scope.company = {};
    $scope.category = {};
    $scope.company._id = $stateParams.company;
    $scope.category._id = $stateParams.category;
    MyServices.getAllProductWithCategory($scope.category, function (data) {
      if (data.value) {
        $scope.AllProductWithCategory1 = data.data;
        $scope.AllProductWithCategory = data.data;
        $ionicLoading.hide()
        $scope.AllProductWithCategory = _.chunk($scope.AllProductWithCategory, 2);
        $scope.inapp = function (name) {
          var options = "location=no,toolbar=yes";
          var target = "_blank";
          $scope.finalURL = '';

          var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          if (name == 'SOLID WOOD') {
            $scope.finalURL = 'http://euroflooring.co.in/solid-wood/58edd69c1d42174d44801f5f';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          } else if (name == 'ENGINEERED') {
            $scope.finalURL = 'http://euroflooring.co.in/engineered/58eddc351d42174d44802021';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          } else if (name == 'LAMINATED FLOORING') {
            $scope.finalURL = 'http://euroflooring.co.in/laminated-flooring/58eddf0d1d42174d44802130';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          } else if (name == 'EXOTIC BAMBOO') {
            $scope.finalURL = 'http://euroflooring.co.in/exotic-bamboo/58ede7401d42174d44802328';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          } else if (name == 'KAINDL VENEER') {
            $scope.finalURL = 'http://euroflooring.co.in/kaindl-veneer/58edf3b61d42174d448024b9';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          } else {
            $scope.finalURL = 'http://euroflooring.co.in/exterior-deck-tile/58ee2acc1d42174d448036e7';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          }
        }
      }
    })

 

    $scope.urlLink = function (link) {
      var options = "location=no,toolbar=yes";
      var target = "_blank";
      if (link == undefined) {
        console.log('no link available')
      } else {
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
      }
    }
    MyServices.getCompanyBanner($scope.company, function (data) {
      if (data.value) {
        $scope.CompanyBanner = data.data;
        $ionicLoading.hide()
      }
    })

    MyServices.companyCategory($scope.category, function (data) {
      $scope.productImage = data.data;
    });
    $scope.productsPage = function () {
      var company = {
        company: $scope.productImage.company._id
      }
      $state.go('app.products',company) //This works
      
    };
    // $ionicPlatform.registerBackButtonAction(function (event) {
    //   if($state.current.name=='app.category'){
    //     var company = {
    //       company: $scope.productImage.company._id
    //     }
    //     $state.go('app.products',company)
    //   }else{
    //     navigator.app.backHistory();
    //     console.log("hello")
    //   }
    
    // }, 100);
  })

  .controller('DivisionCtrl', function ($scope, MyServices, $ionicPlatform, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    MyServices.companyBanner(function (data) {
      if (data.value) {
        $scope.companyBanner = data.data.results;
        $scope.companyBanner = _.chunk($scope.companyBanner, 2);
        $ionicLoading.hide()
      }
    })

  })

  .controller('ProductDetailsCtrl', function ($state,$scope, $filter, $ionicModal, $cordovaSocialSharing, $stateParams, $ionicLoading, MyServices, $ionicSlideBoxDelegate, $timeout, $ionicPlatform) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.goBackHandler = function () {
      window.history.back(); //This works
      console.log("showstate",$state.current.name)
    };
    // $ionicPlatform.registerBackButtonAction()
    $scope.product = {};
    $scope.company = {};
    $scope.product._id = $stateParams.product;
    $scope.company._id = $stateParams.company;
    $scope.bigImage = {};
    MyServices.getOneProductDetails($scope.product, function (data) {
      if (data.value) {
        $scope.ProductDetails = data.data;
        $ionicLoading.hide()
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



    MyServices.getCompanyBanner($scope.company, function (data) {
      if (data.value) {
        $scope.CompanyBanner = data.data;
        $ionicLoading.hide()
      }
    })
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
          $scope.$apply();
        });
      }
    });

    $scope.saveEnquiry = function (detail) {
      detail.productName = $scope.ProductDetails.name;
      detail.image = $scope.bigImage;

      MyServices.Enquiry(detail, function (data) {
        $scope.submitmsg = data.data;
        detail.firstName = "";
        detail.lastName = "";
        detail.contactNumber = "";
        detail.message = "";
        detail.productName = "";
        detail.image = "";
        $timeout(function () {
          $scope.closeModal()
        }, 1000);
      })
    }

    $scope.shareProduct = function () {
      var image = $filter("downloadImage")($scope.bigImage);
      $cordovaSocialSharing
        .share('', '', image, '') // Share via native share sheet
        .then(function (result) {
          // Success!
        }, function (err) {
          // An error occured. Show a message to the user
        });
    };

    $ionicModal.fromTemplateUrl('templates/modal/enquire.html', {
      scope: $scope,
      animation: 'slide-in-up',
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };
  })

  .controller('ContactCtrl', function ($scope, $stateParams, MyServices, $cordovaFile, $ionicPopup, $filter) {
    $scope.contactDetails = function (detail) {
      MyServices.Enquiry(detail, function (data) {
        $scope.submitmsg = data;
      })
    }
    $scope.openPDF = function () {

      var options = "location=no,toolbar=yes";
      var target = "_blank";
      var link = 'img/AllDivisionsContactDetails.pdf'
      $scope.pdfURL = 'https://storage.googleapis.com/galapdf/AllDivisionsContactDetails.pdf';
      $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
      var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
    }

  })

  .controller('LoginCtrl', function ($scope, $stateParams, MyServices, $state, $ionicPopup, $ionicPlatform) {
    // $ionicPlatform.registerBackButtonAction()
    if ($.jStorage.get('profile')) {
      $state.go('app.home');
    }
    $scope.formData = {};

    $scope.login = function (value) {
      MyServices.login(value, function (data) {
        if (data.value == true) {
          $state.go('app.home');
          $scope.formData = data.data;
          $.jStorage.set('profile', data.data);
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
  .controller('SignupCtrl', function ($scope, $stateParams, MyServices, $state, $ionicPopup) {

    if ($.jStorage.get('profile')) {
      $state.go('app.home');
    }

    $scope.formData = {};
    $scope.validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    $scope.signupForm = function (value) {

      MyServices.signup(value, function (data) {
        $scope.formData = data.data;
        $.jStorage.set('profile', data.data);
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
  .controller('DownloadCtrl', function ($scope, $stateParams, MyServices, $ionicLoading, $ionicPopup, $filter) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.product = {};
    $scope.bigImage = {};
    $scope.name = {};

    MyServices.Download(function (data) {
      $scope.PdfData = data.data;
      $scope.pdfChunk = _.chunk($scope.PdfData, 2);
      $ionicLoading.hide()
    });

    $scope.openPDF = function (link) {
      var options = "location=no,toolbar=yes";
      var target = "_blank";
      $scope.pdfURL = $filter('uploadpath')(link);
      $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
      var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
    }
  })

  .controller('ShowroomCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.product = {};
    $scope.bigImage = {};
    $scope.name = {};

    MyServices.Showroom(function (data) {
      $scope.showroom = data.data;
      $ionicLoading.hide()
    });

    $scope.video = function (link) {
      var options = "location=no,toolbar=yes";
      var target = "_blank";
      if (link == undefined) {
        console.log('no link available')
      } else {
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
      }
    }





  })

  .controller('DivisionsCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    MyServices.getAllCategories(function (data) {
      MyServices.getAllCategories(function (data) {
        $scope.getAllCategory = data.data;
        $scope.order = _.orderBy($scope.getAllCategory, ['company.order'], ['asc', 'desc'])
        $scope.data = _.groupBy($scope.order, 'company.name');
        _.each($scope.data, function (n, key) {
          $scope.data[key] = _.chunk($scope.data[key], 2);
          $ionicLoading.hide()
        });

      })
      $scope.inapp = function (name) {
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = '';

        var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        if (name == 'SOLID WOOD') {
          $scope.finalURL = 'http://euroflooring.co.in/solid-wood/58edd69c1d42174d44801f5f';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        } else if (name == 'ENGINEERED') {
          $scope.finalURL = 'http://euroflooring.co.in/engineered/58eddc351d42174d44802021';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        } else if (name == 'LAMINATED FLOORING') {
          $scope.finalURL = 'http://euroflooring.co.in/laminated-flooring/58eddf0d1d42174d44802130';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        } else if (name == 'EXOTIC BAMBOO') {
          $scope.finalURL = 'http://euroflooring.co.in/exotic-bamboo/58ede7401d42174d44802328';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        } else if (name == 'KAINDL VENEER') {
          $scope.finalURL = 'http://euroflooring.co.in/kaindl-veneer/58edf3b61d42174d448024b9';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        } else {
          $scope.finalURL = 'http://euroflooring.co.in/exterior-deck-tile/58ee2acc1d42174d448036e7';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        }
      }

    })
  })

  .controller('SearchCtrl', function ($scope, $stateParams, MyServices) {
    $scope.title = '<img class="title-image" src="images/kidsintouchtext.png" />'
    $scope.searchText = {};
    $scope.search = function (value) {
      $scope.companyCategory = [];
      $scope.company1 = [];
      $scope.companyProduct = [];
      $scope.isText = true;
      if (value.searchText != "") {
        MyServices.search(value, function (data) {
          if (data.value) {
            $scope.companyCategory = data.data.companyCategory;
            $scope.company1 = data.data.company;
            $scope.companyProduct = data.data.companyProduct;
          } else {
            console.log("Event data false");
          }

        });

      }
    };
  })

  .controller('GalleryCtrl', function ($scope, $stateParams) {})

  .controller('AboutUsCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {
    MyServices.getAllCompany(function (data) {
      if (data.value == true) {
        $scope.aboutProducts = data.data;
        $scope.data1 = _.orderBy($scope.aboutProducts, ['order'], ['asc', 'desc'])
      } else {}
    })
  });