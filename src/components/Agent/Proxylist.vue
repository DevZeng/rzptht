<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>代理管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->

      <!-- <el-tabs v-model="activeName" type="card"> -->
        <!-- <el-tab-pane label="代理列表" name="list"> -->


<!--           <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
             <el-form-item>
              <el-input v-model="filters.name" placeholder="请输入代理呢称" style="min-width: 240px;" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small"  @click="getlist">搜索</el-button>
              <el-button @click="clear" size="small" >清空</el-button>
            </el-form-item>
          </el-form>
        </el-col> -->

        <el-table :data="list" highlight-current-row style="width: 95%;"  size="small" border> 

          <el-table-column prop="id" label="ID" min-width="60" align="center">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" min-width="140" align="center">
          </el-table-column>

          <el-table-column prop="avatarUrl" label="头像" min-width="100" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.avatarUrl" v-if="scope.row.avatarUrl" style="width:40px;height:40px;border-radius:50%;margin:5px 0 -5px 0;" />
            </template>
          </el-table-column>
          
          <el-table-column prop="amount" label="佣金总计" min-width="140" align="center">
            <template slot-scope="scope">
              <p>{{scope.row.amount/100}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="注册时间" min-width="200" align="center">
          </el-table-column>

          <el-table-column label="操作" min-width="180" align="center">
           <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleSee(scope.row)">佣金详情</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination style="float:left;margin: 20px 0px 0px 0px;" :current-page="currentPage" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页"></el-pagination>
      <!-- </el-tab-pane> -->

<!--     <el-tab-pane label="分佣设置" name="config">

      <el-form :inline="true" :model="filters">

        <el-table border :data="ratio" highlight-current-row size="mini" style="width: 601px; margin-bottom:20px;">
          <el-table-column prop="proxy" label="代理" width="600" align="center">
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small" @click="dialogEditVisible = true">修改</el-button>
      </el-form-item>
    </el-form>

  </el-tab-pane> -->
  <!-- </el-tabs> -->

</el-col>


<el-col>
  <el-dialog title="分佣设置" :visible.sync="dialogEditVisible" center>

    <el-form ref="ratiolist" :model="ratiolist" label-width="120px" style="width:80%" :rules="rules">

      <el-form-item label="代理：" prop="proxy">
        <el-input v-model="ratiolist.proxy" type="number" placeholder="请输入百分比"> <template slot="append">%</template></el-input>
      </el-form-item>
      <el-form-item style="margin-left: calc(50% - 120px);">
        <el-button type="primary" @click="save()" size="small">保存</el-button>
        <el-button @click="dialogEditVisible  = false" size="small">取 消</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</el-col>




<el-col>
  <el-dialog title="佣金详情" :visible.sync="dialogSeeVisible" width="1200px" center>


    <el-table :data="currow" border stripe size="mini" id="out-table">
      <el-table-column prop="origin.avatarUrl" label="logo" min-width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.origin.avatarUrl" v-if="scope.row.origin.avatarUrl" style="width:40px;height:40px;border-radius:50%;margin:5px 0 -5px 0;" />
        </template>
      </el-table-column>

      <el-table-column prop="origin.nickname" label="用户" min-width="100" align="center">
      </el-table-column>

      <el-table-column prop="price" label="金额" min-width="100" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.price/100}}</p>
        </template>
      </el-table-column>

      <el-table-column prop="updated_at" label="时间" min-width="100" align="center">
      </el-table-column>

    </el-table>



  </el-dialog>
</el-col>



</el-row>

</template>


<script>
  import { agentGet } from '../../api/api';
  import { proxyGet } from '../../api/api';

  import { ratioPost } from '../../api/api';
  import { ratioGet } from '../../api/api';


  export default {
    data() {

      var checkvalue = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('此项不能为空'));
        }
        setTimeout(() => {
          if (Math.sign(value) == 1) {
            if(value%1 === 0){
             callback();
           }else{
            callback();
          }
        } else if(Math.sign(value) == 0) {
          callback();
        } else if(Math.sign(value) == -1) {
          callback(new Error('请输入正数'));
        }else{
          callback(new Error('请输入数字'));
        }
      }, 100);
      };

      return {
        activeName:'list',
        dialogSeeVisible:false,
        dialogEditVisible:false,
        ratiolist:{
          system:'',
          level1:'',
          level2:'',
          level3:'',
        },
        ratio:[{
          sys:'请设置',
          store:'请设置',
          proxy:'请设置',
        }],

        list: [],

        rules:{
          sys: [{required: true, trigger: 'blur',validator: checkvalue}],
          store: [{required: true, trigger: 'blur',validator: checkvalue}],
          proxy: [{required: true, trigger: 'blur',validator: checkvalue}],
        },


        currentPage: 1,
        count:0,
        limit:10,
        filters: {
          name: ''
        },


        currow:[]
      }
    },
    methods: {

      getlist() {
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        agentGet(allParams).then((res) => {
          // console.log(res.data)
          this.list=res.data.data;
          this.count=res.data.count;
        });
      },

      clear(){
        this.filters.name='';
        this.getlist();
      },

      handleSee(row){
        var allParams = '?user_id='+ row.id+'&page=1&limit=99999';
        proxyGet(allParams).then((res) => {
          // console.log(res.data.data)
          this.currow=res.data.data
          this.dialogSeeVisible=true
        });
      },

      getratio(){
        var allParams = '';
        ratioGet(allParams).then((res) => {
          // console.log(res.data)
          if(res.data!==null){
            // this.ratio[0].sys=res.data.sys;
            // this.ratio[0].store=res.data.store;
            this.ratio[0].proxy=res.data.proxy;
          }
        });
      },

      save(){
        this.$refs.ratiolist.validate((valid) => {
          if (valid) {
            ratioPost(this.ratiolist).then((res) => {
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               this.dialogEditVisible=false
               this.getratio();
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


      handleCurrentChange(val) {
        this.currentPage = val;
        this.getlist();
      },

      handleSizeChange(val){
        this.limit = val;
        this.getlist();
      },

    },
    mounted() {
      this.getlist();
      // this.getratio();
    }
  }
</script>


<style scoped>

</style>
