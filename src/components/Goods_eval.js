import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import  {change_tab_bar} from '../action';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import {List,Carousel,Grid,ListView  } from 'antd-mobile';
import LazyLoad from 'react-lazyload';
import Goods_info from './Goods_info';

const Item = List.Item;
const Brief = Item.Brief;

class Goods_eval extends Component{
    constructor(){
        super();
        this.state = {
					menu:[
							{
							title:'全部评价',
							path:'/goods_detail'
							},
							{
							title:'好评',
							path:'/goods_info'
							},
							{
							title:'中评',
							path:'/goods_eval'
							},
							{
							title:'差评',
							path:'/goods_eval'
							},
							{
							title:'订单晒图',
							path:'/goods_eval'
							},
							{
							title:'追加评价',
							path:'/goods_eval'
							}
						],
            goods_eval:[],
			curpage:1,
			index:0,
			type:''
        }
 this.changetag = this.changetag.bind(this);
          this.getdata = this.getdata.bind(this);
    }
	
	changetag(ind){
		let url=window.location.hash.slice(2).split("/")[1];
		this.setState({
			type:ind,
			index:ind
		})
		// console.log(this.state)
		this.getdata(url,ind);
	}
	getdata(url,ind){
		let type=''
		if(ind){
			type=ind
		}
		//act=goods&op=goods_evaluate&goods_id=102724&type=5&curpage=1&page=10
			axios.get('/api/mo_bile/index.php',{
				params:{
					act:'goods',
					op:'goods_evaluate',
					goods_id:url,
					type: type,
					curpage:this.state.curpage,
					page:10
				}
			}).then(res=>{
				// console.log(res.data.datas.goods_eval_list)
				let goods_eval = res.data.datas.goods_eval_list
				this.setState({
					goods_eval
				})
				// console.log(this.state)
			});
		
	}
	
	
   componentWillMount(){
		 // this.props.lilaoshi(true);
		   let url=window.location.hash.slice(2).split("/")[1];
		   if(window.location.params){
		   	url=window.location.params
		   } else{
		   	url=JSON.parse(localStorage.getItem('goods'))
		   }
		   this.getdata(url);
		   //http://www.hangowa.com/mo_bile/index.php?act=goods&op=goods_evaluate&goods_id=102724&curpage=1&page=10
}
    render(){
		return <div className="goods_eval">
					<div className="goods_eval_tag">
					
							<Grid 
								data={this.state.menu} 
								activeClassName=" " 
								columnNum={5} 
								hasLine={false}
								itemStyle={{height:'auto'}}
								renderItem={(tag,idx)=>{
								return(
									<div style={{fontSize:"0.4rem",color:"#444"}}>
											<p className={idx===this.state.index?"active":""} onClick={this.changetag.bind(this,idx)} >{tag.title}</p>
									</div>
									)
								}}
							/>
					</div>
					<div className="goods_eval_content">
						<ul>
							<LazyLoad height={200} offset={100} throttle={200}>
							{this.state.goods_eval.map((item,index)=>{
									return <li 
												key={item.geval_id}
											>
												<div className="member_info">
													<div>
														<a>
															<img src={item.member_avatar} />
														</a>
														<p>{item.geval_frommembername}</p>
													</div>
												</div>
												<div>
														<i></i>
												</div>
												<dl>
													<dt>{item.geval_content}</dt>
												</dl>
									</li>
								})
							}
							</LazyLoad>
						</ul>
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
Goods_eval= connect(null,mapDispatchToProps)(Goods_eval);

Goods_eval = withRouter(Goods_eval);

export default Goods_eval;










// 
// 
// 
// import React,{Component} from 'react';
// import axios from 'axios';
// import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
// import {List,Carousel,Grid,ListView  } from 'antd-mobile';
// import LazyLoad from 'react-lazyload';
// import Goods_info from './Goods_info';
// 
// const Item = List.Item;
// const Brief = Item.Brief;
// 
// class Goods_eval extends Component{
//     constructor(){
//         super();
//         this.state = {
// 					menu:[
// 							{
// 							title:'全部评价',
// 							path:'/goods_detail'
// 							},
// 							{
// 							title:'好评',
// 							path:'/goods_info'
// 							},
// 							{
// 							title:'中评',
// 							path:'/goods_eval'
// 							},
// 							{
// 							title:'差评',
// 							path:'/goods_eval'
// 							},
// 							{
// 							title:'订单晒图',
// 							path:'/goods_eval'
// 							},
// 							{
// 							title:'追加评价',
// 							path:'/goods_eval'
// 							}
// 						],
//             goods_eval:[],
// 			curpage:1,
// 			index:0,
// 			type:''
//         }
//  this.changetag = this.changetag.bind(this);
//           this.getdata = this.getdata.bind(this);
//     }
// 	
// 	changetag(ind){
// 		let url=window.location.hash.slice(2).split("/")[1];
// 		this.setState({
// 			type:ind,
// 			index:ind
// 		})
// 		console.log(this.state)
// 		this.getdata(url,ind);
// 	}
// 	getdata(url,ind){
// 		let type=''
// 		if(ind){
// 			type=ind
// 		}
// 		//act=goods&op=goods_evaluate&goods_id=102724&type=5&curpage=1&page=10
// 			axios.get('/api/mo_bile/index.php',{
// 				params:{
// 					act:'goods',
// 					op:'goods_evaluate',
// 					goods_id:url,
// 					type: type,
// 					curpage:this.state.curpage,
// 					page:10
// 				}
// 			}).then(res=>{
// 				console.log(res.data.datas.goods_eval_list)
// 				let goods_eval = res.data.datas.goods_eval_list
// 				this.setState({
// 					goods_eval
// 				})
// 				console.log(this.state)
// 			});
// 		
// 	}
// 	
// 	
//    componentWillMount(){
// 		   let url=window.location.hash.slice(2).split("/")[1];
// 		   if(window.location.params){
// 		   	url=window.location.params
// 		   } else{
// 		   	url=JSON.parse(localStorage.getItem('goods'))
// 		   }
// 		   this.getdata(url);
// 		   //http://www.hangowa.com/mo_bile/index.php?act=goods&op=goods_evaluate&goods_id=102724&curpage=1&page=10
// }
//     render(){
// 		return <div className="goods_eval">
// 					<div className="goods_eval_tag">
// 					
// 							<Grid 
// 								data={this.state.menu} 
// 								activeClassName=" " 
// 								columnNum={5} 
// 								hasLine={false}
// 								itemStyle={{height:'auto'}}
// 								renderItem={(tag,idx)=>{
// 								return(
// 									<div style={{fontSize:"0.4rem",color:"#444"}}>
// 											<p className={idx===this.state.index?"active":""} onClick={this.changetag.bind(this,idx)} >{tag.title}</p>
// 									</div>
// 									)
// 								}}
// 							/>
// 					</div>
// 					<div className="goods_eval_content">
// 						<ul>
// 							<LazyLoad height={200}>
// 							{this.state.goods_eval.map((item,index)=>{
// 									return <li 
// 												key={item.geval_id}
// 											>
// 												<div className="member_info">
// 													<div>
// 														<a>
// 															<img src={item.member_avatar} />
// 														</a>
// 														<p>{item.geval_frommembername}</p>
// 													</div>
// 												</div>
// 												<div>
// 														<i></i>
// 												</div>
// 												<dl>
// 													<dt>{item.geval_content}</dt>
// 												</dl>
// 									</li>
// 								})
// 							}
// 							</LazyLoad>
// 						</ul>
// 					</div>
// 						
// 			   </div>
// 	}
// }
// Goods_eval = withRouter(Goods_eval);
// 
// export default Goods_eval;
// 
// 
// 
// 
// 













