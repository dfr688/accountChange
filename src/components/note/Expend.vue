<template>
  <div class="expend">
		<ul>
			<li v-for="(type,index) in types" :key="index" @click="chooseType(index)">
				<div :class="{active:num == index}">
					<img :src="type.img" alt=""/>
				</div>
				<span>{{ type.title }}</span>
			</li>
		</ul>
		<Calculator v-show="isShow" @changeState="changeState" type="1" :label="num+1"/>
  </div>
</template>

<script>
	import Calculator from '../public/Calculator'
	
	const types = [
		{
			img: require("../../assets/images/note/expend_01.png"),
			title: "日用百货"
		},
		{
			img: require("../../assets/images/note/expend_02.png"),
			title: "娱乐"
		},
		{
			img: require("../../assets/images/note/expend_03.png"),
			title: "礼物"
		},
		{
			img: require("../../assets/images/note/expend_04.png"),
			title: "医疗教育"
		},
		{
			img: require("../../assets/images/note/expend_05.png"),
			title: "餐饮"
		},
		{
			img: require("../../assets/images/note/expend_06.png"),
			title: "交通"
		},
		{
			img: require("../../assets/images/note/expend_07.png"),
			title: "其他支出"
		}
	]
	
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
	  changeState(value) {
		  this.isShow = value;
	  }
  },
  created() {
	  this.type = this.$route.params.type;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.expend ul{
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.expend ul li{
		width: 25%;
		text-align: center;
		font-size: .2rem;
		margin-top: .4rem;
	}
	.expend ul li div{
		width: 1.2rem;
		height: 1.2rem;
		background: #f2f2f5;
		border-radius: .6rem;
		margin: 0 auto;
		margin-bottom: .2rem;
		line-height: 1.7rem;
	}
	.expend ul li div.active{
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
	}
	.expend ul li div img{
		width: .7rem;
		height: .66rem;
	}
</style>
