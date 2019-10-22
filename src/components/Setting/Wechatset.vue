<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>微信设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

      <el-button type="primary" size="mini" style="margin-bottom: 10px;" @click="newone">新增模板</el-button>

      <el-table :data="modeldata" border stripe size="small" style="width:75%;">
        <el-table-column prop="title" label="名称" min-width="200" align="center">
        </el-table-column>

        <el-table-column prop="content" label="模板id" min-width="200" align="center">
        </el-table-column>

        <el-table-column label="操作" min-width="200" align="center">
         <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-row>
</el-col>


<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
    <el-form ref="newmodel" :model="newmodel" label-width="120px" :rules="rules">
      <el-form-item label="名称:" prop="title" v-if="putorup=='up'">
        <el-input v-model="newmodel.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="模板id:" prop="content">
        <el-input v-model="newmodel.content" placeholder="请输入模板id"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: calc(50% - 200px);">
        <el-button size="mini" type="primary" @click="postmodel()">保 存</el-button>
        <el-button size="mini" @click="dialogNewVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</el-col>




</el-row>
</template>



<script>


  import { wxconfigPost } from '../../api/api';
  import { wxconfigGet } from '../../api/api';
  import { wxconfigDel } from '../../api/api';

  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        diatitle:'新增',
        activeName:'config',

        modelshow:false,
        modelset:true,
        newmodel:{
          title:'',
          content:''
        },
        editId:'',
        modeldata:[],
        dialogNewVisible:false,
        putorup:'put',
        rules: {
          title: [{required: true, trigger: 'blur',message: '请输入名称'}],
          content: [{required: true, trigger: 'blur',message: '请输入模板id'}],
        },


      };
    },

    methods:{

      getmodel(){
        var allParams = '';
        wxconfigGet(allParams).then((res) => {
          this.modeldata=res.data
        });
      },

      // changemodel(){
      //   this.modelshow=true
      //   this.modelset=false
      // },

      handleEdit(index, row){
        // this.editId = row.id;  
        this.diatitle='编辑'
        this.dialogNewVisible = true;
        this.putorup='put'
        this.newmodel={
          title:row.title,
          content:row.content
        }
      },

      newone(){       
        this.putorup='up';
        this.diatitle='新增'
        this.dialogNewVisible=true
        this.newmodel={
          title:'',
          content:''
        }
      },

      postmodel(){
        this.$refs.newmodel.validate((valid) => {
          if (valid) {
            var allParams=this.newmodel
            wxconfigPost(allParams).then((res) => {
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               // this.modelshow=false
               // this.modelset=true
               this.dialogNewVisible = false;
               this.getmodel()
             } else {
               this.$message({
                message: res.msg,
                type: 'error'
              });
             }
           });

          }else{
            return false;
          }
        })

      },


      cancelmodel(){
        this.modelshow=false
        this.modelset=true
      },
    },

    mounted: function(){
      this.getmodel();
    }
  }
</script>

<style scoped>
  .grey{
    color: #aaa;
    float: left;
  }
</style>