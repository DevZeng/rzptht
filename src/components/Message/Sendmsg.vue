<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>推送</el-breadcrumb-item>
        <el-breadcrumb-item>模板消息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="newadmin" :model="newadmin" label-width="120px" :rules="rules" style="width: 800px">
        <el-form-item label="预约项目:" prop="title">
          <el-input v-model="newadmin.title" placeholder="请输入预约项目"></el-input>
        </el-form-item>

        <el-form-item label="预约内容:" prop="remark">
          <el-input v-model="newadmin.remark" placeholder="请输入预约内容"></el-input>
        </el-form-item>

        <el-form-item label="预付金额:" prop="price">
          <el-input v-model="newadmin.price" placeholder="请输入预付金额"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="save()">发送</el-button>
        </el-form-item>
      </el-form>

    </el-col>

  </el-row>
</template>



<script>

  import { tuisongPost } from '../../api/api';


  export default {
    data() {
      return {

        newadmin:{
          title:'',
          remark:'',
          price:'',
        },

        rules: {
          title: [{required: true, trigger: 'blur',message: '请输入预约项目'}],
          remark: [{required: true, trigger: 'blur',message: '请输入预约内容'}],
          price: [{required: true, trigger: 'blur',message: '请输入预付金额'}],
        },

      };
    },

    methods:{


      newone(){       
        this.newadmin={
          title:'',
          remark:'',
          price:'',
        }
      },

      save(){
        this.$refs.newadmin.validate((valid) => {
          if (valid) {
            console.log(this.newadmin)
            tuisongPost(this.newadmin).then((res) => {
              if (res.msg === "ok") {
                this.$message({
                  message: '发送成功',
                  type: 'success'
                });

                this.newadmin={
                  title:'',
                  remark:'',
                  price:'',
                }

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

    },
    

    mounted: function () {

    }
  }
</script>


<style>

</style>
