<template>
  <div class="register">
		<Com>
			<div class="register_in">
				<ul>
					<li>
						<i class="iconfont icon-zhaoshangxiaochengxu-zhanghaoshezhi"></i><input type="text" placeholder="输入手机号" v-model="phone"/>
					</li>
					<li>
						<i class="iconfont icon-mima"></i><input type="password" placeholder="设置密码" v-model="psw"/>
					</li>
					<li>
						<i class="iconfont icon-mima"></i><input type="text" placeholder="输入验证码" v-model="code"/><div><Vcode :phone="phone"/></div>
					</li>
				</ul>
				<div class="state">
					<span class="state_one" v-show="!isShow"></span>
					<span class="state_two" v-show="isShow" @click="goRegister"></span>
				</div>
			</div>
			<div class="privacy">
				注册即表示同意<router-link to="/privacy">《隐私政策》</router-link>
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
		goRegister() {
			if(!/^[0-9]{6,18}$/.test(this.psw)){
				Toast({
					message: '请输入6到18位数字！',
					duration: 1000
				});
			}else{
				this.baseJs.ajaxReq("/loatheb/api/signUp",{phone:this.phone,smsCode:this.code,password:this.psw},'post',"")
				.then(res => {
					// console.log(res);
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
	.register{
		height: 100%;
	}
	.register .register_in{
		display: flex;
		margin: 1.5rem .3rem 0 1.2rem;
	}
	.register .register_in ul{
		flex: 2;
	}
	.register .register_in ul li{
		font-size: .3rem;
	}
	.register .register_in ul li{
		margin-bottom: .6rem;
	}
	.register .register_in ul li i{
		margin-right: .1rem;
		font-size: .46rem;
	}
	.register .register_in ul li input{
		font-size: .26rem;
		padding: .2rem 0;
		border-bottom: 1px solid #f1f1f1;
	}
	.register .register_in ul li:nth-child(3){
		display: flex;
	}
	.register .register_in ul li:nth-child(3) input{
		width: 2rem;
	}
	.register .register_in ul li div{
		display: inline-block;
	}
	.register .register_in .state{
		flex: 1;
		text-align: right;
	}
	.register .register_in .state span{
		display: inline-block;
		width: 1.14rem;
		height: 1.14rem;
		margin-bottom: -1.2rem;
	}
	.register .register_in .state .state_one{
		background: url(../../assets/images/login/state_01.png) no-repeat left top;
		background-size: 100%;
	}
	.register .register_in .state .state_two{
		background: url(../../assets/images/login/state_02.png) no-repeat left top;
		background-size: 100%;
	}
	.register .privacy{
		font-size: .26rem;
		color: #666;
		text-align: center;
	}
	.register .privacy a{
		color: #20a3e0;
	}
</style>
