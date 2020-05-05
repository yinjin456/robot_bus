<template>
    <div>
        <div class="desc">主题名称：ABB其停机状态</div>
        <div class="desc">域ID：7888888888</div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    size="mini"
                    height="67vh">
                <el-table-column
                        prop="topicId"
                        label="序号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="订阅者接收消息地址">
                </el-table-column>
                <el-table-column
                        prop="startdate"
                        label="订阅日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="enddate"
                        label="取消订阅日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        width="180"
                        label="状态">
                    <template slot-scope="scope">
                        <el-button type="text" @click="Grade(scope.row)" size="small">订阅</el-button>
                        <!--                        <el-button @click="knowledgePoint(scope.row)" type="text" size="small">知识点</el-button>-->
                        <!--                                <el-button type="text" @click="analysis(scope.row)" size="small">取消订阅</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 8px 0"></div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SubscribeManagement",
        data() {
            return {
                activeName: '1',
                tableData: [],
                pageSize: 20,
                currentPage: 1,
                total:0,
                registerCenter:null
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
                    .get(this.Global.baseUrl + '/topic/getPage' + this.currentPage, {
                        params: {
                            size:this.pageSize
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        that.tableData = response.data.datas;
                        that.total = response.data.data.totalCount;
                        that.currentPage = response.data.data.currentPage;
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
        }
    }
</script>

<style scoped>
    .desc{
        margin: 15px 0;
        font-size: 0.85em;
        letter-spacing: 0.5px;
    }
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