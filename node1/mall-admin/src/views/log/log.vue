<template>
  <div style="margin-left:50px;">
    <div class="block">
      <span class="demonstration">日期筛选：</span>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="change"
      ></el-date-picker>
    </div>

    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>
    
    <el-timeline style="padding:10px" :reverse="reverse">
      <el-timeline-item
        v-for="(log, index) in logDatafilter"
        :key="index"
        :timestamp="log.operationtime"
        placement="top"
        style="display: block; width: 700px;"
      >
        <el-card>
          <h3 style="margin-bottom:10px">{{log.operation}}</h3>
          <p>操作人员：{{log.adminname}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
     <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      pickerOptions: "111",
      logData: [],
      logDatafilter:[],
      reverse: true,
      value: ""
    };
  },
  methods: {
    getlogall() {
      this.$axios
        .get("/apis/getoperationall")
        .then(result => {
          if (result.data.flog) {
            this.logData = result.data.info;
            this.logData.forEach(item => {
              item.operationtime = moment(item.operationtime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
            });
            this.logDatafilter=this.logData;
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    },
    change(event){
      let kstime=new Date(event[0]).getTime();
      let jstime=new Date(event[1]).getTime();
      this.logDatafilter=this.logData.filter((item)=>{
          let time=new Date(item.operationtime).getTime();
          if(time>=kstime&&time<=jstime){
              return true;
          }else{
            return false;
          }
      })
    }
  },
  created() {
    this.getlogall();
  }
};
</script>