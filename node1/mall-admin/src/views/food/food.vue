<template>
  <div>
    <el-time-picker
      is-range
      v-model="value1"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    ></el-time-picker>
    <el-time-picker
      is-range
      arrow-control
      v-model="value2"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    ></el-time-picker>
    <p>&nbsp;</p>
    <p>&nbsp;</p>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="菜名">
        <el-input placeholder="菜名" v-model="dish"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="filter">搜索</el-button>
      </el-form-item>

      <el-button type="primary" @click="addfood">新增</el-button>
    </el-form>
    <el-table :data="filtertableData" style="width: 100%">
      <el-table-column label="菜名" width="500">
        <template slot-scope="scope">
          <div style="margin-left: 50px">
            <img :src="scope.row.url" style="height: 50px;width: 50px">
            <span style="margin-left: 10px">{{ scope.row.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上架日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="150" prop="price"></el-table-column>
      <el-table-column label="满意度" width="200" >
        <template>
          <el-rate :value="Math.random()*5"  :disabled="true" :key="Math.random()*1000"></el-rate>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="200">
        <template slot-scope="scope">
          <div>
            <el-input v-model="scope.row.stock">
              <el-button slot="prepend" @click="changstockDev(scope.row)">
                <i class="el-icon-minus"></i>
              </el-button>
              <el-button slot="append" @click="changstockAdd(scope.row)">
                <i class="el-icon-plus"></i>
              </el-button>
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改对话框 -->
    <el-dialog title="修改菜品信息" :visible="dialogFormVisible" size="tiny" :show-close="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜名">
          <template slot-scope>
            <img :src="form.url" style="height: 50px;width: 50px">
            <el-input v-model="form.name"></el-input>
          </template>
        </el-form-item>

        <el-form-item label="生产日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.addtime"
            style="width: 100%;"
            format="yyyy 年 MM 月 dd 日"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="库存">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSave">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <br>
    <el-dialog title="添加菜品信息" :visible="adddialogFormVisible" size="tiny" :show-close="false">
      <el-form ref="form" :model="addform" label-width="80px">
        <el-form-item label="菜名">
          <template slot-scope>
            <!-- <img :src="form.url" style="height: 50px;width: 50px"> -->
            <el-input v-model="addform.name"></el-input>
          </template>
        </el-form-item>

        <el-form-item label="生产日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addform.addtime"
            style="width: 100%;"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="库存">
          <el-input v-model="addform.stock"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="addform.price"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addfooddata">保存</el-button>
          <el-button @click="adddialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="block">
      <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
      </el-pagination>-->
    </div>
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="changpage"></el-pagination>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      filtertableData: [],
      form: {
        name: "",
        price: "",
        addtime: "",
        stock: "",
        url: ""
      },
      addform: {
        name: "",
        price: "",
        addtime: "",
        stock: "",
        url: "static/披萨.jpg"
      },
      dialogFormVisible: false,
      adddialogFormVisible: false,
      dish: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$axios
        .get("/apis/delfoodinfobyid", { params: { id: row.id } })
        .then(result => {
          if (result.data.flog) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.filtertableData.splice(index, 1);
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    },
    handleSave() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.$axios
            .post("/apis/updatafoodbyid", {
              data: {
                name: this.form.name,
                price: this.form.price,
                addtime: moment(this.form.addtime).format(
                  "YYYY-MM-DD hh:mm:ss"
                ),
                stock: this.form.stock,
                url: this.form.url,
                id: this.form.id
              }
            })
            .then(res => {
              if (res.data.flog) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  center: true
                });
                this.getfootall();
              } else {
                this.$message.error("操作失败");
              }
              this.editLoading = false;
              this.dialogFormVisible = false;
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    getfootall() {
      this.$axios
        .get("/apis/pagefoodinfobyid?id=1")
        .then(result => {
          if (result.data.flog) {
            this.tableData = result.data.info;
            this.tableData.forEach(item => {
              item.addtime = moment(item.addtime).format("YYYY-MM-DD");
            });
            this.filtertableData = this.tableData;
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    },
    changstockAdd(event) {
      event.stock++;
      this.stockSave(event.stock, event.id);
    },
    changstockDev(event) {
      if (event.stock - 1 < 0) {
        return;
      }
      event.stock--;
      this.stockSave(event.stock, event.id);
    },
    stockSave(num, id) {
      this.$axios
        .post("/apis/foodstocsave", {
          data: {
            num,
            id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.flog) {
            this.$message({
              message: "操作成功",
              type: "success",
              center: true
            });
            this.getfootall();
          } else {
            this.$message.error("操作失败");
          }
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(err => {});
    },
    filter() {
      this.filtertableData = this.tableData.filter(item => {
        return item.name == this.dish;
      });
    },
    addfood() {
      this.adddialogFormVisible = true;
    },
    addfooddata() {
      this.$confirm("确认保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.$axios
            .post("/apis/addfoodinfo", { data: this.addform })
            .then(res => {
              if (res.data.flog) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                  center: true
                });
                this.getfootall();
              } else {
                this.$message.error("保存失败");
              }
              this.$refs["form"].resetFields();
              this.getfootall();
              this.adddialogFormVisible = false;
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    changpage(e) {
      //发送ajax
      this.$axios
        .get("/apis/pagefoodinfobyid?id=" + e)
        .then(result => {
          if (result.data.flog) {
            this.tableData = result.data.info;
            this.tableData.forEach(item => {
              item.addtime = moment(item.addtime).format("YYYY-MM-DD");
            });
            this.filtertableData = this.tableData;
          } else {
            this.$message.error("数据加载完毕");
          }
        })
        .catch(err => {
          this.$message.error("未知错误");
        });
    }
  },
  created() {
    this.getfootall();
  }
};
</script>