<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="small"
                            height="69vh">
                        <el-table-column
                                prop="roleName"
                                label="角色">
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="创建日期">
                        </el-table-column>
                        <el-table-column
                                width="140"
                                label="账号状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isValid=='0'" style="color: #ff4400;font-weight: bolder">停用</span>
                                <span v-else-if="scope.row.isValid=='1'" style="color: #4cb72e;font-weight: bolder">正常</span>
                                <span v-else style="color: #c1c1c1;">未知状态</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="140"
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
                    .get(this.Global.baseUrl3 + '/Robot/RoleQueryController/getRolePage', {
                        params: {
                            pageIndex: this.currentPage,
                            pageSize: this.pageSize,
                            operationUser: this.Cookie.getJSON('loginInfo').userId
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
                    path: '/RoleDetail',
                    query: {
                        userId: rows[index].userId
                    }
                })
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
