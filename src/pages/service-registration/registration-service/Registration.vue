<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="注册中心" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="mini"
                            height="440">
                        <el-table-column
                                prop="servicecenterId"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="robotregisterservicewsdl"
                                label="机器人服务WSDL">
                        </el-table-column>
                        <el-table-column
                                prop="servicecomponentregisterwsdl"
                                label="服务组件WSDL">
                        </el-table-column>
                        <el-table-column
                                prop="commonxsdlink"
                                label="机器人通用xsd">
                        </el-table-column>
                        <el-table-column
                                prop="extendxsdlink"
                                label="机器人扩展xsd">
                        </el-table-column>
                        <el-table-column
                                prop="robotupdatestateservicewsdl"
                                label="机器人更新状态服务wsdl">
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
                                <el-button type="text" @click="jumpRegistrationDetail(scope.$index, tableData)" size="small">详情</el-button>
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
            <el-tab-pane label="新增注册中心" name="2">
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
                        <el-button type="warning" class="ebutton" @click="addRegisterCenter">确认添加</el-button>
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
                tableData: [],
                pageSize: 20,
                currentPage: 1,
                registerCenter: {}
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
            getRegisterCenterList() {
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getRegisterCenterList', {
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
                    .post(this.Global.baseUrl + '/addServiceComponent', {
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
            this.getRegisterCenterList()
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
        margin-bottom: 15px;
    }
    .input{
        margin: 10px 0 20px 0;
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