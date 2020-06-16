<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="权限列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="small"
                            height="69vh">
                        <el-table-column
                                prop="userId"
                                label="权限名称">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="权限列表">
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
                    .get(this.Global.baseUrl3 + '/Robot/PrivilegeQueryController/getPrivilegePage', {
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
                    path: '/UserDetail',
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
