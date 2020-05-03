<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="主题列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="mini"
                            height="440">
                        <el-table-column
                                prop="num"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="主题名称">
                        </el-table-column>
                        <el-table-column
                                prop="filed"
                                label="域ID">
                        </el-table-column>
                        <el-table-column
                                prop="icr"
                                label="ICR文件">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="创建时间"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                width="140"
                                label="创建时间">
                            <template slot-scope="scope">
                                <el-button type="text" @click="Grade(scope.row)" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="Grade(scope.row)" size="small">编辑</el-button>
                                <!--                        <el-button @click="knowledgePoint(scope.row)" type="text" size="small">知识点</el-button>-->
                                <el-button type="text" @click="analysis(scope.row)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 8px 0"></div>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
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
                tableData: [{
                    num: '1',
                    name: 'ABB机器人',
                    field: '1788888888',
                    icr:'addd4s56.icr',
                    date:'2020-4-20'
                },],
                currentPage4: 1
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>

</style>