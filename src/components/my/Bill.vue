<template>
  <div class="bill">
	<Swiper>
		<div class="top">
			 <div class="year" @click="chooseYear">{{ year }}年<span :class="{active:popupVisible}"></span></div>
			 <i class="iconfont icon-return" @click="goBack"></i>
			 <ul>
				 <li>
					<p>{{ bills.totalIncome }}.00</p>
					<span>收入</span>
				 </li>
				 <li>
					<p>{{ bills.totalExpenditure }}.00</p>
					<span>支出</span>
				 </li>
			 </ul>
		</div>
		 <div class="line"></div>
		 <div class="detail">
			 <ul class="type">
				 <li>
					 <p>月份</p><p>收入</p><p>支出</p>
				 </li>
			 </ul>
			 <ul class="details">
				 <li v-for="(item,index) in bills.yearStatistics" :key="index">
					<p>{{ item.create_time.slice(5) }}月</p><p>{{ item.total_income }}</p><p>{{ item.total_expenditure }}</p>
				 </li>
			 </ul>
		 </div>
	</Swiper>
	 <!-- 年份选择弹框 -->
	 <mt-popup
	   v-model="popupVisible"
	   position="bottom">
	   <div class="frame_upper">
	 	  <span @click="chooseCancle">取消</span><p @click="chooseSure">确定</p>
	   </div>
	   <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
	 </mt-popup>
  </div>
</template>

<script>
	let years = []
	for (var i = 2017; i <= 2050; i++) {
		 years.push(i);
	}
	import Swiper from '../public/Swiper';
export default {
  name: '',
  data () {
    return {
	   year: "2019",
	   years: [years],
	   value: "",
	   popupVisible: false,
	   slots: [
	     {
	       values: years,
	       textAlign: 'center',
	   	   defaultIndex: 2
	     }
	   ],
	   bills: []
    }
  },
  components: {
	 Swiper 
  },
  methods: {
	  // 出现年份弹框
	  chooseYear() {
		  this.popupVisible = true;
	  },
	  // 选中的值改变时  获取当前选中的值
	  onValuesChange(picker, values) {
	  	// console.log(values[0]);
	  	this.value = values[0];
	  },
	  // 点击弹出层中的确定按钮
	  chooseSure() {
	  	this.year = this.value;
		this.getYear();
	  	this.popupVisible = false;
	  },
	  // 点击弹出层中的取消按钮
	  chooseCancle() {
		this.popupVisible = false;
	  },
	  goBack() {
		  this.$router.go(-1);
	  },
	  getYear() {
		  let token = localStorage.getItem("token");
		  this.baseJs.ajaxReq("/loatheb/api/recording/statistics/year",{year:this.year},"get",token)
		  .then(res => {
			  // console.log(res);
			  this.bills = res.data;
		  })
		  .catch(err => {
			  console.log(err);
		  })
	  }
  },
  created() {
	  this.getYear();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/bill.css'
</style>
