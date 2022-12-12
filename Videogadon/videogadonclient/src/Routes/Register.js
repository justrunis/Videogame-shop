import React ,{useState} from "react"
import '../App.css';
import AuthUser from "../Services/AuthUser";
import { useNavigate } from 'react-router-dom';

function Register(){

    const navigate = useNavigate();
    const { http } = AuthUser();
    const [usernameReq, setUsernameReq] = useState('')
    const [passwordReq, setPasswordReq] = useState('')
    const [passwordReqConfirma, setPasswordReqConfirm] = useState('')
    const [EmailReq, setEmailReq] = useState('')
    const [Error, setError] = useState('')

    const [isLoading, setLoading] = useState(false);

    const signUp = () => {
        if(isLoading)
            return;
        setLoading(true);
        console.log(usernameReq);
        console.log(EmailReq);
        console.log(passwordReq);
        console.log(passwordReqConfirma);

        if(passwordReq !== passwordReqConfirma) {
            setLoading(false);
            console.log("Passwords do not mach");
            return;
        }

        http.post("/register", {
            userName: usernameReq,
            password: passwordReq,
            email: EmailReq,
        }).then((response) => {
            setUsernameReq('');
            setPasswordReq('');
            setPasswordReqConfirm('');
            setEmailReq('');
            console.log(response);
        }).catch((error) => {
            if(error.response.data.error != null) {
                alert(error.response.data.error);
            } else if(error.response.data.errors != null) {
                var errors = error.response.data.errors;
                var all_errors = [];
                Object.keys(errors).map((err) => (
                    all_errors.push(errors[err][0])
                ))
                alert(all_errors.join("\n"));
            }
        }).finally(() => {
            navigate('/home')
        });
    };

    return(
        <div className="col-sm-6 offset-sm-3">
            <h1>Register Page</h1>
            <label>Username</label>
            <input type = "text" value={usernameReq} onChange={(e)=>setUsernameReq(e.target.value)} className="form-control" placeholder="Username"/>
            <br></br>
            <label>Email</label>
            <input type = "text" value={EmailReq} onChange={(e)=>setEmailReq(e.target.value)} className="form-control" placeholder="Email"/>
            <br></br>
            <label>Password</label>
            <input type = "password" value={passwordReq} onChange={(e)=>setPasswordReq(e.target.value)} className="form-control" placeholder="Password"/>
            <br></br>
            <label>Repeat password</label>
            <input type = "password" value={passwordReqConfirma} onChange={(e)=>setPasswordReqConfirm(e.target.value)} className="form-control" placeholder="Password confirmation"/>
            <br></br>
            <button onClick={signUp} className="btn btn-primary">Register</button>
        </div>
    )
}

export default Register