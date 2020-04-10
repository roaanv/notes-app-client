import React from "react";
import {Button, ButtonProps} from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import ButtonProps from "react-bootstrap/Button";

import "./LoaderButton.css";
import {ClipLoader} from "react-spinners";

interface LoaderButtonProps extends ButtonProps {
  isLoading: boolean;
  className?: string;
}

const LoaderButton: React.FC<LoaderButtonProps> =({
                                       isLoading,
                                       className = "",
                                       disabled = false,
                                       ...props
                                     }) => {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ClipLoader loading={isLoading}/>}
      {props.children}
    </Button>
  );
};

export default LoaderButton;
