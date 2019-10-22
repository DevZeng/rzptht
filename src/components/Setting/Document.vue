<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">

   <el-form :inline="true">
    <el-form-item>
      <el-button type="primary" size="mini" @click="newone">新增文档</el-button>
    </el-form-item>
  </el-form>


  <el-table :data="list" border stripe style="width:1121px" size="small">
    <el-table-column prop="id" label="编号" width="120" align="center">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="500" align="center">
    </el-table-column>
    <el-table-column label="操作" width="500" align="center">
     <template slot-scope="scope">
      <el-button type="primary" size="mini" @click="handleSee(scope.$index, scope.row)">预览</el-button>
      <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
    </template>
  </el-table-column>

</el-table>

<el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
</el-pagination>
</el-col>


<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="800" center style="min-width: 800px">
    <el-form ref="nedoc" :model="nedoc" label-width="120px" :rules="rules" status-icon>

      <el-form-item label="标题:" prop="title">
        <el-input v-model="nedoc.title" style="max-width: 300px;" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="详细内容:" prop="detail" style="margin-bottom: 40px">
        <div class="edit_container">
          <quill-editor v-model="nedoc.detail" style="height:450px;" ref="myQuillEditor" :options="editorOption" class="editer" placeholder= '请输入详细内容'></quill-editor>
          <el-upload class="avatar-uploader quill-img" :action="upurl" :data="uptoken" :on-success='quillImgSuccess' style="display: none">
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item style="margin-left: calc(50% - 180px);">
        <el-button size="small" type="primary" @click="save()">提 交</el-button>
        <el-button size="small" @click="dialogNewVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</el-col>




<el-col>
  <el-dialog title="删除不可恢复，是否确定删除？" :visible.sync="dialogDelVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitdel()">确 定</el-button>
      <el-button @click="dialogDelVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>


<el-col>
  <el-dialog title="文档预览" :visible.sync="dialogSeeVisible" @open="opendialog" label-position='top' :fullscreen="true">
    <el-form label-position="top" label-width="80px" :model="currow">
      <el-form-item label="文档标题" class="fw6">
        <span class="fw4">{{currow.title}}</span>
      </el-form-item>
      <el-form-item label="详细内容" class="fw6">
        <template slot-scope="scope">
          <div class="fw4" id="detail">{{currow.detail}}</div>
        </template>
      </el-form-item>
    </el-form>
  </el-dialog>
</el-col>


</el-row>
</template>

<style>
.fw4{
  font-weight: 400;
}
.fw6{
  font-weight: 600;
  /*font-size: 30px;*/
}
</style>

<script>

  import qiniu from '../../api/qiniu';

  import {documentsGet} from '../../api/api';
  // import {documentGet} from '../../api/api';
  import {documentPost} from '../../api/api';
  // import {documentDel} from '../../api/api';


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


        checkper1:false,
        checkper2:false,


        currentPage: 1,
        list:[],
        count:0,
        limit:10,
        dialogNewVisible:false,
        dialogDelVisible:false,
        dialogSeeVisible:false,
        editId:'',
        delId:'',
        diatitle:'新增文档',
        nedoc:{
          title:'',
          detail:''
        },
        rules: {
          title: [{required: true, trigger: 'blur',message: '请输入文档标题'}],
          detail: [{required: true, trigger: 'blur',message: '请输入详细内容'}]
        },
        currow:'',

        editorOption:{
          placeholder: '请输入详细内容（添加图片请点击上方第一个按钮）',
          theme: 'snow',
          modules: {
            toolbar: {
              container: [
              ['image'],
              ['bold', 'italic', 'underline', 'strike','blockquote', 'code-block'],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              // ['clean']
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
      };
    },


    components: {
      quillEditor,
    },

    methods:{

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

      getlist(){
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        documentsGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count
        });
      },

      checkPer(){
        var per = sessionStorage.getItem('permissions');

        if(per.indexOf('documentAdd')>-1){
          this.checkper1=true;
        }

        var per = sessionStorage.getItem('permissions');

        if(per.indexOf('documentDel')>-1){
          this.checkper2=true;
        }
      },

      newone(){
       this.putorup='up';
       this.diatitle='新增文档',
       this.dialogNewVisible=true,
       this.nedoc={
         title:'',
         detail:''
       }
     },

     handleSee(index,row) {
      this.currow=row
      this.dialogSeeVisible = true;
    },

    opendialog(){
      setTimeout(() => {
        this.setdetail();
      }, 100);
    },

    setdetail(){
      var seeBox = document.getElementById("detail");
      seeBox.innerHTML=this.currow.detail;
    },


    handleEdit(index, row){
      this.diatitle='编辑文档';
      this.dialogNewVisible = true;
      this.putorup='put';
      this.editId = row.id;
      this.nedoc={
        title:row.title,
        detail:row.detail
      }
    },

    save(){
      console.log(this.nedoc.detail)

      if(this.nedoc.title==''){
        this.$message({
          message: '请输入标题',
          type: 'error'
        });
      }else if(this.nedoc.detail==''){
        this.$message({
          message: '请输入详细内容',
          type: 'error'
        });
      }
      else{

        // this.$refs.nedoc.validate((valid) => {
        //   if (valid) {
          if( this.putorup=='put'){
            var allParams = {
              title:this.nedoc.title,
              id:this.editId,
              detail:this.nedoc.detail,
              code:'helpdoc'
            };
          }else{
            var allParams = {
              title:this.nedoc.title,
              detail:this.nedoc.detail,
              code:'helpdoc'
            };
          }
          documentPost(allParams).then((res) => {
            if (res.msg === "ok") {
             this.$message({
              message: '提交成功',
              type: 'success'
            });
             this.getlist();
             this.dialogNewVisible=false
           } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
        //   }else{
        //     return false;
        //   }
        // })
      }
    },

    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.delId = row.id;
    },

    submitdel(){
      this.dialogDelVisible = false;
      var allParams='?id='+this.delId
      documentDel(allParams).then((res) => {
        // console.log(res)
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


    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },


    handleSizeChange(val){
      this.limit = val;
      this.getlist();
    },
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },

  mounted: function () {
    this.getlist();
    // this.checkPer();
  }
}
</script>
