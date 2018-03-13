angular.module('starter.controllers', ['starter.services', 'ionic', 'ngCordova'])

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

  .controller('HomeCtrl', function ($scope, $stateParams, MyServices, $ionicSlideBoxDelegate, $timeout, $ionicPlatform, $ionicLoading) {
    $ionicPlatform.registerBackButtonAction()
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
   MyServices.CompanyProduct(function (data){
     console.log('hello',data)
     if (data.value) {
        $scope.companyProduct = data.data;
        $scope.companyProduct = _.chunk($scope.companyProduct, 2);
        console.log('sawme',$scope.companyProduct)

      }
   })

   MyServices.getAllCategories(function(data){
    console.log('getallcategories',data)
     $scope.getAllCategory = data.data;
        $scope.data = _.groupBy($scope.getAllCategory, 'company.name');
        // $scope.datachunk = _.chunk( $scope.data,2);
 _.each($scope.data,function(n,key){
        $scope.data[key]=_.chunk($scope.data[key], 2);
         console.log('getallcategorieshello',$scope.data)
      });

    console.log('getallcategorieshello',$scope.datachunk)
   })

    MyServices.HomeBanner(function (data) {
      if (data.value) {
        $scope.homebanner = data.data.results;
        console.log('homebanner',$scope.homebanner)
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide()

      }
    })

    MyServices.companyBanner(function (data) {
      if (data.value) {
        $scope.companyBanner = data.data.results;
        console.log("Bann",$scope.companyBanner);
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

    //detect when sliderDelegate has been defined, and attatch some event listeners
    $scope.$watch('sliderDelegate', function (newVal, oldVal) {
      if (newVal != null) {
        $scope.sliderDelegate.on('slideChangeEnd', function () {
          console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
          $scope.$apply();
        });
      }
    });

    MyServices.getAllCompanyWithCategory(function(data){
      console.log(data);
      if (data.value == true) {
        $scope.productList = data.data;
        console.log("helloproductlist",$scope.productList)
        // $scope.categoriesOfCompany = _.chunk($scope.categoriesOfCompany, 2);
      } else{
        console.log("ERROR");
      }
    });

    MyServices.BrandsHomeImage(function(data){
      console.log("brandImage", data);
      if (data.value == true) {
        $scope.brandImage = data.data.results[0];
        console.log("BI", $scope.brandImage);
      } else{
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
    $ionicPlatform.registerBackButtonAction()
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

    MyServices.getCompanyBanner($scope.company, function (data) {   MyServices.getAllCategories(function(data){
    console.log('getallcategories',data)
     $scope.getAllCategory = data.data;
        $scope.data = _.groupBy($scope.getAllCategory, 'company.name');
        // $scope.datachunk = _.chunk( $scope.data,2);
 _.each($scope.data,function(n,key){
        $scope.data[key]=_.chunk($scope.data[key], 2);
         console.log('getallcategorieshello',$scope.data)
      });

    console.log('getallcategorieshello',$scope.datachunk)
   })
      if (data.value) {
        $scope.CompanyBanner = data.data;
        $ionicLoading.hide()

      }
    })

  })

  .controller('CategoryCtrl', function ($scope, $stateParams, MyServices, $ionicPlatform, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.goBackHandler = function() {
      window.history.back(); //This works
    };
    $ionicPlatform.registerBackButtonAction()
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
        console.log("AllProductWithCategory1",$scope.AllProductWithCategory1)
        $scope.inapp=function(name){
          console.log("nameproduct",name)
          var options = "location=no,toolbar=yes";
          var target = "_blank";
          $scope.finalURL = '';

          var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          if(name=='SOLID WOOD'){
            $scope.finalURL = 'http://euroflooring.co.in/solid-wood/58edd69c1d42174d44801f5f';
             ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          }else if(name=='ENGINEERED'){
            $scope.finalURL = 'http://euroflooring.co.in/engineered/58eddc351d42174d44802021';
             ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          }else if(name=='LAMINATED FLOORING'){
            $scope.finalURL = 'http://euroflooring.co.in/laminated-flooring/58eddf0d1d42174d44802130';
             ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          }else if(name=='EXOTIC BAMBOO'){
            $scope.finalURL = 'http://euroflooring.co.in/exotic-bamboo/58ede7401d42174d44802328';
             ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          }else if(name=='KAINDL VENEER'){
            $scope.finalURL = 'http://euroflooring.co.in/kaindl-veneer/58edf3b61d42174d448024b9';
             ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
            window.open = cordova.InAppBrowser.open;
          }else{
            $scope.finalURL = 'http://euroflooring.co.in/exterior-deck-tile/58ee2acc1d42174d448036e7';
            ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
           window.open = cordova.InAppBrowser.open;
          }
        }
      }
    })

    $scope.urlLink=function(link){
      console.log("urllink",link)
      var options = "location=no,toolbar=yes";
      var target = "_blank";
      if(link==undefined){
        console.log('no link available')
      }else{
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
       window.open = cordova.InAppBrowser.open;
      }
    }
    MyServices.getCompanyBanner($scope.company, function (data) {
      if (data.value) {
        $scope.CompanyBanner = data.data;
        console.log("CompanyBanner",$scope.CompanyBanner)
        $ionicLoading.hide()
      }
    })

    MyServices.companyCategory($scope.category, function (data) {
      $scope.productImage = data.data;
      console.log("doneshowProducts",$scope.productImage)
  });
  })

  .controller('DivisionCtrl', function ($scope, MyServices, $ionicPlatform, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $ionicPlatform.registerBackButtonAction()
    MyServices.companyBanner(function (data) {
      if (data.value) {
        $scope.companyBanner = data.data.results;
        $scope.companyBanner = _.chunk($scope.companyBanner, 2);
        $ionicLoading.hide()
      }
    })

  })

  .controller('ProductDetailsCtrl', function ($scope, $filter, $ionicModal, $cordovaSocialSharing, $stateParams, $ionicLoading, MyServices, $ionicSlideBoxDelegate, $timeout, $ionicPlatform) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.goBackHandler = function() {
      window.history.back(); //This works
    };
    $ionicPlatform.registerBackButtonAction()
    $scope.product = {};
    $scope.company={};
    $scope.product._id = $stateParams.product;
    $scope.company._id = $stateParams.company;
    $scope.bigImage = {};
    MyServices.getOneProductDetails($scope.product, function (data) {
      if (data.value) {
        $scope.ProductDetails = data.data;
        console.log("helloproduct",$scope.ProductDetails)
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

    //     $scope.slideHasChanged = function(index) {
    //       $ionicSlideBoxDelegate.cssClass = 'fade-in'
    //     $scope.slideIndex = index;
    //     if ( ($ionicSlideBoxDelegate.count() -1 ) == index ) {
    //         $timeout(function(){
    //             $ionicSlideBoxDelegate.slide(0);

    //         },$scope.interval);
    //     }
    // };

    MyServices.getCompanyBanner($scope.company, function (data) {
      if (data.value) {
        $scope.CompanyBanner = data.data;
        console.log("CompanyBanner",$scope.CompanyBanner)
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
          console.log('updated slide to ' + $scope.sliderDelegate.activeIndex);
          $scope.$apply();
        });
      }
    });

    $scope.saveEnquiry = function (detail) {
      detail.productName = $scope.ProductDetails.name;
      detail.image = $scope.bigImage;

      MyServices.Enquiry(detail, function (data) {
        console.log('detail',detail)
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

  $scope.shareProduct = function() {
    var image = $filter("downloadImage")($scope.bigImage);
    console.log(image);
    $cordovaSocialSharing
      .share('', '', image, '') // Share via native share sheet
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
  };
    
    $ionicModal.fromTemplateUrl('templates/modal/enquire.html', {
      scope: $scope,
      animation: 'slide-in-up',
    }).then(function (modal) {
      $scope.modal = modal;
      console.log("hellowasssuip")
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
      console.log("submit",$scope.submitmsg)
      // detail.firstName = "";
      // detail.lastName = "";
      // detail.contactNumber = "";
      // detail.message = "";  
  })
}
$scope.openPDF = function(){
  
    var options = "location=no,toolbar=yes";
    var target = "_blank";
    var link = 'img/AllDivisionsContactDetails.pdf'
  $scope.pdfURL = 'https://storage.googleapis.com/galapdf/AllDivisionsContactDetails.pdf';
  $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
  console.log("hellolink", $scope.finalURL)
  var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);

// }
// $scope.closePopup = function () {
//   $scope.pdf.close();
}

})
 
  .controller('LoginCtrl', function ($scope, $stateParams,MyServices,$state,$ionicPopup, $ionicPlatform) {
    $ionicPlatform.registerBackButtonAction()
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
      // if (!$.jStorage.get('pro // $scope.chunckproduct = data.data
      // $scope.chunckproduct = _.chunk($scope.chunckproduct, 2)
      // console.log("showchunkchunckproduct",$scope.chunckproduct);
      // $scope.data=[];file')) {

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
    // MyServices.CompanyProduct( function (data) {
    //   if (data.value) {
    //     $scope.ProductDetails = data.data;
    //     $ionicLoading.hide()
    //     if ($scope.ProductDetails.length != 0) {
    //       $scope.bigImage = $scope.ProductDetails[0].images[0].bigImage;
    //             $scope.name = $scope.ProductDetails[0].name;

    //     }
    //   }
    // })

    MyServices.Download(function (data) {
      console.log("inside  download api",data)
      $scope.PdfData=data.data;
      $scope.pdfChunk = _.chunk($scope.PdfData, 2);
      console.log("inside     $scope.PdfData",   $scope.PdfData)
      $ionicLoading.hide()
     });

  $scope.openPDF = function(link){
    var options = "location=no,toolbar=yes";
    var target = "_blank";
  $scope.pdfURL = $filter('uploadpath')(link);
  $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
  console.log("hellolink", $scope.finalURL)
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
    // MyServices.CompanyProduct( function (data) {
    //   if (data.value) {
    //     $scope.ProductDetails = data.data;
    //     $ionicLoading.hide()
    //     if ($scope.ProductDetails.length != 0) {
    //       $scope.bigImage = $scope.ProductDetails[0].images[0].bigImage;
    //             $scope.name = $scope.ProductDetails[0].name;

    //     }
    //   }
    // })

    MyServices.Showroom(function (data) {
      $scope.showroom = data.data;
      console.log("showroom images",$scope.showroom)
      $ionicLoading.hide()
  });

  $scope.video=function(link){
    console.log("urllink",link)
    var options = "location=no,toolbar=yes";
    var target = "_blank";
    if(link==undefined){
      console.log('no link available')
    }else{
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

  MyServices.getAllCategories( function (data) {
    // if (data.value) {
    //   console.log("getallproduct", data.data);
    //   $ionicLoading.hide()
    //   $scope.allproduct = data.data;
    //   $scope.chunckproduct = data.data
    //   $scope.chunckproduct = _.chunk($scope.chunckproduct, 2)
    //   console.log("showchunkchunckproduct",$scope.chunckproduct);
    //    $scope.data=[];
    //   $scope.data=_.groupBy($scope.allproduct, 'companyCategory.company.name');
    //   console.log("hello",$scope.data)
    //   $scope.dataprods = _.chunk($scope.data, 2);
    //   _.each($scope.data,function(n,key){
    //     $scope.data[key]=_.chunk($scope.data[key], 2);
    //   });
    //   console.log("hellodataprods",$scope.data)
    //   console.log("$scope.------",$scope.data);
    //   var keys=_.keysIn($scope.data);
    //   console.log(_.keysIn($scope.data));
    //  $scope.companyName=_.chunk(keys,2);
    //  console.log("showchunk",$scope.companyName);
    //   $scope.allproductData = _.chunk($scope.data, 2);
    //   console.log("$chunck.------",$scope.allproductData);
       MyServices.getAllCategories(function(data){
    
     $scope.getAllCategory = data.data;
     console.log('getallcategories',$scope.getAllCategory)
       $scope.order = _.orderBy($scope.getAllCategory, ['company.order'], ['asc', 'desc'])

        $scope.data = _.groupBy($scope.order, 'company.name');
        // $scope.datachunk = _.chunk( $scope.data,2);
 _.each($scope.data,function(n,key){
        $scope.data[key]=_.chunk($scope.data[key], 2);
         console.log('getallcategorieshello',$scope.data)
         $ionicLoading.hide()
      });

    console.log('getallcategorieshello',$scope.datachunk)
    
   })
      $scope.inapp=function(name){
        console.log("nameproduct",name)
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = '';

        var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        if(name=='SOLID WOOD'){
          $scope.finalURL = 'http://euroflooring.co.in/solid-wood/58edd69c1d42174d44801f5f';
           ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        }else if(name=='ENGINEERED'){
          $scope.finalURL = 'http://euroflooring.co.in/engineered/58eddc351d42174d44802021';
           ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        }else if(name=='LAMINATED FLOORING'){
          $scope.finalURL = 'http://euroflooring.co.in/laminated-flooring/58eddf0d1d42174d44802130';
           ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        }else if(name=='EXOTIC BAMBOO'){
          $scope.finalURL = 'http://euroflooring.co.in/exotic-bamboo/58ede7401d42174d44802328';
           ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        }else if(name=='KAINDL VENEER'){
          $scope.finalURL = 'http://euroflooring.co.in/kaindl-veneer/58edf3b61d42174d448024b9';
           ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          window.open = cordova.InAppBrowser.open;
        }else{
          $scope.finalURL = 'http://euroflooring.co.in/exterior-deck-tile/58ee2acc1d42174d448036e7';
          ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
         window.open = cordova.InAppBrowser.open;
        }
      }

  })
})

.controller('SearchCtrl', function ($scope, $stateParams, MyServices) {
  $scope.title='<img class="title-image" src="images/kidsintouchtext.png" />'
  $scope.searchText = {};
  $scope.search = function (value) {
    // var length = 0;
    $scope.companyCategory = [];
    $scope.company1 = [];
    $scope.companyProduct = [];
    $scope.isText = true;
    console.log("searchvalue",value)
    if (value.searchText != "") {
        console.log("searchvalue1",value)
        MyServices.search(value, function (data) {
            console.log("searchvalue2",value,data)
            if (data.value) {
                console.log("Event data", data);
                $scope.companyCategory = data.data.companyCategory;
                $scope.company1 = data.data.company;
                $scope.companyProduct = data.data.companyProduct;
                console.log($scope.companyCategory ,$scope.company ,$scope.companyProduct );
            } else {
                console.log("Event data false");
            }
        // else{
        //     console.log("not working")
        // }
        });

    }
};
})

  .controller('GalleryCtrl', function ($scope, $stateParams) {})

  .controller('AboutUsCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {
    MyServices.getAllCompany(function(data){
      console.log("getAllCompany",data);
      if(data.value == true){
        $scope.aboutProducts = data.data;
        console.log("helloProduct", $scope.aboutProducts)
        $scope.data1 = _.orderBy($scope.aboutProducts, ['order'], ['asc', 'desc'])
      } else {
        console.log("ERROR. NO DATA");
      }
    })
  });
