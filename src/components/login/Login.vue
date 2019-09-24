<template>
	  <div class="login">
		<Com>
			<div class="login_in">
				<ul>
					<li>
						<i class="iconfont icon-zhaoshangxiaochengxu-zhanghaoshezhi"></i><input type="text" placeholder="登录账号" v-model="phone"/>
					</li>
					<li>
						<i class="iconfont icon-mima"></i><input type="password" placeholder="登录密码" v-model="psw"/>
					</li>
				</ul>
				<div class="state">
					<span class="state_one" v-show="!isShow"></span>
					<span class="state_two" v-show="isShow" @click="goLogin"></span>
				</div>
			</div>
			<div class="forget_psd">
				<router-link to="/register">立即注册<i></i></router-link><router-link to="/forget">忘记密码？</router-link>
			</div>
		</Com>
	  </div>
</template>

<script>
	import Com from '../public/Com'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
      phone: "",
	  psw: "",
	  isShow: false
    }
  },
	components: {
		Com
	},
	methods: {
		goLogin() {
			this.baseJs.ajaxReq("/loatheb/api/signIn",{phone:this.phone,password:this.psw},"post","")
			.then(res => {
				// console.log(res);
				if(res.code !=200){
					Toast({
						message: res.sms,
						duration: 1000
					});
				}else{
					Toast({
						message: res.sms,
						duration: 1000
					});
					localStorage.setItem("token",res.data);
					localStorage.setItem("phone",this.phone);
					this.$router.push("/my");
				}
			})
			.catch(err => {
				console.log(err);
			})
		}
	},
	watch: {
		phone: function(newV,oldV){
			if(newV !=""){
				if(this.psw !=""){
					this.isShow = true;
				}
			}else{
				this.isShow = false;
			}
		},
		psw: function(newV,oldV){
			if(newV != ""){
				if(this.phone != ""){
					this.isShow = true;
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
	.login{
		height: 100%;
	}
	.login .login_in{
		display: flex;
		margin: 1.5rem .3rem 0 1.2rem;
	}
	.login .login_in ul{
		flex: 2;
	}
	.login .login_in ul li{
		font-size: .3rem;
	}
	.login .login_in ul li:first-child{
		margin-bottom: .6rem;
	}
	.login .login_in ul li i{
		margin-right: .4rem;
		font-size: .46rem;
	}
	.login .login_in ul li input{
		font-size: .3rem;
		padding: .2rem 0;
		border-bottom: 1px solid #f1f1f1;
	}
	.login .login_in .state{
		flex: 1;
		text-align: right;
	}
	.login .login_in .state span{
		display: inline-block;
		width: 1.14rem;
		height: 1.14rem;
		margin-bottom: -.9rem;
	}
	.login .login_in .state .state_one{
		background: url(../../assets/images/login/state_01.png) no-repeat left top;
		background-size: 100%;
	}
	.login .login_in .state .state_two{
		background: url(../../assets/images/login/state_02.png) no-repeat left top;
		background-size: 100%;
	}
	.login .forget_psd{
		font-size: .2rem;
		margin: 0 1.2rem;
		margin-top: 2rem;
		display: flex;
	}
	.login .forget_psd a{
		color: #666;
		flex: 1;
	}
	.login .forget_psd a:first-child i{
		display: inline-block;
		width: .11rem;
		height: .2rem;
		background: url(../../assets/images/my/right.png) no-repeat left top;
		background-size: 100%;
		margin-left: .05rem;
		margin-bottom: -.03rem;
	}
	.login .forget_psd a:last-child{
		text-align: right;
	}
</style>
