import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import  {change_tab_bar,cart} from '../action';
import {Route,withRouter} from 'react-router-dom';
import {List,Stepper,Icon} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class Cart extends Component{

	constructor(){
			super();
			this.state = {
				isshow:'none',
				num:1
			}
	this.goback = this.goback.bind(this);
	}
	componentWillMount(){
		this.props.lilaoshi(true);
		console.log(this.props)
		// this.props.addGoods(this.state.goods_info);
		let path="http://127.0.0.1:3978"
		axios.post(path+'/api/book/find',{})
		.then((res)=>{
			console.log(res)
			alert(res.data.msg);
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	handleInputChange(e){
					this.setState({
						num: e.target.value
					});
					
	}
	add_num(){
		
			this.setState({
				num:++this.state.num
			});
	}
	cut_num(){
				if(this.state.num<2){
					this.setState({
						num:1
					});
				}else{
					this.setState({
						num:--this.state.num
					});
				}
	}
		showIt(){
		this.setState({
			isshow:'block'
		});
		
		}
	goback(){
	window.history.go(-1);
		};
		
	hideIt(){
		if(this.state.isshow=="block"){
		this.setState({
			isshow:'none'
		});
		}	
	}
	render(){
		return <div className="goods_cart" onClick={this.hideIt.bind(this)}>
						<header className="cartheader">
								<div className="cart_header" style={{fontSize:"0.6rem"}}>
									<div onClick={this.goback.bind(this)}>
										<a style={{fontSize:"0.6rem"}} className="fa fa-chevron-left"></a>
									</div>
									<div>购物车</div>
									<div onClick={this.showIt.bind(this)} className="fa fa-ellipsis-h"></div>
								</div>
								<div style={{display:this.state.isshow,zIndex:'9999'
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
						<div className="goods_checked">
							<div>
								<div className="store_name">
									<span>
										<input type="checkbox"/>
									</span>
									<i></i>
									呜呜呜呜呜呜呜
								</div>
								<ul>
									<li>
										<div className="goods_check">
											<input type="checkbox"/>
										</div>
										<div className="goods_pic">
											<a>
												<img src="http://www.hangowa.com/data/upload/shop/store/goods/15/2016/15_05302029700260299_240.jpg " />
											</a>
										</div>
										<div className="goods_name">
											<p>呃呃呃呃呃呃</p>
										</div>
										<div>
											<a></a>
										</div>
										<div className="goods_price">
											<div>
												<span>
													￥<em>222</em>
												</span>
												<span></span>
											</div>
											<div>
												<span onClick={this.cut_num.bind(this)} className="cut_num">-</span>
												<span className="input_goods_num">
													<input className="num"  type="text" value={this.state.num} onChange={(e) => this.handleInputChange(e)} />
												</span>
												<span onClick={this.add_num.bind(this)}  className="add_num">+</span>
											</div>
										</div>
									</li>
								</ul>
							</div>
							
							
							<div></div>
						</div>
			</div>
	}
}

let mapDispatchToProps=(dispatch)=>{
			return {
					lilaoshi(nidaye){
								dispatch(change_tab_bar(nidaye))
					}
			}
	
}
 let   mapStateToProps=(state)=>{
	 console.log(state)
	 return {
		godie:state.state 
	 }
 }

	Cart = withRouter(Cart);
Cart= connect(mapStateToProps,mapDispatchToProps)(Cart);
export default Cart;