<template>
    <div class="page bg-white app-main__container">
        <el-container>
            <!--顶部-->
            <el-header class="top-layout" height="8vh">
                <div class="top-layout-logo">
                    <!--<img src="resource/images/LOGO.png" width="50" height="50">-->
                    <p class="top-layout-title">机器人服务总线控制系统</p>
                </div>
                <div>

                </div>
            </el-header>
            <!--下部-->
            <el-container class="bottom-layout">
                <!--菜单-->
                <el-menu
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="isCollapse"
                        :unique-opened="true"
                        background-color="#FFFFFF"
                        text-color="#3F3C7E"
                        active-text-color="#3F3C7E"
                        ref="mySidemenu"
                        router
                >
                    <el-submenu v-for="item in menu" :index="item.name" :key="item.name" class="no-boarder">
                        <template slot="title">
                            <i :class="item.meta.icon"></i>&nbsp;&nbsp;
                            <span v-text="item.meta.title"></span>
                        </template>
                        <el-menu-item-group v-for="sub in item.sub" :key="sub.name">
                            <el-menu-item :index="sub.meta.index" v-text="sub.meta.title">
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                <!--内容-->
                <el-main class="bottom-layout-main">
                    <div class="bottom-layout-nav">
                        <a @click="openclose">
                            <i class="el-icon-s-operation"></i>
                        </a>
                        <div class="top-nav">
                        </div>
                    </div>
                    <div class="bottom-layout-content">
                        <keep-alive>
                            <router-view class="bottom-layout-view"></router-view>
                        </keep-alive>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import menu from '../config/menu-config'
    export default {
        name: "Basic",
        data() {
            return {
                menu: menu,
                isCollapse: false,
                screenWidth: document.body.clientWidth
            };
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    if(this.screenWidth<1200){
                        this.isCollapse = true
                    }else{
                        this.isCollapse = false
                    }
                    setTimeout(function () {
                        that.timer = false
                    }, 50)
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            openclose() {
                this.isCollapse = !this.isCollapse
            },
        },
        mounted(){
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        }
    }

</script>

<style scoped>
    .page {
        width: 100%;
        height: 100%;
        background-color: #E4EFFF;
        -webkit-user-select: none;
        user-select: none;
    }

    .top-layout {
        width: 100%;
        background-color: #3F85ED;
        display: flex;
        justify-content: space-between;
    }

    .top-layout-logo {
        display: flex;
        padding-left: 10px;
    }

    .top-layout-logo img {
        padding-top: 7px;
    }

    .top-layout-title {
        padding: 10px 10px;
        font-size: 1.3em;
        color: white;
        font-weight: bold;
    }
    .top-nav{
        width: 100%;
    }
    .bottom-layout {
        height: 92vh;
        background-color: #E4EFFF;
    }

    i {
        font-size: 20px;
        color: #3F3C7E;
    }


    .bottom-layout-main {
        width: 150px;
        padding: 0 20px 20px 20px;
    }

    .bottom-layout-nav {
        padding: 5px 0;
        height: 22px;
        display: flex;
    }

    .bottom-breadcrumb-item i {
        font-size: 1em;
        color: black;
    }

    .bottom-layout-content {
        height: 84.6vh;
        border-radius: 5px;
        background: #fff;

    }

    .bottom-layout-view {
        border-radius: 5px;
        background: #fff;
        padding: 10px 20px;
    }

    .el-menu {
        border: none;
    }

    .el-menu-item.is-active {
        color: #1BC4B1;
        font-weight: bolder;
    }

    >>> .el-menu-item-group__title {
        padding: 0 0 0 20px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }


</style>
