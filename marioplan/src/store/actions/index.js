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

export const getItems = () => {
	return (dispatch) => {
		axios('http://localhost:5000/project/fetch')
			.then( (projects) =>{
				console.log("response>>>",projects.data)
				dispatch({type : "GET_PROJECTS" , payLoad:projects.data});
			}).catch( (err) => {
				dispatch({type:"ERROR", payLoad: err})
			})
		
	}
	
}