import App from '../App.vue'

//定义常量
const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login')
const Basic = r => require.ensure([], () => r(require('@/pages/Basic')), 'Basic')
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const Building = r => require.ensure([], () => r(require('@/pages/Building')), 'Building')
const BusManage = r => require.ensure([], () => r(require('@/pages/service-bus/BusManage')), 'BusManage')
const UserManage = r => require.ensure([], () => r(require('@/pages/user/UserManage')), 'UserManage')
const Robots = r => require.ensure([], () => r(require('@/pages/service-registration/robot/Robots')), 'Robots')
const RobotDetail = r => require.ensure([], () => r(require('@/pages/service-registration/robot/RobotDetail')), 'RobotDetail')
const Registration = r => require.ensure([], () => r(require('@/pages/service-registration/registration-service/Registration')), 'Registration')
const RegistrationDetail = r => require.ensure([], () => r(require('@/pages/service-registration/registration-service/RegistrationDetail')), 'RegistrationDetail')
const ServiceComponents = r => require.ensure([], () => r(require('@/pages/service-registration/service-component/ServiceComponents')), 'ServiceComponents')
const ServiceComponentDetail = r => require.ensure([], () => r(require('@/pages/service-registration/service-component/ServiceComponentDetail')), 'ServiceComponentDetail')
const SubscribeManagement = r => require.ensure([], () => r(require('@/pages/dds/SubscribeManagement')), 'SubscribeManagement')
const ThemeManagement = r => require.ensure([], () => r(require('@/pages/dds/ThemeManagement')), 'ThemeManagement')


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
                    name:'/ThemeManagement',
                    path:'/ThemeManagement',
                    component:ThemeManagement
                },
                //DDS主题订阅管理
                {
                    name:'/SubscribeManagement',
                    path:'/SubscribeManagement',
                    component:SubscribeManagement
                }

            ]
        }
    ]
}]
