<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="注册查询中心配置" name="1">
                <div class="input-box">
                    <el-input placeholder="请输入内容" v-model="input1" class="input">
                        <template slot="prepend">机器人注册服务WSDL</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="input1" class="input">
                        <template slot="prepend">服务组件注册服务WSDL</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="input1" class="input">
                        <template slot="prepend">机器人状态更新服务WSDL</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="input1" class="input">
                        <template slot="prepend">机器人共性XSD链接</template>
                    </el-input>
                    <el-input placeholder="请输入内容" v-model="input1" class="input">
                        <template slot="prepend">机器人类型XSD链接</template>
                    </el-input>
                </div>
                <div class="button-box">
                    <el-button type="primary">提 交</el-button>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Configure",
        data() {
            return {
                activeName: '1',
            };
        },
    }
</script>

<style scoped>
    .input-box{
        margin-bottom: 15px;
    }
    .input{
        margin: 10px 0 25px 0;
    }
    .button-box{
        display: flex;
        justify-content: center;
    }
</style>