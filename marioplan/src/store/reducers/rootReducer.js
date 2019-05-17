var initState = {
	projects: [],
	project: {}
};

const rootReducer = (state=initState, action)=>{
	if(action.type==="ADD_PROJECT") {
		console.log("init", state)
		
		const newState =  {
			
			project : action.payLoad,
			projects : [...state.projects, action.payLoad] 
		};
		initState = newState;
		return state;
	}
	else if(action.type==="DELETE_PROJECT" )  {
		
		const projects = state.projects.filter( (project) => project.id !== action.payLoad[0].id );
		return {
			...state,
			projects : projects
		};
		
	}
	else if(action.type==="GET_PROJECTS") {
		return {
			...state,
			projects : action.payLoad
		}
		
		
	}
	return state;
}

export default rootReducer;