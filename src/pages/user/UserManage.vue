<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="会员列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            height="480">
                        <el-table-column
                                prop="num"
                                label="序号"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="telephone"
                                label="联系电话"
                                width="220">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="用户名"
                                width="220">
                        </el-table-column>
                        <el-table-column
                                prop="role"
                                label="角色"
                                width="220">
                        </el-table-column>
                        <el-table-column
                                prop="isuse"
                                label="账号是否有效"
                                width="150">
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

                </div>
            </el-tab-pane>
            <el-tab-pane label="添加会员" name="2">
                no content
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                activeName: '1',
                tableData: [{
                    num: '1',
                    name: '张三',
                    telephone: '111 1561 1656',
                    username:'法外狂徒',
                    role:'admin',
                    isuse:'yes'
                },]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>