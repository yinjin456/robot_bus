<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="创建用户" name="1">
                <div class="panel">
                    <el-steps :active="active" finish-status="success">
                        <el-step title="信息填写"></el-step>
                        <el-step title="权限分配"></el-step>
                        <el-step title="信息确认"></el-step>
                        <el-step title="创建成功"></el-step>
                    </el-steps>
                    <div class="main">
                        <div v-if="active==0" class="content">
                            <el-form label-position="left" label-width="90px" style="margin-top:15px">
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="用户名：" required>
                                            <el-input v-model="user.username"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="密码：" required>
                                            <el-input v-model="user.password"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="姓名：" required>
                                            <el-input v-model="user.realname"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="联系方式：">
                                            <el-input v-model="user.telephone"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="邮箱：">
                                            <el-input v-model="user.email"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <div v-if="active==1" class="content">
                            用户提权
                        </div>
                        <div v-if="active==2" class="content">
                            <el-form label-position="left" label-width="90px" style="margin-top:15px">
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="用户名：" required>
                                            <el-input v-model="user.username"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="密码：" required>
                                            <el-input v-model="user.password"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="姓名：" required>
                                            <el-input v-model="user.realname"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="联系方式：">
                                            <el-input v-model="user.telephone"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="邮箱：">
                                            <el-input v-model="user.email"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="60">
                                    <el-col :span="11">
                                        <el-form-item label="用户权限：">
                                            <el-input v-model="user.email"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <div v-if="active==3" class="content">
                            <div class="title">
                                恭喜您，用户 {{user.userId}} 已经创建成功！
                            </div>
                            <div class="con">
                                <div class="text">
                                    {{copyContent}}
                                </div>
                                <el-button
                                        class="copy"
                                        v-clipboard:copy="copyContent"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        type="info"
                                        plain>
                                    点击此处复制
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div class="button-box" v-if="active<3">
                        <el-button class="prev" @click="prev" type="info" plain>上一步</el-button>
                        <el-button class="next" @click="next" type="primary" plain>下一步</el-button>
                    </div>
                    <div class="button-box" v-else style="justify-content: center">
                        <el-button class="prev" @click="prev" type="success" plain>完成</el-button>
                    </div>

                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "CreateUser",
        data() {
            return {
                activeName: '1',
                active: 0,
                user: {
                    "userId": null,
                    "username": null,
                    "valid": null,
                    "roleId": null,
                    "telephone": null,
                    "email": null,
                    "realname": null,
                    "createUserId": null,
                    "createDate": null,
                    "modifyUserId": null,
                    "modifyDate": null,
                    "privilegeTList": []
                },
                copyContent:""
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            prev() {
                if (this.active > 0)
                    this.active--
            },
            next() {
                if (this.active == 0){
                    if(this.user.username==null||this.user.realname==null||this.user.password==null){
                        this.$message.error('有字段为空')
                    }else{
                        this.active++
                    }
                }else if(this.active==1){
                    this.active++
                }else if(this.active==2){
                    this.copyContent = "您的账户已经创建完毕，账号为 【"+this.user.username+"】,密码为 【"+this.user.password+"】，使用时请在  http://106.13.177.169/ 登陆"
                    this.active++
                }

            },
            over(){
                this.active=0
            },
            getList() {
                var that = this;
                this.axios
                    .get(this.Global.baseUrl3 + '/Robot/UserQueryController/getUserPage', {
                        params: {
                            pageIndex: this.currentPage,
                            pageSize: this.pageSize,
                            operationUser: this.Cookie.getJSON('loginInfo').userId
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        that.tableData = response.data.data.rows;
                        that.total = response.data.data.total;
                        that.currentPage = response.data.data.pageIndex;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            jumpUserDetail(index, rows){
                this.$router.push({
                    path: '/UserDetail',
                    query: {
                        userId: rows[index].userId
                    }
                })
            },
            addUser(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl + '/addServiceComponent',
                    method: 'POST',
                    params: {
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
                    },
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    console.log(response);
                    that.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    that.activeName='1';
                    that.currentPage=1;
                    that.serviceComponent={
                        routingTo:'',
                        routingFrom:'',
                        minorVersion:'',
                        majorVersion:'',
                        wsdlURL:'',
                        targetNamespace:'',
                        portNumber:'',
                        serviceName:'',
                        bindingAddress:'',
                        serviceType:''
                    };
                }).catch(function (error) {
                    that.$message.error('提交失败');
                    console.log(error);
                });
            },
            onCopy(e) {
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
                console.log(e.text);
            },
            onError(e) {
                this.$message.error('复制失败');
                console.log(e);
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>

    .el-row {
        margin-bottom: 5px;
    }

    .panel{
        padding: 15px 25px;
    }
    .main{
        width: 100%;
        height: 52vh;
    }
    .content{
        padding: 15px;
    }

    .content .title{
        color: #424242;
        font-weight: bolder;
        font-size: 1.6em;
        margin-top: 15px;
        text-align: center;
    }
    .content .con{
        padding: 15px;
        border: solid 2px #a5a5a5;
        border-radius: 5px;
        margin: 70px 420px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .content .con .text{
        color: #6d6d6d;
        font-size: 1em;
        margin-bottom: 20px;
    }
    .content .copy{
        width: 120px;
        height: 40px;
        text-align: center;
    }
    .button-box{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .prev {
        width: 200px;
    }
    .next{
        width: 200px;
    }
</style>
