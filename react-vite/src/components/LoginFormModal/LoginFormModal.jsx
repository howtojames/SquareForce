import { useState} from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  //for validation
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      //we're getting errors from the backend
      console.log("serverResponse", serverResponse)
      setValidationErrors(serverResponse);
    } else {
      closeModal();
    }

    setEmail('');
    setPassword('');
    //setHasSubmitted(false);
  };

  //create demoUserObj
  const demoUserObj = {
    email: 'demo@aa.io',
    password: 'password'
  };
  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(thunkLogin(demoUserObj))
    await closeModal()
    await navigate('/')
  }

  console.log("hasSubmitted", hasSubmitted)
  console.log("validationErrors", validationErrors)
  return (
    <div id="sign-in-container">

      <h2>Sign in</h2>


      <form id='sign-in-form'>
        <div id= "sign-in-email">
          <div className="sign-in-label">
            Email
          </div>
            <input
              className="sign-in-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        {hasSubmitted && validationErrors.email ? <div className="sign-in-error">{validationErrors.email[0]}</div> : <div className="sign-in-error"></div>}


        <div>
          <div className="sign-in-label" id="password-label">
            Password
          </div>
          <input
          className="sign-in-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {hasSubmitted && validationErrors.password && <div  className="sign-in-error">{validationErrors.password[0]}</div>}



        <div>
         <button type="submit" onClick={handleSubmit} id="login-button">Log In</button>
        </div>

      </form>
      <div>
          <button onClick={demoLogin} id="demo-user">Demo User</button>

      </div>
    </div>
  );
}

export default LoginFormModal;
