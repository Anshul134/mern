import axios from 'axios'


export const addProject = (payLoad) => {
	return (dispatch, getState) => {
		axios.post("http://localhost:5000/project/create", payLoad)
			 .then(resp=>console.log("resp.data", resp.data));		
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
		axios.get('http://localhost:5000/project/')
			.then( (projects) =>{
				console.log("data",projects.data)
				dispatch({type : "GET_PROJECTS" , payLoad:projects.data});
			}).catch( (err) => {
				dispatch({type:"ERROR", payLoad: err})
			})
		
	}
}

export const getProject = (payLoad) => {
	console.log(payLoad)
	return (dispatch) => {
		const url = "http://localhost:5000/project/get/" + payLoad;
		
		axios.get(url).then( (resp) => {
		
			dispatch( {type : "GET_ONE_PROJECT", payLoad : resp.data.project });
		})
		
	}
}