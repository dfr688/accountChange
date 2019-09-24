<template>
	<div class="home">
	  <Swiper>
		<div class="top">
			<div class="time">
				<p @click="openPicker">{{ date }}<i :class="{active:isSee}"></i></p>
			</div>
			<span class="calendar" @click="goCalendar"></span>
			<div class="logo"></div>
			<ul>
				<li>
					<p>{{ info.totalIncome }}.00</p>
					<span>收入</span>
				</li>
				<li>
					<p>{{ info.totalExpenditure }}.00</p>
					<span>支出</span>
				</li>
			</ul>
		</div>
		<Main :lists="lists" @refreshHome="refreshHome" @appear="appear" @getId="getId"/>
		
	  </Swiper>
	  	<!-- 日历选择弹框 -->
	  <mt-datetime-picker v-model="pickerVisible" ref="picker" type="date" year-format="{value} " month-format="{value} "
	   date-format="{value} " @confirm="handleConfirm">
	  </mt-datetime-picker>
	  <!-- 弹框 -->
	  <mt-popup
	    v-model="popupVisible"
	    popup-transition="popup-fade">
	    <div class="popup" v-if="!intro.type ==''">
	    	<div class="tops">
	    		<div>
	    			<img :src="types[intro.label - 1].img" alt=""/>
	    		</div>
	    		<span>{{ types[intro.label - 1].title }}</span>
	    	</div>
	    	<ul class="item_detail">
	    		<li>
	    			<span>类型</span><input type="text" v-model="typeName" readonly onfocus="this.blur()"/>
	    		</li>
	    		<li>
	    			<span>金额</span><input type="text" v-model="cost"/>
	    		</li>
	    		<li>
	    			<span>日期</span><input type="text" v-model="dates" readonly onfocus="this.blur()"/>
	    		</li>
	    		<li>
	    			<span>备注</span><input type="text" v-model="remark"/>
	    		</li>
	    	</ul>
	    	<ul class="bottom">
	    		<li @click="goEdit">
	    			编辑
	    		</li>
	    		<li @click="goDelet">
	    			删除
	    		</li>
	    	</ul>
	    </div>
	  </mt-popup>
	</div>
</template>

<script>
	import Swiper from '../public/Swiper';
	import Main from './Main'
	const types = [
		{
			img: require("../../assets/images/home/sign_01.png"),
			title: "日用百货"
		},
		{
			img: require("../../assets/images/home/sign_02.png"),
			title: "娱乐"
		},
		{
			img: require("../../assets/images/home/sign_03.png"),
			title: "礼物"
		},
		{
			img: require("../../assets/images/home/sign_04.png"),
			title: "医疗教育"
		},
		{
			img: require("../../assets/images/home/sign_05.png"),
			title: "餐饮"
		},
		{
			img: require("../../assets/images/home/sign_06.png"),
			title: "交通"
		},
		{
			img: require("../../assets/images/home/sign_07.png"),
			title: "其他支出"
		},
		{
			img: require("../../assets/images/home/sign_08.png"),
			title: "工资"
		},
		{
			img: require("../../assets/images/home/sign_09.png"),
			title: "红包"
		},
		{
			img: require("../../assets/images/home/sign_10.png"),
			title: "理财"
		},
		{
			img: require("../../assets/images/home/sign_11.png"),
			title: "礼金"
		},
		{
			img: require("../../assets/images/home/sign_12.png"),
			title: "生产"
		},
		{
			img: require("../../assets/images/home/sign_13.png"),
			title: "其他收入"
		}
	]

	export default {
		name: '',
		data() {
			return {
				pickerVisible: "",
				date: "",
				isSee: false,
				info: "",
				lists: [],
				popupVisible: false,
				types: types,
				intro: "",
				typeName: '',
				cost: '',
				dates: '',
				remark: '',
				itemId: ""
			}
		},
		components: {
			Main,
			Swiper
		},
		methods: {
			// 进入日历页面
			goCalendar() {
				this.$router.push("/calendars");
			},
			// 打开日历选择弹框
			openPicker() {
				this.$refs.picker.open();
				this.pickerVisible = new Date();
				this.isSee = true;
			},
			handleConfirm() {
				this.date = this.formatDate(this.pickerVisible);
				this.isSee = false;
				this.getDetail();
			},
			// 获取首页明细
			getDetail() {
				let year = this.date.slice(0, 4);
				let month = this.date.slice(5, 7);
				let token = localStorage.getItem("token");
				this.baseJs.ajaxReq("/loatheb/api/recording/statistics", {
						year: year,
						month: month
					}, "get", token)
					.then(res => {
						// console.log(res);
						this.info = res.data;
						this.lists = res.data.statisticsMapList;
					})
					.catch(err => {
						console.log(err);
					})
			},
			refreshHome(val) {
				this.intro = val;
				this.typeName = this.intro.type;
				this.cost = this.intro.amount;
				this.remark = this.intro.description;
				this.dates = this.formatT(this.intro.createTime);
			},
			appear(val) {
				this.popupVisible = val;
			},
			getId(val) {
				this.itemId = val;
			},
			 // 编辑
			goEdit() {
					   let token = localStorage.getItem("token");
					   this.baseJs.httpReq("/loatheb/api/recording",this.itemId,{amount:this.cost,description:this.remark},"post",token)
					   .then(res => {
						   // console.log(res);
						   // this.$emit("refreshHome");
						   this.getDetail();
					   })
					   .catch(err => {
						   console.log(err);
					   })
					   this.popupVisible = false;
			},
			// 删除
			goDelet() {
					  let token = localStorage.getItem("token");
					  this.baseJs.httpReq("/loatheb/api/recording",this.itemId,{},"delete",token)
					  .then(res => {
						  // console.log(res);
						  // this.$emit("refreshHome");
						  this.getDetail();
					  })
					  .catch(err => {
						  console.log(err);
					  })
					  this.popupVisible = false;
			}
		},
		created() {
			this.date = this.dateTime();
			this.getDetail();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/home.css';
</style>
