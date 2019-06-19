<template>
  <div>
   <div class="block">
    <span class="demonstration"><h3>优秀骑手</h3></span>
    <el-carousel height="500px">
      <el-carousel-item v-for="item in 3" :key="item">
        <img class="small" src="/static/lb1.jpg" lazy/>
      </el-carousel-item>
    </el-carousel>
    <p>
&nbsp; 
</p>
<p>
&nbsp; 
</p>
  </div>
<span class="demonstration"></span>
    <el-date-picker
      v-model="value2"
      type="monthrange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
    </el-date-picker>

    <el-table :data="tableData" style="width: 100%" :fit="true">
      <el-table-column prop="sid" label="订单编号" min-width="150"></el-table-column>
      <el-table-column prop="shopname" label="商品名" min-width="150"></el-table-column>
      <el-table-column prop="date" label="日期" min-width="150"></el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="username" label="姓名" min-width="120"></el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" min-width="120"></el-table-column>
          <el-table-column prop="city" label="市区" min-width="120"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="300" ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="total" label="合计" min-width="150"></el-table-column>
    </el-table>
      <div class="block">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
  </div>
    <br>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
  
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
    	
    	     currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
       value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      tableData: [
       
      ]
    };
  },
  methods: {
  	 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    getorderall() {
      this.$axios
        .get("/apis/getorderall")
        .then(result => {
          if (result.data.flog) {
            this.tableData = result.data.info;
            this.tableData.forEach(item => {
              item.date = moment(item.date).format("YYYY-MM-DD");
              if(item.date=='Invalid date'){
                item.date=moment().format("YYYY-MM-DD");
              }
            });
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    }
  },
  created(){
    this.getorderall();
  }
};
</script>
<style scoped>
  .small{
    width: 100%;
    height: 500px;
  }
</style>


