/*
* 浏览器端设备判断
* android/webos/ios/blackberry/tizen/bada/kindle fire(HDX7/HDX8.9)
* 平板仅区分iPAD,其余平台归类为Mobile
*/

 var _PLATFORM = {
   USERAGENT: navigator.userAgent.toLowerCase(),
   DEVICETYPE: 'pc'
 };

 if (/android|webos|ipad|iphone|ipod|blackberry|bb10|windows phone|samsung|kfthwi|kfapwi/i.test(_PLATFORM.USERAGENT)) {
    _PLATFORM.DEVICETYPE = "mobile";
 }

_VIEWPATH= '/build/static/view/'+_PLATFORM.DEVICETYPE;
_TEMPLATEPATH= '/build/static/template/'+_PLATFORM.DEVICETYPE;
