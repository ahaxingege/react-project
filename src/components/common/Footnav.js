import React, { Component } from 'react';
// import './App.css';

class Footnav extends Component {
	
	constructor() {
	  super();
			this.state={}
			
			this.toTop = this.toTop.bind(this);

	}
	
	
	
	
toTop(){
	
	
  
	console.log(123)
}	

  render() {
    return (
		<div className="foot_nav">
					<div className="foot_nav_first">
							<a>登录</a>
							<a>注册</a>
							<a>反馈</a>
							<a onClick={this.toTop.bind(this)}>回到顶部</a>
					</div>
			 <div className="foot_nav_second">
							<a>
								<span>
									<i ></i>
								</span>
								<p>客户端</p>
							</a>
							<a>
								<span>
									<i ></i>
								</span>
								<p>触屏版</p>
							</a>
							<a>
								<span>
									<i ></i>
								</span>
								<p>电脑版</p>
							</a>
			 </div>
			 <div className="foot_nav_third">
				Copyright © 2014-2016 汉购网
				<a href="#">hangowa.com</a>
				版权所有
			 </div>
	</div>
    );
  }
}

export default Footnav;
