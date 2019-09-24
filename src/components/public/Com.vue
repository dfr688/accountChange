<template>
  <div class="com">
		<div class="back">
			<i class="iconfont icon-return" @click="goBack"></i>
		</div>
		<div class="logo">
			logo
		</div>
		<slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  methods: {
	goBack() {
	  	this.$router.go(-1);
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.com{
		width: 100%;
		height: 100%;
		background: url(../../assets/images/login/bg.png) no-repeat left top;
		background-size: cover;
		background-attachment: fixed;
	}
	.com .back{
		margin-left: .2rem;
	}
	.com .back i{
		color: #fff;
		font-size: .46rem;
	}
	.com .logo{
		width: 1.13rem;
		height: 1.13rem;
		font-size: .3rem;
		color: #fff;
		background: #20a3e0;
		margin: 0 auto;
		text-align: center;
		line-height: 1.13rem;
		border-radius: .6rem;
		margin-top: 2rem;
	}
</style>
