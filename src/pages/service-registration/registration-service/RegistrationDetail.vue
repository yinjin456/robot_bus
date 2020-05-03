<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="组件详情"></el-page-header>
        </div>
        <div class="content">
            <div class="input-box">
                <el-input placeholder="请输入内容" v-model="registerCenter.robotregisterservicewsdl" class="input">
                    <template slot="prepend">机器人注册服务WSDL</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="registerCenter.servicecomponentregisterwsdl" class="input">
                    <template slot="prepend">服务组件注册服务WSDL</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="registerCenter.commonxsdlink" class="input">
                    <template slot="prepend">机器人状态更新服务WSDL</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="registerCenter.extendxsdlink" class="input">
                    <template slot="prepend">机器人共性XSD链接</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="registerCenter.robotupdatestateservicewsdl" class="input">
                    <template slot="prepend">机器人类型XSD链接</template>
                </el-input>
            </div>
            <div class="button-box">
                <el-button type="warning" class="ebutton" @click="updateRegisterCenter">修改</el-button>
                <el-button type="danger" class="ebutton del" @click="deleteRegisterCenter">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Configure",
        data() {
            return {
                registerCenter:{}
            };
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getRegisterCenter(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getRegisterCenter', {
                        params: {
                            serviceCenter_id:that.$route.query.serviceCenter_id
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        that.registerCenter = response.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateRegisterCenter(){
                var that = this;
                this.axios
                    .post(this.Global.baseUrl + '/updateRegisterCenter', {
                        params: {
                            serviceCenter_id:that.registerCenter.servicecenterId,
                            robotRegisterServiceWSDL:that.registerCenter.robotRegisterServiceWSDL,
                            serviceComponentRegisterWSDL:that.registerCenter.serviceComponentRegisterWSDL,
                            commonXSDlink:that.registerCenter.commonXSDlink,
                            extendXSDLink:that.registerCenter.extendXSDLink,
                            robotUpdateStateServiceWSDL:that.registerCenter.robotUpdateStateServiceWSDL,
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
            deleteRegisterCenter(){
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
            this.getRegisterCenter()
        }
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
    .button-box{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
    }
    .ebutton{
        width: 130px;
    }
</style>