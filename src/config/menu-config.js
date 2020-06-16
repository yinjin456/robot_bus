//菜单配置
export default [{
    name: 'fun1',
    meta: {
        title: '服务总线管理',
        icon: 'iconfont icon-jichuguanli'
    },
    sub: [
        {
            name: 'Building',
            meta: {
                index: `/Building`,
                title: 'zookeeper设置',
                type: 'menu',
                active: true
            }
        },
        {
            name: 'BusManage',
            meta: {
                index: `/BusManage`,
                title: '服务总线实例管理',
                type: 'menu',
                active: true
            }
        }
    ]
}, {
    name: 'fun2',
    meta: {
        title: '服务注册查询',
        icon: 'iconfont icon-gongnengdingyi'
    },
    sub: [
        {
            name: 'Registration',
            meta: {
                index: `/Registration`,
                title: '注册查询中心配置',
                type: 'menu',
                active: true
            }
        }, {
            name: 'XsdFile',
            meta: {
                index: `/XsdFile`,
                title: 'XSD文件管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'Robots',
            meta: {
                index: `/Robots`,
                title: '机器人注册管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'ServiceComponents',
            meta: {
                index: `/ServiceComponents`,
                title: '服务组件注册管理',
                type: 'menu',
                active: true
            }
        }
    ]
}, {
    name: 'fun3',
    meta: {
        title: 'DDS主题订阅',
        icon: 'iconfont icon-yingyongguanli'
    },
    sub: [
        {
            name: 'Topic',
            meta: {
                index: `/Topic`,
                title: 'DDS主题管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'Subscribe',
            meta: {
                index: `/Subscribe`,
                title: 'DDS主题订阅管理',
                type: 'menu',
                active: false
            }
        }
    ]
}, {
    name: 'fun4',
    meta: {
        title: '用户权限管理',
        icon: 'iconfont icon-quanxianshenpi'
    },
    sub: [
        {
            name: 'UserManage',
            meta: {
                index: `/UserManage`,
                title: '用户管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'RoleManage',
            meta: {
                index: `/RoleManage`,
                title: '角色管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'PrivilegeManage',
            meta: {
                index: `/PrivilegeManage`,
                title: '权限管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'CreateUser',
            meta: {
                index: `/CreateUser`,
                title: '创建用户',
                type: 'menu',
                active: true
            }
        }
    ]
}]
