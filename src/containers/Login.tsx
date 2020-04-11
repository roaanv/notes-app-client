import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import {RouteComponentProps } from "react-router-dom";


import "./Login.css";
import LoaderButton from "../components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";
import {useAppContext} from "../libs/contextLib";

// TODO: Need to change the "any" types to strong types
interface LoginProps extends RouteComponentProps {
}

const Login: React.FC<LoginProps> = (props) => {
  const { userHasAuthenticated } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event:FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      // Redirecting to the home page is handled via th UnauthenticatedRoute component
      // props.history.push("/");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
};

export default Login;