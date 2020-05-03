<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="机器人" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="mini"
                            height="440">
                        <el-table-column
                                prop="robotId"
                                label="编号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="robotname"
                                label="机器人名称">
                        </el-table-column>
                        <el-table-column
                                prop="robotTypeId"
                                label="机器人类型">
                        </el-table-column>
                        <el-table-column
                                prop="robotDeviceId"
                                label="出厂id">
                        </el-table-column>
                        <el-table-column
                                prop="robotModel"
                                label="出厂型号">
                        </el-table-column>
                        <el-table-column
                                prop="robotVendor"
                                label="生产厂家">
                        </el-table-column>
                        <el-table-column
                                width="80"
                                label="运行状态">
                            <template slot-scope="scope">
                                <div @click="Grade(scope.row)" style="color: #1fa821">onoff</div>
                                <!--  <div @click="Grade(scope.row)" style="color: #c62c2c">停止</div>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="jumpRobotDetail(scope.$index, tableData)" size="small">详情</el-button>
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
            <el-tab-pane label="新增机器人" name="2">
                <div class="content">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.serviceType">
                                <template slot="prepend">服务类型</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.bindingAddress">
                                <template slot="prepend">绑定地址</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.serviceName">
                                <template slot="prepend">服务名称</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.portNumber">
                                <template slot="prepend">端口号</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.targetNamespace">
                                <template slot="prepend">命名空间</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.wsdlUrl">
                                <template slot="prepend">wsdl地址</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.majorVersion">
                                <template slot="prepend">主版本号</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.minorVersion">
                                <template slot="prepend">最小版本号</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.routingFrom">
                                <template slot="prepend">路由From端点</template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="robotCommon.routingTo">
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
        name: "Robots",
        data() {
            return {
                activeName: '1',
                tableData: [],
                pageSize: 20,
                currentPage: 1,
                robotCommon: {}
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
                    .get(this.Global.baseUrl + '/getRobotCommonList', {
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
            jumpRobotDetail(index, rows){
                this.$router.push({
                    path: '/RobotDetail',
                    query: {
                        robotId: rows[index].robotId
                    }
                })
            },
            addRobotCommon(){
                var that = this;
                this.axios
                    .post(this.Global.baseUrl + '/addRobotCommon', {
                        params: {
                            robotId:that.robotCommon.robotId,
                            robotname:that.robotCommon.robotname,
                            robotTypeId:that.robotCommon.robotTypeId,
                            onoff:that.robotCommon.onoff,
                            robotDeviceId:that.robotCommon.robotDeviceId,
                            robotModel:that.robotCommon.robotModel,
                            robotVendor:that.robotCommon.robotVendor,
                            robotWorkEnvTempMax:that.robotCommon.robotWorkEnvTempMax,
                            robotWorkEnvTempMin:that.robotCommon.robotWorkEnvTempMin,
                            robotWorkEnvHumiMax:that.robotCommon.robotWorkEnvHumiMax,
                            robotWorkEnvHumiMin:that.robotCommon.robotWorkEnvHumiMin,
                            robotPower:that.robotCommon.robotPower,
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