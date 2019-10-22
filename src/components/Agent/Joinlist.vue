<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>分销申请</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form :inline="true">
        <el-form-item label="审核方式">
         <el-switch v-model="auto_pass" active-value="1" inactive-value="0" active-text="自动" inactive-text="手动" @change="switchchange"></el-switch>
       </el-form-item>
     </el-form>



     <el-table :data="list" border stripe size="small" style="width: 80%">
      <el-table-column prop="id" label="编号" width="100" align="center">
      </el-table-column>

      <el-table-column prop="name" label="姓名" min-width="200" align="center">
      </el-table-column>

      <el-table-column prop="phone" label="电话" min-width="200" align="center">
      </el-table-column>

      <el-table-column prop="created_at" label="申请时间" width="200" align="center">
      </el-table-column>

      <el-table-column prop="created_at" label="状态" min-width="150" align="center" v-if="auto_pass=='1'">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-if="scope.row.state==0">未处理</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.state==1">已处理</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="状态" min-width="150" align="center" v-if="auto_pass=='0'">
        <template slot-scope="scope">
          <el-button size="mini" type="info" v-if="scope.row.state==0" @click="check(scope.row)">未处理</el-button>
          <el-button size="mini" type="success" v-if="scope.row.state==1">已处理</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
    </el-pagination>
  </el-col>


</el-row>
</template>



<script>
  import { applyGet } from '../../api/api';
  import { applyCheck } from '../../api/api';

  import { baseset } from '../../api/api';
  import { baseget } from '../../api/api';

  export default {
    data() {
      return {
        list:[],
        currentPage: 1,
        count:0,
        limit:10,
        auto_pass:'0'
      };
    },

    methods:{
      switchchange(e){
        console.log(e)
        var allParams={
          auto_pass:this.auto_pass
        }
        baseset(allParams).then((res) => {
          if (res.msg === "ok") {
           this.getconfig()
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
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        applyGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count;
        });
      },

      check(row){
        var allParams={
          id:row.id,
          state:1
        }
        applyCheck(allParams).then((res) => {
         this.getlist();
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

      getconfig(){
        var allParams=''
        baseget(allParams).then((res) => {
          if (res.msg === "ok") {
            this.auto_pass=res.data.auto_pass
            this.getlist();
          } else {
           this.$message({
            message: res.msg,
            type: 'error'
          });
         }
       });
      },
    },

    mounted: function () {
      this.getconfig();
    }
  }
</script>


<style>

</style>
