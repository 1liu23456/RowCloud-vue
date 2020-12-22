<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>播种信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="25">
        <!--间隙 -->
        <el-col :span="10">
          <!--列宽 -->
          <!-- 搜索-->
          <!-- clearable	是否可清空       clear	在点击由 clearable 属性生成的清空按钮时触发-->
          <!-- 根据输入的信息搜索相关播种信息，双向绑定播种的信息 -->
          <el-input 
          placeholder="请输入搜索序号" 
          v-model="queryInfo.query" 
          clearable 
          @clear="getRowList">
            <el-button 
            slot="append" 
            icon="el-icon-search" 
            @click="getRowList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 播种信息区域 -->
      <!-- 
        border	是否带有纵向边框 stripe	是否为斑马纹 table
      -->
      <el-table :data="rowList" border stripe>
        <el-table-column label="序号" prop="id" width="50px"></el-table-column>
        <el-table-column label="经度" prop="longitude"></el-table-column>
        <el-table-column label="纬度" prop="latitude"></el-table-column>
        <el-table-column label="播深(mm)" prop="sowdeep"></el-table-column>
        <el-table-column label="播种标记" prop="sowtag"></el-table-column>
        <el-table-column label="施肥标记" prop="ferttag"></el-table-column>
        <el-table-column label="时间" prop="date">
          <!-- 时间格式化 -->
            <template slot-scope="scope">
              {{scope.row.date | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="镇压力(N)" prop="pressure"></el-table-column>
        
      </el-table>
      <!-- 分页组件区域 -->
      <!-- 
      size-change	pageSize 改变时会触发 回调参数：每页条数
      current-change	currentPage 改变时会触发 回调参数：当前页
      current-page	当前页数，支持 
      page-sizes	每页显示个数选择器的选项设置
      page-size	每页显示条目个数，
      layout	组件布局，子组件名用逗号分隔
      total	总条目数
       -->
      <div>
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[1, 2, 3, 100]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询信息实体
      queryInfo: {
        query: "",
        pageNum: 1, //查询信息当前页
        pageSize:1, //当前页最大数
      },
      rowList: [], //存放播种信息列表
      total: 0 //总记录数
    };
  },
  created() {
    this.getRowList();
  },
  methods: {
    //获取所有播种信息列表
    async getRowList() {
      //得到后台传来的参数 命名为params
      const { data: res } = await this.$http.get("rowAllMessage", {
        params: this.queryInfo,
      });
      console.log(res);
      //这个data 就是后端定义的所有用户 res.put("data",allUser);
      this.rowList = res.data;
      //  这个data 就是后端定义的所有用户数量 res.put("userNum", userCounts);
      this.total = res.rowNum;
    },
    //size-change	pageSize 改变时会触发 回调参数：每页条数newSize
    //// 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getRowList(); // 数据发生改变重新申请数据
    },
    //current-change	currentPage 改变时会触发  回调参数：当前页
    //// 监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getRowList(); // 数据发生改变重新申请数据
    },
  }
};
</script>

<style lang="less" scoped>
/* 面包屑样式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.el-row {
  transform: translate(25%);
}
</style>
