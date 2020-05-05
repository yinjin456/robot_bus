<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-if="registerCenter.needRegis==true" label="绑定注册中心" name="1">
                <div class="content">
                    <el-alert
                            title="Tip : 当前还未配置注册中心，请先进行配置！"
                            type="warning">
                    </el-alert>
                    <div class="input-box">
                        <el-form label-position="left" label-width="200px" :model="registerCenter">
                            <el-form-item label="机器人注册服务WSDL">
                                <el-input v-model="registerCenter.robotregisterservicewsdl"></el-input>
                            </el-form-item>
                            <el-form-item label="服务组件注册服务WSDL">
                                <el-input v-model="registerCenter.servicecomponentregisterwsdl"></el-input>
                            </el-form-item>
                            <el-form-item label="机器人状态更新服务WSDL">
                                <el-input v-model="registerCenter.commonxsdlink"></el-input>
                            </el-form-item>
                            <el-form-item label="机器人共性XSD链接">
                                <el-input v-model="registerCenter.extendxsdlink"></el-input>
                            </el-form-item>
                            <el-form-item label="机器人类型XSD链接">
                                <el-input v-model="registerCenter.robotupdatestateservicewsdl"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="button-box">
                        <el-button type="warning" class="ebutton" @click="updateRegisterCenter">确认配置</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane v-else label="注册中心" name="1">
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
                        <el-button type="warning" class="ebutton" @click="updateRegisterCenter">确认修改</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        data() {
            return {
                activeName: '1',
                pageSize: 20,
                currentPage: 1,
                total:0,
                registerCenter: {
                    robotregisterservicewsdl:null,
                    servicecomponentregisterwsdl:null,
                    commonxsdlink:null,
                    extendxsdlink:null,
                    robotupdatestateservicewsdl:null,
                    needRegis:true
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 每页的条数改变
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.request();
            },
            // 更改页面
            handleCurrentChange(val) {
                this.currentPage = val;
                this.request();
            },
            getDefaultRegisterCenter() {
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getDefaultRegisterCenter')
                    .then(function (response) {
                        console.log(response);
                        if (response.data.message=="找不到相应的记录"){
                            that.registerCenter = {
                                robotregisterservicewsdl:null,
                                servicecomponentregisterwsdl:null,
                                commonxsdlink:null,
                                extendxsdlink:null,
                                robotupdatestateservicewsdl:null,
                                needRegis:true
                            }
                        }else{
                            that.registerCenter = response.data
                        }

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
                            serviceCenter_id:10000,
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
            jumpRegistrationDetail(index, rows){
                this.$router.push({
                    path: '/registrationDetail',
                    query: {
                        serviceCenter_id: rows[index].servicecenterId
                    }
                })
            },
            addRegisterCenter(){
                var that = this;
                this.axios
                    .post(this.Global.baseUrl + '/addRegisterCenter', {
                        params: {
                            robotRegisterServiceWSDL:that.registerCenter.robotRegisterServiceWSDL,
                            serviceComponentRegisterWSDL:that.registerCenter.serviceComponentRegisterWSDL,
                            commonXSDlink:that.registerCenter.commonXSDlink,
                            extendXSDLink:that.registerCenter.extendXSDLink,
                            robotUpdateStateServiceWSDL:that.registerCenter.robotUpdateStateServiceWSDL,
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        if(response.data.result==1){
                            that.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            that.activeName='1'
                            that.serviceComponent={}
                        }else{
                            that.$message.error('添加失败：' + response.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.getDefaultRegisterCenter()
        }
    }
</script>

<style scoped>
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
    .input-box{
        margin: 10px 0;
    }
    .input{
        margin: 5px 0 15px 0;
    }
    .button-box{
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
    }
    .ebutton{
        width: 130px;
    }
</style>