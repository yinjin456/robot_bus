import App from '../App.vue'

//定义常量
const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login')
const Basic = r => require.ensure([], () => r(require('@/pages/Basic')), 'Basic')
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const Building = r => require.ensure([], () => r(require('@/pages/Building')), 'Building')
const BusManage = r => require.ensure([], () => r(require('@/pages/service-bus/BusManage')), 'BusManage')
const Robots = r => require.ensure([], () => r(require('@/pages/service-registration/robot/Robots')), 'Robots')
const RobotDetail = r => require.ensure([], () => r(require('@/pages/service-registration/robot/RobotDetail')), 'RobotDetail')
const Registration = r => require.ensure([], () => r(require('@/pages/service-registration/registration-service/Registration')), 'Registration')
const RegistrationDetail = r => require.ensure([], () => r(require('@/pages/service-registration/registration-service/RegistrationDetail')), 'RegistrationDetail')
const ServiceComponents = r => require.ensure([], () => r(require('@/pages/service-registration/service-component/ServiceComponents')), 'ServiceComponents')
const ServiceComponentDetail = r => require.ensure([], () => r(require('@/pages/service-registration/service-component/ServiceComponentDetail')), 'ServiceComponentDetail')
const XsdFile = r => require.ensure([], () => r(require('@/pages/service-registration/xsd-file/XsdFile')), 'XsdFile')
const XsdFileDetail = r => require.ensure([], () => r(require('@/pages/service-registration/xsd-file/XsdFileDetail')), 'XsdFileDetail')
const Topic = r => require.ensure([], () => r(require('@/pages/dds/topic/Topic')), 'Topic')
const TopicDetail = r => require.ensure([], () => r(require('@/pages/dds/topic/TopicDetail')), 'TopicDetail')
const UserManage = r => require.ensure([], () => r(require('@/pages/user-center/user/UserManage')), 'UserManage')
const UserDetail = r => require.ensure([], () => r(require('@/pages/user-center/user/UserDetail')), 'UserDetail')
const RoleManage = r => require.ensure([], () => r(require('@/pages/user-center/role/RoleManage')), 'RoleManage')
const RoleDetail = r => require.ensure([], () => r(require('@/pages/user-center/role/RoleDetail')), 'RoleDetail')
const PrivilegeManage = r => require.ensure([], () => r(require('@/pages/user-center/privilege/PrivilegeManage')), 'PrivilegeManage')
const PrivilegeDetail = r => require.ensure([], () => r(require('@/pages/user-center/privilege/PrivilegeDetail')), 'PrivilegeDetail')
const CreateUser = r => require.ensure([], () => r(require('@/pages/user-center/CreateUser')), 'CreateUser')
const UserInfo = r => require.ensure([], () => r(require('@/pages/user-center/UserInfo')), 'UserInfo')
const PasswordInfo = r => require.ensure([], () => r(require('@/pages/user-center/PasswordInfo')), 'PasswordInfo')



export default [{
    path:'/',
    component:App,//顶层路由 index.html
    children:[//二级路由 App.vue
        //默认跳转首页
        {
            path:'',
            redirect:'/Login'
        },
        //登录
        {
            name:'/Login',
            path:'/Login',
            component:Login,
        },
        //首页框架
        {
            name:'/Basic',
            path:'/Basic',
            component:Basic,
            children:[
                //主页
                {
                    name:'/Home',
                    path:'/Home',
                    component:Home
                },
                //构建页
                {
                    name:'/Building',
                    path:'/Building',
                    component:Building
                },
                //总线管理
                {
                    name:'/BusManage',
                    path:'/BusManage',
                    component:BusManage
                },
                //用户列表
                {
                    name:'/UserManage',
                    path:'/UserManage',
                    component:UserManage
                },
                //用户列表详情
                {
                    name:'/UserDetail',
                    path:'/UserDetail',
                    component:UserDetail
                },
                //用户信息
                {
                    name:'/UserInfo',
                    path:'/UserInfo',
                    component:UserInfo
                },
                //用户密码
                {
                    name:'/PasswordInfo',
                    path:'/PasswordInfo',
                    component:PasswordInfo
                },
                //角色管理
                {
                    name:'/RoleManage',
                    path:'/RoleManage',
                    component:RoleManage
                },
                //角色管理
                {
                    name:'/RoleDetail',
                    path:'/RoleDetail',
                    component:RoleDetail
                },
                //权限管理
                {
                    name:'/PrivilegeManage',
                    path:'/PrivilegeManage',
                    component:PrivilegeManage
                },
                //权限详情
                {
                    name:'/PrivilegeDetail',
                    path:'/PrivilegeDetail',
                    component:PrivilegeDetail
                },
                //创建用户
                {
                    name:'/CreateUser',
                    path:'/CreateUser',
                    component:CreateUser
                },
                //服务组件注册管理
                {
                    name:'/ServiceComponents',
                    path:'/ServiceComponents',
                    component:ServiceComponents
                },
                //服务组件详情
                {
                    name:'/ServiceComponentDetail',
                    path:'/ServiceComponentDetail',
                    component:ServiceComponentDetail
                },
                //XsdFile
                {
                    name:'/XsdFile',
                    path:'/XsdFile',
                    component:XsdFile
                },
                //XsdFileDetail
                {
                    name:'/XsdFileDetail',
                    path:'/XsdFileDetail',
                    component:XsdFileDetail
                },
                //机器人注册管理
                {
                    name:'/Robots',
                    path:'/Robots',
                    component:Robots
                },
                //机器人注册管理详情
                {
                    name:'/RobotDetail',
                    path:'/RobotDetail',
                    component:RobotDetail
                },
                //注册查询中心
                {
                    name:'/Registration',
                    path:'/Registration',
                    component:Registration
                },
                //注册查询中心详情
                {
                    name:'/RegistrationDetail',
                    path:'/RegistrationDetail',
                    component:RegistrationDetail
                },
                //DDS主题管理
                {
                    name:'/Topic',
                    path:'/Topic',
                    component:Topic
                },
                //DDS主题管理详情
                {
                    name:'/TopicDetail',
                    path:'/TopicDetail',
                    component:TopicDetail
                },

            ]
        }
    ]
}]
