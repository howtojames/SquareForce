import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});  //from the backend
  const { closeModal } = useModal();

  //validationErrors for the frontend
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    // if(!email.includes("@"))
    //   errors.email = "Invalid email."
    // if(email.length < 7) errors.email = "Email must be at least 7 characters long."
    if (password !== confirmPassword)
      errors.confirmPassword = "Confirm Password field must be the same as the Password field";

    setValidationErrors(errors);
  }, [email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);


    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );
    console.log('serverResponse outside', serverResponse)
    if (serverResponse) {
      console.log('serverResponse', serverResponse)
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  // const determineDisable = () => {
  //   //when any one of these conditions meet, it skips over the any other checks
  //   if(!email.length || !username.length || !password.length || !confirmPassword.length )
  //     return true;
  //   else if(errors.length > 0) return true;
  //   else if(validationErrors.length > 0) return true;
  // }


  //console.log("fields", email, username, password, confirmPassword)
  return (
    <div id="sign-up-container">
      <h2>Sign Up</h2>
      {hasSubmitted && errors.server && <div className="sign-up-error ">{errors.server}</div>}
      <form id='sign-up-form'>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="Enter a valid email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && validationErrors.email && <div className="sign-up-error ">{validationErrors.email}</div>}
        {hasSubmitted && errors.email && <div className="sign-up-error ">{errors.email}</div>}
        <label>
          Username
          <input
            type="text"
            value={username}
            placeholder="Enter a new username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && validationErrors.username && <div className="sign-up-error ">{validationErrors.username}</div>}
        {hasSubmitted && errors.username && <div className="sign-up-error ">{errors.username}</div>}
        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Please enter a password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && validationErrors.password && <div className="sign-up-error ">{validationErrors.password}</div>}
        {hasSubmitted && errors.password && <div className="sign-up-error ">{errors.password}</div>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder="Passwords must match"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {validationErrors.confirmPassword && <div className="sign-up-error ">{validationErrors.confirmPassword}</div>}
        {hasSubmitted && errors.confirmPassword && <div className="sign-up-error ">{errors.confirmPassword}</div>}
        <button type="submit" id='sign-up-button' onClick={handleSubmit}
        disabled={password!=confirmPassword}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

/* disabled={Object.values(validationErrors).length > 0} */
