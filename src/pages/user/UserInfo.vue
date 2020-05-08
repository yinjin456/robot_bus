<template>
    <div>
        <div class="content">
            <div class="content-id-box">
                <div class="content-id">
                    用户id : {{user.userId}}
                </div>
            </div>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.username">
                        <template slot="prepend">用户名</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.password">
                        <template slot="prepend">密码</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.realname" >
                        <template slot="prepend">姓名</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.telephone">
                        <template slot="prepend">电话电话</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.email">
                        <template slot="prepend">邮箱</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="button-box">
                <el-button type="warning" class="ebutton" @click="updateUser">修改</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data () {
            return {
                user: {
                    "userId": null,
                    "username": null,
                    "password": null,
                    "valid": null,
                    "roleId": null,
                    "telephone": null,
                    "email": null,
                    "realname": null,
                    "createUserId": null,
                    "createDate": null,
                    "modifyUserId": null,
                    "modifyDate": null,
                }
            }
        },
        methods: {
            updateUser(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl + '/updateUser',
                    method: 'POST',
                    params: {
                        routingTo:that.User.routingTo,
                        routingFrom:that.User.routingFrom,
                        minorVersion:that.User.minorVersion,
                        majorVersion:that.User.majorVersion,
                        wsdlURL:that.User.wsdlURL,
                        targetNamespace:that.User.targetNamespace,
                        portNumber:that.User.portNumber,
                        serviceName:that.User.serviceName,
                        bindingAddress:that.User.bindingAddress,
                        serviceType:that.User.serviceType,
                        serviceId:that.User.serviceId
                    },
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    console.log(response);
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }).catch(function (error) {
                    that.$message.error('修改失败');
                    console.log(error);
                });
            }
        },
        activated(){
            this.user = this.Cookie.getJSON('loginInfo')
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
        font-weight: bolder;
        color: #767676;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .button-box{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
    }
    .ebutton{
        width: 130px;
    }
    .content{
        padding: 8px 0 15px 0;
        height: 70vh;
    }
    .content-id-box{
        margin-bottom: 15px;
    }
    .content-id{
        margin: 10px 5px;
        font-size: 0.9em;
        font-weight: bolder;
        color: #5a5a5a;
        display: block;
    }
</style>