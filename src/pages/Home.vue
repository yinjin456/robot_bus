<template>
    <div class="main bg-white app-main__container">
<!--        <img src="resource/images/yell.gif" height="450" />-->
        <div class="tip">欢迎使用机器人服务总线管理系统!</div>
        <!-- <button @click="get()">time:{{time}}</button> -->
        <div class="time">{{date}}</div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data: function() {
            return {
                date: new Date()
            };
        },
        created() {},
        mounted() {
            let _this = this;
            this.timer = setInterval(function() {
                _this.date = new Date().toLocaleString();
            });
        },
        beforeDestroy: function() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .time {
        padding: 20px;
        font-size: 25px;
    }
    .main {
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .tip {
        font-weight: bolder;
        font-size: 2em;
    }
</style>