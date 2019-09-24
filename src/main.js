// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/css/initial.css'
import './assets/js/rem'
import '@/assets/iconfont/iconfont.css'

// 把封装的axios挂载到原型上
import baseJS from './api'
Vue.prototype.baseJs = baseJS

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);

import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

// 首页中的日期处理 只显示年月
Vue.prototype.dateTime = function(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	if (month < 10) { month = '0' + month };
	let time = year + "年" + month + "月";
	return time
};
// 处理返回来的日期格式 
Vue.prototype.formatDate = function(secs) {
    var t = new Date(secs);
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
	if (month < 10) { month = '0' + month };
    return year + '年' + month + '月';
};
// 处理Main组件接口返回来的日期
Vue.prototype.formatTime = function(time) {
	if(time == undefined){
		return;
	}
	let date = new Date(time.replace(/-/g, '/'));
	let month = date.getMonth() + 1;
	if (month < 10) { month = '0' + month };
	let day = date.getDate()
    if (day < 10) { day = '0' + day }
	return month + "月" + day + "日";
}
// 处理首页弹框接口返回来的日期 显示年月日
Vue.prototype.formatT = function(t) {
	let date = new Date(t.replace(/-/g, '/'));
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	if (month < 10) { month = '0' + month };
	let day = date.getDate()
	if (day < 10) { day = '0' + day }
	let time = year + "年" + month + "月" + day + "日";
	return time
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
