//var adminurl = "http://galaapi.wohlig.co.in/api/"; //server
 var adminurl = "http://192.168.1.123:80/api/"; //local
// var imgpath = adminurl + "uploadfile/getupload?file=";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";
// var uploadurl = imgurl;
angular.module('starter.services', [])
  .factory('MyServices', function ($http) {

    return {


      //To verfiy OTP

      HomeBanner: function (callback) {
        $http({
          url: adminurl + 'HomeBanner/search',
          method: 'POST',
          withCredentials: true
        }).success(callback);
      },

    CompanyProduct: function (callback) {
        $http({
          url: adminurl + 'CompanyProduct/getAllProduct',
          method: 'POST',
          withCredentials: true
        }).success(callback);
      },


      companyBanner: function (callback) {
        $http({
          url: adminurl + 'Company/search',
          method: 'POST',
          withCredentials: true
        }).success(callback);
      },
      login: function (data, callback) {
        console.log(data);
        $http({
          url: adminurl + 'User/userLogin',
          method: 'POST',
          data: data
        }).success(callback);
      },
      signup: function (data, callback) {
        $http({
          url: adminurl + 'User/registerAppuser',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
      getAllCategoriesOfCompany: function (data, callback) {
        $http({
          url: adminurl + 'CompanyCategory/getAllCategoriesOfCompany',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },

      getCompanyBanner: function (data, callback) {
        $http({
          url: adminurl + 'Company/getCompanyBanner',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
      getAllProductWithCategory: function (data, callback) {
        $http({
          url: adminurl + 'CompanyProduct/getAllProductWithCategory',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },
      getOneProductDetails: function (data, callback) {
        $http({
          url: adminurl + 'CompanyProduct/getOneProductDetails',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },

    };
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
