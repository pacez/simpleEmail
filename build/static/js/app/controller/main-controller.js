//定义controller
app.controller('rootCtrl', function($scope) {
  //实际开发，通过异步请求获取数据，且数据结构还可以优化，仅仅构建列表不需要内容，附件等等。
  $scope.mails=mailList;
  $scope.$on('watchUnreadCount', function(event,id){
    $scope.$broadcast('setReadStatus', id)
  })
});

app.controller('inboxCtrl', function($scope) {
  //实际开发，通过异步请求获取数据，且数据结构还可以优化，仅仅构建列表不需要内容，附件等等。
  $scope.mails=mailList;
  $scope.setRead=function(id){
    $scope.$emit("watchUnreadCount", id);
  }
});

app.controller('mailMenuCtrl', function($scope) {
  var urlArr=window.location.href.split('#'),
      routeArr=urlArr[urlArr.length-1].split('/'),
      routeRoot="#/"+routeArr[1];

  $scope.mainMenu=mainMenu;
  //根据route设置选中状态
  for(var i=0; i<$scope.mainMenu.length; i++){
    if($scope.mainMenu[i].route==routeRoot){
      $scope.mainMenu[i].isSelected=true;
    }else {
      $scope.mainMenu[i].isSelected=false;
    }
  }

  //获取未读邮件数量
  $scope.mainMenu[0].unreadCount=getUnreadCount();

  $scope.$on('setReadStatus', function(e,id){
    setUnreadCount(id);
    $scope.mainMenu[0].unreadCount=getUnreadCount();
  })
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

  $scope.$on('setReadStatus', function(e,id){
    $scope.mailList=mailList;
  })
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
});
