<template>
  <div class="note">
	<Swiper>
		<div class="top">
			<div class="back" @click="goBack">
				<i class="iconfont icon-return"></i>
			</div>
			<div class="income_expend">
				<a href="javascript:void(0);" @click="goExpend">支出</a><a href="javascript:void(0);" @click="goIncome">收入</a>
				<span :class="{active:isShow}"></span>
			</div>
			<div class="cancel" @click="goCancle">
				取消
			</div>
		</div>
		<router-view></router-view>
	</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper';
	
export default {
  name: '',
  data () {
    return {
      isShow: false
    }
  },
  components: {
	  Swiper
  },
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		goExpend() {
			this.$router.push({name: "expend",params:{type:1}});
			this.isShow = false;
		},
		goIncome() {
			this.$router.push({name: "income",params:{type:2}});
			this.isShow = true;
		},
		goCancle() {
			this.$router.push("/home");
		}
	},
	watch: {
		$route(to,from) {
			if(to.path == '/note/expend'){
				this.isShow = false;
			}else if(to.path == '/note/income'){
				this.isShow = true;
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/note.css';
</style>
