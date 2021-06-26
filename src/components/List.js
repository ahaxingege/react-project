import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { Carousel, Grid } from 'antd-mobile';
import Computer from './Computer';
import Footnav from './common/Footnav';
class List extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			adv_list: [],
			explode3: [],
			home3: [],
			goods_1: [],
			goods_2: [],
			isshow: 'none'
		}
		this.goback = this.goback.bind(this);
		this.goDetail = this.goDetail.bind(this);
	}

	handlerClick(tab, idx) {
		//改变url地址
		let { history, match } = this.props;
		//list/:id
		let url = match.path + tab.path
		history.push(url);
	}
	componentWillMount() {
		//http://www.hangowa.com/mo_bile/index.php?act=goods&op=goods_detail&goods_id=104580&key=
		// http://www.hangowa.com/mo_bile/index.php?act=index&op=special&special_id=1
		axios.get('/api/mo_bile/index.php', {
			params: {
				act: 'index',
				op: 'special',
				special_id: 1
			}
		}).then(res => {
			let data = res.data.datas;
			console.log(data)
			let adv_list = data.list[0].adv_list.item
			let explode3 = data.list[1].explode3
			let home3 = data.list[2].home3
			let goods_1 = data.list[3].goods
			let goods_2 = data.list[4].goods
			this.setState({
				data,
				adv_list,
				explode3,
				home3,
				goods_1,
				goods_2
			});
			console.log(this.state)
		});

		console.log('List:', this.props)
	}
	showIt() {
		console.log(111)
		this.setState({
			isshow: 'block'
		});

	}
	goback() {
		window.history.go(-1);
	};

	hideIt() {
		console.log(111)
		if (this.state.isshow == "block") {
			this.setState({
				isshow: 'none'
			});
		}
	}
	goDetail(goods) {
		//获取history
		let { history } = this.props;
		console.log(history);
		if (goods.data) {
			if (goods.data.indexOf('http') == '-1') {
				localStorage.setItem('goods', JSON.stringify(goods.data));
				history.push({
					pathname: '/goods/' + goods.data,
					state: goods,
					params: goods,
				});
			} else {
				setTimeout(function () {
					alert('数据请求错误')
					window.location.reload();
					this.goback();
				}, 500)
			}
		} else {
			localStorage.setItem('goods', JSON.stringify(goods.goods_id));
			history.push({
				pathname: '/goods/' + goods.goods_id,
				state: goods,
				params: goods
			});
		}
	}

	render() {

		return <div onClick={this.hideIt.bind(this)}>
			<header className="Listheader">
				<div className="list_header" style={{ fontSize: "0.6rem" }}>
					<div onClick={this.goback.bind(this)}>
						<a style={{ fontSize: "0.6rem" }} className="fa fa-chevron-left"></a>
					</div>
					<div>{this.state.data.special_desc}</div>
					<div onClick={this.showIt.bind(this)} className="fa fa-ellipsis-h"></div>
				</div>
				<div style={{
					display: this.state.isshow, zIndex: '9999'
				}} className="navLock">
					<div>
						<span></span>
						<ul>
							<li>
								<a>
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
								<a>
									<i className="fa fa-shopping-cart"></i>
									购物车
								</a>
							</li>
							<li>
								<a>
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
				</div>
			</header>
			<div >
				<Carousel
					autoplay={true}
					infinite
				>
					{this.state.adv_list.map(goods => (
						<a
							key={goods.data}
							onClick={this.goDetail.bind(this, goods)}
							style={{ height: '7rem' }}
						>
							<img
								src={goods.image}
								style={{ width: '100%', verticalAlign: 'top' }}
								onLoad={() => {
									window.dispatchEvent(new Event('resize'));
								}}
							/>
						</a>
					))}
				</Carousel>
			</div>
			<div className="List_content">
				<div className="List_first">
					<h4>{this.state.explode3.title}</h4>
					<Grid
						data={this.state.explode3.item}
						activeClassName="active"
						columnNum={3}
						hasLine={false}
						itemStyle={{ height: '1.4rem' }}
						renderItem={(goods, idx) => {
							return (
								<div className="goods-i" onClick={this.goDetail.bind(this, goods)}>
									<img src={goods.image} />
								</div>
							)
						}}
					/>
				</div>
				<div className="List_second">
					<p>{this.state.home3.title}</p>
					<Grid
						data={this.state.home3.item}
						activeClassName="active"
						columnNum={2}
						hasLine={false}
						itemStyle={{ height: '2.4rem' }}
						renderItem={(goods, idx) => {
							return (
								<div className="goods-i" onClick={this.goDetail.bind(this, goods)}>
									<img src={goods.image} />
								</div>
							)
						}}
					/>
				</div>
				<div className="List_third">
					<p style={{ textAlign: 'center', padding: "0.1rem 0" }}>{this.state.goods_1.title}</p>
					<Grid
						data={this.state.goods_1.item}
						activeClassName="active"
						columnNum={2}
						hasLine={false}
						itemStyle={{ height: '6.8rem', margin: "0 2px" }}
						renderItem={(goods, idx) => {
							return (
								<div className="goods-i" onClick={this.goDetail.bind(this, goods)}>
									<img src={goods.goods_image} />
									<p style={{ height: '0.9rem', overflow: "hidden", borderBottom: '1px solid #ccc' }}>{goods.goods_name}</p>
									<p className="price"><span>{goods.goods_promotion_price}</span></p>
								</div>
							)
						}}
					/>
				</div>
				<div>
					<div className="List_fourth">
						<p style={{ textAlign: 'center', padding: "0.1rem 0" }}>{this.state.goods_2.title}</p>
						<Grid
							data={this.state.goods_2.item}
							activeClassName="active"
							columnNum={2}
							hasLine={false}
							itemStyle={{ height: '6.8rem', margin: "0 2px" }}
							renderItem={(goods, idx) => {
								return (
									<div className="goods-i" onClick={this.goDetail.bind(this, goods)}>
										<img src={goods.goods_image} />
										<p style={{ height: '0.9rem', overflow: "hidden", borderBottom: '0.01rem solid #ccc' }}>{goods.goods_name}</p>
										<p className="price"><span>{goods.goods_promotion_price}</span></p>
									</div>
								)
							}}
						/>
					</div>
				</div>

			</div>

			<Footnav />


		</div>
	}


}



List = withRouter(List);

export default List;
































//         let {match} = this.props;
//         return <div className="list">
//             <ul>
//             {
//                 this.state.menu.map(item=>{
//                     //key遵循的原则：唯一、稳定
//                     return <li key={item.path} onClick={this.handlerClick.bind(this,item)}>{item.title}</li>
//                 })
//             }
//             </ul>
//             {/* <Switch>
//                 <Route path={match.url + "/computer"} component={Computer} />
//                 <Route path={match.url +"/phone"} render={()=><strong>我的手机</strong>} />
//                 <Route path={match.url +"/pad"} render={()=><strong>我的平板</strong>} />
//             </Switch> */}
// 
//             
//         </div>

//<Computer {...this.props}/>