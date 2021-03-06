let initState = {
    // 购物车商品别表
    goodslist:[]
}
let commonReducer = (state=initState,action)=>{
    switch(action.type){
        //添加商品
        case 'ADD_TO_CART':
            return {
                ...state,
                goodslist:[...state.goodslist,action.payload]
            }
        //删除商品
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>goods.goods_id!==action.goods_id)
            }
        //修改商品数量
        case 'CHANGE_GOODS_QTY':
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>{
                    if(goods.goods_id === action.payload.goods_id){
                        goods.qty = action.payload.qty
                    }

                    return true;
                })
            }

        default:
            return state;
    }
}

export default commonReducer;