import React ,{useState} from "react"
import { variables } from "./Variables.js";

function Register(){

    const [userName, setName]= useState("")
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")

    async function signUp(){
        let item = {userName, email, password}
        console.warn(item)

        let result = await fetch(variables.API_URL + 'register',{
            method:'POST',
            body:JSON.stringify(item),
            mode: 'no-cors',
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        }).then(resonse => resonse.text())
        .then(result => console.log(result))
        .catch(error => console.log("Error detected: " + error))
        result = await result.json()
        console.warn("result", result)
    }

    return(
        <div className="col-sm-6 offset-sm-3">
            <h1>Register Page</h1>
            <input type = "text" value={userName} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Username"/>
            <br></br>
            <input type = "text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email"/>
            <br></br>
            <input type = "password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password"/>
            <br></br>
            <button onClick={signUp} className="btn btn-primary">Register</button>
        </div>
    )
}

export default Register