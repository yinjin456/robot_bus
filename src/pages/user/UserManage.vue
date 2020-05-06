<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="small"
                            height="69vh">
                        <el-table-column
                                prop="userId"
                                label="用户id">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="用户昵称">
                        </el-table-column>
                        <el-table-column
                                prop="roleName"
                                label="角色">
                        </el-table-column>
                        <el-table-column
                                prop="realname"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="telephone"
                                label="联系方式">
                        </el-table-column>
                        <el-table-column
                                width="90"
                                label="账号状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isValid=='0'" style="color: #ff4400;font-weight: bolder">停用</span>
                                <span v-else-if="scope.row.isValid=='1'" style="color: #4cb72e;font-weight: bolder">正常</span>
                                <span v-else style="color: #c1c1c1;">未知状态</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="jumpUserDetail(scope.$index, tableData)" size="small">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 8px 0"></div>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="新增服务组件" name="2">
                <div class="content">
                    <el-form label-position="left" label-width="110px" :model="serviceComponent">
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="服务类型" required>
                                    <el-input v-model="serviceComponent.serviceType"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="服务名称" required>
                                    <el-input v-model="serviceComponent.serviceName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="wsdl地址" required>
                                    <el-input v-model="serviceComponent.wsdlURL"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="命名空间">
                                    <el-input v-model="serviceComponent.targetNamespace"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="绑定地址">
                                    <el-input v-model="serviceComponent.serviceComponent"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="端口号">
                                    <el-input v-model="serviceComponent.portNumber"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="主版本号">
                                    <el-input v-model="serviceComponent.majorVersion"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="最小版本号">
                                    <el-input v-model="serviceComponent.minorVersion"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--                        <el-row :gutter="60">-->
                        <!--                            <el-col :span="12">-->
                        <!--                                <el-form-item label="路由From端点">-->
                        <!--                                    <el-input v-model="serviceComponent.routingFrom"></el-input>-->
                        <!--                                </el-form-item>-->
                        <!--                            </el-col>-->
                        <!--                            <el-col :span="12">-->
                        <!--                                <el-form-item label="路由To端点">-->
                        <!--                                    <el-input v-model="serviceComponent.routingTo"></el-input>-->
                        <!--                                </el-form-item>-->
                        <!--                            </el-col>-->
                        <!--                        </el-row>-->
                    </el-form>
                    <el-row class="button-box">
                        <el-button type="primary" class="ebutton" @click="addServiceComponent">确认添加</el-button>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data() {
            return {
                activeName: '1',
                tableData: [],
                pageSize: 20,
                total:0,
                currentPage: 1,
                serviceComponent: {
                    userId: null,
                    realname: null,
                    telephone: null,
                    username: null,
                    roleName: null,
                    isValid: null
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
                this.getList()
            },
            // 更改页面
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList()
            },
            getList() {
                var that = this;
                this.axios
                    .get(this.Global.baseUrl3 + '/Robot/UserQueryController/getUserPage', {
                        params: {
                            pageIndex: that.currentPage,
                            pageSize: that.pageSize,
                            operationUser: '001'
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
                // this.axios
                //     .post(this.Global.baseUrl + '/addServiceComponent', {
                //
                //     })
                //     .then(function (response) {
                //         console.log(response);
                //         if(response.data.result==1){
                //             that.$message({
                //                 message: '添加成功',
                //                 type: 'success'
                //             });
                //             that.activeName='1'
                //             that.serviceComponent={}
                //         }else{
                //             that.$message.error('添加失败：' + response.data.message);
                //         }
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
    .content{
        padding: 10px;
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