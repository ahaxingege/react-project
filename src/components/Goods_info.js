import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { change_tab_bar } from '../action';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { List, Carousel, Grid } from 'antd-mobile';
import Footnav from './common/Footnav';
const Item = List.Item;
const Brief = Item.Brief;

class Goods_info extends Component {

	constructor() {
		super();
		this.state = {
			goods_info: []

		}
		// this.goodsdetail = this.goodsdetail.bind(this);
	}

	componentWillMount() {
		// console.log('List:',this.props)
		// this.props.lilaoshi(true);
		let url = window.location.hash.slice(2).split("/")[1];
		if (window.location.params) {
			url = window.location.params
		} else {
			url = JSON.parse(localStorage.getItem('goods'))
		}
		// console.log(url)
		http://www.hangowa.com/mo_bile/index.php?act=goods&op=goods_body&goods_id=101788
		axios.get('/api/mo_bile/index.php', {
			params: {
				act: 'goods',
				op: 'goods_body',
				goods_id: url
			}
		}).then(res => {
			// console.log(res.data)
			let goods_info = res.data
			this.setState({
				goods_info
			})
		});
	}

	goDetail(goods) {
		//获取history
		let { history } = this.props;
		let hash = window.location.hash.slice(2).split("/")[1];
		window.location.reload();
		localStorage.setItem('goods', JSON.stringify(goods.goods_id));
		history.push({
			pathname: '/goods/' + goods.goods_id,
			state: goods,
			params: hash,
		});
	}
	render() {
		return <div className="goods_info">
			<div dangerouslySetInnerHTML={{ __html: this.state.goods_info }} />,
			<Footnav />
		</div>
	}
}


let mapDispatchToProps = (dispatch) => {
	return {
		lilaoshi(nidaye) {
			dispatch(change_tab_bar(nidaye))
		}
	}

}
Goods_info = connect(null, mapDispatchToProps)(Goods_info);

Goods_info = withRouter(Goods_info);

export default Goods_info;
