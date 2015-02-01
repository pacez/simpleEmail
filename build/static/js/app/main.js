/*
* data structor
*/

var mailList=[];
    for(var i=1; i<41; i++){
      mailList.push({
        id: i,
        isRead: i%2==0 ? true : false,
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

var draftList=[];
    for(var i=1; i<23; i++){
      draftList.push({
        id: i,
        subject: i+' Draft',
        sentTime: '2015-01-29 12:10',
        from:{name:'Pace Zhong', mail:'pacez@domain-inc.com'},
        to:[
          {name:'Apple Liu', mail:'applel@domain-inc.com'},
          {name:'Peter Hu', mail:'peterh@domain-inc.com'}
        ],
        cc:[
          {name:'Alice Zhu', mail:'alicez@domain-inc.com'},
          {name:'Jane Zhong', mail:'janez @domain-inc.com'}
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
  $routeProvider.when('/inbox', {
    templateUrl: '/build/static/view/inbox.html',
    controller: 'inboxCtrl'
  }).when('/inbox/:id',{
    templateUrl: '/build/static/view/inboxDetail.html',
    controller: 'inboxDetailCtrl'
  }).when('/draft',{
    templateUrl: '/build/static/view/draft.html',
    controller: 'draftCtrl'
  }).when('/draft/:id',{
    templateUrl: '/build/static/view/draftDetail.html',
    controller: 'draftDetailCtrl'
  }).otherwise({  
    redirectTo: '/inbox'
  });  
}]);;

//定义controller
app.controller('inboxCtrl', function($scope) {
  //实际开发，通过异步请求获取数据，且数据结构还可以优化，仅仅构建列表不需要内容，附件等等。
  $scope.mails=mailList;
});

app.controller('inboxDetailCtrl', function($scope,$routeParams) {
  $scope.id = $routeParams.id;
  //实际开发过程中此处应该通过id异步请求邮件详情数据。
  //此处我通过自定义的mailFilter过滤数据，获取匹配的邮件详情数据： mail in mailList | mailFilter:id:id
  $scope.mailList=mailList;

  for(var i=0; i<$scope.mailList.length; i++){
    if($scope.mailList[i].id==$routeParams.id){
      $scope.mailList[i].isSelected=true;
    }else {
      $scope.mailList[i].isSelected=false;
    }
  }
});

app.controller('draftCtrl', function($scope) {
  //实际开发，通过异步请求获取数据，且数据结构还可以优化，仅仅构建列表不需要内容，附件等等。
  $scope.drafts=draftList;
});

app.controller('draftDetailCtrl', function($scope,$routeParams) {
  $scope.id = $routeParams.id;
  //实际开发过程中此处应该通过id异步请求邮件详情数据。
  //此处我通过自定义的mailFilter过滤数据，获取匹配的邮件详情数据： mail in mailList | mailFilter:id:id
  $scope.mailList=draftList;

  for(var i=0; i<$scope.mailList.length; i++){
    if($scope.mailList[i].id==$routeParams.id){
      $scope.mailList[i].isSelected=true;
    }else {
      $scope.mailList[i].isSelected=false;
    }
  }

  console.log($scope.mailList)
});

app.controller('mailMenuCtrl', function($scope) {
  $scope.mails=mailList;
  $scope.drafts=draftList;
});

//定义指令
app.directive('templateMenu', function() {
  var options={
        templateUrl: '/build/static/template/menu.html',
        replace: true
      }
  return options;
});

app.directive('templateHeader', function() {
  var options={
        templateUrl: '/build/static/template/header.html',
        replace: true
      }
  return options;
});

app.directive('templateFooter', function() {
  var options={
        templateUrl: '/build/static/template/footer.html',
        replace: true
      }
  return options;
});

app.directive('inboxList', function() {
  var options={
        templateUrl: '/build/static/template/inboxList.html',
        replace: true
      }
  return options;
});

app.directive('draftList', function() {
  var options={
        templateUrl: '/build/static/template/draftList.html',
        replace: true
      }
  return options;
});


//自定义邮件过滤器，通过key,value过淲数据
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

//设置mail内容区域高度
var setMainHeight=function(id,deviator){
  var $mailContent=$("#"+id),
      deviator=$("#footer").height()+15+(deviator ? deviator : 0),
      getMailContentHeight=$(window).height()-$mailContent.offset().top-deviator;
  $mailContent.height(getMailContentHeight);
};


$(function(){
  setMainHeight('mailMain',71);
  $(document).on('click.menu',function(e){
    var $elem=$(e.target);
        if($elem.hasClass("menu-item")){
          $elem.parent().parent().find("a").removeClass('selected');
          $elem.addClass('selected');
        }
  });
});