<template>
  <div class="main">
    <el-card>
      <div id="container"></div>
    </el-card>
  </div>
</template>
<script>
  var map
  export default {
    data(){
      return{
         markerData:[],
         sid:'',
      }
    },
    mounted: function () {
      this.init()
      let _this = this
      setTimeout(function(){
         _this.siteList()
      },500)
    },
    methods: {
      //初始化地图
      init: function () {
        map = new AMap.Map('container', {
          center: ["104.069919","30.564255"],
          resizeEnable: true,
          zoom: 10
        })
        //地图工具类
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale','AMap.OverView'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
          map.addControl(new AMap.OverView({isOpen:true}))
        })
   
        // //实时路况图层
        // var trafficLayer = new AMap.TileLayer.Traffic({
        //     zIndex: 10
        // });
        // trafficLayer.setMap(map);
      },
      //站点列表请求
      site(){
        let vm = this
        vm.$ajax({
            method:"get",
            url:'/api/site/list',
            headers:{'token':sessionStorage.getItem('token')},
          })
          .then(res=>{
            if(res.data.code==200){
              this.markerData = res.data.data.list
            }
          })
      },
      //站点列表标记点信息窗体
      siteList(){
        var lnglats = [];
        var site = []
        this.markerData.map(item => {
          let addr = item.province + item.city + item.district + item.addr
          let free = item.slowLeisure + item.fastLeisure
          lnglats.push([item.longitude,item.latitude])
          site.push({id:item.id,sitename:item.name,deteilsaddr:addr,fast:item.fast,slow:item.slow,free:free})
          //初始化信息窗口
          var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(1, -30)
          });
          //循环遍历
          for (var i = 0, marker; i < lnglats.length; i++){
            var marker = new AMap.Marker({
              position: lnglats[i],
              map: map,
              icon: new AMap.Icon({            
                size: new AMap.Size(40, 50),  //图标大小
                image: "static/img/sitelogo.png",
              })     
            });
            marker.content = '<el-row class="addShou" onclick="goSiteDetail('+site[i].id+')"><h3 style="color:#565656"><i class="fa fa-beer" style="color:green" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;'+site[i].sitename+'充电站</h3>'
            +'<p style="font-weight: 100"> <i class="fa fa-map-marker fa-lg" style="color:#cf6565"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+site[i].deteilsaddr+'</p>'
            +'<i class="fa fa-tags fa-lg" style="color:#9e9e9e"></i>&nbsp;<span style="color:#de8371">快充('+site[i].fast+')</span><span style="color:#79a7d0">慢充('+site[i].slow+')</span> '
            +'<span style="color:#3fba3a">空闲('+site[i].free+')</span></el-row>'
            marker.on('click', markerClick);

            // marker.emit('click', {target: marker});   //默认显示第一个标记点
          }
          //点击事件
          function markerClick(e){
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
          }
        })
      },
    },
    created(){
      this.site()
    }
  }
</script>
<style>
  .main{
    margin:25px 0  0 15px;
  }
  #container{
    width: 100%;
    height: 880px;
  }
</style>