import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import  {change_tab_bar} from '../action';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import {List,Carousel,Grid } from 'antd-mobile';
import Background from '../img/home_logo.png';
import Footnav from './common/Footnav';
//定义背景样式
var sectionStyle = {
  width: "120px",
  height: "45px",
  backgroundRepeat:'no-repeat',
  backgroundImage: `url(${Background})` 
};

const Item = List.Item;
const Brief = Item.Brief;

class Home extends Component{
    constructor(){
        super();
        this.state = {
            ad:[],
            goodslist:[]
        }

        this.goDetail = this.goDetail.bind(this);
				this.goToCart = this.goToCart.bind(this);
    }
    componentWillMount(){
			this.props.lilaoshi(false);
		axios.get('/api/mo_bile/index.php',{
			params:{
				act:'index'
			}
		}).then(res=>{
			let data = res.data;
			// console.log(data)
// 			console.log(data.datas.list[1].goods.item)
			this.setState({
				ad:data.datas.list[0].adv_list.item,
				goodslist:data.datas.list[1].goods.item,
			});
		});
    }
		goToCart(){
			let {history} = this.props;
			history.push({
						pathname:'/cart'
			});
		}
    goDetail(goods){
        //获取history
        let {history} = this.props;
        // console.log(history);
		localStorage.setItem('goods',JSON.stringify(goods.goods_id));
        history.push({
							pathname:'/goods/'+goods.goods_id,
        });
    }
    render(){
        return <div>
		<header className="header">
		<span id="top"></span>
		<div className="logo">
		</div>
		<div className="header_wrap">
		<a className="inp ">
		<i className="fa fa-search"></i>
		</a>
		<a className="toCart" onClick={this.goToCart.bind(this)}></a>
		</div>
		</header>
             <Carousel
                autoplay={true}
                infinite
                >
                {this.state.ad.map(goods => (
                    <a
                    key={goods.data}
                    href="#"
                    style={{height:'8rem'}}
                    >
                    <img
                        src={goods.image}
                        style={{ width: '100%',verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                        }}
                    />
                    </a>
                ))}
                </Carousel>
			<div className="nav">
				<ul>
					<li>
						<a>
							<span>
								<i ></i>
							</span>
							<p>我的商城</p>
						</a>
					</li>
					<li onClick={this.goToCart.bind(this)}>
						<a>
							<span>
								<i ></i>
							</span>
							<p>购物车</p>
						</a>
					</li>
					<li>
						<a>
							<span>
								<i ></i>
							</span>
							<p>每日签到</p>
						</a>
					</li>
				</ul>
			</div>
              <Grid 
			  data={this.state.goodslist} 
			  activeClassName="active" 
			   columnNum={2} 
				 hasLine={false}
				itemStyle={{height:'6.5rem'}}
			   renderItem={(goods,idx)=>{
                return(
                    <div style={{fontSize:"0.1rem",color:"#444"}} className="goods-item" onClick={this.goDetail.bind(this,goods)}>
                        <img src={goods.goods_image} />
                        <p style={{height:'0.7rem',overflow:"hidden"}}>{goods.goods_name}</p>
                        <p className="price"><span>{goods.goods_price}</span></p>
                    </div>
                )
            }}
			   />
			   <Footnav/>
        </div>
    }
}



let mapDispatchToProps=(dispatch)=>{
			return {
							lilaoshi(nidaye){ //把lilaoshi这个方法映射到this.props下
										dispatch(change_tab_bar(nidaye))
							}
			}
	
}
Home= connect(null,mapDispatchToProps)(Home);
Home = withRouter(Home);

export {Home};