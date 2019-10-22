<template>
  <el-row class="warp" style="padding:20px 0 20px 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>代理管理</el-breadcrumb-item>
        <el-breadcrumb-item>佣金管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>



    <el-col :span="24" class="warp-main">

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="form">
         <el-form-item lable>代理昵称：</el-form-item>
         <el-form-item>
          <el-input v-model="form.name" placeholder="请输入代理昵称" style="min-width: 200px;" ></el-input>
        </el-form-item>

<!--         <el-form-item>
          <div class="block">
            <span class="demonstration">月份：</span>
            <el-date-picker v-model="form.month" type="month" placeholder="请选择日期" :editable='editable'  @change="getSTime">
            </el-date-picker>
          </div>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="getlist()">搜索</el-button>
          <el-button @click="clearss">清空</el-button>
        </el-form-item>
      </el-form>
    </el-col>



    <el-table :data="users" highlight-current-row style="width: 95%;" id="out-table" border size="small">
      <el-table-column prop="id" label="编号" width="150" align="center">
      </el-table-column>
<!--       <el-table-column prop="proxy.nickname" label="用户昵称" width="150" align="center">
      </el-table-column> -->
<!--       <el-table-column prop="proxy.name" label="用户姓名" width="120" align="center">
</el-table-column> -->
<el-table-column prop="order.number" label="订单编号" mwidth="200" align="center">
</el-table-column>
<el-table-column prop="order.price" label="订单金额" mwidth="200" align="center">
</el-table-column>
<el-table-column prop="brokerage" label="佣金" mwidth="200" align="center">
</el-table-column>
<el-table-column prop="type" label="类型" width="100" align="center">
  <template slot-scope="scope">
    <span v-show="scope.row.type==1 ? true : false">直拓</span>
    <span v-show="scope.row.type==2 ? true : false">代理</span>
    <span v-show="scope.row.type==3 ? true : false">奖励</span>
  </template>
</el-table-column>


<el-table-column prop="created_at" label="时间" mwidth="200" align="center">
</el-table-column>
<!--       <el-table-column prop="remark" label="备注" min-width="200" align="center">
</el-table-column> -->

<!--       <el-table-column label="客户信息" min-width="130" align="center">
       <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">查看</el-button>
      </template>
    </el-table-column> -->

<!--     <el-table-column prop="state" label="状态" min-width="100" align="center">
      <template slot-scope="scope">
        <span v-show="scope.row.state==0">未发放</span>
        <span v-show="scope.row.state==1">已发放</span>
      </template>
    </el-table-column> -->
  </el-table>



  <el-pagination style="float:left;margin-top: 20px;" :current-page="currentPage" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页"></el-pagination>
</el-col>

<el-button type="primary" style="float:left;margin-top:20px;" @click="exportExcel()">导出Excel表</el-button>

<el-col>
  <el-dialog title="客户信息" :visible.sync="dialogInfoVisible" style="min-width:800px;">
    <el-form :ref="info" :model="info" label-width="120px" style="width:80%;">
      <el-form-item label="姓名:">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="info.phone"></el-input>
      </el-form-item>
      <el-form-item label="贷款类型:">
        <el-input v-model="info.business"></el-input>
      </el-form-item>
      <el-form-item label="金额:">
        <el-input v-model="info.price"></el-input>
      </el-form-item>
      <el-form-item label="下单时间:">
        <el-input v-model="info.created_at"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="confirm()">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</el-col>

</el-row>

</template>


<script>
  import { comGetAll } from '../../api/api';


  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'


  export default {
    data() {
      return {
        info:{},
        editable:false,
        currentPage: 1,
        count:0,
        limit:10,
        filters: {
          name: ''
        },
        form:{
          name:'',
          // month:''
        },
        dialogDelVisible:false,
        dialogInfoVisible:false,
        users: [],
      }
    },
    methods: {

      exportExcel () {
       var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
       var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
       try {FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'commission.xlsx')}
       catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
       return wbout
     },

     getSTime(val){
      this.form.month=val;
    },

    clearss(){
      this.form={
        name:'',
        month:''
      }
      this.getlist();
    },


    getlist () {
      var param = '?name='+ this.form.name +'&page='+ this.currentPage + '&limit=' + this.limit;
      comGetAll(param).then((res) => {
        this.users = res.data.data;
        this.count=res.data.count;
      });
    },


    handleEdit(index, row) {
      this.info=row.loan;
      this.dialogInfoVisible = true;
    },

    confirm(){
      this.dialogInfoVisible = false
      this.info={}
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
  }
}
</script>


<style scope>
.active {
  color:deepskyblue;
}
</style>