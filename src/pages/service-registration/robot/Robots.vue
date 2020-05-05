<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="机器人" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="small"
                            height="69vh">
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
                            <template slot-scope="scope">
                                <span v-if="scope.row.robotTypeId===1">多关节机器人</span>
                                <span v-else-if="scope.row.robotTypeId===2">爬壁机器人</span>
                                <span v-else>其他机器人</span>
                            </template>
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
                                label="启停状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.onoff===false" style="color: #ff4400;font-weight: bolder">停止</span>
                                <span v-else-if="scope.row.onoff===true" style="color: #4cb72e;font-weight: bolder">运行</span>
                                <span v-else style="color: #c1c1c1;">未知状态</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.onoff===true" type="text" @click="jumpRobotDetail(scope.$index, tableData)" size="small">查看详情</el-button>
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
            <el-tab-pane label="新增机器人" name="2">
                <div class="content">
                    <el-form label-position="left" label-width="130px" :model="robotCommon">
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="机器人名称">
                                    <el-input v-model="robotCommon.robotname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="机器人类型">
                                    <el-input v-model="robotCommon.robotTypeId"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="出厂id">
                                    <el-input v-model="robotCommon.robotDeviceId"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="出厂型号">
                                    <el-input v-model="robotCommon.robotModel"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="生产厂家">
                                    <el-input v-model="robotCommon.robotVendor"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工作额定功率">
                                    <el-input v-model="robotCommon.robotPower"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="工作环境最高温度">
                                    <el-input v-model="robotCommon.robotWorkEnvTempMax"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工作环境最低温度">
                                    <el-input v-model="robotCommon.robotWorkEnvTempMin"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="工作环境最大湿度">
                                    <el-input v-model="robotCommon.robotWorkEnvHumiMax"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工作环境最小湿度">
                                    <el-input v-model="robotCommon.robotWorkEnvHumiMin"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row class="button-box">
                        <el-button type="primary" class="ebutton" @click="addRobotCommon">确认添加</el-button>
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
                total:0,
                currentPage: 1,
                robotCommon: {
                    robotId:'',
                    robotname:'',
                    robotTypeId:'',
                    onoff:'',
                    robotDeviceId:'',
                    robotModel:'',
                    robotVendor:'',
                    robotWorkEnvTempMax:'',
                    robotWorkEnvTempMin:'',
                    robotWorkEnvHumiMax:'',
                    robotWorkEnvHumiMin:'',
                    robotPower:'',
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
                    .get(this.Global.baseUrl + '/getRobotCommonList', {
                        params: {
                            pageIndex: that.currentPage,
                            pageSize: that.pageSize
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        that.tableData = response.data.data.list;
                        that.total = response.data.data.total;
                        that.currentPage = response.data.data.pageNum;
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
                this.axios({
                    url: this.Global.baseUrl + '/addRobotCommon',
                    method: 'POST',
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
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    console.log(response);
                    if(response.data.result==1){
                        that.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        that.activeName='1'
                        that.robotCommon={}
                    }else{
                        that.$message.error('添加失败：' + response.data.message);
                    }
                }).catch(function (error) {
                    that.$message.error('修改失败');
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
    .content{
        padding: 10px;
    }
    .el-row {
        margin-bottom: 8px;
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
</style>