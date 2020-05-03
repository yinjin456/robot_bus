<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="组件详情"></el-page-header>
        </div>
        <div class="content">
            <div class="content-id">
                服务编号 : {{serviceComponent.serviceId}}
            </div>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.serviceType">
                        <template slot="prepend">服务类型</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.bindingAddress">
                        <template slot="prepend">绑定地址</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.serviceName">
                        <template slot="prepend">服务名称</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.portNumber">
                        <template slot="prepend">端口号</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.targetNamespace">
                        <template slot="prepend">命名空间</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.wsdlUrl">
                        <template slot="prepend">wsdl地址</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.majorVersion">
                        <template slot="prepend">主版本号</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.minorVersion">
                        <template slot="prepend">最小版本号</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.routingFrom">
                        <template slot="prepend">路由From端点</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="serviceComponent.routingTo">
                        <template slot="prepend">路由To端点</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="button-box">
                <el-button type="warning" class="ebutton" @click="updateServiceComponent">修改</el-button>
                <el-button type="danger" class="ebutton del" @click="deleteServiceComponent">删除</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ComponentDetail",
        data () {
            return {
                serviceComponent:null
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getServiceComponent(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getServiceComponent', {
                        params: {
                            serviceId:that.$route.query.serviceId
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        that.serviceComponent = response.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateServiceComponent(){
                var that = this;
                console.log(that.serviceComponent.serviceId)
                this.axios
                    .post(this.Global.baseUrl + '/updateServiceComponent', {
                        params: {
                            serviceId:that.serviceComponent.serviceId,
                            routingTo:that.serviceComponent.routingTo,
                            routingFrom:that.serviceComponent.routingFrom,
                            minorVersion:that.serviceComponent.minorVersion,
                            majorVersion:that.serviceComponent.majorVersion,
                            wsdlURL:that.serviceComponent.wsdlURL,
                            targetNamespace:that.serviceComponent.targetNamespace,
                            portNumber:that.serviceComponent.portNumber,
                            serviceName:that.serviceComponent.serviceName,
                            bindingAddress:that.serviceComponent.bindingAddress,
                            serviceType:that.serviceComponent.serviceType
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
            deleteServiceComponent(){
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
            this.getServiceComponent()
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