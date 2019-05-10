const initState = {
	projects : [
		{id : 1, title : "Appear mighty Shenron!", content : "blah blah blah"},
		{id : 2, title : "Bring the force with you!", content : "blah blah blah"},
		{id : 3, title : "Find out if its a great plan!", content : "blah blah blah"},
	],
	project: {}
}

const projectReducer = (state=initState, action) => {
	return state;
}

export default projectReducer;