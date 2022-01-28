import classes from "./login.module.css";
import { TextField, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { loginCall } from "../../store/loginsate-actions";
import { signUpWithUsernameAndPassword } from "../../store/loginsate-actions";
import {useHistory} from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(true);
  let history= useHistory();
  const switchLogin = (resetForm) => {
    setLogin(!login);
    resetForm(initialValues);
  };
  let userInfo=useSelector((state)=>state.authState);
  if(userInfo.accessToken)
  {
    history.push('/home'); 
  }
  const loginSchema = Yup.object().shape({
    username: Yup.string().email().required("username is required"),
    password: Yup.string()
      .min(4, "Password should be atleast four characters")
      .required("This field is required"),
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const formSubmitted = (values) => {
    if (login) {
      console.log("called");
      dispatch(loginCall(values.username, values.password));

    } else {
      dispatch(signUpWithUsernameAndPassword(values.username, values.password));
    }
  };
  return (
    <div
      className={`${classes["login-outer-wrapper"]} d-flex justify-content-center align-items-center shadow`}
    >
      <div className={`container d-flex justify-content-center`}>
        <div className={`${classes["outer-login"]} p-4 rounded`}>
          <div className="text-center">
            <b>{login ? `Login` : `Signup`}</b>
          </div>
          
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                console.log(values);
                formSubmitted(values);
              }}
            >
              {(formik) => {
                const {
                  errors,
                  touched,
                  isValid,
                  values,
                  dirty,
                  handleBlur,
                  resetForm,
                  handleSubmit
                } = formik;
                return (
                  <div>
                    <form onSubmit={handleSubmit}>
                    <TextField
                      type="email"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={formik.handleChange}
                      id="username"
                      name="username"
                      label="Username"
                      error={Boolean(errors.username) && touched.username}
                      helperText={errors.username}
                    />

                    <TextField
                      type="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={formik.handleChange}
                      id="password"
                      name="password"
                      label="Password"
                      error={Boolean(errors.password) && touched.password}
                      helperText={errors.password}
                    />
                    <div className="text-center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={!(isValid && dirty)}
                      >
                       {login?`Login`:`Signup`}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          switchLogin(resetForm);
                        }}
                      >
                        switch to {login ? `Signup` : `Login`}
                      </Button>
                    </div>
                    </form>
                    
                  </div>
                );
              }}
            </Formik>

          <div className="text-center mt-2">
            <NavLink to="/">Reset Password</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
