<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>购物订单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form :inline="true">

<!--         <el-form-item>
          <div class="block">
            <span class="demonstration">请选择下单时间：</span>
            <el-date-picker v-model="filter1.date" type="daterange" range-separator="/" @change="getSTime" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item> -->
        <el-form-item label="订单状态：">
          <el-select v-model="filter.state" placeholder="订单状态" size="mini" @change="getlist">
            <el-option label="待支付" value="1"></el-option>
            <el-option label="已支付" value="2"></el-option>
            <el-option label="待核销/待发货" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
          </el-select>
        </el-form-item>
<!--         <el-form-item>
          <el-button type="primary" size="mini" @click="getlist">搜索</el-button>
          <el-button size="mini" @click="clear">清空</el-button>
        </el-form-item> -->

        <el-form-item>
          <el-button type="warning" style="margin-left:50px;" size="small"><a style="color:#fff;" :href="orderexcel" download="" mce_href="#">导出Excel表</a></el-button>
        </el-form-item>

<!--         <el-form-item style="margin-left:100px;">
  <el-upload action="" :on-remove="handleRemove" :before-upload="beforeupload" :headers="header" :with-credentials="true" :on-success="handleSuccess" :http-request='uploadFileMethod' :limit="1" :file-list="importfile" :on-exceed="handleExceed" :on-error="handleError" name="file" :show-file-list="false">
    <el-upload :action="base" :on-success="handleSuccess" :limit="1" :on-exceed="handleExceed" :on-error="handleError" :file-list="importfile">
      <el-button size="small" type="success">选择文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> :action="base"
    </el-upload>

  </el-form-item> -->

<!--       <el-form-item>
        <el-button size="small" type="primary" @click="confirm">提交</el-button>
      </el-form-item> -->

    </el-form>

    <el-table :data="list" border stripe size="small" id="out-table" style="width:95%;">
      <el-table-column prop="id" label="ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="number" label="订单号" min-width="110" align="center">
      </el-table-column>

      <el-table-column prop="user" label="头像" min-width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.user.avatarUrl" v-if="scope.row.user" style="width:40px;height:40px;border-radius:50%;margin:5px 0 -5px 0;" />
        </template>
      </el-table-column>

      <el-table-column prop="user.nickname" label="用户" min-width="100" align="center">
      </el-table-column>

      <el-table-column prop="price" label="金额" min-width="150" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.price/100}}</p>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="订单状态" min-width="200" align="center">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.state==1">待支付</el-tag>
          <el-tag type="success" v-if="scope.row.state==2">已支付</el-tag>
          <el-tag type="primary" v-if="scope.row.state==3 && !scope.row.address">待核销</el-tag>
          <el-tag type="primary" v-if="scope.row.state==3 && scope.row.address && scope.row.delivery!=1">待发货</el-tag>

          <el-tag type="success" v-if="scope.row.state==3 && scope.row.delivery==1">已发货</el-tag>

          <el-tag type="warning" v-if="scope.row.state==4">已完成</el-tag>
          <el-tag type="danger" v-if="scope.row.state==5">拼团失败</el-tag>
          <el-tag type="danger" v-if="scope.row.state==6">拼团失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="free" label="中奖状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.free==1">免单中奖</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="下单时间" min-width="110" align="center">
      </el-table-column>

      <el-table-column prop="seller" label="核销人" min-width="100" align="center" >
        <template slot-scope="scope">
          <p v-if="scope.row.state=='4' && scope.row.seller && scope.row.delivery==0">{{scope.row.seller.nickname}}</p>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleSee(scope.row)">订单详情</el-button>

        <el-button type="success" size="mini" @click="handleSend(scope.row)" v-if="scope.row.state==3 && scope.row.address && scope.row.delivery!=1">发货</el-button>

        <el-button type="danger" size="mini" @click="handleTui(scope.row)" v-if="scope.row.state!=1">退款</el-button>
      </template>
    </el-table-column>

  </el-table>

  <el-pagination style="float:left;margin:20px 0 200px 0px;" :current-page="currentPage" :page-sizes="[20, 30, 40, 50,100,200]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>


</el-col>




<el-col>
  <el-dialog title="快递信息" :visible.sync="dialogSendVisible" width="800px" center>
    <el-form :model="kuaidi" ref="kuaidi" label-width="120px" :rules="sendrule">
      <el-form-item label="快递名称：" label-width="120px" prop="express_id">
        <el-select v-model="kuaidi.express_id" placeholder="全部" @change="xzkauidi">
          <el-option v-for="item in expressarr" :label="item.title" :value="item.id" :key="item.id"></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="快递单号：" label-width="120px" prop="express_number">
       <el-input v-model="kuaidi.express_number" placeholder="请输入快递单号"></el-input>
     </el-form-item>
     <el-button type="primary" size="small" @click="submitsend" style="margin-left: calc(50% - 28px);">提交</el-button>
   </el-form>
 </el-dialog>
</el-col>



<el-col>
  <el-dialog title="是否确定退款？" :visible.sync="dialogunTuiVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmTuid()">确 定</el-button>
      <el-button @click="dialogunTuiVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>




<el-col>
  <el-dialog title="商品详情" :visible.sync="dialogSeeVisible" width="1200px" center>
    <el-form label-position="right" label-width="100px" size="mini">


      <el-form-item label="收货信息：" class="fw6" v-if="orderdetail[0].address">
        <div class="fw4">姓名： {{orderdetail[0].address.name}}</div>
        <div class="fw4">地址： {{orderdetail[0].address.address}}</div>
        <div class="fw4">电话： {{orderdetail[0].address.phone}}</div>
      </el-form-item>

      <el-form-item label="快递信息：" class="fw6" v-if="orderdetail[0].express_id!='0'">
        <div class="fw4">快递公司编号： {{orderdetail[0].express_id}}</div>
        <div class="fw4">物流单号： {{orderdetail[0].express_number}}</div>
      </el-form-item>

      <el-form-item label="商品信息：" class="fw6">

        <el-table :data="orderdetail" border stripe size="mini" id="out-table">
          <el-table-column prop="groupBuy.group_id" label="id" min-width="100" align="center">
          </el-table-column>

          <el-table-column prop="groupBuy.cover" label="商品缩略图" min-width="100" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.groupBuy.cover" style="max-width:80px;max-height:64px;" />
            </template>
          </el-table-column>

          <el-table-column prop="groupBuy.title" label="商品名称" min-width="100" align="center">
          </el-table-column>

          <el-table-column prop="categroy.category" label="商品规格" min-width="100" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.categroy">{{scope.row.categroy.category}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="groupBuy.group_price" label="拼团价" min-width="100" align="center">
           <template slot-scope="scope">
            <p class="fw4">￥{{scope.row.groupBuy.group_price}}</p>
          </template>
        </el-table-column>

      </el-table>
    </el-form-item>


  </el-form>
</el-dialog>
</el-col>


</el-row>
</template>

<script>

  import { allorderGet } from '../../api/api';
  import { allorderTui } from '../../api/api';
  import { deliveryGet } from '../../api/api';
  import { shipgoods } from '../../api/api';
  import { tablePost } from '../../api/api';


  import hosturl from '../../api/api';

  import { Message } from 'element-ui';


  export default {
    data() {
      return {
        base:hosturl+'/import/orders',
        header:{
          'Content-Type':'multipart/form-data'
        },
        importfile:[],



        orderexcel:'',

        list:[],
        currentPage: 1,
        count:0,
        limit:20,


        filter:{
          start:'',
          end:'',
          state:''
        },

        filter1:{
          date:''
        },

        orderdetail:[
        {
          address:{}
        }
        ],
        dialogSeeVisible:false,
        dialogunTuiVisible:false,


        dialogSendVisible:false,

        expressarr:[],

        kuaidi:{
          express_id:'',
          express_number:''
        },

        sendrule:{
          express_number: [
          {required: true, message: '请输入快递单号', trigger: 'blur'},
          ],
        },



      };
    },

    methods:{
      uploadFileMethod(param){
        console.log(param)
        console.log(param.file)
        var allParams={
          file:param.file
        }
        tablePost(allParams).then((res) => {
          console.log(res)
            // this.$message({
            //   message: '提交成功',
            //   type: 'success'
            // });
          });
      },

      submitUpload() {
        this.$refs.upload.submit();
      },
      

      beforeupload(file){
        console.log(file)
      },

      handleSuccess(res, file) {
        console.log(res,file)
      },

      handleRemove(file, fileList) {
        this.importfile=[]
        for(var i=0;i<fileList.length;i++){
          this.importfile.push(res.data.url)
        }
      },

      handleExceed(files, fileList) {
        console.log(fileList)
        this.$message.warning(`只能上传 1 个文件`);
      },

      handleError(err, file, fileLis){
        console.log(err, file, fileLis)
        // Message({
        //   message: "请上传Excel表格",
        //   type: 'error'
        // });
      },



      confirm(){
      //  if(this.importfile.length==0){
      //   Message({
      //     message: "请选择文件",
      //     type: 'error'
      //   });
      // }else{
      //   var allParams={
      //     app_id:this.wechatset.app_id,
      //   }
      //   console.log(allParams)
      //   tablePost(allParams).then((res) => {
      //     console.log(res)
      //     if (res.msg === "ok") {
      //      this.$message({
      //       message: '提交成功',
      //       type: 'success'
      //     });
      //      this.importfile=[]
      //      this.getlist()
      //    } else {
      //      this.$message({
      //       message: res.msg,
      //       type: 'error'
      //     });
      //    }
      //  });
      // }
    },




    getexpress(){
      var allParams = '?page=1&limit=99999';
      deliveryGet(allParams).then((res) => {
        this.expressarr=res.data.data;
      });
    },

    xzkauidi(val){
      this.kuaidi.express=val
    },

    handleSend(row){
      this.kuaidi={
        id:row.id,
        express_id:'',
        express_number:''
      }
      this.dialogSendVisible = true;
    },

    submitsend(){
      var that =this;
      that.$refs.kuaidi.validate((valid) => {
        if (valid) {
          var allParams = that.kuaidi;
          // console.log(allParams)
          shipgoods(allParams).then((res) => {
            // console.log(res)
            this.getlist();
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.dialogSendVisible = false;
          });
        }else{
          return false;
        }
      })
    },






    handleSee(row){
      this.orderdetail = [row];
      console.log(this.orderdetail)
      this.dialogSeeVisible = true;
    },

    getlist(){
      var allParams = '?page='+ this.currentPage + '&limit=' + this.limit+'&state='+this.filter.state
        // +'&start=' + this.filter.start+'&end=' + this.filter.end
        allorderGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count


          this.orderexcel=hosturl+'/export/orders'+'?page='+ this.currentPage + '&limit=' + this.limit +'&state='+this.filter.state
        });
      },

      getSTime(val){
        this.filter.start=val[0];
        this.filter.end=val[1];
      },

      clear(){
        this.city_id='';
        this.cityone='';
        this.filter={
          start:'',
          end:'',
        }
        this.filter1={
          date:''
        }
        this.getlist();
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getlist();
      },

      handleSizeChange(val){
        this.limit = val;
        this.getlist();
      },

      handleTui(row){
        this.tuiid=row.id
        this.dialogunTuiVisible=true
      },

      confirmTuid(){
        var allParams='?order_id='+this.tuiid
        allorderTui(allParams).then((res) => {
          if (res.msg === "ok") {
           this.$message({
            message: '退款成功',
            type: 'success'
          });
           this.dialogunTuiVisible=false
         } else {
           this.$message({
            message: res.msg,
            type: 'error'
          });
         }
       });
      }

    },

    mounted: function () {
      this.getlist();
      this.getexpress();
    }
  }
</script>

<style>

</style>