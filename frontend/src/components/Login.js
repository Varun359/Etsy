import React, {useState} from 'react';


const Login = () => {
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');

   const emailChangeHandler = (e) => {
       setEmail(e.target.value) 
   }

   const passwordChangeHandler = (e) => {
       setPassword(e.target.value)
   }
   return (
    <div class="container">
          {console.log(email,' ',password)}

                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Login</h2>
                            <p>Please enter your username and password</p>
                            {/* {this.state.invalidCredentials && <p>Invalid Credentials</p>} */}
                        </div>
                         
                            <div class="form-group">
                                <input onChange={emailChangeHandler} value={email} type="text" class="form-control" name="email" placeholder="email"/>
                            </div>
                            <div class="form-group">
                                <input onChange={passwordChangeHandler} value={password} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button class="btn btn-primary">Login</button>                 
                    </div>
                </div>
            </div>
  )
}

export default Login