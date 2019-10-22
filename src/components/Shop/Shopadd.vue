<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商店地区</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="small" @click="newone">新增地区</el-button>

        <el-button type="" size="small" @click="getlist">清空</el-button>
      </el-form-item>
      
    </el-form>

    <el-table :data="list" border stripe style="width:80%" size="small">
      <el-table-column prop="id" label="编号" min-width="100" align="center">
      </el-table-column>

      <el-table-column prop="name" label="名称" min-width="300" align="center">
      </el-table-column>

      <el-table-column prop="parent_id" label="级别" min-width="200" align="center">
       <template slot-scope="scope">
        <div v-if="scope.row.parent_id==0">一级</div>
        <div v-if="scope.row.parent_id!==0">二级</div>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="400" align="center">
     <template slot-scope="scope">
      <el-button type="warning" size="small" v-if="scope.row.parent_id==0" @click="handleSee(scope.$index, scope.row)" >查看下级</el-button>

      <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>

      <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
    </template>
  </el-table-column>

</el-table>

<el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
</el-pagination>

</el-col>

<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
    <el-form ref="newadv" :model="newadv" label-width="120px">

      <el-form-item label="地区名称：">
        <el-input v-model="newadv.name" style="max-width: 300px;" placeholder="请输入地区名称"></el-input>
      </el-form-item>

      <el-form-item label="地区等级：" prop="level">
        <el-select v-model="level" placeholder="请选择地区等级" @change="changelv">
          <el-option label="一级地区" value="1" key="1"></el-option>
          <el-option label="二级地区" value="2" key="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上级地区：" prop="parent_id" v-show="noone">
        <el-select v-model="newadv.parent_id" placeholder="请选择上级地区" @change="chooseup" filterable :loading="loading">
          <el-option v-for="item in levelarr" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-left: calc(50% - 200px);">
        <el-button type="primary" @click="save()" size="small">保 存</el-button>
        <el-button @click="dialogNewVisible = false" size="small">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</el-col>


<el-col>
  <el-dialog title="删除不可恢复，是否确定删除？" :visible.sync="dialogDelVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitdel()" size="small">确 定</el-button>
      <el-button @click="dialogDelVisible = false" size="small">取 消</el-button>
    </div>
  </el-dialog>
</el-col>

</el-row>
</template>



<script>


  import { shopaddGet } from '../../api/api';
  import { shopaddPost } from '../../api/api';
  import { shopaddDel } from '../../api/api';

  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        loading:false,

        currentPage: 1,
        list:[],
        count:0,
        limit:10,
        dialogNewVisible:false,
        dialogDelVisible:false,

        putorup:'up',

        newadv:{
         name:'',
         parent_id:0
       },
       level:'',

       noone:false,
       nothree:false,
       levelarr:[],

       diatitle:'新增地区',
       editId:'',
       delId:'',

     };
   },

   methods:{

    getlist(){
      var allParams = '?page='+ this.currentPage + '&limit=' + this.limit
      shopaddGet(allParams).then((res) => {
        this.list=res.data.data;
        this.count=res.data.count
      });
    },

    getlist1(){
      var allParams = '?page=1&limit=10000&base=1';
      shopaddGet(allParams).then((res) => {
        this.levelarr=res.data.data;
      });
    },

    handleSee(index, row){
      var allParams = '?parent_id='+row.id;
      shopaddGet(allParams).then((res) => {
        this.list=res.data.data;
        this.count=res.data.count
      });
    },

    newone(){
     this.putorup='up';
     this.diatitle='新增地区';
     this.dialogNewVisible=true;
    //  this.newadv={
    //   name:'',
    //   parent_id:0
    // }
  },

  changelv(val){
    if(val==1){
      this.noone=false
    }
    else if(val==2){
      this.noone=true
      this.getlist1()
    }
  },

  chooseup(val){
    this.newadv.parent_id=val
  },

  save(){

    if(this.newadv.name==''){
      this.$message({
        message: '请输入地区名称',
        type: 'error'
      });
    }else{
      if(this.putorup=='put'){
        var allParams = {
          name:this.newadv.name,
          parent_id:this.newadv.parent_id,
          id:this.editId,
        };
      }else{
        var allParams = {
          name:this.newadv.name,
          parent_id:this.newadv.parent_id
        };
      }
      // console.log(this.newadv)

      shopaddPost(allParams).then((res) => {
        if (res.msg === "ok") {
         this.$message({
          message: '提交成功',
          type: 'success'
        });
         this.getlist();
         this.dialogNewVisible=false
       } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    }
  },

  handleEdit(index, row){
    this.diatitle='编辑地区';
    this.dialogNewVisible = true;
    this.putorup='put';
    this.editId = row.id;
    this.newadv.name=row.name
  },

  handleDelete(index, row) {
    this.dialogDelVisible = true;
    this.delId = row.id;
  },

  submitdel(){
    this.dialogDelVisible = false;
    var allParams='?id='+this.delId
    shopaddDel(allParams).then((res) => {
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

  handleCurrentChange(val) {
    this.currentPage = val;
    this.getlist();
  },

  handleSizeChange(val){
    this.limit = val;
    this.getlist();
  },
},

mounted: function () {
  this.getlist();
}
}
</script>


<style>
.icon{
  width: 20px;
  height: 20px;
  margin: 2px;
}
</style>
