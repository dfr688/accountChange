<template>
  <div class="tabbar">
		<div class="bottom">
			<ul>
				<li class="detail">
					<router-link to="/home">
						<span :class="{active:isTrue}"></span>
						<p>明细</p>
					</router-link>
				</li>
				<li class="note">
					<router-link to="/note">
						<span></span>
						<p>记一笔</p>
					</router-link>
				</li>
				<li class="my">
					<router-link to="/my">
						<span :class="{active:!isTrue}"></span>
						<p>我的</p>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="height_10"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isTrue: true
    }
  },
  watch: {
	  $route(to,from) {
		  if(to.name =="home"){
			  this.isTrue = true;
		  }else if(to.name =="my"){
			  this.isTrue = false;
		  }
	  }
  },
  created() {
	  if(this.$route.name =="home"){
		  this.isTrue = true;
	  }else if(this.$route.name =="my"){
		  this.isTrue = false;
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tabbar{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 1;
	}
	.tabbar .bottom{
		width: 100%;
		height: 1.51rem;
		background: url(../../assets/images/public/bg_01.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar .bottom ul{
		display: flex;
	}
	.tabbar .bottom ul li{
		flex: 1;
		font-size: .2rem;
		text-align: center;
		margin-top: .7rem;
	}
	.tabbar .bottom ul li a{
		color: #005fb1;
	}
	.tabbar .bottom ul .note{
		margin-top: .3rem;
	}
	.tabbar .bottom ul li span{
		display: inline-block;
	}
	.tabbar .bottom ul .detail span{
		width: .42rem;
		height: .51rem;
		background: url(../../assets/images/public/home_01.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar .bottom ul .detail span.active{
		background: url(../../assets/images/public/home_02.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar .bottom ul .note span{
		width: .64rem;
		height: .7rem;
		background: url(../../assets/images/public/note.png) no-repeat left top;
		background-size: 100%;
		margin-bottom: .2rem;
		margin-right: .05rem;
	}
	.tabbar .bottom ul .my span{
		width: .45rem;
		height: .44rem;
		background: url(../../assets/images/public/my_01.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar .bottom ul .my span.active{
		background: url(../../assets/images/public/my_02.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar .height_10{
		height: .4rem;
		background: #fff;
	}
</style>
