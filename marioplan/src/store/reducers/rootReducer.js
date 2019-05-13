const initState = {
	projects: [
			{id: 1, title : "Shenron", content : "blah blah blah"},
			{id: 2, title : "Goku", content : "blah blah blah"},
			{id: 3, title : "Vegeta", content : "blah blah blah"},
		],
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
	return state;
}

export default rootReducer;