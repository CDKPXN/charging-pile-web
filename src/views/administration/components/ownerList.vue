<template>
  <div style="margin-top:30px;">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="登录账户"></el-table-column>
      <el-table-column prop="name" label="业主名称"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="count" label="关联电站数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailEdit(scope.$index, scope.row.id)">详情</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      :title="titleMsg"
      :visible.sync="dialogFormVisible"
      width="450px"
      @close="close('form')"
    >
      <el-form :model="form" style="margin-left:-8%" :rules="rules" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="业主名称" :label-width="formLabelWidth" prop="ownername">
              <el-input v-model="form.ownername" class="addStyle" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码更改" :label-width="formLabelWidth">
              <el-input v-model="form.password" class="addStyle" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="form.phone" class="addStyle" disabled auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subaMend">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { api_modifyOwner } from "../../api/index.js";
export default {
  name: "OwnerList",
  props: ["tableData"],
  data() {
    var amendOwnerName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("业主名称不能为空"));
      }
    };
    // var amendPhone = (rule,value,callback) => {
    //     let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
    //     if(value === ''){
    //         callback(new Error('电话号码不能为空'))
    //     }else if (!myreg.test(value)){
    //         callback(new Error('请输入正确的手机号码'))
    //     }else{
    //         callback()
    //     }
    // }
    return {
      titleMsg: "",
      form: {
        uid: "",
        phone: "",
        ownername: "",
        password: "",
        username: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        ownername: [{ validator: amendOwnerName, trigger: "blur" }]
        // phone:[
        //     {validator:amendPhone,trigger:'blur'}
        // ]
      }
    };
  },
  methods: {
    //查看详情
    detailEdit(index, row) {
      let vm = this;
      let uid = vm.tableData[index].id;
      let phone = vm.tableData[index].phone;
      vm.$router.push({
        path: "/ownerDetail",
        query: { uid: uid, phone: phone }
      });
    },
    handleEdit(index, row) {
      console.log(this.tableData[index]);
      let vm = this;
      let data = vm.tableData[index];
      vm.titleMsg = "修改业主" + name + "信息";
      vm.dialogFormVisible = true;
      vm.form.uid = data.id;
      vm.form.ownername = data.name;
      vm.form.phone = data.phone;
      vm.form.password = data.password;
    },
    //提交编辑信息
    subaMend() {
      let vm = this;
      // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/
      console.log(vm.form.uid);
      console.log(vm.form.ownername);
      if (vm.form.ownername != "") {
        vm.$ajax({
          method: "put",
          url: "/api/admin",
          headers: { token: sessionStorage.getItem("token") },
          data: {
            id: vm.form.uid,
            name: vm.form.ownername,
            phone: vm.form.phone,
            password: vm.form.password
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            vm.$emit("childrenQuery");
            vm.dialogFormVisible = false;
          } else {
            this.$message({
              type: "warning",
              message: res.data.message
            });
          }
        });
      }
    },
    close(formName) {
      let vm = this;
      vm.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
</style>