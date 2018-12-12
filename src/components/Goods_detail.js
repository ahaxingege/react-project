import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import  {change_tab_bar,cart} from '../action';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import {List,Carousel,Grid,TabBar } from 'antd-mobile';
import Goods_info from './Goods_info';
const Item = List.Item;
const Brief = Item.Brief;

class Goods_detail extends Component{
	
    constructor(){
        super();
        this.state = {
            goods_info:[],
            goods:[],
						goods_hair_info:[],
						store_info:[],
						store_desccredit:[],
						store_servicecredit:{},
						store_deliverycredit:{},
						goods_commend_list:[],
						check:"none",
						num:1
							}
// this.Documen = this.Documen.bind(this);
         // this.goodsdetail = this.goodsdetail.bind(this);
    }
	
	goToCart(){
			let {history} = this.props;
			history.push({
						pathname:'/cart'
			});
		}
	
   componentWillMount(){
		 // console.log(this.props)
					this.props.lilaoshi(true);
		   let url=window.location.hash.slice(2).split("/")[1];
		   if(window.location.params){
		   	url=window.location.params
		   } else{
		   	url=JSON.parse(localStorage.getItem('goods'))
		   }
		   // console.log(url)
		   //http://www.hangowa.com/mo_bile/index.php?act=goods&op=goods_detail&goods_id=104580&key=
		   	axios.get('/api/mo_bile/index.php',{
		   		params:{
		   			act:'goods',
		   			op:'goods_detail',
		   			goods_id:url
		   		}
		   	}).then(res=>{
		   	let data = res.data.datas;
		   	 console.log(data)
		   	var img = data.goods_image.split(',')
		   	this.setState({
		   		goods_info:data.goods_info,
		   		goods:img,
		   		goods_hair_info:data.goods_hair_info,
		   		store_info:data.store_info,
		   		store_credit:data.store_info.store_credit,
		   		store_desccredit:data.store_info.store_credit.store_desccredit,
		   		store_servicecredit:data.store_info.store_credit.store_servicecredit,
		   		store_deliverycredit:data.store_info.store_credit.store_deliverycredit,
		   		goods_commend_list:data.goods_commend_list
		   	});
		   	// console.log(this.state)
		   });
   	    }
				componentWillUnmount(){
					console.log(this.props)
					this.props.lilaoshi(false);
				}
				toInfo(){
					// console.log(this.props)
					let {location,history} = this.props;
					 let info = location.pathname
					 // console.log(info)
				let	 toInfo = info.replace(info.split("/")[3],'goods_info');
				console.log(toInfo)
					history.push(toInfo);
				}
				checked_goods_num(){
					console.log(111)
					this.setState({
						check:"block"
					});
				}
				unChecked_goods_num(){
					console.log(111)
					this.setState({
						check:"none"
					});
				}
				handleInputChange(e){
							if(this.state.num>=this.state.goods_info.goods_storage){
								this.setState({
									num:this.state.goods_info.goods_storage
								});
							}else{
								this.setState({
									num: e.target.value
								});
								console.log(this.state.num)
							}
				}
				add_num(){
					if(this.state.num>=this.state.goods_info.goods_storage){
						this.setState({
							num:this.state.goods_info.goods_storage
						});
					}else{
						this.setState({
							num:++this.state.num
						});
					}
				}
				cut_num(){
					console.log(111)
						
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
				pushGoogsToCart(){
					let goods_id=window.location.hash.slice(2).split("/")[1];
					let goods_img=this.state.goods[0];
					let goods_name=this.state.goods_info.goods_name;
					let goods_qty=this.state.num;
					let goods_price=this.state.goods_info.goods_price;
					console.log(111111)
					this.props.addGoods(this.state.goods_info);
					let path="http://127.0.0.1:3978"
					axios.post(path+'/api/book/addbook',{goods_id,goods_img,goods_name,goods_price,goods_qty})
					.then((res)=>{
						alert(res.data.msg);
					})
					.catch((err)=>{
						console.log(err)
					})
					
				}
		goDetail(goods){
			//获取history
			let {history} = this.props;
			let hash = window.location.hash.slice(2).split("/")[1];
			window.location.reload();
			localStorage.setItem('goods',JSON.stringify(goods.goods_id));
			history.push({
				pathname:'/goods/'+goods.goods_id,
				state:goods,
				params:hash
			});
		}
    render(){
        return <div className="goodsDetail" style={{ width: '100%',height:"6.5rem",verticalAlign: 'top' }}>
            <Carousel
            autoplay={true}
            infinite
            >
            {this.state.goods.map(goods => (
            	<a
            	key={goods}
				display="block"
            	style={{height:'auto'}}
            	>
            	<img
            		src={goods}
            		style={{ width: '100%',height:"auto",verticalAlign: 'top'}}
            		onLoad={() => {
            			window.dispatchEvent(new Event('resize'));
            		}}
            	/>
            	</a>
            ))}
            </Carousel>
			
				<div className="goods_name">
					<p>{this.state.goods_info.goods_name}</p>
					<span>{this.state.goods_info.goods_jingle}</span>
				</div>
				<div className="goods_price">
					<span className="price">
						￥<em>{this.state.goods_info.goods_price}</em>
					</span>
					<span><strong>销量:</strong>{this.state.goods_info.goods_salenum}件</span>
				</div>
				<div  className="send">
					<div className="towhere">
					<em className="ccc">送至</em>
						<a>
							<span>{this.state.goods_hair_info.area_name}</span>
							<span >{this.state.goods_hair_info.if_store_cn}</span>
							<b style={{float:"right",color:"#ccc",fontSize: "0.44rem"}} className="fa fa-map-marker"></b>
						</a>
					</div>
					<div>
						<span className="ccc">{this.state.goods_hair_info.content}</span>
					</div>
					<i></i>
				</div>
				<div onClick={this.checked_goods_num.bind(this)}  className="checked">
					<div className="ccc">已选
						<span className="ccc">默认</span>
						<b style={{float:"right",color:"#ccc"}} className="fa fa-chevron-right"></b>
					</div>
					</div>
				<div className="comment">
					<div className="comment_content">
						<a>商品评价
							<span>好评率<em>100%</em></span>
							<span>({this.state.goods_info.evaluation_count}人评价)
							<b style={{float:"right",color:"#ccc",marginLeft:"10px",fontSize: "0.44rem"}} className="fa fa-chevron-right"></b>
							</span>
						</a>
					</div>
				</div>
				<div className="store">
					<div className="store_name">
						<i style={{color:"#777",marginRight:"10px"}} className="fa fa-hand-o-right"></i>
						{this.state.store_info.store_name}
						<b style={{float:"right",color:"#ccc"}} className="fa fa-chevron-right"></b>
					</div>
					<div style={{color:"#777"}} className="store_info">
						<span>描述相符&nbsp;
							<em style={{color:"#f00"}}>{this.state.store_desccredit.credit}</em>&nbsp;
							<i style={{color:"#f00"}}>{this.state.store_desccredit.percent_text}</i>
						</span>
						<span>服务态度&nbsp;
							<em style={{color:"#f00"}}>{this.state.store_servicecredit.credit}</em>&nbsp;
							<i style={{color:"#f00"}}>{this.state.store_servicecredit.percent_text}</i>
						</span>
						<span>发货速度&nbsp;
							<em style={{color:"#f00"}}>{this.state.store_deliverycredit.credit}</em>&nbsp;
							<i style={{color:"#f00"}}>{this.state.store_deliverycredit.percent_text}</i>
						</span>
					</div>
				</div>
				<div>
					<div>
						<h4 style={{margin:"10px ",marginLeft:"10px",color:"#777"}}>店铺推荐</h4>
						<Grid 
						data={this.state.goods_commend_list} 
						activeClassName="active" 
						columnNum={4} 
						hasLine={false}
							itemStyle={{height:'4rem'}}
						renderItem={(goods,idx)=>{
							return(
								<div className="goods-item" style={{fontSize:"0.1rem",color:"#777"}} onClick={this.goDetail.bind(this,goods)}>
									<img src={goods.goods_image_url} />
									<p style={{height:'0.7rem',overflow:"hidden"}}>{goods.goods_name}</p>
									<p style={{color:"black"}}><span>￥{goods.goods_price}</span></p>
								</div>
							)
						}}
						/>
					</div>
				</div>
				<div onClick={this.toInfo.bind(this)} style={{textAlign:"center",fontSize:"0.1rem",color:"#777",marginBottom:"0.2rem"}}>
				<a>点击查看商品详情</a>
			</div>
				<div style={{display:this.state.check=="block"?"none":"block"}} className="tbs">,
					<div className="fl tbs_left">
						<a>
						<i className="fa fa-hand-o-down"></i>
						<span>客服</span>
						</a>
						<a onClick={this.goToCart.bind(this)}>
						<i className="fa fa-shopping-cart" ></i>
						<span>购物车</span>
						</a>
					</div>
					<div onClick={this.checked_goods_num.bind(this)} className="fl tbs_right">
						<a>立即购买</a>
						<a>加入购物车</a>
					</div>
				</div>
				<div style={{display:this.state.check}}  className="toCart_menu">
					<div onClick={this.unChecked_goods_num.bind(this)} className="msk"></div>
					<div className="goods_checked">
						<div className="to_lastState">
							<i style={{marginRight:"0.1rem"}} className="fa fa-arrow-circle-down"></i>
							点击此处返回
						</div>
						<div className="goods_simpleInfo">
							<div className="goods_pic"> 
								<img src={this.state.goods[0]}/>
							</div>
							<div className="goods_name">
									<p>{this.state.goods_info.goods_name}</p>
										<em style={{color:"#f00"}}>￥{this.state.goods_info.goods_price}</em>
										<span>库存:{this.state.goods_info.goods_storage}件</span>
							</div>
							<a></a>
						</div>
						
						<div className="blank"></div>
						
						<div className="goods_num">
							购买数量
							<div>
								<span onClick={this.cut_num.bind(this)} className="cut_num">-</span>
								<span className="input_goods_num">
									<input className="num" type="text" value={this.state.num} onChange={(e) => this.handleInputChange(e)} />
								</span>
								<span onClick={this.add_num.bind(this)} className="add_num">+</span>
							</div>
						</div>
						<div style={{display:this.props.godie?"block":"block"}} className="tbs">
							<div className="fl tbs_left">
								<a>
								<i className="fa fa-hand-o-down"></i>
								<span>客服</span>
								</a>
								<a onClick={this.goToCart.bind(this)}>
								<i className="fa fa-shopping-cart" ></i>
								<span>购物车</span>
								</a>
							</div>
							<div className="fl tbs_right">
								<a >立即购买</a>
								<a onClick={this.pushGoogsToCart.bind(this)}>加入购物车</a>
							</div>
						</div>
					</div>
				</div>
    </div>
    }
}

let mapDispatchToProps=(dispatch)=>{
	
			return {
							lilaoshi(nidaye){
										dispatch(change_tab_bar(nidaye))
							},
							addGoods(goods_id,qty){
										dispatch(cart.add(goods_id,qty))
							}
			}
	
}
 let   mapStateToProps=(state)=>{
	 console.log(state)
	 return {
		godie:state.state 
	 }
 }

Goods_detail= connect(mapStateToProps,mapDispatchToProps)(Goods_detail);
Goods_detail = withRouter(Goods_detail);

export default Goods_detail;
