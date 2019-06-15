<template>
  <div class="main">
    <el-card>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form :model="form">
            <el-row style="margin:0 0 25px 12px">
              <el-col :span="12">
                <span class="listTitle">{{titleMsg}}</span>
              </el-col>
              <el-col :span="12" v-if="show" style="position:relative">
                <el-button type="primary" @click="setRate" style="position:absolute;right:14%;">费率设置</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <input
                    type="text"
                    placeholder="填写详细地址,如：四川省成都市xxx街道"
                    name="address"
                    style="width:98.8%;"
                    class="form-control addStyle el-input__inner"
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="电站名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    auto-complete="off"
                    class="addStyle"
                    placeholder="电站名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="站点维护人" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.linkmanPhone"
                    auto-complete="off"
                    @blur="changePhone"
                    class="addStyle"
                    placeholder="站点维护联系人号码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row v-if='show'>
                        <el-col :span="12">
                            <el-form-item label="电费费用" :label-width="formLabelWidth">
                            <el-input v-model="form.eprice" placeholder="单位（元）" auto-complete="off"  class="addStyle"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="服务费用" :label-width="formLabelWidth">
                            <el-input v-model="form.sprice" placeholder="单位（元）" auto-complete="off" class="addStyle"></el-input>
                            </el-form-item>
                        </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="站点经度" :label-width="formLabelWidth">
                  <input
                    type="text"
                    placeholder="经度"
                    name="lng"
                    class="form-control addStyle el-input__inner"
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="站点纬度" :label-width="formLabelWidth">
                  <input
                    type="text"
                    placeholder="纬度"
                    name="lat"
                    class="form-control addStyle el-input__inner"
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="12">
                            <el-form-item label="支付方式" :label-width="formLabelWidth">
                            <el-select v-model="playFor" class="addStyle" disabled clearable>
                                <el-option
                                    v-for="item in playForArr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            </el-form-item>
              </el-col>-->
              <el-col :span="12" v-if="show">
                <el-form-item label="停车费用" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.parkingFee"
                    placeholder="单位（元）"
                    auto-complete="off"
                    class="addStyle"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="margin-left:63px">
                <el-button type="primary" @click="addSite" style="margin-right:20px;">确认</el-button>
                <el-button type="infor" @click="Goback">返回</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="12" style="position:relative">
          <el-card>
            <div id="container"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
// import {api_addSite} from '../api/index.js'
// import $ from 'jquery'
export default {
  data() {
    return {
      message: "",
      titleMsg: "",
      show: true,
      form: {
        name: "",
        linkmanPhone: "",
        eprice: "",
        sprice: "",
        parkingFee: ""
      },
      playFor: "0", //支付方式
      playForArr: [{ value: "0", label: "银联充值" }],
      formLabelWidth: "130px",
      //选择省市区
      select: {
        province: "",
        city: "",
        area: ""
      }
    };
  },
  mounted: function() {
    this.init();
  },
  methods: {
    //初始化地图
    init: function() {
      var map = new AMap.Map("container", {
        center: ["104.069919", "30.564255"],
        resizeEnable: true,
        zoom: 10
      });
      // 地图工具类
      AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.OverView"], function() {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.OverView({ isOpen: true }));
      });
      // 标记点
      var marker = new AMap.Marker({
        position: map.getCenter(),
        draggable: true,
        cursor: "move",
        raiseOnDrag: false,
        zIndex: 101,
        icon: new AMap.Icon({
          size: new AMap.Size(40, 50), //图标大小
          image: "static/img/sitePosition.png"
        })
      });
      // marker.setAnimation("AMAP_ANIMATION_BOUNCE"); //标记点弹跳动画
      marker.setMap(map);

      $("input[name=lng]").val(marker.getPosition().lng);
      $("input[name=lat]").val(marker.getPosition().lat);

      //标记点按下和移动中的经纬度
      AMap.event.addListener(marker, "dragstart", function(e) {
        $("input[name=lng]").val(marker.getPosition().lng);
        $("input[name=lat]").val(marker.getPosition().lat);
      });
      //标记点松开后的经纬度
      AMap.event.addListener(marker, "dragging", function(e) {
        $("input[name=address]").val("检索地址中......");
        $("input[name=lng]").val(marker.getPosition().lng);
        $("input[name=lat]").val(marker.getPosition().lat);
      });
      //查询标记点松开后的经纬度的地理位置
      AMap.event.addListener(marker, "dragend", function(e) {
        var vm = this;
        $("input[name=lng]").val(marker.getPosition().lng);
        $("input[name=lat]").val(marker.getPosition().lat);
        var lnglatXY = [marker.getPosition().lng, marker.getPosition().lat];
        AMap.plugin("AMap.Geocoder", function() {
          //异步加载插件
          var Geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          map.addControl(Geocoder);
          Geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === "complete" && result.info === "OK") {
              var address = result.regeocode.formattedAddress; //返回地址描述
              $("input[name=address]").val(address);
            }
          });
        });
      });
      //实时路况图层
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
      });
      trafficLayer.setMap(map);
    },
    changePhone() {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (myreg.test(this.form.linkmanPhone) == false) {
        this.$message({
          type: "warning",
          message: "请输入正确的参数"
        });
      }
    },
    // 验证数据
    Verification() {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let vm = this;
      let Addr = $("input[name=address]").val();
      let long = $("input[name=lng]").val();
      let lati = $("input[name=lat]").val();
      // if(vm.form.name == '' || vm.form.eprice == '' || vm.form.sprice == '' || vm.form.parkingFee == '' || Addr == '' || long == '' || lati == ''
      if (
        vm.form.name == "" ||
        vm.form.parkingFee == "" ||
        Addr == "" ||
        long == "" ||
        lati == "" ||
        vm.form.linkmanPhone == "" ||
        myreg.test(this.form.linkmanPhone) == false
      ) {
        vm.$message({
          type: "warning",
          message: "请完善参数"
        });
      } else {
        return true;
      }
    },
    //返回上一级
    Goback() {
      this.$router.go(-1);
    },
    //添加/修改站点
    addSite() {
      let vm = this;
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let Addr = $("input[name=address]").val();
      let long = $("input[name=lng]").val();
      let lati = $("input[name=lat]").val();
      vm.select.province = Addr.substr(0, 3);
      vm.select.city = Addr.substr(3, 3);
      let areaValue = Addr.substr(9, 1);
      if (areaValue == "区" || areaValue == "县" || areaValue == "市") {
        vm.select.area = Addr.substr(6, 4);
      } else {
        vm.select.area = Addr.substr(6, 3);
      }
      if (vm.$route.query.titlemsg == 0) {
        if(vm.form.name == "" ||Addr == "" || long == "" || lati == "" ||vm.form.linkmanPhone == ""){
           vm.$message({
            type: "warning",
            message: "请完善信息"
          });
        }
        else if (myreg.test(this.form.linkmanPhone) == false)
         {
          vm.$message({
            type: "warning",
            message: "请输入正确的手机号"
          });
        } else {
          // 发起添加站点的请求
          let params = {
            province: vm.select.province,
            city: vm.select.city,
            district: vm.select.area,
            addr: $("input[name=address]").val(),
            name: vm.form.name,
            linkmanPhone: vm.form.linkmanPhone,
            longitude: $("input[name=lng]").val(),
            latitude: $("input[name=lat]").val()
          };
          vm.$ajax({
            method: "post",
            url: "/api/site",
            headers: { token: sessionStorage.getItem("token") },
            data:params
          }).then(res => {
            if (res.data.code == 200) {
              vm.$alert("站点添加成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push("./controlRecord");
                }
              });
            }else{
               vm.$message({
            type: "warning",
            message: "站点地址格式错误,例:四川省成都市xxx街道"
          });
            }
          });
        }
      } else {
        if (vm.Verification()) {
          // 发起修改站点的请求
          vm.$ajax({
            method: "put",
            url: "/api/site",
            headers: { token: sessionStorage.getItem("token") },
            data: {
              id: vm.form.id,
              province: vm.select.province,
              city: vm.select.city,
              district: vm.select.area,
              addr: $("input[name=address]").val(),
              name: vm.form.name,
              longitude: $("input[name=lng]").val(),
              latitude: $("input[name=lat]").val(),
              // eprice:(vm.form.eprice) * 100,
              // sprice:(vm.form.sprice) * 100,
              parkingFee: vm.form.parkingFee * 100,
              linkmanPhone: vm.form.linkmanPhone
            }
          }).then(res => {
            if (res.data.code == 200) {
              vm.$alert("站点信息修改成功", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push({
                    path: "./addDialog",
                    query: { id: vm.form.id, name: vm.form.name }
                  });
                }
              });
            }
          });
        }
      }
    },
    // 设置费率
    setRate() {
      let siteId = this.form.id;
      console.log(siteId);
      this.$router.push({
        path: "/rate",
        query: { siteId: siteId }
      });
    }
  },
  created() {
    let siteid = this.$route.query.sitedate;
    if (siteid == 0) {
      this.form = this.form;

      this.show = false;
    } else {
      this.show = true;
      this.$ajax({
        method: "get",
        url: "/api/site/list?&id=" + siteid,
        headers: { token: sessionStorage.getItem("token") }
      }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data.list[0];
          this.form.eprice = (this.form.eprice / 100).toFixed(2);
          this.form.sprice = (this.form.sprice / 100).toFixed(2);
          this.form.parkingFee = (this.form.parkingFee / 100).toFixed(2);
          let arrAddr = [];
          for (var i = 0; i < res.data.data.list.length; i++) {
            arrAddr.push({
              province: this.form.province,
              city: this.form.city,
              area: this.form.district
            });
            this.select = arrAddr[0];
            $("input[name=address]").val(res.data.data.list[i].addr);
            $("input[name=lng]").val(res.data.data.list[i].longitude);
            $("input[name=lat]").val(res.data.data.list[i].latitude);
          }
        }
      });
    }
    if (this.$route.query.titlemsg == 0) {
      this.titleMsg = "新增站点";
    } else {
      this.titleMsg = "站点信息修改";
    }
  }
};
</script>
<style>
.main {
  margin: 25px 0 0 15px;
}
#container {
  width: 100%;
  height: 750px;
}
.form-control {
  height: 36px;
  line-height: 36px；;
}
</style>