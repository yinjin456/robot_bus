//目录配置
export default [{
    name: 'fun1',
    meta: {
        title: '服务总线管理',
        icon: 'iconfont icon-jichuguanli'
    },
    sub: [
        {
            name: 'examinationDatabase',
            meta: {
                index: `/ExaminationDatabase`,
                title: 'zookeeper设置',
                type: 'menu',
                active: false
            }
        },
        {
            name: 'BusManage',
            meta: {
                index: `/BusManage`,
                title: '服务总线实例管理',
                type: 'menu',
                active: false
            }
        }
    ]
}, {
    name: 'fun2',
    meta: {
        title: '注册查询中心管理',
        icon: 'iconfont icon-gongnengdingyi'
    },
    sub: [
        {
            name: 'addPapers',
            meta: {
                index: `/AddPapers`,
                title: '注册查询中心配置',
                type: 'menu',
                active: false
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
            name: 'papersList',
            meta: {
                index: `/PapersList`,
                title: '机器人注册管理',
                type: 'menu',
                active: false
            }
        }, {
            name: 'papersList',
            meta: {
                index: `/PapersList`,
                title: '服务组件注册管理',
                type: 'menu',
                active: false
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
                active: false
            }
        }, {
            name: 'DataAnalysis',
            meta: {
                index: `/DataAnalysis`,
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
                active: false
            }
        }, {
            name: 'papersList',
            meta: {
                index: `/PapersList`,
                title: '角色管理',
                type: 'menu',
                active: false
            }
        }
    ]
}]
