import React from 'react';
import proptypes from 'prop-types';

class Computer extends React.Component{
    render(){
        console.log('computer:',this.context)
        this.context.num = 120;
        return <div>
            Computer
        </div>
    }
}

// 3.验证数据类型：子组件设置contextTypes静态属性声明和验证context
Computer.contextTypes = {
    num:proptypes.number
}

export default Computer;