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

      <el-tabs v-model="activeName" type="card">

        <el-tab-pane label="吸粉红包" name="hongbao">
          <el-form ref="hongbao" :model="hongbao" label-width="120px" :rules="rules">
            <el-form-item label="最低金额：" prop="minprice">
              <el-input min="1" type="number" style="width: 300px;" v-model="hongbao.minprice" placeholder="请输入最低金额"><template slot="append">最低为1</template></el-input>
            </el-form-item>
            <el-form-item label="最高金额：" prop="maxprice">
              <el-input min="1" type="number" style="width: 300px;" v-model="hongbao.maxprice" placeholder="请输入最高金额"></el-input>
            </el-form-item>
            <el-form-item label="人数：" prop="num">
              <el-input min="1" max="5" type="number" style="width: 300px;" v-model="hongbao.num" placeholder="请输入人数"><template slot="append">0为关闭红包</template></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="postbtn" size="small" @click="savehb()">提交</el-button>
        </el-tab-pane>

        <el-tab-pane label="首页红包图" name="bgpic">
         <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="bgSuccess" :show-file-list="false" accept="image/*">
          <img :src="loginbg" class="pre-img" style="width:400px;height:434px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
        </el-upload>
        <el-button type="primary" class="postbtn" size="small" @click="savebg()">提交</el-button>
      </el-tab-pane>



      <el-tab-pane label="分享海报" name="sharebg">
        <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="shareSuccess" :show-file-list="false" accept="image/*">
          <img :src="sharebg" class="pre-img" style="width:180px;height:320px;display: block;margin-top: 1px;border:1px dashed #ccc;">
        </el-upload>
        <el-button type="primary" class="postbtn" size="small" @click="saveshare()">提交</el-button>
      </el-tab-pane>



      <el-tab-pane label="分享链接" name="sharepic">
       <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="linkSuccess" :show-file-list="false" accept="image/*">
        <img :src="sharepic" class="pre-img" style="width:200px;height:160px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
      </el-upload>

      <el-input v-model="sharetitle" placeholder="请输入分享标题" style="margin-top:10px;width: 300px;display: block;"></el-input>

      <el-button type="primary" class="postbtn" size="small" @click="savelink()">提交</el-button>
    </el-tab-pane>



    <el-tab-pane label="佣金发放时间" name="brokerage_type">
      <el-switch v-model="brokerage_type" active-value="1" inactive-value="2" active-text="成团发放" inactive-text="核销发放" @change="schange">
      </el-switch>
    </el-tab-pane>



  </el-tabs>

</el-row>
</el-col>


</el-row>
</template>



<script>


  import qiniu from '../../api/qiniu';
  import { baseset } from '../../api/api';
  import { baseget } from '../../api/api';

  import { Message } from 'element-ui';


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
        callback(new Error('不能为0'));
      } else if(Math.sign(value) == -1) {
        callback(new Error('请输入正数'));
      }else{
        callback(new Error('请输入数字'));
      }
    }, 100);
    };


    return {
      activeName:'hongbao',

      uptoken:{
        token:qiniu.token,
      },
      upurl:qiniu.upurl,

      loginbg:'../static/images/default2.png',
      brokerage_type:'1',

      sharebg:"../static/images/default2.png",


      sharepic:"../static/images/default.png",
      sharetitle:'',

      hongbao:{
        minprice:'',
        maxprice:'',
        num:''
      },

      rules: {
        minprice: [{required: true, trigger: 'blur',validator: checkvalue}],
        maxprice: [{required: true, trigger: 'blur',validator: checkvalue}],
        num: [{required: true, trigger: 'blur',message: '请输入人数'}],
      },

      switch:0,

    };
  },

  methods:{

    schange(val){
      console.log(val)
      var allParams={
        brokerage_type:this.brokerage_type
      }
      baseset(allParams).then((res) => {
        if (res.msg === "ok") {
         this.getconfig()
         this.$message({
          message: '修改成功',
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


    bgSuccess(res, file){
      this.loginbg = qiniu.showurl+ res.key
    },

    savebg(){
      var allParams={
        loginbg:this.loginbg
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

    shareSuccess(res, file){
      this.sharebg = qiniu.showurl+ res.key
    },

    saveshare(){
      var allParams={
        sharebg:this.sharebg,
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




    linkSuccess(res, file){
      this.sharepic = qiniu.showurl+ res.key
    },

    savelink(){
      if(this.sharetitle==''){
        this.$message({
          message: '请输入分享标题',
          type: 'error'
        });
        return
      }
      var allParams={
        sharepic:this.sharepic,
        sharetitle:this.sharetitle
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

    savehb(){
      this.$refs.hongbao.validate((valid) => {
        if (valid) {
          var allParams={
            minprice:this.hongbao.minprice,
            maxprice:this.hongbao.maxprice,
            num:this.hongbao.num
          }
          baseset(allParams).then((res) => {
            if (res.msg === "ok") {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.getconfig()
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


    getconfig(){
      var allParams=''
      baseget(allParams).then((res) => {
        if (res.msg === "ok") {

          this.sharepic=res.data.sharepic
          this.sharetitle=res.data.sharetitle


          this.loginbg=res.data.loginbg
          this.brokerage_type=res.data.brokerage_type

          this.sharebg=res.data.sharebg

          this.hongbao.minprice=res.data.minprice
          this.hongbao.maxprice=res.data.maxprice
          this.hongbao.num=res.data.num


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
    this.getconfig()
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