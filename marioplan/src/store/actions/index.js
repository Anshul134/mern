import axios from 'axios'


export const addProject = (payLoad) => {
	return (dispatch, getState) => {
		//
	
		dispatch({type : "ADD_PROJECT", payLoad});
	}
}

export const RemoveProject = (payLoad) => {
	return (dispatch, getState) => {
		//
		dispatch({type : "DELETE_PROJECT", payLoad})
	}
}

export const getItems = (payLoad) => {
	return (dispatch, getState) => {
		axios('http://localhost:5000/project/fetch')
			.then( (projects) =>{
				console.log("response>>>",projects)
				dispatch({type : "GET_PROJECTS" , payLoad:projects});
			}).catch( (err) => {
				dispatch({type:"ERROR", payLoad: err})
			})
		
	}
	
}