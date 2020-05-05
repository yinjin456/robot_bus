<template>
    <div>
        <div class="title">
            <el-page-header @back="goBack" content="组件详情"></el-page-header>
        </div>
        <div class="content">
            <div class="content-id-box">
                <div class="content-id">
                    机器人编号 : {{robotCommon.robotId}}
                </div>
                <div class="content-id" v-if="robotCommon.onoff==true" style="color: #4cb72e">
                    启停状态 : 运行
                </div>
                <div class="content-id" v-else style="color: #ff4300">
                    启停状态 : 停止
                </div>
            </div>
            <!--通用数据-->
            <div>
                <el-divider content-position="left"><span class="divide">通用数据</span></el-divider>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotname">
                            <template slot="prepend">机器人名称</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotTypeId">
                            <template slot="prepend">机器人类型</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotDeviceId">
                            <template slot="prepend">出厂id</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotModel">
                            <template slot="prepend">出厂型号</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotVendor">
                            <template slot="prepend">生产厂家</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotPower">
                            <template slot="prepend">工作额定功率</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvTempMax">
                            <template slot="prepend">工作环境最高温度</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvTempMin">
                            <template slot="prepend">工作环境最低温度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvHumiMax">
                            <template slot="prepend">工作环境最大湿度</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="robotCommon.robotWorkEnvHumiMin">
                            <template slot="prepend">工作环境最小湿度</template>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
            <!--多关节机器人数据-->
            <div v-if="articulatedrobotT!=null">
                <el-divider content-position="left"><span class="divide">多关节机器人数据</span></el-divider>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotRatedLoad">
                            <template slot="prepend">关节机器人额定负载</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotRepeatedAccuracy">
                            <template slot="prepend">关节机器人重复精度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotMaxWorkRange">
                            <template slot="prepend">关节机器人最大工作范围</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotAdditionalDevice">
                            <template slot="prepend">附加设备</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntSupport">
                            <template slot="prepend">支持坐标系类型</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCartesianX">
                            <template slot="prepend">笛卡尔坐标系-x</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCartesianY">
                            <template slot="prepend">笛卡尔坐标系-y</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCartesianZ">
                            <template slot="prepend">笛卡尔坐标系-z</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCartesianA">
                            <template slot="prepend">笛卡尔坐标系-a</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCartesianB">
                            <template slot="prepend">笛卡尔坐标系-b</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCartesianC">
                            <template slot="prepend">笛卡尔坐标系-c</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntRectangularX">
                            <template slot="prepend">直角坐标系-x</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntRectangularY">
                            <template slot="prepend">直角坐标系-y</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntRectangularZ">
                            <template slot="prepend">直角坐标系-z</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCylindricalR">
                            <template slot="prepend">圆柱坐标系-r</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCylindricalΘ">
                            <template slot="prepend">圆柱坐标系-Θ</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntCylindricalZ">
                            <template slot="prepend">圆柱坐标系-z</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntPolarR">
                            <template slot="prepend">极坐标系-r</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntPolarΘ">
                            <template slot="prepend">极坐标系-Θ</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotCrdntPolarΦ">
                            <template slot="prepend">极坐标系-Φ</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotJointCount">
                            <template slot="prepend">关节数量</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotJointType">
                            <template slot="prepend">关节类型</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotLinearJointMaxPosi">
                            <template slot="prepend">线性关节最远行程</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotLinearJointMinPosi">
                            <template slot="prepend">线性关节最短行程</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotLinearJointMaxSpeed">
                            <template slot="prepend">线性关节最大速度</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotRotateJointMaxAngle">
                            <template slot="prepend">转动关节最大角度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotRotateJointMinAngle">
                            <template slot="prepend">转动关节最小角度</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotRotateJointMaxAngularVelocity">
                            <template slot="prepend">转动关节最大转动角速度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotRotateJointSpeedLevel">
                            <template slot="prepend">关节移动速度级别</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotJointSerialNumber">
                            <template slot="prepend">关节索引序号</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotJointPermissibleTorque">
                            <template slot="prepend">关节容许力矩</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotControlEnable">
                            <template slot="prepend">控制使能</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.jointRobotControlMode">
                            <template slot="prepend">控制运行模式</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisMaxInertiaMoment">
                            <template slot="prepend">容许惯性力矩</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisPermissibleTorque">
                            <template slot="prepend">容许力矩</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisRepeatedAccuracy">
                            <template slot="prepend">重复精度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisJointPosi">
                            <template slot="prepend">当前关节位置</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisJoinTvel">
                            <template slot="prepend">当前关节速度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisSpheCoordinateR">
                            <template slot="prepend">当前球坐标距离</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisSpheCoordinateΘ">
                            <template slot="prepend">当前球坐标仰角</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisSpheCoordinateΦ">
                            <template slot="prepend">当前球坐标方向角</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="articulatedrobotT.robot6axisCartVel">
                            <template slot="prepend">末端笛卡尔速度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <div v-if="articulatedrobotT.templateData != null">
                    <el-divider content-position="left"><span class="divide">自定义属性</span></el-divider>
                    <el-row :gutter="30" v-for="(item,key) in articulatedrobotT.templateData" :key="key">
                        <el-input placeholder="请输入内容" v-model="item.value">
                            <template slot="prepend">item.name</template>
                        </el-input>
                    </el-row>
                </div>
            </div>
            <!--爬壁机器人数据-->
            <div v-if="wallclimbingrobotT!=null">
                <el-divider content-position="left"><span class="divide">爬壁机器人数据</span></el-divider>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotRatedLoad">
                            <template slot="prepend">额定负载</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotRadiusCurvature">
                            <template slot="prepend">曲面适应能力</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotObstacleCrossingCapacity">
                            <template slot="prepend">越障能力</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotAdsorptionMode">
                            <template slot="prepend">吸附方式</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotAdsorbabilityLevel">
                            <template slot="prepend">吸附力度级别</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotMoveMode">
                            <template slot="prepend">移动方式</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotMaxMovingSpeed">
                            <template slot="prepend">最大移动速度</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotMovingDirectionAngles">
                            <template slot="prepend">前进方向角度</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotMovingSpeedLevel">
                            <template slot="prepend">移动速度级别</template>
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotAttitudeInformation">
                            <template slot="prepend">姿态信息</template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-input placeholder="请输入内容" v-model="wallclimbingrobotT.climbingRobotAdditionalDevice">
                            <template slot="prepend">附加设备</template>
                        </el-input>
                    </el-col>
                </el-row>
                <div v-if="wallclimbingrobotT.templateData != null">
                    <el-divider content-position="left"><span class="divide">自定义属性</span></el-divider>
                    <el-row :gutter="30" v-for="(item,key) in wallclimbingrobotT.templateData" :key="key">
                        <el-input placeholder="请输入内容" v-model="item.value">
                            <template slot="prepend">item.name</template>
                        </el-input>
                    </el-row>
                </div>
            </div>
            <el-row class="button-box">
                <el-button type="warning" class="ebutton" @click="updateRobotCommon">修改</el-button>
                <el-button type="danger" class="ebutton del" @click="deleteRobotCommon">删除</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RobotDetail",
        data () {
            return {
                robotCommon: null,
                articulatedrobotT:null,
                wallclimbingrobotT:null
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getRobotCommon(){
                var that = this;
                this.axios
                    .get(this.Global.baseUrl + '/getRobotAllInfo', {
                        params: {
                            robotId:that.$route.query.robotId
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        that.robotCommon = response.data.robotcommon;
                        that.articulatedrobotT = response.data.articulatedrobotT;
                        that.wallclimbingrobotT = response.data.wallclimbingrobotT;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateRobotCommon(){
                var that = this;
                this.axios({
                    url: this.Global.baseUrl + '/updateCommon',
                    method: 'POST',
                    params: {
                        robotId:that.robotCommon.robotId,
                        robotname:that.robotCommon.robotname,
                        robotTypeId:that.robotCommon.robotTypeId,
                        onoff:that.robotCommon.onoff,
                        robotDeviceId:that.robotCommon.robotDeviceId,
                        robotModel:that.robotCommon.robotModel,
                        robotVendor:that.robotCommon.robotVendor,
                        robotWorkEnvTempMax:that.robotCommon.robotWorkEnvTempMax,
                        robotWorkEnvTempMin:that.robotCommon.robotWorkEnvTempMin,
                        robotWorkEnvHumiMax:that.robotCommon.robotWorkEnvHumiMax,
                        robotWorkEnvHumiMin:that.robotCommon.robotWorkEnvHumiMin,
                        robotPower:that.robotCommon.robotPower,
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
            deleteRobotCommon(){
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
            this.getRobotCommon()
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
        padding: 15px 20px 15px 5px;
        height: 70vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .content-id-box{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        width: 60%;
    }
    .content-id{
        border-radius: 4px;
        margin: 5px 0;
        font-weight: bolder;
        color: #767676;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-divider{
        margin: 50px 0 30px 0;
    }
    .divide{
        font-size: 1.2em;
        color: #767676;
        font-weight: bolder;
    }
    .button-box{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
    }
    .ebutton{
        width: 130px;
    }
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 6px;
        box-shadow   : inset 0 0 5px rgba(13, 152, 227, 0.2);
        background   : rgba(13, 151, 226, 0.49);
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background   : #ededed;
    }
</style>