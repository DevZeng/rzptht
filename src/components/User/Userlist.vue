<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
<!--      <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filter.name" placeholder="请输入昵称" size="medium" style="min-width: 200px;" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="getlist">搜索</el-button>
        <el-button size="small" @click="clear">清空</el-button>
      </el-form-item>
    </el-form> -->

    <el-table :data="list" border stripe size="small" style="width:60%;">
      <el-table-column prop="id" label="用户编号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" min-width="140" align="center">
      </el-table-column>

      <el-table-column prop="avatarUrl" label="头像" min-width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" style="width:40px;height:40px;border-radius:50%;margin:5px 0 -5px 0;" />
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="注册日期" width="200" align="center">
      </el-table-column>

      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">

        <el-button type="primary" size="mini" @click="bindcheck(scope.$index, scope.row)" v-if="scope.row.seller==0">成为核销</el-button>
        <el-button type="danger" size="mini" @click="bindcheck(scope.$index, scope.row)" v-if="scope.row.seller==1">取消核销</el-button>

      </template>
    </el-table-column>

  </el-table>

  <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>
</el-col>



</el-row>
</template>

<script>


  import { userGet } from '../../api/api';
  import { userPost } from '../../api/api';

  export default {
    data() {
      return {
        currentPage: 1,
        list:[{}],
        count:0,
        limit:10,

      };
    },

    methods:{

      bindcheck(index,row){
        var allParams ={
          id:row.id
        }
        userPost(allParams).then((res) => {
         this.$message({
          message: '提交成功',
          type: 'success'
        });
         this.getlist()
       });
      },

      getlist(){
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        userGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count;
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

</style>
