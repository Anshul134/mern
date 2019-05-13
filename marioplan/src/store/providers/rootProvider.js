
const initState = {
    projects : [
    {id:1, title : "Anshul", content: "blah blah blha"},
    {id:2, title : "Agrawal", content: "blah blah blha"},
    {id:3, title : "yo yo", content: "blah blah blha"},
    ],
    project:{}
}

function rootProvider ( state=initState, action) {
    if(action.type==="ADD_PROJECT") {
        console.log("state>>>>",action);
       const st =  {
           ...state,
           project :action.payLoad
       }
        console.log("updated state", st);
        return st;
    }   
   return state;
}

export default rootProvider