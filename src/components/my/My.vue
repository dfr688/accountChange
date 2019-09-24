<template>
	<div class="my">
		<Swiper>
			<div class="top">
				<div class="out">
					<i class="iconfont icon-return" @click="goBack"></i>
					<span @click="signOut">退出</span>
				</div>
				 <div class="head_img">
					 <img src="../../assets/images/my/head.png" alt=""/>
				 </div>
				 <ul v-show="isSee">
					 <li>
						 <router-link to="/login">登录</router-link>
					 </li>
					 <li>
						 <router-link to="/register">注册</router-link>
					 </li>
				 </ul>
				 <p v-show="!isSee">{{ phone }}</p>
			 </div>
			 <div class="all">
				 <ul>
					 <li>
						 记账总天数<span>{{ totalDay }}</span>
					 </li>
					 <li>
						 记账总笔数<span>{{ totalCount }}</span>
					 </li>
				 </ul>
			 </div>
			 <div class="bill">
				 <div class="line"></div>
				 <router-link to="/bill" class="title">
					 <div class="left">
						 <div>
							 <img src="../../assets/images/my/icon.png" alt=""/>
						 </div>
						 <span>我的账单</span>
					 </div>
					 <div class="right">
						 <i></i>
					 </div>
				 </router-link>
				 <div class="bill_detail">
					 <div class="type">
						 <ul>
							 <li>
								 月份
							 </li>
							 <li>
								 收入
							 </li>
							 <li>
								 支出
							 </li>
						 </ul>
					 </div>
					 <ul class="cost">
						 <li v-for="(item,index) in detail" :key="index">
							 <p>{{ item.create_time.slice(5) }}月</p><p>{{ item.total_income }}</p><p>{{ item.total_expenditure }}</p>
						 </li>
					 </ul>
				 </div>
			 </div>
		</Swiper>
	</div>
</template>

<script>
	import Swiper from '../public/Swiper';
export default {
  name: '',
  data () {
    return {
      isSee: true,
	  phone: "",
	  detail: "",
	  totalCount: "",
	  totalDay: ""
    }
  },
  components:{
	  Swiper,
  },
  methods: {
	  goBack() {
		  this.$router.push("/home");
	  },
	  // 隐藏手机中间四位
	  geTel(tel) {
	  	return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
	  },
	  // 点击退出登录按钮
	  signOut() {
	  	localStorage.removeItem("phone");
	  	localStorage.removeItem("token");
	  	this.isSee = true;
		this.$router.push("/login");
	  },
	  // 发送请求
	  getBills() {
	  		  let token = localStorage.getItem("token");
	  		  this.baseJs.ajaxReq("/loatheb/api/recording/statistics/year",{year:2019},"get",token)
	  		  .then(res => {
	  			  // console.log(res);
	  			  this.detail = res.data.yearStatistics;
	  		  })
	  		  .catch(err => {
	  			  console.log(err);
	  		  })
	  },
  },
  created() {
	  this.phone = localStorage.getItem("phone");
	  if(this.phone != null){
		  this.phone = this.geTel(this.phone);
		  this.isSee = false;
	  }
	  this.getBills();
	  let token = localStorage.getItem("token");
	  this.baseJs.ajaxReq("/loatheb/api/user/recording/overview",{},"get",token)
	  .then(res => {
		  // console.log(res);
		  this.totalCount = res.data.totalCount;
		  this.totalDay = res.data.totalDay;
	  })
	  .catch(err => {
		  console.log(err);
	  })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/my.css';
</style>
