/*
* data structor
*/

var  mailList=[];
    for(var i=0; i<20; i++){
      mailList.push({
        id: i,
        subject: i+'th letter',
        sentTime: '2015-01-29',
        form:{name:'Pace Zhong', mail:'pacez@domain-inc.com'},
        hasAttach: true
      });
    }

var  mail={
      cc:[
        {name:'Nancy Liu', mail:'nancyl@domain-inc.com'},
        {name:'Sparda Li', mail:'spardal@domain-inc.com'}
      ],
      content: 'Content',
      attach: [
        { label:'canglaoshiwuma.avi',link:'http://cctv/download/canglaoshiwuma.avi'}
      ]
    };



/*
* The main enter
*/

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/build/static/view/mailList.html',
    controller: 'mailList'
  })
}]);

app.controller('mailList', function($scope) {
  $scope.mails=mailList;
});

app.controller('mailMenu', function($scope) {
  $scope.mails=mailList;
});

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
