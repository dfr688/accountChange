<template>
  <div class="income">
		<ul>
			<li v-for="(type,index) in types" :key="index" @click="chooseType(index)">
				<div :class="{active: num == index}">
					<img :src="type.img" alt="">
				</div>
				<span>{{ type.title }}</span>
			</li>
		</ul>
		<Calculator v-show="isShow" @changeState="changeState" type="2" :label="num+8"/>
  </div>
</template>

<script>
	const types = [
		{
			img: require("../../assets/images/note/income_01.png"),
			title: "工资"
		},
		{
			img: require("../../assets/images/note/income_02.png"),
			title: "红包"
		},
		{
			img: require("../../assets/images/note/income_03.png"),
			title: "理财"
		},
		{
			img: require("../../assets/images/note/income_04.png"),
			title: "礼金"
		},
		{
			img: require("../../assets/images/note/income_05.png"),
			title: "生产"
		},
		{
			img: require("../../assets/images/note/income_06.png"),
			title: "其他收入"
		}
	]
	import Calculator from '../public/Calculator'
export default {
  name: '',
  data () {
    return {
      types: types,
	  isShow: false,
	  num: -1,
	  type: ""
    }
  },
  components: {
	  Calculator
  },
  methods: {
	  chooseType(index) {
		  this.num = index;
		  this.isShow = true;
	  },
	  changeState(val) {
		  this.isShow = val;
	  }
  },
  created() {
	  this.type = this.$route.params.type;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.income ul{
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.income ul li{
		width: 25%;
		text-align: center;
		font-size: .2rem;
		margin-top: .4rem;
	}
	.income ul li div{
		width: 1.2rem;
		height: 1.2rem;
		background: #f2f2f5;
		border-radius: .6rem;
		margin: 0 auto;
		margin-bottom: .2rem;
		line-height: 1.6rem;
	}
	.income ul li div.active{
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
	}
	.income ul li div img{
		width: .66rem;
		height: .66rem;
	}
</style>
