<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增店铺</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col>
      <el-form ref="newshop" :model="newshop" label-width="120px" :rules="rules" style="width: 1000px;" status-icon>

        <el-form-item label="商店地区：" prop="cityone">
          <el-select v-model="cityone" placeholder="请选择市" filterable @change="getcitytwo">
            <el-option v-for="item in levelarr1" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="newshop.city_id" placeholder="请选择区" filterable v-show="cityone">
            <el-option v-for="item in levelarr2" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="名称:" prop="name">
          <el-input v-model="newshop.name" placeholder="请输入店铺名称"></el-input>
        </el-form-item>

<!--         <el-form-item label="标题:" prop="titel">
          <el-input v-model="newshop.titel" placeholder="请输入店铺标题"></el-input>
        </el-form-item> -->

        <el-form-item label="电话:" prop="phone">
          <el-input v-model="newshop.phone" placeholder="请输入电话"></el-input>
        </el-form-item>

        <el-form-item label="地址:" prop="address">
          <el-input v-model="newshop.address" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item label="佣金:" prop="ratio">
          <el-input v-model="newshop.ratio" placeholder="请输入佣金比例"><template slot="append">%</template></el-input>
        </el-form-item>

        <el-form-item label="logo：" prop="logo">
          <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="handleSuccess" :show-file-list="false" accept="image/*">
            <img :src="newshop.logo" class="pre-img" style="width:146px;height:146px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
            <div slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为1:1</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="海报：" prop="poster">
          <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="handleposterSuccess" :show-file-list="false" accept="image/*">
            <img :src="newshop.poster" class="pre-img" style="width:160px;height:90px;border:1px dashed #ccc;border-radius:6px;display: block;margin-top: 1px;">
            <div slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="优惠券：" >
          <el-table :data="coupons" style="min-width:941px;margin-bottom: 10px;" border size="mini" @cell-click="cellclick">
            <el-table-column type="index" label="序号" min-width="60" align="center">
            </el-table-column>

            <el-table-column prop="title" label="标题" min-width="120" align="center">
              <template slot-scope="scope">
                <el-input placeholder="请输入标题" v-model="scope.row.title" @change="quantitle"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="图片" min-width="120" align="center" prop="cover">
             <template slot-scope="scope">
              <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="quanSuccess" :show-file-list="false" accept="image/*">
                <img :src="scope.row.pic" class="pre-img" style="width:96px;height:54px;border:1px dashed #ccc;border-radius:5px;display: block;margin: auto 2px;;" @click="quanpic(scope.$index)">
              </el-upload>
            </template>
          </el-table-column>

          <el-table-column prop="" label="数量" width="150" align="center">
            <template slot-scope="scope">
              <el-input placeholder="请输入数量" v-model="scope.row.number" min="1" type="number" @change="quannumber"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="" label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
              <el-button type="danger" size="small" v-show="scope.$index==0 ? false : true" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="轮播图：" prop="images">
        <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :file-list="newshop.images" :multiple="true" accept="image/*">
          <img src="../../../static/images/default1.png" class="pre-img" style="width:145px;height:144px;margin-top: 1px;display: block" >
          <div slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="商家规则：" prop="rule">
       <div class="edit_container"> 
        <quill-editor v-model="newshop.rule" :options="editorOption" ref="myQuillEditor" class="editer"></quill-editor>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="small" @click="save()">保 存</el-button>
    </el-form-item>
  </el-form>
</el-col>


</el-row>
</template>


<script>
  import qiniu from '../../api/qiniu';

  import { shopPost } from '../../api/api';
  import { shoponeGet } from '../../api/api';
  import { shopaddGet } from '../../api/api';

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  import { quillEditor } from 'vue-quill-editor' //调用编辑器

  export default {
    data() {
      return {
        newshop:{
          logo:'../static/images/default1.png',
          poster:'../static/images/default.png',
          name:'',
          phone:'',
          address:'',
          images:[],
          rule:'',
          ratio:'',
          city_id:'',
          // titel:''
        },

        cityone:'',

        zuobiao:'',

        levelarr1:[],
        levelarr2:[],

        rules: {
          name: [{required: true, trigger: 'blur',message: '请输入店铺名称'}],
          // titel: [{required: true, trigger: 'blur',message: '请输入店铺标题'}],
          phone: [{required: true, trigger: 'blur',message: '请输入电话'}],
          address: [{required: true, trigger: 'blur',message: '请输入地址'}],
          rule: [{required: true, trigger: 'blur',message: '请输入商家规则'}],
          ratio: [{required: true, trigger: 'blur',message: '请输入分佣比例'}],
        },

        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,

        editorOption:{
          placeholder: '请输入商家规则',
          theme: 'snow',
          modules: {
            toolbar: {
             container: [
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
           }
         }
       },


       coupons:[{
        index:0,
        title:'',
        pic:'../static/images/default.png',
        number:''
      }],
      quanindex:null,
      quanpicindex:null,
      delcoupons:[]
    };
  },

  components: {
    quillEditor,
  },

  methods:{

    handleposterSuccess(res, file) {
      this.newshop.poster = qiniu.showurl+ res.key
    },

    cellclick(row, column, cell, event){
      this.quanindex=row.index
    },

    quantitle(res){
      this.coupons[this.quanindex].title=res
    },

    quanpic(e){
      this.quanpicindex=e
    },

    quanSuccess(res, file) {
      this.coupons[this.quanpicindex].pic=qiniu.showurl+ res.key
      // this.aaa[this.ggcoverindex].cover=qiniu.showurl+ res.key
    },

    quannumber(res){
      this.coupons[this.quanindex].number=res
    },

    handleAdd(index, row){
      this.coupons.push({
        index:index+1,
        title:null,
        number:null,
        pic:'../static/images/default1.png',

      })
    },

    handleDelete(index, row){
      if(row.id){
       this.delcoupons.push(row.id)
     }
     this.coupons.splice(index,1)
   },

   checkid(){
    var shopid=sessionStorage.getItem('shopeditid');
    this.shopid=shopid

    if(shopid){

      var allParams = '?id='+ shopid;
      shoponeGet(allParams).then((res) => {
        this.newshop.name=res.data.name;
        // this.newshop.title=res.data.title;
        this.newshop.phone=res.data.phone;
        this.newshop.address=res.data.address;
        this.newshop.rule=res.data.rule;
        this.newshop.logo=res.data.logo;
        this.newshop.ratio=res.data.ratio;
        this.newshop.city_id=res.data.city_id;
        this.newshop.poster=res.data.poster;
        
        if(res.data.coupon.length!==0){
          this.coupons=res.data.coupon
        }


        var images=[];
        for(var i=0;i<res.data.images.length;i++){
          images.push({
            uid:i,
            url:res.data.images[i].url,
            response:{
              key:1
            }
          })
        }
        this.newshop.images=images
      });
    }
  },

  handleSuccess(res, file) {
    this.newshop.logo = qiniu.showurl+ res.key
  },

  handlelistSuccess(res, file,fileList){
    console.log(fileList)
    this.newshop.images=[]
    for(var i=0;i<fileList.length;i++){
      if(fileList[i].response){
        if(fileList[i].response.key !== 1){
          this.newshop.images.push(qiniu.showurl+ fileList[i].response.key)  
        }else {
          this.newshop.images.push(fileList[i].url)
        }
      }
    }
  },

  handleRemove(file, fileList) {
    this.newshop.images=[]
    for(var i=0;i<fileList.length;i++){
      if(fileList[i].response.key !== 1){
        this.newshop.images.push(qiniu.showurl+ fileList[i].response.key)
      }else {
        this.newshop.images.push(fileList[i].url)
      }
    }
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


  save(){
    if(!this.newshop.city_id){
     this.$message({
      message: '请选择商店地区',
      type: 'error'
    });
   }else{
    this.$refs.newshop.validate((valid) => {
      if (valid) {
        console.log(this.newshop)

        if(this.shopid){
          this.newshop.id=this.shopid
          this.newshop.delcoupons=this.delcoupons
        }

        var aaa =this.newshop.images
        this.newshop.images=[]
        for(var i=0; i<aaa.length; i++){
          if(typeof aaa[i] == 'object'){
            this.newshop.images.push(aaa[i].url)
          }else {
            this.newshop.images.push(aaa[i])
          }
        }

        this.newshop.coupons=this.coupons

        shopPost(this.newshop).then((res) => {
          if (res.msg === "ok") {
           this.$message({
            message: '提交成功',
            type: 'success'
          });
           this.$router.push({ path: '/Shop/Shoplist' });

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
  }
}

},

mounted: function () {
  this.checkid()
  this.getadd()
}
}
</script>


<style scope>
.upload__tip{
  font-size: 12px;
  color: #606266;
}

.editer{
  height: 350px;
  margin-bottom: 90px;
}
</style>
