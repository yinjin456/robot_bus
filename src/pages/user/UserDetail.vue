<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="用户信息详情"></el-page-header>
        </div>
        <div class="content">
            <div class="content-id-box">
                <div class="content-id">
                    用户id : {{user.userId}}
                </div>
            </div>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.createUserId" disabled>
                        <template slot="prepend">创建者id</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.createDate" disabled>
                        <template slot="prepend">创建日期</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.modifyUserId" disabled>
                        <template slot="prepend">最近一次修改人id</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.modifyDate" disabled>
                        <template slot="prepend">最近一次修改日期</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.valid" disabled>
                        <template slot="prepend">账号状态</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="user.roleId" disabled>
                        <template slot="prepend">角色id</template>
                    </el-input>
                </el-col>
            </el-row>
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
<!--            <el-row class="button-box">-->
<!--                <el-button type="warning" class="ebutton" @click="updateUser">修改</el-button>-->
<!--&lt;!&ndash;                <el-button type="danger" class="ebutton del" @click="deleteUser">冻结账号</el-button>&ndash;&gt;-->
<!--            </el-row>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserDetail",
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
            goBack(){
                this.$router.go(-1)
            },
            getUser(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl3 + '/Robot/UserQueryController/getUser', {
                        params: {
                            userId:that.$route.query.userId,
                            operationUser:'001'
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        that.user = response.data.data
                        that.user.password=null
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            modifyUser2(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl3 + '/Robot/UserController/modifyUser2',
                    method: 'POST',
                    params: {
                        operationUser:this.Cookie.getJSON('loginInfo').userId,
                        password:this.passwords.newPassword
                    },
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    if(response.data.result==1){
                        that.$message({
                            message: '修改成功,请重新登录！',
                            type: 'success'
                        });
                        that.$router.replace({path:'/Login'})
                        that.Cookie.remove('loginInfo')
                        that.Cookie.remove('pass')
                    }else {
                        that.$message({
                            message: '修改失败' + response.data.message,
                            type: 'success'
                        });
                    }
                }).catch(function (error) {
                    that.$message.error('网络错误');
                    console.log(error);
                });
            },
            deleteUser(){
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
            this.getUser()
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