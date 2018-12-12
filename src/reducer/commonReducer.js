let initState={
	state:false
}

let reducer=(state=initState,action)=>{
			switch(action.type){
				case  'CHANGE_TAB_BAR':  
				return { 
					...state,
					state:action.payload
				}
				
				default:
						return state;
				
			}
};

export default reducer;