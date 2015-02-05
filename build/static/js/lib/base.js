/*==========================基础方法============================*/
/*
* 浏览器端设备判断
* android/webos/ios/wp/blackberry/tizen/bada/kindle fire(HDX7/HDX8.9)
* 平板仅区分iPAD,其余平台归类为Mobile
*/

var _PLATFORM = {
 USERAGENT: navigator.userAgent.toLowerCase(),
 DEVICETYPE: 'pc'
};

if (/mobile|android|webos|ipad|iphone|ipod|blackberry|bb10|windows phone|samsung|kfthwi|kfapwi/i.test(_PLATFORM.USERAGENT)) {
  _PLATFORM.DEVICETYPE = "mobile";
}

_PLATFORM.isPc=function(){
  if(this.DEVICETYPE==='pc'){
    return true;
  }
  return false;
}

/*
* 工具类
* console
*/
var _TOOLS={
  console: function(msg){
    if(console && console.log){
      console.log(msg);
    }
  }
}

/*
* 设置不同设备类型的class root
*/
$(function(){
  if(_PLATFORM.isPc()){
    $("body").addClass('device-pc');
    if(/msie 6.0|msie 7.0|msie 8.0/i.test(_PLATFORM.USERAGENT)){
      alert("OMG！亲，你是火星来的吧！都20XX年了 ？快去下载最NB的Chrome吧！")
      window.location.href='http://www.google.cn/chrome/browser/desktop/index.html';
    }
  }else{
    $("body").addClass('device-mobile');
  }
})


/*
* 定义视图与模板路径
*/
_VIEWPATH= '/build/static/view/'+_PLATFORM.DEVICETYPE;
_TEMPLATEPATH= '/build/static/template/'+_PLATFORM.DEVICETYPE;

/*=======================业务层方法===============================*/

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

