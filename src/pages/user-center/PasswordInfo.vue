<template>
    <div class="content">
        <el-form style="margin-top:15px" label-position="left" label-width="110px" :model="passwords" ref="passwords" :rules="rules" status-icon>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input v-model="passwords.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="passwords.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col :span="12">
                    <el-form-item label="密码确认" prop="rePassword">
                        <el-input v-model="passwords.rePassword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="button-box">
            <el-button type="primary" class="ebutton" @click="modifyPassword">确认修改</el-button>
        </el-row>
    </div>
</template>

<script>
    import {decodeString} from '@/utils/base64'
    export default {
        name: "PasswordInfo",
        data(){
            var checkOld = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(value != this.passwords.nowPassword){
                    callback(new Error('与原密码不一致!'));
                } else{
                    this.isok1 = true
                    callback()
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    this.isok2 = true
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwords.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    this.isok3 = true
                    callback();
                }
            };
            return{
                passwords:{
                    oldPassword:null,
                    newPassword:null,
                    rePassword:null,
                    nowPassword:decodeString(this.Cookie.get('pass'))
                },
                isok1:false,
                isok2:false,
                isok3:false,
                rules: {
                    oldPassword: [
                        { validator: checkOld, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    rePassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }

            }
        },
        methods:{
            modifyPassword(){
                if(this.isok1 == true && this.isok2 ==true && this.isok3==true){
                    var that = this;
                    this.axios({
                        url: this.Global.baseUrl3 + '/Robot/UserController/modifyPassword',
                        method: 'POST',
                        params: {
                            operationUser:this.Cookie.getJSON('loginInfo').userId,
                            oldPassword:this.passwords.nowPassword,
                            newPassword:this.passwords.newPassword
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
                }else{
                    this.$message.error('填写内容有误,请检查后重新提交');
                }

            }
        }
    }
</script>

<style scoped>
    .content{
        paddng:30px;
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