<template>
  <div>
    <el-row class="warp" style="padding:20px 0 0 20px;width:90%;">
      <el-col>
        <el-row :gutter="20" class="dspf">
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-1" @click="gogood">
              <i class="el-icon-goods grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.productCount}}</div>
                <div class="counttext">商品数量</div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-5" @click="gogood">
              <i class="el-icon-loading grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.reviewProductCount}}</div>
                <div class="counttext">待审核商品</div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-2" @click="goorder">
              <i class="el-icon-tickets grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.todayOrderCount}}</div>
                <div class="counttext">今日订单</div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-3" @click="goorder">
              <i class="el-icon-sold-out grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.todaySalesCount}}</div>
                <div class="counttext">今日销量</div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-4" @click="gouser">
              <i class="el-icon-upload2 grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.todayUserCount}}</div>
                <div class="counttext">今日新增用户</div>
              </div>
            </div>
          </el-card>

          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-6" @click="gouser">
              <i class="el-icon-view grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.loginCount}}</div>
                <div class="counttext">今日浏览用户</div>
              </div>
            </div>
          </el-card>
        </el-row>

        <el-row :gutter="20" class="dspf">
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-7" @click="gotxls">
              <i class="el-icon-date grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.storeAmount}}</div>
                <div class="counttext">总营业额</div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-7" @click="gotxls">
              <i class="el-icon-star-on grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.amount}}</div>
                <div class="counttext">余额</div>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" :body-style="{padding: '0px'}" class="mb20">
            <div class="grid-content grid-con-7" @click="gotxls">
              <i class="el-icon-success grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{countdata.withdrawAmount}}</div>
                <div class="counttext">已提现</div>
              </div>
            </div>
          </el-card>

        </el-row>
      </el-col>
    </el-row>
  </div>
</template>



<script>

  import { countdataGet } from '../../api/api';

  export default {
    data() {
      return {
        countdata:{
          productCount:0,
          reviewProductCount:0,
          todayOrderCount:0,
          todaySalesCount:0,
          todayUserCount:0,
          withdrawAmount:0,
          amount:0,
          storeAmount:0,
          loginCount:0
        }
      }
    },
    methods: {
      getdata(){
        var allParams = '';
        countdataGet(allParams).then((res) => {
          this.countdata=res.data
        });
      },

      gogood(){
        this.$router.push('/Good/Goodlist');
      },

      goorder(){
        this.$router.push('/Order/Orderlist');
      },

      gouser(){
        this.$router.push('/User/Userlist');
      },

      gotxls(){
        // this.$router.push('/Shop/Withdrawls');
      }
    },

    mounted: function () {
      this.getdata()
    }
  }
</script>

<style scoped>
.dspf{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mb20{
  margin-bottom: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  margin-bottom: 20px;
}
.el-card{  
  min-width: 300px;  
  margin-right: 20px;
  border-radius: 50px;
  border: 1px solid #ccc;
  border-left: 0;
}
.grid-content {
  display: flex;
  align-items: center;
  min-width: 270px;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #000;
  min-width: 190px;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  border-radius: 50%
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
  background: rgb(45, 140, 140);
}
.grid-con-2 .grid-num {
  color: rgb(45, 140, 140);
}
.grid-con-3 .grid-con-icon {
  background: rgb(100, 213, 214);
}
.grid-con-3 .grid-num {
  color: rgb(100, 213, 214);
}
.grid-con-4 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-4 .grid-num {
  color: rgb(100, 213, 114);
}
.grid-con-5 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-5 .grid-num {
  color: rgb(242, 94, 67);
}
.grid-con-6 .grid-con-icon {
  background: rgb(0,191,255);
}
.grid-con-6 .grid-num {
  color: rgb(0,191,255);
}

.grid-con-7 .grid-con-icon {
  background: rgb(255,165,50);
}
.grid-con-7 .grid-num {
  color: rgb(255,165,50);
}

.counttext{
  font-size: 16px;
}
</style>