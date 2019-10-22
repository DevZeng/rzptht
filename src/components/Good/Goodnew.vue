<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>拼团管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布活动</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form label-width="130px" width="900px" center style="width: 1000px" :rules="rules" ref="newone" :model="newone">

        <el-form-item label="商品分类：" prop="type_id">
          <el-select v-model="type_id" placeholder="请选择分类">
            <el-option v-for="item in typeArr" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题：" prop="title">
          <el-input v-model="newone.title" placeholder="请输入活动标题（20字以内）" maxlength="20" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="简介：" prop="intro">
          <el-input v-model="newone.intro" placeholder="请输入活动简介（20字以内）" maxlength="20" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="拼团限时：" prop="group_time">
          <el-input v-model="newone.group_time" type="number" min="1" placeholder="请输入拼团限时（小时）(整数)" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="活动时间：" prop="date">
          <el-date-picker v-model="date" type="datetimerange" :picker-options="pickerOptions" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss" @change="getSTime" style="width:500px;" :editable=false start-placeholder="开始时间" end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="人数：" prop="group_number">
          <el-input v-model="newone.group_number" type="number" min="3" placeholder="请输入人数（最少3人）" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="配送方式：" prop="delivery">
         <template>
          <el-radio v-model="newone.delivery" label="1">自提</el-radio>
          <el-radio v-model="newone.delivery" label="2">快递</el-radio>
          <el-radio v-model="newone.delivery" label="3">自提+快递</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="佣金：" prop="ratio">
        <el-input v-model="newone.ratio" type="number" placeholder="请输入佣金" style="width:500px;"><template slot="append">元</template></el-input>
      </el-form-item>

      <el-form-item label="不成团时：" prop="refund">
       <el-switch v-model="newone.refund" active-value="1" inactive-value="2" active-text="可退款" inactive-text="不可退款"></el-switch>
     </el-form-item>

     <el-form-item label="是否免单：" prop="free">
       <el-switch v-model="newone.free" active-value="1" inactive-value="2" active-text="免单" inactive-text="不免单"></el-switch>
     </el-form-item>



     <el-form-item label="原价：" prop="price">
      <el-input v-model="newone.price" type="number" placeholder="请输入原价" style="width:500px;"></el-input>
    </el-form-item>

    <el-form-item label="拼团价：" prop="group_price">
      <el-input v-model="newone.group_price" type="number" placeholder="请输入拼团价" style="width:500px;"></el-input>
    </el-form-item>

    <el-form-item label="规格：">
      <div v-for="(guige, index) in categories">
        <el-input size="mini" v-model="guige.title" style="display:block;width: 200px;margin:5px 5px 5px 0;" placeholder="规格名"></el-input>
        <div v-for="(item,index) in guige.details" style="display:inline-block;">
          <el-input size="mini" v-model="item.title" style="width: 130px;margin:5px 5px 5px 0;" placeholder="详细内容"></el-input>
        </div>
        <div style="display: block;">
          <el-button @click.prevent="adddetail(index)" type="warning" size="mini" style="margin: 5px 5px 5px 0">新增详细</el-button>
          <el-button @click.prevent="removeguige(guige)" type="danger" size="mini" style="margin: 5px 5px 5px 0">删除规格</el-button>
        </div>
      </div>
      <el-button @click.prevent="addguige()" type="primary" size="mini" style="margin-top: 10px;">新增规格</el-button>
    </el-form-item>

    <el-form-item label="缩略图：" prop="cover">
      <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="handleSuccess" :show-file-list="false" accept="image/*">
        <img :src="newone.cover" class="pre-img" style="width:146px;height:146px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
        <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为1:1</p>
      </el-upload>
    </el-form-item>

    <el-form-item label="相册：" prop="pictures">
      <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :file-list="newone.pictures" :multiple="true" accept="image/*">
        <img src="../../../static/images/default1.png" class="pre-img" style="width:145px;height:144px;margin-top: 1px;display: block" >
        <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</p>
      </el-upload>
    </el-form-item>

    <el-form-item label="详情：" prop="detail">
     <div class="edit_container"> 
      <quill-editor v-model="newone.detail" :options="editorOption" ref="myQuillEditor" class="editer"></quill-editor>
      <el-upload class="avatar-uploader quill-img" :action="upurl" :data="uptoken" :on-success='quillImgSuccess' style="display: none">
        <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
      </el-upload>
    </div>
  </el-form-item>


  <el-form-item style="margin-top: 20px;">
    <el-button type="primary" @click="save()" size="mini">提交</el-button>
    <el-button @click="golist()" size="mini">取 消</el-button>
  </el-form-item>
</el-form>

</el-col>


</el-row>
</template>

<script>

  import { typeGet } from '../../api/api';

  import qiniu from '../../api/qiniu';
  import { groupGet } from '../../api/api';
  import { groupPost } from '../../api/api';

  import { Message } from 'element-ui';

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  import { quillEditor } from 'vue-quill-editor' //调用编辑器



  export default {
    data() {


      return {
       uptoken:{
        token:qiniu.token,
      },
      upurl:qiniu.upurl,

      typeArr:[],
      type_id:'',

      newone:{
        delivery:'3',
        refund:'1',
        free:'1',
        title:'',
        intro:'',
        ratio:'',
        group_number:'',
        group_time:'',
        group_price:'',
        price:'',
        cover:'../static/images/default1.png',
        pictures:[],
        detail:''
      },

      categories:[],

      groupid:'',

      rules:{
        title: [
        {required: true, message: '请输入活动标题', trigger: 'blur'},
        ],
        intro: [
        {required: true, message: '请输入活动简介', trigger: 'blur'},
        ],
        ratio: [
        {required: true, message: '请输入佣金', trigger: 'blur'},
        ],
        group_number: [
        {required: true, message: '请输入拼团人数', trigger: 'blur'},
        ],
        group_time: [
        {required: true, message: '请输入时间', trigger: 'blur'},
        ],
        group_price: [
        {required: true, message: '请输入拼团价', trigger: 'blur'},
        ],
        price: [
        {required: true, message: '请输入原价', trigger: 'blur'},
        ],
      },


      editorOption:{
        placeholder: '请输入详细内容（添加图片请点击上方第一个按钮）',
        theme: 'snow',
        modules: {
          toolbar: {
           container: [
           ['image'],
           ['bold', 'italic', 'underline', 'strike'],
           ['blockquote', 'code-block'],
           [{ 'direction': 'rtl' }],
           [{ 'size': ['small', false, 'large', 'huge'] }],
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
           [{ 'color': [] }, { 'background': [] }],
           [{ 'font': [] }],
           [{ 'align': [] }],
           ['clean']
           ],
           handlers: {
            'image': function (value) {
              if (value) {
                document.querySelector('.quill-img input').click()
              } else {
                this.quill.format('image', false);
              }
            }
          }
        }
      }
    },

    allParams:null,

    date:'',
    pickerOptions:{
      disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
      }
    },
  };
},




methods:{

  getSTime(val){
    // console.log(this.date)
    this.newone.start=val[0];
    this.newone.end=val[1];
  },


  checkid(){
    var groupid=sessionStorage.getItem('groupeditid');
    this.groupid=groupid

    if(groupid){
      var allParams = '?id='+ groupid;
      groupGet(allParams).then((res) => {
      // console.log(res.data.categories)
      this.newone.ratio=res.data.ratio /100;
      this.newone.title=res.data.title;
      this.newone.intro=res.data.intro;
      this.newone.group_number=res.data.group_number;
      this.newone.group_time=res.data.group_time;
      this.newone.group_price=res.data.group_price;
      this.newone.price=res.data.price;
      this.newone.detail=res.data.detail;
      this.newone.cover=res.data.cover;
      this.newone.start=res.data.start;
      this.newone.end=res.data.end;
      this.newone.refund=res.data.refund;
      this.newone.free = res.data.free;
      this.newone.delivery=res.data.delivery;

      this.date=[res.data.start,res.data.end]

      this.type_id=res.data.type_id;
      this.categories=res.data.categories;

      var images=[];
      for(var i=0;i<res.data.pictures.length;i++){
        images.push({
          uid:i,
          url:res.data.pictures[i].href,
          response:{
            key:1
          }
        })
      }
      this.newone.pictures=images
    });
    }
  },

  gettype(){
    var allParams = '?level=1';
    typeGet(allParams).then((res) => {
      this.typeArr=res.data.data;
    });
  },

  removeguige(item) {
    var index = this.categories.indexOf(item)
    if (index !== -1) {
      this.categories.splice(index, 1)
    }
  },

  adddetail(e) {
    this.categories[e].details.push({
      title:''
    });
  },

  addguige() {
    this.categories.push({
      title: '',
      details:[{
        title:''
      }]
    });
  },



  handleSuccess(res, file) {
    this.newone.cover = qiniu.showurl+ res.key
  },

  handleRemove(file, fileList) {
    this.newone.pictures=[]
    for(var i=0;i<fileList.length;i++){
      if(fileList[i].response.key !== 1){
        this.newone.pictures.push(qiniu.showurl+ fileList[i].response.key)
      }else {
        this.newone.pictures.push(fileList[i].url)
      }
    }
  },

  handlelistSuccess(res, file,fileList){
    console.log(fileList)
    this.newone.pictures=[]
    for(var i=0;i<fileList.length;i++){
      if(fileList[i].response){
        if(fileList[i].response.key !== 1){
          this.newone.pictures.push(qiniu.showurl+ fileList[i].response.key)  
        }else {
          this.newone.pictures.push(fileList[i].url)
        }
      }
    }
  },



  quillImgSuccess(res, file) {
    console.log(res)
    let quill = this.$refs.myQuillEditor.quill
    if (res.key) {
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image', qiniu.showurl+ res.key)
      quill.setSelection(length + 1)
    } else {
      this.$message.error('图片插入失败')
    }
  },


  save(){
    if(this.type_id==''){
      Message({
        message: "请选择分类",
        type: 'error'
      });
      console.log(1)
      return
    } 
    else if(this.categories.length!==0){
      var guige =this.categories
      for(var i=0;i<guige.length;i++){
        if(guige[i].title==''){
          Message({
            message: "请填写规格名",
            type: 'error'
          });
          return
        }else{
          for(var j=0;j<guige[i].details.length;j++){
            if(guige[i].details[j].title==''){
              Message({
                message: "请填写详细内容",
                type: 'error'
              });
              return
            }
          }
        }
      }
    } 
    else if(this.newone.cover=='../static/images/default1.png'){
      Message({
        message: "请上传缩略图",
        type: 'error'
      });
      return
    } 

    else if(this.newone.pictures.length==0){
      Message({
        message: "请上传相册",
        type: 'error'
      });
      return
    }

    else if(this.newone.start=='' || this.newone.end==''){
      this.$message.error(`请选择活动时间`);
      return
    }

    else if(this.newone.detail==''){
      Message({
        message: "请输入详情",
        type: 'error'
      });
      return
    } 

    // console.log(this.newone.refund)
    this.$refs.newone.validate((valid) => {

      if (valid) {
        var allParams = {
          ratio:this.newone.ratio * 100,
          title:this.newone.title,
          intro:this.newone.intro,
          group_number:this.newone.group_number,
          group_time:this.newone.group_time,
          group_price:this.newone.group_price,
          price:this.newone.price,
          cover:this.newone.cover,
          detail:this.newone.detail,
          categories:this.categories,
          start:this.newone.start,
          end:this.newone.end,
          refund:this.newone.refund,
          free:this.newone.free,
          type_id:this.type_id,
          delivery:this.newone.delivery
        };

        var aaa =this.newone.pictures
        var images=[]
        for(var i=0; i<aaa.length; i++){
          if(typeof aaa[i] == 'object'){
            images.push(aaa[i].url)
          }else {
            images.push(aaa[i])
          }
        }

        allParams.pictures=images
        console.log(allParams)
        if(this.groupid){
          allParams.id=this.groupid
        }

        groupPost(allParams).then((res) => {
          console.log(res)
          if (res.msg == "ok") {
           this.$message({
            message: '提交成功',
            type: 'success'
          });
           this.$router.push({ path: '/Good/Goodlist' });

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

  golist(){
   this.$router.push({ path: '/Good/Goodlist' });
 },

},

components: {
  quillEditor,
},

computed: {
  editor() {
    return this.$refs.myQuillEditor.quill
  }
},


mounted: function () {
  this.gettype()
  this.checkid()
}
}
</script>



<style scope>
  .editer{
    height: 600px;
    margin-bottom: 70px;
  }
</style>