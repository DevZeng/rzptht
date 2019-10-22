<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">



      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" size="small" @click="newone">新增店铺</el-button>
        </el-form-item>

        <el-form-item label="商店地区：" prop="cityone">
          <el-select v-model="cityone" placeholder="请选择市" @change="getcitytwo">
            <el-option v-for="item in levelarr1" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="city_id" placeholder="请选择区" v-show="cityone">
            <el-option v-for="item in levelarr2" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="getlist">搜索</el-button>
          <el-button size="small" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" border stripe size="small" style="width: 90%;margin-top: 10px;">
        <el-table-column prop="id" label="编号" width="75" align="center">
        </el-table-column>

        <el-table-column prop="name" label="店铺名称" width="150" align="center">
        </el-table-column>

        <el-table-column prop="poster" label="海报" min-width="130" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.poster" style="max-width:112px;max-height:63px;" />
          </template>
        </el-table-column>

        <el-table-column prop="address" label="地址" min-width="150" align="center">
        </el-table-column>

        <el-table-column prop="phone" label="电话" width="120" align="center">
        </el-table-column>

        <el-table-column prop="logo" label="logo" min-width="85" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.logo" style="max-width:60px;max-height:60px;" />
          </template>
        </el-table-column>

        <el-table-column prop="logo" label="推广码" min-width="100" align="center">
          <template slot-scope="scope">
            <img :src="hosturl+'page=pages/index/index&&'+'store_id='+scope.row.id" style="max-width:60px;max-height:60px;" />
            <el-button type="primary" size="mini" @click="downs(hosturl+'page=pages/index/index&&'+'store_id='+scope.row.id,scope.row.name)">下载</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="all_amount" label="佣金总额" width="85" align="center">
        </el-table-column>

        <el-table-column prop="amount" label="可提现" width="85" align="center">
        </el-table-column>

        <el-table-column prop="ratio" label="佣金比例" width="85" align="center">
        </el-table-column>





        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.offersort" v-if="scope.row.offer==0&&scope.row.review==1&&scope.row.state==1" size="mini" type="number" min="0"></el-input>
            <div v-if="scope.row.offerData">{{scope.row.offerData.sort}}</div>
          </template>
        </el-table-column>




        <el-table-column prop="proxy" label="推广人数" width="85" align="center">
        </el-table-column>

        <el-table-column prop="type" label="状态" width="90" align="center">
          <template slot-scope="scope">
           <el-button type="success" size="small" @click="xgstate(scope.$index, scope.row)" v-show="scope.row.state==1">上线</el-button>
           <el-button type="info" size="small" @click="xgstate(scope.$index, scope.row)" v-show="scope.row.state==2">下线</el-button>
         </template>
       </el-table-column>

       <el-table-column label="操作" min-width="600" align="center">
         <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.user_id!==0 && scope.row.amount>=1" @click="handleti(scope.row)">提现</el-button>

          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="success" size="mini" @click="handlequan(scope.$index, scope.row)">优惠券</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          <el-button type="primary" size="mini" v-if="scope.row.user_id==0" @click="bindshop(scope.$index, scope.row)">绑定店主</el-button>
          <el-button type="danger" size="mini" v-if="scope.row.user_id!==0" @click="unbindshop(scope.$index, scope.row)">解绑店主</el-button>

          <el-button type="primary" size="mini" @click="bindcheck(scope.$index, scope.row)">绑定核销</el-button>
          <el-button type="success" size="mini" @click="bindchecks(scope.$index, scope.row)">已绑定核销</el-button>

        </template>
      </el-table-column>

    </el-table>

    <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
    </el-pagination>
  </el-col>


  <el-col>
    <el-dialog title="优惠券" :visible.sync="dialogquanVisible" width="900px" center>

      <el-table :data="quanlist" border stripe size="mini" id="out-table">
        <el-table-column prop="title" label="标题" min-width="100" align="center">
        </el-table-column>

        <el-table-column prop="pic" label="图片" min-width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="max-width:144px;max-height:256px;" />
          </template>
        </el-table-column>

        <el-table-column prop="number" label="数量" min-width="100" align="center">
        </el-table-column>

        <el-table-column prop="today" label="今天核销数" min-width="100" align="center">
        </el-table-column>

        <el-table-column prop="all" label="核销总数" min-width="100" align="center">
        </el-table-column>

      </el-table>

    </el-dialog>
  </el-col>


  <el-col>
    <el-dialog title="确认删除该商店么？" :visible.sync="dialogDelVisible" width="30%">
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="submitdel()">确 定</el-button>
        <el-button type="primary" @click="dialogDelVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-col>


  <el-col>
    <el-dialog title="绑定店主" :visible.sync="dialogBindVisible" center>
      <el-form label-width="120px" style="width:80%">
        <el-form-item label="选择用户：">
          <el-select filterable placeholder="请选择用户" @change="setshop" v-model="shop">
            <el-option v-for="item in userarr" :label="item.id + ',' + item.nickname" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: calc(50% - 120px);">
          <el-button type="primary" @click="shopbind()">保存</el-button>
          <el-button @click="dialogBindVisible  = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-col>


  <el-col>
    <el-dialog title="是否确定解绑？" :visible.sync="dialogunbindVisible" width="30%">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delbind()">确 定</el-button>
        <el-button @click="dialogunbindVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-col>


  <el-col>
    <el-dialog title="佣金详情" :visible.sync="dialogSeeVisible" width="600px" center>

      <el-form label-width="140px" style="width:80%">
        <el-form-item label="请输入提现金额：">
          <el-input v-model="amount" placeholder="请输入提现金额(需大于1元)" style="width: 400px;display: block;" type="number" min="1"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: calc(50% - 120px);">
          <el-button type="primary" @click="submitti()">保存</el-button>
          <el-button @click="dialogSeeVisible  = false">取 消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </el-col>



  <el-col>
    <el-dialog title="绑定核销" :visible.sync="dialogCheckVisible" center>
      <el-form label-width="120px" style="width:80%">
        <el-form-item label="选择用户：">
          <el-select filterable placeholder="请选择用户" @change="setcheck" v-model="shop">
            <el-option v-for="item in userarr" :label="item.id + ',' + item.nickname" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: calc(50% - 120px);">
          <el-button type="primary" @click="checkbind()">保存</el-button>
          <el-button @click="dialogCheckVisible  = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-col>



  <el-col>
    <el-dialog title="已绑定核销" :visible.sync="dialogChecksVisible" center>
      <el-table :data="bindlist" border stripe size="mini" id="out-table">
        <el-table-column prop="user.nickname" label="用户" min-width="100" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
         <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="unbindcheck(scope.$index, scope.row)">解绑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-dialog>
</el-col>


<el-col>
  <el-dialog title="是否确定解绑？" :visible.sync="dialoguncheckVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmunbind()">确 定</el-button>
      <el-button @click="dialogunbindVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>



</el-row>
</template>



<script>
  import { shopGet } from '../../api/api';
  import { shoponeGet } from '../../api/api';
  import { storeCheck } from '../../api/api';
  import { storeDel } from '../../api/api';
  import { bindshop } from '../../api/api';

  import { shopaddGet } from '../../api/api';

  import { userGet } from '../../api/api';
  import { tixianPost } from '../../api/api';

  import { bindcheck } from '../../api/api';
  import { unbindcheck } from '../../api/api';
  import { bindchecks } from '../../api/api';


  import hosturl from '../../api/api';


  export default {
    data() {
      return {
        list:[],
        currentPage: 1,
        count:0,
        limit:10,
        hosturl:hosturl +'/api/qrcode?',

        dialogSeeVisible:false,
        currow:[],


        dialogBindVisible:false,
        dialogDelVisible:false,
        dialogunbindVisible:false,
        dialogquanVisible:false,


        dialogCheckVisible:false,
        dialogChecksVisible:false,
        dialoguncheckVisible:false,

        userarr:[], 
        shop:'',

        amount:'',


        quanlist:[],


        city_id:'',
        cityone:'',

        levelarr1:[],
        levelarr2:[],

        store_id:'',
        user_id:'',
        bindlist:[]

      };
    },

    methods:{
      changeoffer(row){
       if(row.offer==0&&!row.offersort){
        this.$message({
          message: '请先输入排序值',
          type: 'error'
        });
      }else{
        var allParams = '?product_id='+ row.id+"&sort="+row.offersort;
        goodoffer(allParams).then((res) => {
         // console.log(res)
         this.getlist();
       });
      }
    },




    bindcheck(index, row){
      this.dialogCheckVisible=true
      this.store_id=row.id
    },

    setcheck(res){
      this.user_id=res
    },

    checkbind(){
      if(this.user_id==''){
       this.$message({
        message: '请选择用户',
        type: 'error'
      });
       return
     }
     var allParams='?store_id='+this.store_id+'&user_id='+this.user_id
     bindcheck(allParams).then((res) => {
      if (res.msg === "ok") {
       this.$message({
        message: '提交成功',
        type: 'success'
      });
       this.dialogCheckVisible=false
       this.getlist();
     } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });
   },


   bindchecks(index, row){
     var allParams='?store_id='+row.id
     bindchecks(allParams).then((res) => {
      if (res.msg === "ok") {
          // console.log(res.data)
          this.bindlist=res.data
          this.store_id=row.id
          this.dialogChecksVisible=true
        } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
   },

   unbindcheck(index, row){
    this.dialoguncheckVisible=true
    this.user_id=row.id
  },

  confirmunbind(){
    var allParams='?store_id='+this.store_id+'&user_id='+this.user_id
    unbindcheck(allParams).then((res) => {
      if (res.msg === "ok") {
       this.$message({
        message: '解绑成功',
        type: 'success'
      });
       this.dialoguncheckVisible=false
       this.dialogChecksVisible=false
     } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });
  },


  getadd(){
    var allParams = '?page=1&limit=10000&base=1';
    shopaddGet(allParams).then((res) => {
      this.levelarr1=res.data.data;
    });
  },

  getcitytwo(){
    var allParams = '?parent_id='+this.cityone;
    shopaddGet(allParams).then((res) => {
      this.levelarr2=res.data.data;
    });
  },

  clear(){
    this.city_id='';
    this.cityone='';
    this.getlist();
  },


  downloadIamge(imgsrc, name) {
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      var url = canvas.toDataURL("image/png"); 

      var a = document.createElement("a"); 
      var event = new MouseEvent("click"); 
      a.download = name || "photo"; 
      a.href = url; 
      a.dispatchEvent(event);
    };
    image.src = imgsrc;
  },

  downs(a,b){
    this.downloadIamge(a, b+'.jpg')
  },



  handlequan(index, row){
    var allParams = '?id='+ row.id;
    shoponeGet(allParams).then((res) => {

      this.quanlist=res.data.coupon

      this.dialogquanVisible=true
    });
  },




  handleti(row){
    this.tishopid=row.id
    this.dialogSeeVisible=true
  },

  submitti(){
    if(this.amount==''){
     this.$message({
      message: '请输入提现金额',
      type: 'error'
    });
   }else if(this.amount<1){
     this.$message({
      message: '提现金额需大于1元',
      type: 'error'
    });
   }else{
    var allParams={
      store_id :this.tishopid,
      amount:this.amount
    }
    tixianPost(allParams).then((res) => {
      if (res.msg === "ok") {
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
  }
},


getuser(){
  var that= this;
  var allParams = '?page=1&limit=1000000'
  userGet(allParams).then((res) => {
    that.userarr=res.data;
  });
},


unbindshop(index, row){
  this.dialogunbindVisible=true
  this.userid=row.id
},

delbind(){
 var allParams='?id='+this.userid+'&user_id=0'
 bindshop(allParams).then((res) => {
  if (res.msg === "ok") {
   this.$message({
    message: '解绑成功',
    type: 'success'
  });
   this.dialogunbindVisible=false
   this.getlist();
 } else {
   this.$message({
    message: res.msg,
    type: 'error'
  });
 }
});
},

bindshop(index, row){
  this.dialogBindVisible=true
  this.userid=row.id
},

setshop(res){
  this.shop=res
},

shopbind(){
  if(this.shop==''){
   this.$message({
    message: '请选择用户',
    type: 'error'
  });
   return
 }

 var allParams='?id='+this.userid+'&user_id='+this.shop
 console.log(allParams)
 bindshop(allParams).then((res) => {
  if (res.msg === "ok") {
   this.$message({
    message: '提交成功',
    type: 'success'
  });
   this.dialogBindVisible=false
   this.getlist();
 } else {
   this.$message({
    message: res.msg,
    type: 'error'
  });
 }
});
},

getlist(){
  var allParams = '?page='+ this.currentPage + '&limit=' + this.limit+ '&city_id=' + this.city_id;
  shopGet(allParams).then((res) => {
    this.list=res.data.data;
    this.count=res.data.count;
  });
},

newone(){
  sessionStorage.removeItem('shopeditid');
  this.$router.push({ path: '/Shop/Newshop' });
},

xgstate(index,row){
  var allParams = '?id='+ row.id ;
  storeCheck(allParams).then((res) => {
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

handleDelete(index,row){
  this.dialogDelVisible=true
  this.delId = row.id;
},

submitdel(){
  var allParams='?id='+this.delId
  storeDel(allParams).then((res) => {
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

handleEdit(index,row){
  sessionStorage.setItem('shopeditid',row.id);
  this.$router.push({ path: '/Shop/Newshop' });
}
},

mounted: function () {
  this.getadd();
  this.getlist();
  this.getuser()
}
}
</script>


<style>
  .logo{
    max-width: 300px;
    margin-left: 20px;
  }
</style>
