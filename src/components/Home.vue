<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.jpg" class="logo_img" alt="" />
      </div>
      <span>播种云平台</span>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 伸缩按钮 -->
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse="isCollapse"
          unique-opened
          :collapse-transition="false"
          :router="true" 
          :default-active="activePath"
        >
        <!-- 
            default-active 当前激活菜单的 index
         -->
        <!--:router="true"  是否使用 vue-router 的模式，
        启用该模式会在激活导航时以 index 作为 path 进行路由跳转 
        可以根据此路径创建对应的 组件在admin里，点击二级按钮跳转哪，就写对应的组件
        -->
          <!-- 一级菜单 -->
          <!-- :index="item.id + ''" 代表着此菜单的唯一标识，注意加上空字符串转换为字符串,
            这样才不会互相影响，path本身就是字符串
              -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <!-- 根据id动态绑定菜单图标 -->
              <!-- 不知道为什么，item.id 不能用,且控制台也没有id 
              才发现，后端没有写id的getter方法 -->
              <i :class="iconsObject[item.id]"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="it.path"
              v-for="it in item.sList"
              :key="it.id"
              @click="saveNavState(it.path + '')"
            >
              <template slot="title">
                <!-- 根据id动态绑定菜单图标 -->
                <i :class="iconsObject[it.id]"></i>
                <span>{{ it.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主页区域 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view>
          </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //保存菜单列表 从数据库获取，修改下即可
      menuList: [],
      //
      isCollapse: false,
      //对应菜单选项的图标
      iconsObject: {
        "100": "iconfont iconguanliyuan",
        "200": "iconfont iconsport",
        "101": "iconfont icondenglu",
        "102": "iconfont iconmima",
        "103": "iconfont iconsport",
        "104": "iconfont iconshangpin",
        "201": "iconfont iconshu",
        "202": "iconfont iconkaluli",
        "203": "iconfont iconshiwu",
        "204": "iconfont icondenglu",
      },
      activePath: '/welcome' //默认激活路径
    };
  },
  created() {
    //查询menuList 应当在创建的时候加载
    this.getMenuList();
    //取出session里的path，动态修改activePath ，刷新之后还是那个页面
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear(); //从 sessionStorage 删除所有保存的数据 将登录的信息清除
      this.$router.push("/login"); //跳转到登录页面
    },
    //获取导航菜单方法 使用异步
    async getMenuList() {
      //获取请求menus路径，获取数据库中的数据
      //data是获取到的所有信息，res才是后端返回的数据
      /**
       * 后台获取数据步骤：
       * 1.设计数据表对应的数据
       * 2.编写实体类
       * 3.编写接口方法
       * 4.编写映射文件
       * 5.编写控制层
       * 利用接口方法操作映射文件从数据库获取数据
       *
       * 前台从后台获取数据只需要请求这个控制层路径得到他的返回结果解构即可
       */
      const { data: res } = await this.$http.get("menus");
      // console.log(res);
      if (res.flag !== 200) return this.$message.error("获取列表失败！"); //访问失败
      this.menuList = res.menus;
    },
    //折叠菜单
    toggleCollapase() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存路径，刷新之后依然在本页面，并且依然高亮
    saveNavState(activePath) {
        window.sessionStorage.setItem('activePath',activePath);// 存放点击的二级菜单
        this.activePath = activePath;// 给点击的菜单添加高亮
    }
  },
};
</script>

<style lang="less" scope>
.home-container {
  height: 100%;
}
//头样式
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; // 左右贴边
  padding-left: 0%; // 左边界
  align-items: center; // 水平
  color: #fff;
  font-size: 20px;
  > div {
    //左侧div加布局
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.logo_img {
  width: 55px;
  height: 55px;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none; // 对其右边框
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer; // 显示鼠标指针为：小手
}
</style>
