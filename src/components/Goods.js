import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { TabBar, Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import Goods_detail from './Goods_detail';
import Goods_eval from './Goods_eval';
import Goods_info from './Goods_info';
import { change_tab_bar } from '../action';
import 'antd-mobile/dist/antd-mobile.css';


class Goods extends Component {
	constructor() {
		super();
		this.state = {
			menu: [
				{
					title: '商品',
					path: '/goods_detail'
				},
				{
					title: '详情',
					path: '/goods_info'
				},
				{
					title: '评价',
					path: '/goods_eval'
				}
			],
			isshow: 'none',
			index: 0
		}
		this.handlerClick = this.handlerClick.bind(this);
	}
	handlerClick(tab, idx) {
		console.log(idx)
		this.setState({
			index: idx
		})
		//改变url地址
		// console.log(this.props)
		let { history, match } = this.props;
		//list/:id
		let route = match.url + tab.path
		// console.log(route)
		history.push(route);
	}
	componentWillMount() {
		console.log('List:', this.props)
		this.props.lilaoshi(true);

	}
	showIt() {
		// console.log(111)
		this.setState({
			isshow: 'block'
		});

	}
	goToHome() {
		let { history } = this.props;
		history.push({
			pathname: '/home'
		});
	}
	goToCart() {
		let { history } = this.props;
		history.push({
			pathname: '/cart'
		});
	}
	goToMine() {
		let { history } = this.props;
		history.push({
			pathname: '/mine'
		});
	}

	goToCart() {
		let { history } = this.props;
		history.push({
			pathname: '/cart'
		});
	}
	goToCart() {
		let { history } = this.props;
		history.push({
			pathname: '/cart'
		});
	}

	goback() {
		window.history.go(-1);
	};

	hideIt() {
		// console.log(222)
		if (this.state.isshow == "block") {
			this.setState({
				isshow: 'none'
			});
		}
	}
	render() {
		let { match } = this.props;
		return <div className="detail_header" onClick={this.hideIt.bind(this)}>
			<div className="detail_nav">
				<ul style={{ fontSize: "0.6rem" }}>
					<li onClick={this.goback.bind(this)}>
						<a className="fa fa-chevron-left"></a>
					</li>
					<li className="">
						{this.state.menu.map((tab, idx) => {
							//key遵循的原则：唯一、稳定
							return <a className={idx === this.state.index ? "active" : ""} style={{ fontSize: "0.4rem" }} key={tab.path} onClick={this.handlerClick.bind(this, tab, idx)}>{tab.title}</a>
						})
						}
					</li>
					<li className="fa fa-ellipsis-h navLock" onClick={this.showIt.bind(this)}>
						<div style={{ display: this.state.isshow, zIndex: '9999999999' }}>
							<span></span>
							<ul>
								<li>
									<a onClick={this.goToHome.bind(this)}>
										<i className="fa fa-home"></i>
										首页
									</a>
								</li>
								<li>
									<a>
										<i className="fa fa-search"></i>
										搜索
									</a>
								</li>
								<li>
									<a onClick={this.goToCart.bind(this)}>
										<i className="fa fa-shopping-cart"></i>
										购物车
									</a>
								</li>
								<li>
									<a onClick={this.goToMine.bind(this)}>
										<i className="fa fa-user-circle"></i>
										我的商城
									</a>
								</li>
								<li>
									<a>
										<i className="fa fa-commenting"></i>
										消息
									</a>
								</li>
							</ul>
						</div>

					</li>
				</ul>
			</div>
			<Switch>
				<Route path={match.url + "/goods_detail"} component={Goods_detail} />
				<Route path={match.url + "/goods_info"} component={Goods_info} />
				<Route path={match.url + "/goods_eval"} component={Goods_eval} />
				<Redirect from="/goods" to={match.url + "/goods_detail"} />
			</Switch>
		</div>

	}
}
//利用高阶组件传递路由参数

let mapDispatchToProps = (dispatch) => {
	return {
		lilaoshi(nidaye) {
			dispatch(change_tab_bar(nidaye))
		}
	}

}
Goods = connect(null, mapDispatchToProps)(Goods);

Goods = withRouter(Goods);

export default Goods;