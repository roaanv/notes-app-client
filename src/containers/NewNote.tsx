import React, {FormEvent, useEffect, useRef, useState} from "react";
import { FormGroup, FormControl, FormFile } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import {RouteComponentProps} from "react-router-dom";
import bsCustomFileInput from 'bs-custom-file-input'

interface NewNoteProps extends RouteComponentProps {
}

const NewNote:React.FC<NewNoteProps> = (props) => {
  const file = useRef<null|File>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event: any) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (file.current) {
      if (file.current.size > config.MAX_ATTACHMENT_SIZE) {
        alert(
          `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
        );
        return;
      }
    }

    setIsLoading(true);
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            as="textarea"
            onChange={(e: any) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormFile
          id="custom-file"
          label="Custom file input"
          custom
          onChange={handleFileChange}
        />

        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
};

export default NewNote;