/*
* ��������豸�ж�
* android/webos/ios/blackberry/tizen/bada/kindle fire(HDX7/HDX8.9)
* ƽ�������iPAD,����ƽ̨����ΪMobile
*/

var _PLATFORM = {
 USERAGENT: navigator.userAgent.toLowerCase(),
 DEVICETYPE: 'pc'
};

if (/android|webos|ipad|iphone|ipod|blackberry|bb10|windows phone|samsung|kfthwi|kfapwi/i.test(_PLATFORM.USERAGENT)) {
  _PLATFORM.DEVICETYPE = "mobile";
}

/*
* ������
* console
*/
var _TOOLS={
  console: function(msg){
    if(console && console.log){
      console.log(msg);
    }
  }
}

_VIEWPATH= '/build/static/view/'+_PLATFORM.DEVICETYPE;
_TEMPLATEPATH= '/build/static/template/'+_PLATFORM.DEVICETYPE;

