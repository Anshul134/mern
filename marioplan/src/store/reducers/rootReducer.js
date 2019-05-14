const initState = {
	projects: [],
	project: {}
};

const rootReducer = (state=initState, action)=>{
	if(action.type==="ADD_PROJECT") {
		console.log("init", state)
		return {
			
			project : action.payLoad,
			projects : [...state.projects, action.payLoad] 
		};
	}
	else if(action.type==="DELETE_PROJECT" )  {
		
		const projects = state.projects.filter( (project) => project.id !== action.payLoad[0].id );
		return {
			...state,
			projects : projects
		};
		
	}
	else if(action.type==="GET_PROJECTS") {
		const av = {
			...state,
			projects : action.payLoad
		}
		console.log("av>>>>",av)
		return av;
	}
	return state;
}

export default rootReducer;