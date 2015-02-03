/*===========================构建页面数据====================*/
var mailList=[];
    for(var i=1; i<41; i++){
      mailList.push({
        id: i,
        isUnread: i%3==0 ? true : false,
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

var mainMenu=[
  {name: 'inbox', route:'#/inbox', count: mailList.length},
  {name: 'draft', route:'#/draft', count: draftList.length}
];

/*=====================angular模块定义及匹置========================*/
//实例化应用
var app = angular.module('app', ['ngRoute']),
    serverRoot= '/build';

//应用配置
app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/inbox', {
    templateUrl: serverRoot+'/static/view/inbox.html',
    controller: 'inboxCtrl'
  }).when('/inbox/:id',{
    templateUrl: serverRoot+'/static/view/inboxDetail.html',
    controller: 'inboxDetailCtrl'
  }).when('/draft',{
    templateUrl: serverRoot+'/static/view/draft.html',
    controller: 'draftCtrl'
  }).when('/draft/:id',{
    templateUrl: serverRoot+'/static/view/draftDetail.html',
    controller: 'draftDetailCtrl'
  }).when('/compose',{
    templateUrl: serverRoot+'/static/view/compose.html',
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

/*=====================公共方法========================*/
//设置mail内容区域高度
var setMainHeight=function(id,deviator){
  var $mailContent=$("#"+id),
      deviator=$("#footer").height()+15+(deviator ? deviator : 0),
      getMailContentHeight=$(window).height()-$mailContent.offset().top-deviator;
  $mailContent.height(getMailContentHeight);
};

//获取未读邮件数量
var getUnreadCount=function(){
    var unreadCount=0;
    for(var i=0; i<mailList.length; i++){
      if(mailList[i].isUnread){
        unreadCount+=1;
      }
    }
    return unreadCount;
}

//根据id设置邮件集合未读状态
var setUnreadCount=function(id){
  for(var i=0; i<mailList.length; i++){
    if(mailList[i].id==id){
      mailList[i].isUnread=false;
      break;
    }
  }
}

$(function(){
  //设置默认高度
  setMainHeight('mailMain',71)
});
