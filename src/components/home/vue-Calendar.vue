<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 410px;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #fff;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #0fc37c;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #fff;
  position: relative;
}
.wh_content_item {
  height: 40px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: yellow;
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background: green;
  border-radius: 100px;
}

.wh_content_li i{
	display: inline-block;
  width: .24rem;
  height: .15rem;
	background: url(../../assets/images/public/down.png) no-repeat left top;
	background-size: 100%;
	margin-left: .1rem;
}
.wh_content_li i.active{
	background: url(../../assets/images/public/up.png) no-repeat left top;
	background-size: 100%;
}
.cha{
	display: none;
}
.blue{
	display: inline-block;
	width: .06rem;
	height: .05rem;
	background: #0000FF;
	border-radius: 2.4rem;
	position: absolute;
	right: .24rem;
	top: .16rem;
}
.red{
	display: inline-block;
	width: .06rem;
	height: .05rem;
	background: #ff745f;
	border-radius: 2.4rem;
	position: absolute;
	right: .24rem;
	top: .16rem;
}
.cost{
	font-size: .18rem;
	position: absolute;
	top: 0.5rem;
	left: 50%;
	margin-left: -.51rem;
	line-height: .3rem;
	width: 100%;
	text-align: center;
}
.height_20{
	width: 100%;
	height: 12px;
	margin-bottom: -1px;
	background: #20a3e0;
}
/* 日历选择弹框 */
.mint-popup-bottom{
	width: 100%;
}
.column{
	width: 100%;
	font-size: .3rem;
	display: flex;
	padding: .2rem;
	box-sizing: border-box;
	color: #999;
}
.column span{
	flex: 1;
}
.column span:last-child{
	text-align: right;
	color: #333;
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
			<div class="height_20"></div>
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li" @click="appearPop">{{dateTop}}<i :class="{active:popupVisible}"></i></li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <div
            class="wh_item_date"
            v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]"
          >{{item.id}}
					<span class="cha" :class="dayCompare(item.id)"></span>
					 <div class="cost">
						 <p><span v-if="dayPrice(item.id,'totalIncome') != undefined">+</span><span>{{ dayPrice(item.id,'totalIncome') }}</span></p>
						 <p><span v-if="dayPrice(item.id,'totalIncome') != undefined">-</span><span>{{ dayPrice(item.id,'totalExpenditure') }}</span></p>
					 </div>
					</div>
        </div>
      </div>
    </div>
		<!--日历选择弹框 -->
		<mt-popup
			v-model="popupVisible"
			position="bottom">
			<div class="column">
				<span @click="goCalcel">取消</span><span @click="change()">确定</span>
			</div>
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
  </section>
</template>
<script>
import timeUtil from "./Calendar.js";

let years = [];
 for (var i = 2017; i <= 2050; i++) {
	 years.push(i);
 }
 let months = [];
 for(var j=1;j<=12;j++) {
	 months.push(j);
 }
export default {
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: "",
			
			years: [years],
			months: [months],
			popupVisible: false,
			chooseKey: "",
			slots: [
				{
          flex: 1,
          values: years,
          className: 'slot1',
          textAlign: 'center',
					defaultIndex: 2
        },
			  {
			    flex: 1,
			    values: months,
			    className: 'slot2',
			    textAlign: 'center',
					defaultIndex: 6
			  }
			],
			
			price:[],
			dayPriceList:[],
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ["一", "二", "三", "四", "五", "六", "日"]
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  created() {
    this.intStart();
    this.myDate = new Date();
		
		this.getDayDetail(this.myDate,1);//取当月,日历用
		this.getDayDetail(this.myDate,2,()=>{
			this.$emit("getData",this.dayPriceList);
		});//取当天，底部用
  },
	computed: {
		// 根据日期查询当日收支
		dayPrice() {
			return function(index,type) {
				for(let i=0;i<this.price.length;i++){
					var createTime = this.price[i].createTime;
					var date = new Date(createTime);
					var day = date.getDate();
					var year = date.getFullYear();
					var month = date.getMonth()+1;
          var ym = year+"年"+month+"月";
					if(this.dateTop == ym && index == day){
						if(type == "totalExpenditure"){
							return this.price[i].totalExpenditure;
						}else if(type == "totalIncome"){
							return this.price[i].totalIncome;
						}
					}
				}
			}
		},
			// 根据日期生成当日收支差类名
		dayCompare() {
			return function(index){
				for(let i=0;i<this.price.length;i++){
					var createTime = this.price[i].createTime;
					var date = new Date(createTime);
					var day = date.getDate();
					var year = date.getFullYear();
					var month = date.getMonth()+1;
					var ym = year+"年"+month+"月";
					if(this.dateTop == ym && index == day){
							var cha = this.price[i].totalIncome - this.price[i].totalExpenditure;
							if(cha > 0){
								return "blue";
							}else if(cha < 0){
								return "red";
							}
					}
				}
			}
		}
	},
  methods: {
		// 获取某一天详情 type 1 取当月 2取当日
		getDayDetail(time,type,onSuccess){
			// 获取年月日
			let date = new Date(time);
			let year = date.getFullYear();
			let month = date.getMonth()+1;
			let day = date.getDate();
			if (day < 10) { day = '0' + day }
			// 请求接口
			let token = localStorage.getItem("token");
			let params;
			if(type == 1){
				params = {year:year,month:month}
			}else if(type == 2){
				params = {year:year,month:month,day:day}
			}
			this.baseJs.ajaxReq("/loatheb/api/recording/statistics",params,"get",token)
			.then(res => {
				// console.log(res);
				if(type == 1){
          this.price = res.data.statisticsMapList;
          // console.log(this.price);
					onSuccess();
				}else if(type == 2){
					this.dayPriceList = res.data.statisticsMapList;
					onSuccess();
				}
			})
			.catch( err => {
				console.log(err);
			})
		},
		onValuesChange(picker, values) {
			// 把数组里的每一项变成字符串
			let valueStr = values.map(String);
			this.chooseKey = valueStr[0] +"-" +valueStr[1];
			// console.log(typeof this.chooseKey);
		},
		// 出现弹框
		appearPop() {
			this.popupVisible = true;
		},
		// 点击弹框中的确定按钮 换年月
		change() {
			let val = "-1"+" "+"00:00:00";
			let time = this.chooseKey;
			time = time + val
			// console.log(time)
			this.ChoseMonth(time,false);
			this.popupVisible = false;
			this.getDayDetail(this.myDate,2,()=>{
				this.$emit("getData",this.dayPriceList);
			});
		},
		// 点击弹框中的取消按钮
		goCalcel() {
			this.popupVisible = false;
		},
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function(item, index) {
      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
			this.getDayDetail(item.date,2,()=>{
				this.$emit("getData",this.dayPriceList);
			});
    },
    ChoseMonth: function(date, isChosedDay = true) {
			const initDate = date;
			 //console.log(date);
       date = timeUtil.dateFormat(date);
			
       this.myDate = new Date(date);
			 this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(initDate, date, isChosedDay);
      } else {
        this.getList(initDate);
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
			this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    getList: function(date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
			if(typeof date == 'object') {
				this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
			} else if(typeof date == 'string') {
				const arrData = date.split(" ")[0].split("-");
				this.dateTop = arrData[0] + "年" + arrData[1] + "月";
			}
// 			console.log(date);
// 			console.log(date.getFullYear());
      // this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true
    }
  }
};
</script>