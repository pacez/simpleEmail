# Simple Email

Angularjs鱼骨头书中提到的使用Angular开发邮件系统会变得so easy! 闲来无事，做一个demo验证一下。

<b>开发中...</b><br>

目前项目中，存在大量过滤数据的循环，在实际开发中，这种情况是可以通过前端后端约定匹合进行避免的。<br>

例举：
<ol>
  <li>邮件列表未读标记状态更新，通过id遍历数组进行isUnread设置。实际开发中，前端应该通过异步请求将邮件id发送到后台进行已读状态的更新</li>
  <li>邮件列表选中状态，通过id遍历数据进行isSelected设置。实际开发中，前端应该通过异步请求将邮件id发送到后台进行已读状态的更新</li>
</ol>
类似的情况非常多...

访问地址：<a href="http://pacez.github.io/simpleMail/web/index.htm">http://pacez.github.io/simpleMail/web/index.html</a>

