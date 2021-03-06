var adminurl = "http://galaapi.wohlig.co.in/api/"; //server
//  var adminurl = "http://192.168.1.123:80/api/"; //local
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

      getAllCategories: function (callback) {
        $http({
          url: adminurl + 'CompanyCategory/getAllCategory',
          method: 'POST',
          withCredentials: true,
        }).success(callback);
      },

      getAllProducts:function(callback) {
        $http({
          url: adminurl + 'CompanyProduct/getAllProduct',
          method: 'POST',
          withCredentials: true,
        }).success(callback);
      },

      search:function(data,callback){
        $http({
          url: adminurl + 'Company/globalSearch',
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
      getAllCompany: function (callback) {
        $http({
          url: adminurl + 'company/getAllCompany',
          method: 'POST',
          withCredentials: true
        }).success(callback);
      },
      getAllCompanyWithCategory: function (callback) {
        $http({
          url: adminurl + 'Company/getAllCompanyWithCategory',
          method: 'POST',
          withCredentials: true
        }).success(callback);
      },
      BrandsHomeImage: function(callback){
        $http({
          url: adminurl + 'BrandsHomeImage/search',
          method: 'POST',
          withCredentials: true
        }).success(callback);
      },
      
      Enquiry: function(data,callback){
        $http({
          url: adminurl + 'ContactUs/save',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },

      companyCategory: function(data,callback){
        $http({
          url: adminurl + 'CompanyCategory/getOne',
          method: 'POST',
          withCredentials: true,
          data: data
        }).success(callback);
      },

      Showroom: function(callback){
        $http({
          url: adminurl + 'Showroom/getAllShowroom',
          method: 'POST',
          withCredentials: true,
        }).success(callback);
      },

      Download: function(callback){
        $http({
          url: adminurl + 'PdfImageUpload/getAllPdfData',
          method: 'POST',
          withCredentials: true,
        }).success(callback);
      }
      
    };
  })
 
