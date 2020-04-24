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
                                prop="num"
                                label="序号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="服务组件名称"
                                min-width="300">
                        </el-table-column>
                        <el-table-column
                                prop="from"
                                label="From端点"
                                width="240">
                        </el-table-column>
                        <el-table-column
                                prop="to"
                                label="To端点"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                min-width="160px"
                                label="运行状态">
                            <template slot-scope="scope">
                                <div @click="Grade(scope.row)" style="color: #1fa821">启动</div>
                                <div @click="Grade(scope.row)" style="color: #c62c2c">停止</div>
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
            <el-tab-pane label="新增服务组件" name="2">
                no content
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
                tableData: [{
                    num: '1',
                    name: 'ACG顺丰长沙配送站服务总线',
                    address: '12.121.24.80：8080',
                    quality:'0.6'
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