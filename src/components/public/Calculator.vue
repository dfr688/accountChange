<template>
		<div class="calculator">
			<ul class="remark_money">
				<li>
					<span>备注:</span><input type="text" v-model="word"/>
				</li>
				<li>
					<span>金额:</span><input type="text" placeholder="0" v-model="scanReceiptNum" readonly onfocus="this.blur()"/>
				</li>
			</ul>
			<ul class="wrap">
					<li class="calculator-item"
					      :class="item.text===3?'num-three':''"
					      v-for="(item,index) in calculatorContent"
					      :key="index"
					      @click="triggerEvent(item.type,item.text)">
					 <span>{{item.text}}</span> 
					</li>
			</ul>
			<i></i>
		</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	
	const calculatorContent = [
		{
		  type: 'number',
		  text: 7,
		},
		{
		  type: 'number',
		  text: 8,
		},
		{
		  type: 'number',
		  text: 9,
		},
		{
			type: 'other',
			text : '今天'
		},
		{
		  type: 'number',
		  text: 4,
		},
		{
		  type: 'number',
		  text: 5,
		},
		{
		  type: 'number',
		  text: 6,
		},
	  {
	    type: 'sign',
	    text: '+',
	  },
		{
		  type: 'number',
		  text: 1,
		},
		{
		  type: 'number',
		  text: 2,
		},
		{
		  type: 'number',
		  text: 3,
		},
		{
		  type: 'sign',
		  text: '-',
		},
		{
		  type: 'number',
		  text: '.',
		},
	  {
	    type: 'number',
	    text: 0,
	  },
		{
		  type: 'features',
		  text: 'x',
		},
	  {
	    type: 'sign',
	    text: '完成',
	  }
	];
export default {
  name: '',
  data () {
    return {
    calculatorContent: calculatorContent,
	  scanReceiptNum: '',
		hide: false,
		word: ""
    }
  },
	props:[
		"type",
		"label"
	],
	methods: {
		triggerEvent(type,text) {
		  if (type==='sign') {
		    this.operatorEvent(text)
		  } else if (type==='number') {
		    this.passValue(text)
		  } else {
		    this.functionalEvent(text)
		  }
		},
		 passValue(num) {
		  this.scanReceiptNum += String(num);
		},
		operatorEvent(operator) {
		  if (operator === '完成') {
		  this.calculationEvent(this.operator);
			if(this.scanReceiptNum == ''){
				Toast({
							message: '请输入金额',
							duration: 1000
						});
			}else{
				let token = localStorage.getItem("token");
				let data = {
						type: this.type,
						label: this.label,
						amount: this.scanReceiptNum,
						description: this.word
				}
				this.baseJs.ajaxReq("/loatheb/api/recording",data,"put",token)
				.then(res => {
					// console.log(res);
					if(res.code == 200){
						Toast({
							message: res.sms,
							duration: 1000
						});
						this.$router.push("/home");
					}
				})
				.catch(err => {
					console.log(err);
				})
				this.$emit("changeState",this.hide);
			}
			// console.log(this.scanReceiptNum);
		  } else {
		    this.keepOperator(operator);
		  }
		},
		keepOperator(operator){
		  this.prevNumber = this.scanReceiptNum;
		  this.scanReceiptNum = '';
		  this.operator = operator
		},
		calculationEvent(operator) {
		  switch (operator) {
		    case '+': this.scanReceiptNum= String((+this.prevNumber+(+this.scanReceiptNum)).toFixed(2));break;
		    case '-': this.scanReceiptNum= String((+this.prevNumber-(+this.scanReceiptNum)).toFixed(2));break;
		  }
		},
		functionalEvent(text) {
		  if (text === 'x') {
		    this.scanReceiptNum = this.scanReceiptNum.substr(0,this.scanReceiptNum.length-1);
		  } else {
		   this.currencyShow();
		  }
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.calculator{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #f1f3f2;
	}
	.calculator .remark_money{
		display: flex;
		border-bottom: 1px solid #cfcfcf;
	}
	.calculator .remark_money li{
		width: 47%;
		font-size: .3rem;
		margin-left: .2rem;
		padding: .25rem 0;
	}
	.calculator .remark_money li:first-child{
		border-right: 1px solid #cfcfcf;
	}
	.calculator .remark_money li input{
		width: 70%;
		font-size: .3rem;
		text-indent: .2rem;
	}
	.calculator .wrap{
		display: flex;
		flex-wrap: wrap;
	}
	.calculator .wrap li{
		width: 24.7%;
		text-align: center;
		font-size: .4rem;
		padding: .3rem 0;
		border-right: 1px solid #cfcfcf;
		border-bottom: 1px solid #cfcfcf;
	}
	.calculator .wrap li:nth-child(4){
		border-right: none;
		font-size: .24rem;
		color: #20a3e0;
		height: .52rem;
    line-height: .52rem;
	}
	.calculator .wrap li:nth-child(4) span{
		margin-left: .6rem;
	}
	.calculator .wrap li:nth-child(8){
		border-right: none;
	}
	.calculator .wrap li:nth-child(12){
		border-right: none;
	}
	.calculator .wrap li:nth-child(16){
		border-right: none;
	}
	.calculator .wrap li:nth-child(15) span{
		display: inline-block;
		width: .48rem;
		height: .34rem;
		border-radius: .1rem;
		border: solid 1px #333;
		font-size: .28rem;
		text-align: center;
		line-height: .3rem;
	}
	.calculator .wrap li:nth-child(13){
		margin-top: -.1rem;
	}
	.calculator .wrap li:nth-child(15){
		margin-top: -.05rem;
	}
	.calculator .wrap li:nth-child(16){
		font-size: .3rem;
		color: #fff;
		background: #20a3e0;
		height: .52rem;
		line-height: .52rem;
	}
	.calculator i{
		display: inline-block;
		width: .44rem;
		height: .4rem;
		background: url(../../assets/images/home/calendar.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		top: 1.25rem;
		right: 1rem;
	}
</style>
