import React,{Component} from 'react';
import axios from 'axios';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import {List,Carousel,Grid } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Mine extends Component{
	
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
			goods_commend_list:[]
        }
// this.Documen = this.Documen.bind(this);
         // this.goodsdetail = this.goodsdetail.bind(this);
    }
	
	
	
   componentWillMount(){
			
		   let url=window.location.hash.slice(2).split("/")[1];
		   if(window.location.params){
		   	url=window.location.params
		   } else{
		   	url=JSON.parse(localStorage.getItem('goods'))
		   }
		   console.log(url)
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
		goDetail(goods){
			//获取history
			let {history} = this.props;
			let hash = window.location.hash.slice(2).split("/")[1];
			window.location.reload();
			localStorage.setItem('goods',JSON.stringify(goods.goods_id));
			history.push({
				pathname:'/goods/'+goods.goods_id,
				state:goods,
				params:hash,
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
            	style={{height:'8rem'}}
            	>
            	<img
            		src={goods}
            		style={{ width: '100%',height:"6.5rem",verticalAlign: 'top' }}
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
				<div className="checked">
					<div className="ccc">已选
						<span className="ccc">默认</span>
						<b style={{float:"right",color:"#ccc"}} className="fa fa-chevron-right"></b>
					</div>
					</div>
				<div className="comment">
					<div className="comment_content">
						<a>商品评价
							<span>好评率<em>100%</em></span>
							<span>(0人评价)
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
				<div style={{textAlign:"center",fontSize:"0.1rem",color:"#777",marginBottom:"0.2rem"}}>
				<a>点击查看商品详情</a>
				
			</div>
        </div>
    }
}
Mine = withRouter(Mine);

export default Mine;

// 
// import {withRouter} from 'react-router-dom';
// 
// import { Button } from 'antd-mobile';
// 
// class Goods extends Component{
//     // let {state} = props.location;
//     // console.log(props);
// 	constructor(){
// 	        super();
// 	        this.state = {
// 				nav:[
// 					{p:'我的商城',i:'../img/browse_list_w.png'},
// 					{p:'购物车',i:'../img/cart_b.png'},
// 					{p:'每日签到',i:'../img/member_w.png'},
// 					],
// 	            ad:[],
// 	            goodslist:[]
// 	        }
// 	
// 	        this.goDetail = this.goDetail.bind(this);
// 	    }
// 	 componentWillMount(){
// 		 //http://www.hangowa.com/mo_bile/index.php?act=goods&op=goods_detail&goods_id=104580&key=
// 			axios.get('/api/mo_bile/index.php',{
// 				params:{
// 					act:'goods',
// 					op:'goods_detai',
// 					goods_id:state.goods_id
// 				}
// 			}).then(res=>{
// 				let data = res.data;
// 	// 			console.log(data.datas.list[0].adv_list.item)
// 	// 			console.log(data.datas.list[1].goods.item)
// 				this.setState({
// 					ad:data.datas.list[0].adv_list.item,
// 					goodslist:data.datas.list[1].goods.item,
// 				});
// 			});
// 	    }
//     return (
// 	<div>
// 	SSS
//     </div>)
// }
// 
// Goods = withRouter(Goods);
// 
// export {Goods}
// 