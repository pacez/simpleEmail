/*=====================angular模块定义及匹置========================*/
//实例化应用
var app = angular.module('app', ['ngRoute']);

//应用配置
app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/inbox', {
    templateUrl: _VIEWPATH+'/inbox.html',
    controller: 'inboxCtrl'
  }).when('/inbox/:id',{
    templateUrl: _VIEWPATH+'/inboxDetail.html',
    controller: 'inboxDetailCtrl'
  }).when('/draft',{
    templateUrl: _VIEWPATH+'/draft.html',
    controller: 'draftCtrl'
  }).when('/draft/:id',{
    templateUrl: _VIEWPATH+'/draftDetail.html',
    controller: 'draftDetailCtrl'
  }).when('/compose',{
    templateUrl: _VIEWPATH+'/compose.html',
    controller: 'draftDetailCtrl'
  }).otherwise({
    redirectTo: '/inbox'
  });
}]);;

//自定义邮件过滤器，通过key,value过淲数据
//考虑效率问题，实际开发过程中，过滤由异步请求完成
app.filter('mailFilter',function () {
  return function (mailList,key,value) {
    if(key && value){
      var matchMails=[];
      for(var i=0; i<mailList.length; i++){
        if(mailList[i][key]==value){
          var mail=mailList[i];
              matchMails.push(mail);
        }
      }
    }
    return matchMails ? matchMails : mailList;
  }
});


