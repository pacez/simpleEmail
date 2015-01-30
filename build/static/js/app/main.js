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

//ʵ����Ӧ��
var app = angular.module('app', ['ngRoute']);

//Ӧ������
app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/build/static/view/mailList.html',
    controller: 'mailListCtrl'
  }).when('/mailDetail/:id',{
    templateUrl: '/build/static/view/mailDetail.html',
    controller: 'mailListCtrl'
  })
}]);;

//����controller
app.controller('mailListCtrl', function($scope) {
  //ʵ�ʿ�����ͨ���첽�����ȡ���ݣ������ݽṹ�������Ż������������б���Ҫ���ݣ������ȵȡ�
  $scope.mails=mailList;
});

app.controller('mailDetailCtrl', function($scope,$routeParams) {
  $scope.id = $routeParams.id;
  //ʵ�ʿ��������д˴�Ӧ��ͨ��id�첽�����ʼ��������ݡ�
  //�˴���ͨ���Զ����mailFilter�������ݣ���ȡƥ����ʼ��������ݣ� mail in mailList | mailFilter:id:id
  $scope.mailList=mailList;
});

app.controller('mailMenuCtrl', function($scope) {
  $scope.mails=mailList;
});

//����ָ��
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


//�Զ����ʼ���������ͨ��key,value���W����
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

//����mail��������߶�
var setMailContentHeight=function(){
  var $mailContent=$("#mailContent"),
      deviator=$("#footer").height()+35,
      getMailContentHeight=$(window).height()-$mailContent.offset().top-deviator;
  $mailContent.height(getMailContentHeight);
}
