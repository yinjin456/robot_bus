<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="XSD文件列表" name="1">
                <div>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            size="small"
                            height="69vh">
                        <el-table-column
                                prop="fileId"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                prop="fileName"
                                label="XSD名称">
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="创建时间">
                        </el-table-column>
                        <el-table-column
                                width="160"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="downloadXsd(scope.$index, tableData)" size="small">下载</el-button>
                                <el-button type="text" @click="jumpXsdFileDetail(scope.$index, tableData)" size="small">查看详情</el-button>
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
            <el-tab-pane label="新增XSD文件" name="2">
                <div class="content">
                    <el-form label-position="left" label-width="110px" >
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="XSD名称">
                                    <el-input v-model="params.filename"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="XSD文件">
                                    <el-upload
                                            class="upload-demo"
                                            action="http://106.13.177.169:8181/Robot/FileController/upLoadFile"
                                            :data="params"
                                            ref="upload"
                                            :before-remove="beforeRemove"
                                            :on-success="onSuccess"
                                            :on-error="onError"
                                            multiple
                                            drag
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            :file-list="fileList">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        <div class="el-upload__tip" slot="tip"></div>
                                    </el-upload>

                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row class="button-box">
                        <el-button type="primary" class="ebutton" @click="submitUpload">确认添加</el-button>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "XsdFile",
        data() {
            return {
                activeName: '1',
                tableData: [],
                pageSize: 20,
                total:0,
                currentPage: 1,
                fileList: [],
                params:{
                    xsdFiles:"",
                    filename:"test",
                    operationUser:this.Cookie.getJSON('loginInfo').userId,
                }
            };
        },
        methods: {
            onSuccess(response,file,fileList){
                console.log(response)
                console.log(file)
                console.log(fileList)
            },
            onError(err){
                console.log(err)
            },
            handleExceed() {
                this.$message.warning(`仅能上传1个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
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
                    .get(this.Global.baseUrl3 + '/Robot/FileQueryController/getXSDFilePage', {
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
            downloadXsd(index, rows){
                window.location.href = "http://106.13.177.169:8181/Robot/file/" + rows[index].fileURL;
            },
            jumpXsdFileDetail(index, rows){
                this.$router.push({
                    path: '/XsdFileDetail',
                    query: {
                        fileId: rows[index].fileId
                    }
                })
            },
            submitUpload() {
                console.log(this.$refs.upload)
                // this.$refs.upload.submit();
            },

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
