var adminurl = "http://192.168.1.105/api/"; //server
// var adminurl = "http://192.168.0.119:1337/api/"; //server
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
      companyBanner: function (callback) {
        $http({
          url: adminurl + 'Company/search',
          method: 'POST',
          withCredentials: true
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
  });
