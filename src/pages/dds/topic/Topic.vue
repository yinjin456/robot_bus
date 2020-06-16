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
            <el-tab-pane label="发布者激活" name="2">
                <div class="content">
                    <div class="input-box">
                        <el-input placeholder="请输入内容" v-model="publisher.domainId" class="input">
                            <template slot="prepend">domainId</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="publisher.topic" class="input">
                            <template slot="prepend">topic</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="publisher.message.from" class="input">
                            <template slot="prepend">message.from</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="publisher.message.subject" class="input">
                            <template slot="prepend">message.subject</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="publisher.message.subject_id" class="input">
                            <template slot="prepend">message.subject_id</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="publisher.message.text" class="input">
                            <template slot="prepend">message.text</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="publisher.message.count" class="input">
                            <template slot="prepend">message.count</template>
                        </el-input>
                    </div>
                    <div class="button-box">
                        <el-button type="warning" class="ebutton" @click="openPublisher()">确认激活</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订阅者激活" name="3">
                <div class="content">
                    <div class="input-box">
                        <el-input placeholder="请输入内容" v-model="subscribe.domainId" class="input">
                            <template slot="prepend">domainId</template>
                        </el-input>
                        <el-input placeholder="请输入内容" v-model="subscribe.topic" class="input">
                            <template slot="prepend">topic</template>
                        </el-input>
                    </div>
                    <div class="button-box">
                        <el-button type="warning" class="ebutton" @click="openSubscribe()">确认激活</el-button>
                    </div>
                </div>
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
                subscribe:{
                    domainId:"",
                    topic:"",
                },
                publisher:{
                    domainId:"",
                    topic:"",
                    message:{
                        from:"",
                        subject:"",
                        subject_id:"",
                        text:"",
                        count:""
                    }
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
            openPublisher(){
                let that = this
                this.axios({
                    method: 'post',
                    url: this.Global.baseUrl2 + '/dds/publisher/start',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params: {
                        domainId:this.publisher.domainId,
                        topic:this.publisher.topic,
                        message:this.publisher.message
                    }
                }).then(function (response) {
                    console.log(response);
                    if(response.data=="success"){
                        that.$message({
                            type: 'success',
                            message: '激活成功!'
                        });
                    }else if(response.data=="fail"){
                        that.$message({
                            type: 'info',
                            message: '激活失败!'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.$message({
                        type: 'info',
                        message: '激活失败!'
                    });
                });
            },
            openSubscribe(){
                let that = this
                this.axios({
                    method: 'post',
                    url: this.Global.baseUrl2 + '/dds/subscriber/start',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    params: {
                        domainId:this.subscribe.domainId,
                        topic:this.subscribe.topic
                    }
                }).then(function (response) {
                    console.log(response);
                    if(response.data=="success"){
                        that.$message({
                            type: 'success',
                            message: '激活成功!'
                        });
                    }else if(response.data=="fail"){
                        that.$message({
                            type: 'info',
                            message: '激活失败!'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.$message({
                        type: 'info',
                        message: '激活失败!'
                    });
                });
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
    .content{
        padding: 0 10px;
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
    .input-box{
        margin: 10px 0;
    }
    .input{
        margin: 5px 0 15px 0;
    }

</style>
