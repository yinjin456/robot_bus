import App from '../App.vue'

//定义常量
const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login')
const Basic = r => require.ensure([], () => r(require('@/pages/Basic')), 'Basic')
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const BusManage = r => require.ensure([], () => r(require('@/pages/bus/BusManage')), 'BusManage')
const UserManage = r => require.ensure([], () => r(require('@/pages/user/UserManage')), 'UserManage')
const ServiceComponents = r => require.ensure([], () => r(require('@/pages/registration/ServiceComponents')), 'ServiceComponents')
const Robots = r => require.ensure([], () => r(require('@/pages/registration/Robots')), 'Robots')
const Configure = r => require.ensure([], () => r(require('@/pages/registration/Configure')), 'Configure')

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
                //机器人注册管理
                {
                    name:'/Robots',
                    path:'/Robots',
                    component:Robots
                },
                //注册查询中心配置
                {
                    name:'/Configure',
                    path:'/Configure',
                    component:Configure
                }

            ]
        }
    ]
}]
