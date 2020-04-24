//菜单配置
export default [{
    name: 'fun1',
    meta: {
        title: '服务总线中心',
        icon: 'iconfont icon-jichuguanli'
    },
    sub: [
        {
            name: 'examinationDatabase',
            meta: {
                index: `/ExaminationDatabase`,
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
        title: '注册查询管理中心',
        icon: 'iconfont icon-gongnengdingyi'
    },
    sub: [
        {
            name: 'Configure',
            meta: {
                index: `/Configure`,
                title: '注册查询中心配置',
                type: 'menu',
                active: true
            }
        }, {
            name: 'papersList',
            meta: {
                index: `/PapersList`,
                title: '服务元数据管理',
                type: 'menu',
                active: false
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
        title: 'DDS主题管理中心',
        icon: 'iconfont icon-yingyongguanli'
    },
    sub: [
        {
            name: 'examinationPerformance',
            meta: {
                index: `/ExaminationPerformance`,
                title: 'DDS主题管理',
                type: 'menu',
                active: true
            }
        }, {
            name: 'DataAnalysis',
            meta: {
                index: `/DataAnalysis`,
                title: 'DDS主题订阅管理',
                type: 'menu',
                active: true
            }
        }
    ]
}, {
    name: 'fun4',
    meta: {
        title: '用户权限管理中心',
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
            name: 'papersList',
            meta: {
                index: `/PapersList`,
                title: '角色管理',
                type: 'menu',
                active: true
            }
        }
    ]
}]
