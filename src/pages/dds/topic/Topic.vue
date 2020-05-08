<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="主题列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="small"
                            height="69vh">
                        <el-table-column
                                prop="topicId"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="topicName"
                                label="主题名称">
                        </el-table-column>
                        <el-table-column
                                prop="domainId"
                                label="域ID">
                        </el-table-column>
<!--                        <el-table-column-->
<!--                                prop="ior"-->
<!--                                label="IOR文件">-->
<!--                        </el-table-column>-->
                        <el-table-column
                                prop="createDate"
                                label="创建时间"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                width="80"
                                label="运行状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag==1" style="color: #ff4400;font-weight: bolder">停止</span>
                                <span v-else-if="scope.row.flag==0" style="color: #4cb72e;font-weight: bolder">运行</span>
                                <span v-else style="color: #c1c1c1;">未知状态</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="100"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="jumpTopicDetail(scope.$index, tableData)" size="small">查看详情</el-button>
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
            <el-tab-pane label="新增主题" name="2">
                no content
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "ThemeManagement",
        data() {
            return {
                activeName: '1',
                tableData: [],
                pageSize: 20,
                currentPage: 1,
                total:0,
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
                    .get(this.Global.baseUrl2 + '/topic/get/selective', {
                        params: {
                            currentPage:this.currentPage,
                            size:this.pageSize,
                        },
                    })
                    .then(function (response) {
                        console.log(response);
                        that.tableData = response.data.datas;
                        that.total = response.data.totalCount;
                        that.currentPage = response.data.currentPage;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            jumpTopicDetail(index, rows){
                this.$router.push({
                    path: '/TopicDetail',
                    query: {
                        topicId: rows[index].topicId,
                        topicName: rows[index].topicName,
                        domainId: rows[index].domainId
                    }
                })
            },
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