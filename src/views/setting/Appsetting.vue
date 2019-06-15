<template>
    <div style="overflow: hidden;width:60%">
         <div style="float:left">
             <span class="demonstration">第一张图</span>
             <el-image :src="src1" class="apppicture1" ></el-image>
             <!-- 上传组件 -->
             <el-upload
                style="margin-top:20px"
                :action=" action_1"
                :headers='token'
                :show-file-list="false"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"   
                >
                <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
        </div>
            
         <div style="float:right"  >
             <span class="demonstration">第二张图</span>
             <el-image :src="src2" class="apppicture1" ></el-image>
             
              <el-upload
                style="margin-top:20px"
                :action="action_2"
                :headers='token'
                :show-file-list="false"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"   
                >
                <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
        </div>
        
    </div>
</template>

<script>
import url from '../../config/url.js'
export default {
 
   data(){
       return{
           src1: '',
           src2: '',
           token:{token:sessionStorage.getItem('token')},
           action_1:url.localSrc+'/file/record/1',
           action_2:url.localSrc+'/file/record/2',
       }
   },
   created(){
      let vm=this;
      vm.$ajax({
              method:'get',
              url:"/file/record",
              headers:{'token':sessionStorage.getItem('token')},
               }).then(res=>{
                    if(res.data.code==200){
                      this.src1=url.localSrc+'/'+res.data.data[0].name;
                      this.src2=url.localSrc+'/'+res.data.data[1].name;
                    }
                })
   },
   methods:{
       //上传成功变图片
      handleAvatarSuccess(res, file) {
          
          if(res.data.id==1){
            this.src1 = URL.createObjectURL(file.raw);
          }else if(res.data.id==2){
             this.src2 = URL.createObjectURL(file.raw);
          }
         
      },
      //判断格式时候正确
       beforeAvatarUpload(file){
         const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG和PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
       }
   }
}
</script>

<style scoped>

.el-image{
    width:400px;
    height: 300px;
}

</style>
<style>
 .apppicture1>img{
    width: 100%;
    height: 100%;
}
</style>

