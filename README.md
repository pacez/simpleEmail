# Simple Email

Angularjs鱼骨头书中提到的使用Angular开发邮件系统会变得so easy! 闲来无事，做一个demo验证一下。

    由于时间关系，该项目止于收件箱/草稿箱/新邮件的信息展示及未读状态同步。移动端端仅支持收件箱信息展示及未读状态同步。
    经过该项目，基本掌握angularjs的开发方式。更为深入研究，将会在后续项目中持续进行。

BTW:目前项目中，存在大量过滤数据的循环，在实际开发中，这种情况是可以通过前端后端约定配合进行避免的。<br>

例举：
<ol>
  <li>邮件列表未读标记状态更新，通过id遍历数组进行isUnread设置。实际开发中，前端应该通过异步请求将邮件id发送到后台进行已读状态的更新</li>
  <li>邮件列表选中状态，通过id遍历数据进行isSelected设置。实际开发中，前端应该通过异步请求将邮件id发送到后台进行已读状态的更新</li>
</ol>
类似的情况非常多...

###跨平台实践：
判断平台信息(<a href="https://github.com/pacez/mt">mt.js</a>)加载不同视图，以实现在PC端与移动端最佳的用户体验，经实践，该方案可性，且自由度较高，寻找机会应用于项目实践中.

demo地址：<a href="http://pacez.github.io/simpleMail/web/index.htm">http://pacez.github.io/simpleMail/web/index.html</a>

