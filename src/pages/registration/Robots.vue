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
                                prop="num"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="机器人名称"
                                min-width="300">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="机器人类型"
                                width="240">
                        </el-table-column>
                        <el-table-column
                                prop="factory"
                                label="机器人生产厂家"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                min-width="160px"
                                label="启动/停止">
                            <template slot-scope="scope">
                                <el-button type="warning" @click="Grade(scope.row)" size="small">启动</el-button>
                                <el-button type="success" @click="Grade(scope.row)" size="small">停止</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                min-width="160px"
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
            <el-tab-pane label="新增机器人" name="2">
                no content
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "robots",
        data() {
            return {
                activeName: '1',
                tableData: [{
                    num: '1',
                    name: '机械臂asd22',
                    type: '工业',
                    factory:'河南电子厂'
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