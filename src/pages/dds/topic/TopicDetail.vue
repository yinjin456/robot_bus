<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="订阅者详情"></el-page-header>
        </div>
        <div class="content">
            <div class="content-id-box">
                <div class="content-id">
                    主题名称 : {{topicName}}
                </div>
                <div class="content-id">
                    域ID : {{domainId}}
                </div>
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    size="small"
                    height="61vh">
                <el-table-column
                        prop="subscribeId"
                        label="订阅者ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="serviceId"
                        label="服务ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="recieveAddress"
                        label="订阅者接收消息地址">
                </el-table-column>
                <el-table-column
                        prop="subscriberType"
                        label="订阅类型">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="订阅日期">
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="enddate"-->
<!--                        label="取消订阅日期"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        width="180"-->
<!--                        label="状态">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="text" @click="Grade(scope.row)" size="small">订阅</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
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
    </div>
</template>

<script>
    export default {
        name: "TopicDetail",
        data () {
            return {
                tableData:[],
                topic:null,
                topicName:null,
                domainId:null,
                pageSize: 20,
                currentPage: 1,
                total:0,
            }
        },
        methods: {
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
            goBack(){
                this.$router.go(-1)
            },
            getSubscribers(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl2 + '/subscriber/get/selective',{
                        params:{
                            currentPage:this.currentPage,
                            size:this.pageSize,
                            topicId:this.$route.query.topicId
                        }
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
            updateTopic(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl + '/updateTopic',
                    method: 'POST',
                    params: {
                        routingTo:that.Topic.routingTo,
                        routingFrom:that.Topic.routingFrom
                    },
                    headers:{'Content-Type': "application/json"}
                }).then(function (response) {
                    console.log(response);
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }).catch(function (error) {
                    that.$message.error('修改失败');
                    console.log(error);
                });
            },
            deleteTopic(){
                this.$confirm('确认要删除该服务组件吗', '删除确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        activated(){
            this.getSubscribers();
            this.domainId = this.$route.query.domainId;
            this.topicName = this.$route.query.topicName;
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100%;
    }
    .title{
        padding: 8px 0;
        font-weight: bolder;
        font-size: 1.4em;
        border-bottom: solid 2px #3F85ED;
    }
    .content{
        padding: 8px 0 15px 0;
        height: 70vh;
    }
    .content-id-box{
        margin-bottom: 10px;
    }
    .content-id{
        margin: 6px 5px;
        font-size: 0.9em;
        font-weight: bolder;
        color: #5a5a5a;
        display: block;
    }

</style>