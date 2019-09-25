<template>
  <div class="dayDetail">
      <Swiper>
        <div class="top">
            <i class="iconfont icon-return" @click="goBack"></i>账单详情
        </div>
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
        <div class="nothing" v-if="dayPrice.length == 0">
            <div></div>
            <p>暂无订单详情</p>
        </div>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
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
 name: "",
  data () {
    return {
        dayPrice:[],
        types: types
    }
  },
  components: {
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.push("/home");
      }
  },
  created () {
      this.dayPrice = this.$route.query.dayPrice;
  },
  mounted () {},
}
</script>
<style scoped>
.dayDetail{
    height: 100%;
}
.dayDetail .top{
	width: 100%;
	height: 1.38rem;
	background: url(../../assets/images/public/set.png) no-repeat left top;
	background-size: 100% 99%;
    margin-bottom: .4rem;
    font-size: .36rem;
	text-align: center;
    padding-top: .66rem;
	position: relative;
	box-sizing: border-box;
}
.dayDetail .top i{
    font-size: .46rem;
    position: absolute;
    top: .69rem;
    left: .2rem;
}
.dayDetail .detail .tit{
	display: flex;
	font-size: .2rem;
	color: #999;
	padding: .2rem .2rem .1rem .2rem;
	border-bottom: 1px solid #f1f1f1;
}
.dayDetail .detail .tit .left{
	flex: 1;
}
.dayDetail .detail .tit .right{
	flex: 2;
	text-align: right;
}
.dayDetail .detail .tit .right span:first-child{
	margin-right: .6rem;
}
.dayDetail .detail ul{
	margin-top: .3rem;
}
.dayDetail .detail ul li{
	display: flex;
	font-size: .24rem;
	margin: 0 .2rem;
	height: .7rem;
	line-height: .7rem;
	margin-bottom: .3rem;
}
.dayDetail .detail ul li div{
	flex: 1;
}
.dayDetail .detail ul li .left div{
	width: .7rem;
	height: .7rem;
	border-radius: 100%;
	display: inline-block;
	margin-right: .3rem;
	text-align: center;
	line-height: .8rem;
}
.dayDetail .detail ul li .left div img{
	width: 100%;
	height: 100%;
	border-radius: 100%;
	margin-bottom: -.21rem;
}
.dayDetail .detail ul li .right{
	text-align: right;
}
.dayDetail .nothing{
    font-size: .3rem;
    color: #999;
    text-align: center;
    margin-top: 3rem;
}
.dayDetail .nothing div{
    width: 1.62rem;
    height: 1.28rem;
    background: url(../../assets/images/home/nothing.png) no-repeat left top;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: .3rem;
}
</style>