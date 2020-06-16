<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="xsd文件详情"></el-page-header>
        </div>
        <div class="content">
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input v-model="xsd.fileName" disabled>
                        <template slot="prepend">xsd文件名</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="xsd.fileId" disabled>
                        <template slot="prepend">xsd文件id</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input v-model="xsd.createUserId" disabled>
                        <template slot="prepend">创建者id</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="xsd.createDate" disabled>
                        <template slot="prepend">创建日期</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="12">
                    <el-input v-model="xsd.modifyUserId" disabled>
                        <template slot="prepend">最近一次修改人id</template>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="xsd.modifyDate" disabled>
                        <template slot="prepend">最近一次修改日期</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="button-box">
                <el-button type="primary" class="ebutton" @click="downloadXsd()">下载xsd文件</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "XsdFileDetail",
        data () {
            return {
                xsd: {
                    "fileId": null,
                    "fileName": null,
                    "fileUrl": null,
                    "flag": null,
                    "createUserId": null,
                    "createDate": null,
                    "modifyUserId": null,
                    "modifyDate": null
                }
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getUser(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl3 + '/Robot/FileQueryController/getXSDFile', {
                        params: {
                            fileId:that.$route.query.fileId,
                            operationUser:this.Cookie.getJSON('loginInfo').userId
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        that.xsd = response.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            downloadXsd(){
                window.location.href = "http://106.13.177.169:8181/Robot/file/" + this.xsd.fileUrl;
            }
        },
        activated(){
            this.getUser()
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
        padding: 15px 0;
        height: 70vh;
    }
    .content-id{
        border-radius: 4px;
        margin: 5px 0 25px 0;
        font-weight: bolder;
        color: #767676;
    }
    .el-row {
        margin-bottom: 20px;
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
    .content{
        padding: 15px 0;
        height: 70vh;
    }
    .content-id-box{
        margin-bottom: 15px;
    }
    .content-id{
        margin: 10px 5px;
        font-size: 0.9em;
        font-weight: bolder;
        color: #5a5a5a;
        display: block;
    }
</style>
