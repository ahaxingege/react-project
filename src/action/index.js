import * as cart from './cartActions.js';//{add,remove,change}
export  function change_tab_bar(goDie){
	return {type:'CHANGE_TAB_BAR',
			payload:goDie,
			}
}
export {cart};