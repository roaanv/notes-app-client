// This import is requried to make this a module
import * as reactbootstrap from 'react-bootstrap';
declare module 'react-bootstrap' {
  interface ButtonProps {
    onClick?: any;
  }
}
