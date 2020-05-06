<template>
    <div class="login">
        <div class="login-box">
            <h1>Login</h1>
            <div class="text-box">
                <input type="text" placeholder="用户名" v-model="username"/>
            </div>
            <div class="text-box">
                <input type="password" placeholder="密码" v-model="password"/>
            </div>
            <input class="btn" type="button" name="" value="登录" @click="logining"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                username:null,
                password:null
            }
        },
        methods:{
            logining(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl3 + '/Robot/UserQueryController/login',
                    method: 'POST',
                    params: {
                        username:this.username,
                        password:this.password,
                    },
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    console.log(response);
                    if(response.data.result==1){
                        that.Cookie.set('loginInfo',response.data.data)
                        that.$router.push({path:'/Home'})
                    }else{
                        that.$message.error('登录失败，请检查账号密码是否有误');
                    }
                }).catch(function (error) {
                    that.$message.error('登录失败，请检查网络');
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    body{
        background: #3b3b47;
    }
    .login-box{
        width: 280px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .login-box h1{
        float: left;
        font-size: 40px;
        border-bottom: 6px solid #0f4c81;
        margin-bottom: 50px;
        padding: 13px 0;
    }
    .text-box{
        width: 100%;
        overflow: hidden;
        font-size: 20px;
        padding: 8px 0;
        margin:8px 0;
        border-bottom: 1px solid #3b3b47;
    }
    .text-box input{
        border: none;
        outline: none;
        background: none;
        font-size: 18px;
        margin: 0 10px;
        width: 80%;
        float: left;
    }
    .btn{
        width: 100%;
        background: none;
        border: 2px solid #0f4c81;
        padding: 5px;
        font-size: 18px;
        cursor: pointer;
        margin: 12px 0;
    }
</style>