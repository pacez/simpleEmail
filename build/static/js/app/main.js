/*
* data structor
*/

var mailList=[];
    for(var i=1; i<21; i++){
      mailList.push({
        id: i,
        subject: i+' Thanks for you',
        sentTime: '2015-01-29 12:10',
        from:{name:'Pace Zhong', mail:'pacez@domain-inc.com'},
        to:[
          {name:'Nancy Liu', mail:'nancyl@domain-inc.com'},
          {name:'Sparda Li', mail:'spardal@domain-inc.com'}
        ],
        cc:[
          {name:'Clair Li', mail:'clairl@domain-inc.com'},
          {name:'Chirst Zhong', mail:'chirstz@domain-inc.com'}
        ],
        content: 'Content_'+i,
        attachment: [
          { label:'canglaoshiwuma.avi',link:'http://cctv/download/canglaoshiwuma.avi'},
          { label:'boduoyejieyi.avi',link:'http://cctv/download/boduoyejieyi.avi'}
        ]
      });
    }


/*
* The main enter
*/

//实例化应用
var app = angular.module('app', ['ngRoute']);

//应用配置
app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/build/static/view/mailList.html',
    controller: 'mailListCtrl'
  }).when('/mailDetail/:id',{
    templateUrl: '/build/static/view/mailDetail.html',
    controller: 'mailListCtrl'
  })
}]);;

//定义controller
app.controller('mailListCtrl', function($scope) {
  //实际开发，通过异步请求获取数据，且数据结构还可以优化，仅仅构建列表不需要内容，附件等等。
  $scope.mails=mailList;
});

app.controller('mailDetailCtrl', function($scope,$routeParams) {
  $scope.id = $routeParams.id;
  //实际开发过程中此处应该通过id异步请求邮件详情数据。
  //此处我通过自定义的mailFilter过滤数据，获取匹配的邮件详情数据： mail in mailList | mailFilter:id:id
  $scope.mailList=mailList;
});

app.controller('mailMenuCtrl', function($scope) {
  $scope.mails=mailList;
});

//定义指令
app.directive('mailMenu', function() {
  var options={
        templateUrl: '/build/static/template/menu.html',
        replace: true
      }
  return options;
})

app.directive('templateHeader', function() {
  var options={
        templateUrl: '/build/static/template/header.html',
        replace: true
      }
  return options;
})
app.directive('templateFooter', function() {
  var options={
        templateUrl: '/build/static/template/footer.html',
        replace: true
      }
  return options;
})


//自定义邮件过滤器，通过key,value过淲数据
app.filter('mailFilter',function () {
  return function (mails,key,value) {
    if(key && value){
      var matchMails=[];
      for(var i=0; i<mails.length; i++){
        if(mails[i][key]==value){
          var mail=mails[i];
              matchMails.push(mail);
        }
      }
    }
    return matchMails ? matchMails : mails;
  }
});

//设置mail内容区域高度
var setMailContentHeight=function(){
  var $mailContent=$("#mailContent"),
      deviator=$("#footer").height()+35,
      getMailContentHeight=$(window).height()-$mailContent.offset().top-deviator;
  $mailContent.height(getMailContentHeight);
}
