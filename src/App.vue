<template>
  <div id="app">
	<router-view></router-view>
	<Tabbar v-show="isShow"/>
  </div>
</template>

<script>
	import Tabbar from './components/public/Tabbar'
	
	
export default {
  name: 'App',
	data() {
		return {
			isShow: true
		}
	},
	components: {
		Tabbar
	},
	watch: {
		$route(to,from) {
			// 判断是否显示Tabbar
			if(to.name == 'home' || to.name == 'my'){
				this.isShow = true;
			}else{
				this.isShow = false;
			}
		}
	},
	created() {
		if(this.$route.name == 'home' || this.$route.name == 'my'){
			this.isShow = true;
		}else{
			this.isShow = false;
		}
	}
}
</script>

<style>

</style>
