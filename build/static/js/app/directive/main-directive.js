//定义指令
app.directive('mainMenu', function() {
  var html='';
      html+='<ul id="menuAction" class="menu-main">';
        html+='<li ng-repeat="item in mainMenu"><a ng-class="{\'selected\': item.isSelected}" class="menu-item" ng-href="{{item.route}}">{{item.name}} (<span ng-if="item.unreadCount>0"><span class="unread">{{item.unreadCount}}</span> / </span>{{item.count}})</a></li>';
        html+='<li style="color: #666">Developing...</li>'
      html+='</ul>';
  var options={
        template: html,
        replace: true,
        link: function (scope, elem, iAttrs) {
          $(document).on('click.menu',elem,function(e){
            var $elem=$(e.target),
                $menu=elem.find(".menu-item");
                if($elem.hasClass("menu-item")){
                  $menu.removeClass('selected');
                  $elem.addClass('selected');
                }
                if($elem.is("#logo")){
                  $menu.removeClass('selected');
                  $($menu[0]).addClass('selected');
                }
          });
        }
      }
  return options;
});

app.directive('templateHeader', function() {
  var options={
        templateUrl: _TEMPLATEPATH+'/header.html',
        replace: true
      }
  return options;
});

app.directive('templateFooter', function() {
  var options={
        templateUrl: _TEMPLATEPATH+'/footer.html',
        replace: true
      }
  return options;
});

app.directive('templateMenu', function() {
  var options={
        templateUrl: _TEMPLATEPATH+'/menu.html',
        replace: true
      }
  return options;
});
app.directive('templateContent', function() {
  var options={
        templateUrl: _TEMPLATEPATH+'/content.html',
        replace: true,
        link: function(){
          setMainHeight('mailMain',16);
        }
      }
  return options;
});

app.directive('inboxList', function() {
  var options={
        templateUrl: _TEMPLATEPATH+'/inboxList.html',
        replace: true
      }
  return options;
});

app.directive('draftList', function() {
  var options={
        templateUrl: _TEMPLATEPATH+'/draftList.html',
        replace: true
      }
  return options;
});
