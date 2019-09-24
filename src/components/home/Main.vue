<template>
  <div class="main">
	<div class="line"></div>
	<div class="detail" v-for="(list,index) in lists" :key="index">
		<div class="date_money">
			<div class="left">
				{{ formatTime(list.createTime) }}
			</div>
			<div class="right">
				<span>收入：{{ list.totalIncome }}</span><span>支出：{{ list.totalExpenditure }}</span>
			</div>
		</div>
		<ul>
			<li v-for="(item,index) in list.recordingInfoList" :key="item.id" @click="delet_update(item.id)">
				<div class="item">
					<div>
						<img :src="types[item.label-1].img" alt=""/>
					</div>
					<span>{{ types[item.label-1].title }}</span>
				</div>
				<div class="money">
					<span v-show="1==item.type">-</span>{{ item.amount }}
				</div>
			</li>
		</ul>
	</div>
  </div>
</template>

<script>
	const types = [
		{
			img: require("../../assets/images/home/sign_01.png"),
			title: "日用百货"
		},
		{
			img: require("../../assets/images/home/sign_02.png"),
			title: "娱乐"
		},
		{
			img: require("../../assets/images/home/sign_03.png"),
			title: "礼物"
		},
		{
			img: require("../../assets/images/home/sign_04.png"),
			title: "医疗教育"
		},
		{
			img: require("../../assets/images/home/sign_05.png"),
			title: "餐饮"
		},
		{
			img: require("../../assets/images/home/sign_06.png"),
			title: "交通"
		},
		{
			img: require("../../assets/images/home/sign_07.png"),
			title: "其他支出"
		},
		{
			img: require("../../assets/images/home/sign_08.png"),
			title: "工资"
		},
		{
			img: require("../../assets/images/home/sign_09.png"),
			title: "红包"
		},
		{
			img: require("../../assets/images/home/sign_10.png"),
			title: "理财"
		},
		{
			img: require("../../assets/images/home/sign_11.png"),
			title: "礼金"
		},
		{
			img: require("../../assets/images/home/sign_12.png"),
			title: "生产"
		},
		{
			img: require("../../assets/images/home/sign_13.png"),
			title: "其他收入"
		}
	]
	
export default {
  name: '',
  data () {
    return {
//       typeName: '',
// 	  cost: '',
// 	  date: '',
// 	  remark: '',
	  types: types,
	  intro: "",
	  itemId: "",
	  // popupVisible: false
    }
  },
  props:[
	  "lists"
  ],
  methods: {
	  // 出现弹框
	  delet_update(index) {
		  this.itemId = index;
		  let token = localStorage.getItem("token");
		  this.baseJs.httpReq("/loatheb/api/recording",index,{recordingId:index},"get",token)
		  .then(res => {
			  // console.log(res);
			  if(res.data.type == 1){
				  res.data.type ="支出";
			  }else{
				  res.data.type ="收入";
			  }
			  this.intro = res.data;
			  this.$emit("refreshHome",this.intro);
			  this.$emit("appear",true);
			  this.$emit("getId",this.itemId);
// 			  this.typeName = this.intro.type;
// 			  this.cost = this.intro.amount;
// 			  this.remark = this.intro.description;
// 			  this.date = this.formatT(this.intro.createTime);
			  // console.log(this.intro);
		  })
		  .catch(err => {
			  console.log(err);
		  })
		  // this.popupVisible = true;
	  },
	  // 编辑
// 	  goEdit() {
// 		   let token = localStorage.getItem("token");
// 		   this.baseJs.httpReq("/loatheb/api/recording",this.itemId,{amount:this.cost,description:this.remark},"post",token)
// 		   .then(res => {
// 			   // console.log(res);
// 			   // this.$emit("refreshHome");
// 		   })
// 		   .catch(err => {
// 			   console.log(err);
// 		   })
// 		   this.popupVisible = false;
// 	  },
	  // 删除
// 	  goDelet() {
// 		  let token = localStorage.getItem("token");
// 		  this.baseJs.httpReq("/loatheb/api/recording",this.itemId,{},"delete",token)
// 		  .then(res => {
// 			  // console.log(res);
// 			  // this.$emit("refreshHome");
// 		  })
// 		  .catch(err => {
// 			  console.log(err);
// 		  })
// 		  this.popupVisible = false;
// 	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/main.css';
</style>
