import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
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



  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
         <button type="submit">Log In</button>
        </div>

      </form>
      <div>
          <button onClick={demoLogin}>Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
