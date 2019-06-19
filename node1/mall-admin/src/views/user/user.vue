<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-select v-model="formInline.region" placeholder="地址">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="filtertableData" border style="width: 100%">
      <el-table-column prop="username" label="姓名" width="170"></el-table-column>
      <el-table-column prop="province" label="省份" width="170"></el-table-column>
      <el-table-column prop="city" label="市区" width="170"></el-table-column>
      <el-table-column prop="address" label="地址" width="400"></el-table-column>
      <el-table-column prop="zipcode" label="邮编" width="300"></el-table-column>
      <el-table-column label="操作" width="428">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <el-dialog title="修改用户信息" :visible="dialogFormVisible" size="tiny" :show-close="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item label="市区">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.zipcode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      <div class="block">
    <el-pagination
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    onSubmit() {
      if (this.formInline.user) {
        if (this.formInline.region) {
          this.filtertableData = this.tableData.filter(item => {
            if (
              item.username == this.formInline.user &&
              this.formInline.region == item.province
            ) {
              return true;
            }
          });
          return;
        } else {
          this.filtertableData = this.tableData.filter(item => {
            if (item.username == this.formInline.user) {
              return true;
            }
          });
          return;
        }
      } else {
        if (this.formInline.region) {
          this.filtertableData = this.tableData.filter(item => {
            if ( this.formInline.region == item.province) {
              return true;
            }
          });
          return;
        } else {
          return;
        }
      }
    },
    getuserall() {
      this.$axios
        .get("/apis/getuserall")
        .then(result => {
          if (result.data.flog) {
            this.tableData = result.data.info;
            this.filtertableData = this.tableData;
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
    },
    handleSave() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.$axios
            .post("/apis/updatauserbyid", { data: this.form })
            .then(res => {
              if (res.data.flog) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  center: true
                });
                this.getuserall();

              } else {
                this.$message.error("操作失败");
              }
              // this.editLoading = false;
              this.dialogFormVisible = false;
            })
            .catch(err => {});
        })
        .catch(() => {});
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      filtertableData: [],
      form: "",
              currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    };
  },
  created() {
    this.getuserall();
  }
};
</script>