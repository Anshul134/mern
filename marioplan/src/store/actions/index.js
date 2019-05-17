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
				
				dispatch({type : "GET_PROJECTS" , payLoad:projects.data.projects});
			}).catch( (err) => {
				dispatch({type:"ERROR", payLoad: err})
			})
		
	}
	
}

export const fetchProject = (projId) => {
	return (dispatch) => {
		axios("http://localhost:5000/project/", {id:projId})
			.then( (resp) => {
				console.log("SINGLE>>>", resp.data)
				dispatch({type: "FETCH_PROJECT", payLoad : resp.data})
			})
	}
}