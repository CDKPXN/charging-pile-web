<template>
  <div style="margin-top:1%">
    <el-row :gutter="12">
      <el-col :span="span" v-for="(tmp,index) in dataMsg" :key="index">
        <el-card shadow="always" class="cardTopBorder addShou" :style="{background:tmp.bgColor}">
          <el-row>
            <el-col :span="12">
              <img :src="tmp.img" @click="GoDetail(tmp.id)" alt style="margin:0px;height:70px">
            </el-col>
            <el-col :span="12">
              <el-row style="margin-top:4%">
                <h1 class="num" @click="GoDetail(tmp.id)">{{tmp.number}}</h1>
              </el-row>
              <el-row>
                <span style="color:#ffffff" @click="GoDetail(tmp.id)">{{tmp.title}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "OverviewHeader",
  props: ["data"],
  data() {
    return {
      span: 6,
      dataMsg: [
        {
          id: 1,
          img: "static/img/money.png",
          number: "",
          title: "本月充电收入（元）",
          bgColor: "#f78585"
        },
        {
          id: 2,
          img: "static/img/quantity.png",
          number: "",
          title: "本月充电电量（度）",
          bgColor: "#74b9e7"
        },
        {
          id: 3,
          img: "static/img/list.png",
          number: "",
          title: "本月新增电站（个）",
          bgColor: "#70d399"
        },
        {
          id: 4,
          img: "static/img/user.png",
          number: "",
          title: "本月注册用户（位）",
          bgColor: "#97d3c5"
        }
      ]
    };
  },
  beforeCreate() {
    let vm = this;
    vm.$ajax({
      method: "get",
      url: "/api/pandect/statisticsForYearMonthWeek",
      headers: { token: sessionStorage.getItem("token") }
    }).then(res => {
      if (res.data.code == 200) {
        console.log(res.data);
        vm.dataMsg[0].number = (
          parseFloat(res.data.data.statisticsForMonth.income) / 100
        ).toFixed(2); //本月收入
        vm.dataMsg[1].number = res.data.data.statisticsForMonth.sum_e; //本月充电电量
        vm.dataMsg[2].number = res.data.data.statisticsForMonth.scount; //本月新增电站个数
        vm.dataMsg[3].number = res.data.data.statisticsForMonth.ucount; //本月注册用户个数
      }
      if (!vm.auth.isAdmin()) {
        vm.dataMsg.pop();
        vm.span = 8;
      }
    });
  },
  methods: {
    GoDetail(id) {
      if (id == 1) {
        this.$router.push("./incomeDetail");
      } else if (id == 2) {
        this.$router.push("./charging");
      } else if (id == 3) {
        this.$router.push("./controlRecord");
      } else {
        this.$router.push("./evaluate");
      }
    }
  }
};
</script>

<style>
.num {
  margin: 0px !important;
  color: #ffffff;
}
</style>