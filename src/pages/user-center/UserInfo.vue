<template>
    <div class="content">
        <el-form label-position="left" label-width="110px" style="margin-top:15px">
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="user id：">
                        <el-input v-model="user.userId" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="用户名：">
                        <el-input v-model="user.username"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="姓名：">
                        <el-input v-model="user.realname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="联系方式：">
                        <el-input v-model="user.telephone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="邮箱：">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="button-box">
            <el-button type="primary" class="ebutton" @click="modifyUser2">确认修改</el-button>
        </el-row>
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
                    "flag": null,
                    "token": null,
                    "privilegeTList": []
                }
            }
        },
        methods: {
            modifyUser2(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl3 + '/Robot/UserController/modifyUser2',
                    method: 'POST',
                    params: {
                        operationUser:this.Cookie.getJSON('loginInfo').userId,
                        username:this.user.username,
                        realname:this.user.realname,
                        telephone:this.user.telephone,
                        email:this.user.email,
                    },
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    if(response.data.result==1){
                        that.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        that.Cookie.remove('loginInfo');
                        that.Cookie.set('loginInfo',that.user)
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
            }
        },
        activated(){
            this.user = this.Cookie.getJSON('loginInfo')
        }
    }
</script>

<style scoped>
    .content{
        padding: 30px;
    }
    .el-row {
        margin-bottom: 5px;
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