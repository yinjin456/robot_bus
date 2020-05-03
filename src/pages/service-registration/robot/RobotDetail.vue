<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="组件详情"></el-page-header>
        </div>
        <div class="content">
            <div class="content-id">
                机器人编号 : {{robotCommon.robotId}}
            </div>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotname">
                        <template slot="prepend">机器人名称</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotTypeId">
                        <template slot="prepend">机器人类型</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotDeviceId">
                        <template slot="prepend">出厂id</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotModel">
                        <template slot="prepend">出厂型号</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotVendor">
                        <template slot="prepend">生产厂家</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvTempMax">
                        <template slot="prepend">工作环境最高温度</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvTempMin">
                        <template slot="prepend">工作环境最低温度</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvHumiMax">
                        <template slot="prepend">工作环境最大湿度</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvHumiMin">
                        <template slot="prepend">工作环境最小湿度</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="robotCommon.robotPower">
                        <template slot="prepend">工作额定功率</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="button-box">
                <el-button type="warning" class="ebutton" @click="updateRobotCommon">修改</el-button>
                <el-button type="danger" class="ebutton del" @click="deleteRobotCommon">删除</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RobotDetail",
        data () {
            return {
                robotCommon:null
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getRobotCommon(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getRobotCommon', {
                        params: {
                            robotId:that.$route.query.robotId
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        that.robotCommon = response.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateCommon(){
                var that = this;
                console.log(that.robotCommon.serviceId)
                this.axios
                    .post(this.Global.baseUrl + '/updateCommon', {
                        params: {
                            robotId:that.robotCommon.robotId,
                            robotname:that.robotCommon.robotname,
                            robotTypeId:that.robotCommon.robotTypeId,
                            onoff:that.robotCommon.onoff,
                            robotDeviceId:that.robotCommon.robotDeviceId,
                            robotModel:that.robotCommon.robotModel,
                            robotVendor:that.robotCommon.robotVendor,
                            robotWorkEnvTempMax:that.robotCommon.robotWorkEnvTempMax,
                            robotWorkEnvTempMin:that.robotCommon.robotWorkEnvTempMin,
                            robotWorkEnvHumiMax:that.robotCommon.robotWorkEnvHumiMax,
                            robotWorkEnvHumiMin:that.robotCommon.robotWorkEnvHumiMin,
                            robotPower:that.robotCommon.robotPower,
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        if(response.data.result==1){
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        }else{
                            that.$message.error('修改失败：' + response.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            deleteRobotCommon(){
                this.$confirm('确认要删除该服务组件吗', '删除确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        activated(){
            this.getRobotCommon()
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100%;
    }
    .title{
        padding: 8px 0;
        font-weight: bolder;
        font-size: 1.4em;
        border-bottom: solid 2px #3F85ED;
    }
    .content{
        padding: 15px 0;
        height: 70vh;
    }
    .content-id{
        border-radius: 4px;
        margin: 5px 0 25px 0;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .grid-content {
        border-radius: 4px;
        height: 45px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .button-box{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
    }
    .ebutton{
        width: 130px;
    }
</style>