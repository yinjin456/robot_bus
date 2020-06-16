<template>
    <div class="login">
        <h1 class="title">
            <span style="font-size: 1em">中间件服务控制系统</span><br>
            <span style="font-size: 0.5em">Middleware Service Control System</span>
        </h1>
        <img src="../assets/image/middle.png" width="650px">
        <div class="login-box" >
            <h1>Login</h1>
            <div class="text-box">
                <input type="text" placeholder="用户名" v-model="username"/>
            </div>
            <div class="text-box">
                <input type="password" placeholder="密码" v-model="password"/>
            </div>
            <div v-loading="loading" class="btn" ><input type="button" name="" value="登录" @click="logining"/></div>
        </div>
        <div class="corner">©2020 Middleware-project</div>
        <div class="edition">v Alpha 0.1.0</div>
    </div>
</template>

<script>
    import { encryptString } from '@/utils/base64'
    export default {
        name: "Login",
        data(){
            return{
                username:null,
                password:null,
                loading: false,
            }
        },
        methods:{
            logining(){
                var that = this;
                if(this.username=="" || this.username==null){
                    this.$message.error('账号不能为空，请输入账号');
                }else if(this.password=="" || this.password==null){
                    this.$message.error('密码不能为空，请输入密码');
                }else{

                    this.loading = true;
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
                            that.Cookie.set('pass',encryptString(that.password))
                            that.Cookie.set('loginInfo',response.data.data)
                            that.$router.push({path:'/Home'})
                        }else{
                            that.$message.error('登录失败，请检查账号密码是否有误');
                        }
                        that.loading = false;
                    }).catch(function (error) {
                        that.$message.error('登录失败，请检查网络');
                        console.log(error);
                        that.loading = false;
                    });
                }

            },
            tips() {
                this.$notify({
                    title: '登录提示',
                    message: ('开发版本可采用 账户名：super 密码：123 进行登录'),
                    position: 'bottom-right',
                    duration: 6000
                });
            },
        },
        mounted(){
            this.tips()
        }
    }
</script>

<style scoped>
    .title{
        position: absolute;
        left: 4%;
        top: 5%;
        font-size: 2.8em;
        color: #3F85ED;
    }
    .login{
        width: 100%;
        height: 100vh;
        background-attachment:fixed;
        background-position:center;
    }
    .login img{
        position: absolute;
        left: 7%;
        top: 20%;
    }
    .login-box{
        width: 280px;
        position: absolute;
        top: 45%;
        left: 76%;
        transform: translate(-50%,-50%);
        color: black;
    }
    .login-box h1{
        float: left;
        font-size: 40px;
        border-bottom: 6px solid #3F85ED;
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
        background-color: transparent;
        font-size: 20px;
        margin: 0 10px;
        width: 80%;
        float: left;
    }

    .btn{
        width: 100%;
        background: none;
        border: 2px solid #888a8e;
        margin: 12px 0;
        color: black;
    }
    .btn input{
        width: 100%;
        background: none;
        border: none;
        padding: 5px;
        font-size: 18px;
        cursor: pointer;
        color: black;
    }
    input:-webkit-autofill {
        -webkit-animation: autofill-fix 1s infinite;
        -webkit-text-fill-color: #2f2f2f;
    }
    @-webkit-keyframes autofill-fix {
        from {
            background-color: transparent
        }
        to {
            background-color: transparent
        }
    }
    .corner{
        position: absolute;
        bottom:10px;
        left: 30px;
        color: #686868;
        font-size: 0.7em;
    }
    .edition{
        position: absolute;
        top:10px;
        right: 20px;
        color: #bdbdbd;
        font-size: 0.8em;
        font-weight: bolder;
    }
</style>
