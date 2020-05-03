<template>
    <div>
        <div class="desc">主题名称：ABB其停机状态</div>
        <div class="desc">域ID：7888888888</div>
        <div class="desc">ICR文件：abb95513.icr</div>
        <div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    size="mini"
                    height="380">
                <el-table-column
                        prop="num"
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
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
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
                tableData: [{
                    num: '1',
                    address: 'http://127.0.0.1:8080/getabbstopsstartr1',
                    startdate: '2020-4-20',
                    enddate:'2020-4-21'
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
    .desc{
        margin: 15px 0;
        font-size: 0.85em;
        letter-spacing: 0.5px;
    }
</style>