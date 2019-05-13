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