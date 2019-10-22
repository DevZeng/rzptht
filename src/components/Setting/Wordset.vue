<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>基本设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="mini" @click="newone">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border stripe size="small" style="width:701px">
      <el-table-column prop="id" label="编号" width="200" align="center">
      </el-table-column>

      <el-table-column prop="title" label="内容" width="200" align="center">
      </el-table-column>

      <el-table-column label="操作" width="300" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>



</el-row>
</el-col>


<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
   <el-form ref="keyword" :model="keyword" label-width="0px" :rules="rules">
    <el-form-item prop="title">
      <el-input v-model="keyword.title" style="width: 700px;" placeholder="改成请填写关键字"></el-input>
    </el-form-item>


    <el-form-item style="margin-left: calc(50% - 200px);">
      <el-button size="small" type="primary" @click="save()">保 存</el-button>
      <el-button size="small" @click="dialogNewVisible = false">取 消</el-button>
    </el-form-item>
  </el-form>

</el-dialog>
</el-col>



<el-col>
  <el-dialog title="删除不可恢复，是否确定删除？" :visible.sync="dialogDelVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="submitdel()">确 定</el-button>
      <el-button size="small" @click="dialogDelVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>


</el-row>
</template>



<script>


  import { keywordGet } from '../../api/api';
  import { keywordPost } from '../../api/api';
  import { keywordDel } from '../../api/api';

  import { Message } from 'element-ui';


  export default {
    data() {


      return {

        list:[],

        keyword:{
          title:''
        },

        diatitle:'新增',
        rules: {
          title: [
          {required: true, message: '请输入内容', trigger: 'blur'},
          ],

        },
        dialogDelVisible:false,
        dialogNewVisible:false


      };
    },

    methods:{


      newone(){
        this.dialogNewVisible=true
      },

      handleEdit(index,row){
        this.dialogNewVisible=true
        this.keyword=row
      },

      handleDelete(index, row){
        this.delId = row.id;
        this.dialogDelVisible=true
      },

      submitdel(){
        this.dialogDelVisible = false;
        var allParams='?id='+this.delId
        keywordDel(allParams).then((res) => {
          console.log(res)
          if (res.msg === "ok") {
           this.$message({
            message: '删除成功',
            type: 'success'
          });
           this.getlist();
           this.dialogDelVisible = false;
         } else {
           this.$message({
            message: res.msg,
            type: 'error'
          });
         }
       });
      },

      save(){
        console.log(this.keyword.title)
        var allParams=this.keyword
        keywordPost(allParams).then((res) => {
          if (res.msg === "ok") {
           this.getlist()
           this.dialogNewVisible=false
           this.$message({
            message: '提交成功',
            type: 'success'
          });
         } else {
           this.$message({
            message: res.msg,
            type: 'error'
          });
         }
       });
      },


      getlist(){
        var allParams=''
        keywordGet(allParams).then((res) => {
          if (res.msg === "ok") {

            this.list=res.data.data

          } else {
           this.$message({
            message: res.msg,
            type: 'error'
          });
         }
       });
      },
    },

    mounted: function(){
      this.getlist()
    }
  }
</script>

<style scoped>

  .loginbg{
    width: 180px;
    height: 320px;
    border:1px dashed #ccc;
    border-radius:6px;
    display: block;
    margin-top: 1px;
  }

  .postbtn{
    margin-top: 10px;
  }

</style>