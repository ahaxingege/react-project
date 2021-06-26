import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { Home } from './components/Home';
import List from './components/List';
import Goods from './components/Goods';
import Goods_detail from './components/Goods_detail';
import Mine from './components/Mine';
import Cart from './components/Cart';
import { NotFound } from './components/Page';
//引入ant-design-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';
import './sass/page.scss';
import { connect } from 'react-redux';
// fontawesome'@fortawesome/fontawesome-svg-core
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faListUl,
    faShoppingCart,
    faAssistiveListeningSystems
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faHome,
    faListUl,
    faShoppingCart,
    faAssistiveListeningSystems
)



class App extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {
                    title: '首页',
                    path: '/home',
                    icon: 'home'
                },
                {
                    title: '发现',
                    path: '/list',
                    icon: 'shopping-cart'
                },
                {
                    title: '我的商城',
                    path: '/mine',
                    icon: 'assistive-listening-systems'
                }
            ],
            cart_bottom_tab: [
                {
                    title: '客服',
                    path: '/home',
                    icon: 'home'
                },
                {
                    title: '',
                    path: '/list',
                    icon: 'shopping-cart'
                },
                {
                    title: '立即购买',
                    path: '/mine',
                    icon: ''
                },
                {
                    title: '加入购物车',
                    path: '/mine',
                    icon: ' '
                }
            ],
            currentTab: 0
        }
    }

    handlerClick(idx, path) {
        this.setState({
            currentTab: idx
        });
        this.props.history.push(path);
    }


    componentWillMount() {
        //获取hash值
        // console.log(this.props.godie)
        let hash = window.location.hash.slice(1);//#list

        //找出对应索引值
        let currentTab = 0
        this.state.tabs.some((item, idx) => {
            currentTab = idx;
            return item.path === hash
        });
        this.setState({
            currentTab
        });
    }
    render() {
        return <div className="container">
            <div className="content">
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/list" component={List} />
                    <Route path="/mine" component={Mine} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/goods/:id" component={Goods} />
                    <Route path="/404" component={NotFound} />
                    <Redirect from="/" to="/home" exact />
					// <Redirect from="/goods" to="/goods_detail" />
                    <Redirect to="/404" />
                </Switch>
            </div>
            <TabBar
                hidden={this.props.godie}
                unselectedTintColor="#fff"
                tintColor="#f00"
                barTintColor="rgba(85,85,85,0.95)"
                noRenderContent={true}
            >
                {
                    this.state.tabs.map((tab, idx) => {
                        return <TabBar.Item
                            title={tab.title}
                            key={tab.path}
                            icon={<FontAwesomeIcon icon={tab.icon} />}
                            selectedIcon={<FontAwesomeIcon icon={tab.icon} />}
                            selected={this.state.currentTab === idx}
                            onPress={this.handlerClick.bind(this, idx, tab.path)}
                        >
                            {tab.title}
                        </TabBar.Item>
                    })
                }

            </TabBar>

        </div>
    }
}

//利用高阶组件传递路由参数
let mapStateToProps = (state) => {
    console.log(state)
    return {
        godie: state.commonReducer.state
    }
}
App = connect(mapStateToProps)(App);

App = withRouter(App);
export default App;