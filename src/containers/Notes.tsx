import React, {useRef, useState, useEffect, FormEvent} from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

import config from "../config";
import LoaderButton from "../components/LoaderButton";
import {NoteData} from "../models/Note";
import {s3Upload} from "../libs/awsLib";

const Notes: React.FC = () => {
  const file = useRef<File|null>(null);
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState<NoteData|null>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${id}`, {});
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str: string) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event: FormEvent) {
    file.current = (event.target as any).files[0];
  }

  function saveNote(note: NoteData) {
    return API.put("notes", `/notes/${id}`, {
      body: note
    });
  }

  async function handleSubmit(event: FormEvent) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
        1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  async function handleDelete(event: FormEvent) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
  }

  return (
    <div className="Notes">
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              as="textarea"
              onChange={(e: any) => setContent(e.target.value)}
            />
          </FormGroup>
          {note.attachment && (
            <FormGroup>
              <FormLabel>Attachment</FormLabel>
              {/*TODO: Figure out how to fix the static*/}
              {/*<FormControl.Static>*/}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment!)}
                </a>
              {/*</FormControl.Static>*/}
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!note.attachment && <FormLabel>Attachment</FormLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}

export default Notes;