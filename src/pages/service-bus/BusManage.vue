<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="服务总线实例" name="1">
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
                                label="服务总线名称">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="ip地址及端口号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="quality"
                                label="服务总线负载均衡权重"
                                width="170">
                        </el-table-column>
                        <el-table-column
                                width="200"
                                label="启动/停止">
                            <template slot-scope="scope">
                                <el-button type="warning" @click="Grade(scope.row)" size="mini">启动</el-button>
                                <el-button type="success" @click="Grade(scope.row)" size="mini">停止</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="Grade(scope.row)" size="mini">编辑</el-button>
                                <!--                        <el-button @click="knowledgePoint(scope.row)" type="text" size="small">知识点</el-button>-->
                                <el-button type="text" @click="analysis(scope.row)" size="mini">删除</el-button>
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
            <el-tab-pane label="新增服务总线实例" name="2">
                no content
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "BusManage",
        data() {
            return {
                activeName: '1',
                tableData: [{
                    num: '1',
                    name: 'ACG顺丰长沙配送站服务总线',
                    address: '225.225.225.225：8080',
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