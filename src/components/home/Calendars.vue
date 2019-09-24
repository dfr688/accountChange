<template>
  <div class="calendar">
	<Swiper>
		<div class="back">
			<span class="iconfont icon-return" @click="goBack"></span>
		</div>
		<div class="add" @click="goNote">
			<span>添加</span>
		</div>
		<Calendar @getData="getData"/>
		<div class="sign">
			<ul>
				<li>
					<span class="blue"></span>收入大于支出
				</li>
				<li>
					<span class="red"></span>支出大于收入
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="detail" v-if="!dayPrice.length == 0">
			<div class="tit">
				<div class="left">
					{{ formatTime(dayPrice[0].createTime) }}
				</div>
				<div class="right">
					<span>收入：{{ dayPrice[0].totalIncome }}</span><span>支出：{{ dayPrice[0].totalExpenditure }}</span>
				</div>
			</div>
			<ul>
				<li v-for="(item,index) in dayPrice[0].recordingInfoList" :key="item.id">
					<div class="left">
						<div>
							<img :src="types[item.label-1].img" alt=""/>
						</div>
						<span>{{ types[item.label-1].title }}</span>
					</div>
					<div class="right">
						{{ item.amount }}
					</div>
				</li>
			</ul>
		</div>
	</Swiper>
  </div>
</template>

<script>
	import Calendar from './vue-Calendar.vue';
	import Swiper from '../public/Swiper';
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
  data () {
    return {
      dayPrice:[],
	  types: types
    }
  },
	components: {
		Calendar,
		Swiper
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		goNote() {
			this.$router.push("/note");
		},
		getData(val) {
			// console.log(val);
			this.dayPrice = val;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/calendar.css';
</style>
