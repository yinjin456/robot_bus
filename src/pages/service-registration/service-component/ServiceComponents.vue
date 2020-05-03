<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="服务组件" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="mini"
                            height="440">
                        <el-table-column
                                prop="serviceName"
                                label="服务组件名称">
                        </el-table-column>
                        <el-table-column
                                prop="serviceId"
                                label="服务组件编号">
                        </el-table-column>
                        <el-table-column
                                prop="serviceType"
                                label="服务组件类型">
                        </el-table-column>
                        <el-table-column
                                prop="majorVersion"
                                label="主版本号">
                        </el-table-column>
                        <el-table-column
                                prop="minorVersion"
                                label="最小版本号">
                        </el-table-column>
                        <el-table-column
                                width="80"
                                label="运行状态">
                            <template slot-scope="scope">
                                <div @click="Grade(scope.row)" style="color: #1fa821">启动</div>
<!--                                <div @click="Grade(scope.row)" style="color: #c62c2c">停止</div>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="jumpComponentDetail(scope.$index, tableData)" size="small">详情</el-button>
                                <!--                        <el-button @click="knowledgePoint(scope.row)" type="text" size="small">知识点</el-button>-->
                                <el-button type="text" @click="analysis(scope.row)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 8px 0"></div>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]"
                            :page-size="20"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="新增服务组件" name="2">
                <div class="content">
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
                        <el-button type="primary" class="ebutton" @click="addServiceComponent">确认添加</el-button>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "ServiceComponents",
        data() {
            return {
                activeName: '1',
                tableData: [],
                pageSize: 20,
                currentPage: 1,
                serviceComponent: {

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
            getList() {
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getServiceComponentList', {
                        params: {
                            pageIndex: that.currentPage,
                            pageSize: that.pageSize
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        that.tableData = response.data.rows;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            jumpComponentDetail(index, rows){
                this.$router.push({
                    path: '/ServiceComponentDetail',
                    query: {
                        serviceId: rows[index].serviceId
                    }
                })
            },
            addServiceComponent(){
                var that = this;
                this.axios
                    .post(this.Global.baseUrl + '/addServiceComponent', {
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
            this.getList()
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
    .button-box{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
    }
    .ebutton{
        width: 130px;
    }
</style>