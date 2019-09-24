<template>
  <div class="forget">
   <Com>
		 <div class="forget_in">
		 	<ul>
		 		<li>
		 			<i class="iconfont icon-zhaoshangxiaochengxu-zhanghaoshezhi"></i><input type="text" placeholder="登录账号" v-model="phone"/>
		 		</li>
		 		<li>
		 			<i class="iconfont icon-mima"></i><input type="password" placeholder="设置登录密码" v-model="psw"/>
		 		</li>
		 		<li>
		 			<i class="iconfont icon-mima"></i><input type="text" placeholder="输入验证码" v-model="code"/><div><Vcode :phone="phone"/></div>
		 		</li>
		 	</ul>
		 	<div class="state">
		 		<span class="state_one" v-show="!isShow"></span>
				<span class="state_two" v-show="isShow" @click="resetPsw"></span>
		 	</div>
		 </div>
	 </Com>
  </div>
</template>

<script>
	import Com from '../public/Com'
	import Vcode from '../public/Vcode'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
      phone: "",
	  psw: "",
	  code: "",
	  isShow: false
    }
  },
	components: {
		Com,
		Vcode
	},
	methods: {
		resetPsw() {
			if(!/^[0-9]{6,18}$/.test(this.psw)){
				Toast({
					message: '请输入6到18位数字！',
					duration: 1000
				});
			}else{
				this.baseJs.ajaxReq("/loatheb/api/resetPassword",{phone:this.phone,password:this.psw,smsCode:this.code},"post","")
				.then(res => {
					// console.log(res)
					if(res.code != 200){
						Toast({
							message: res.sms,
							duration: 1000
						});
					}else{
						Toast({
							message: res.sms,
							duration: 1000
						});
						this.$router.push("/login");
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	},
	watch: {
		phone: function(newV,oldV){
			if(newV != ""){
				if(this.psw != ""){
					if(this.code != ""){
						this.isShow = true;
					}
				}
			}else{
				this.isShow = false;
			}
		},
		psw: function(newV,oldV){
			if(newV != ""){
				if(this.phone != ""){
					if(this.code != ""){
						this.isShow = true;
					}
				}
			}else{
				this.isShow = false;
			}
		},
		code: function(newV,oldV){
			if(newV != ""){
				if(this.phone != ""){
					if(this.psw != ""){
						this.isShow = true;
					}
				}
			}else{
				this.isShow = false;
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.forget{
		height: 100%;
	}
	.forget .forget_in{
		display: flex;
		margin: 1.5rem .3rem 0 1.2rem;
	}
	.forget .forget_in ul{
		flex: 2;
	}
	.forget .forget_in ul li{
		font-size: .3rem;
	}
	.forget .forget_in ul li{
		margin-bottom: .6rem;
	}
	.forget .forget_in ul li i{
		margin-right: .4rem;
		font-size: .46rem;
	}
	.forget .forget_in ul li input{
		font-size: .26rem;
		padding: .2rem 0;
		border-bottom: 1px solid #f1f1f1;
	}
	.forget .forget_in ul li:nth-child(3){
		display: flex;
	}
	.forget .forget_in ul li:nth-child(3) input{
		width: 2rem;
	}
	.forget .forget_in ul li div{
		display: inline-block;
	}
	.forget .forget_in .state{
		flex: 1;
		text-align: right;
	}
	.forget .forget_in .state span{
		display: inline-block;
		width: 1.14rem;
		height: 1.14rem;
		margin-bottom: -1.2rem;
	}
	.forget .forget_in .state .state_one{
		background: url(../../assets/images/login/state_01.png) no-repeat left top;
		background-size: 100%;
	}
	.forget .forget_in .state .state_two{
		background: url(../../assets/images/login/state_02.png) no-repeat left top;
		background-size: 100%;
	}
</style>
