import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {API} from "aws-amplify";
import "./Home.css";
import {LinkContainer} from "react-router-bootstrap";
import {Note} from "../models/Note";

const BIG_PLUS_SIGN = "\uFF0B";
const Home:React.FC = (props:any) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes():any {
    return API.get("notes", "/notes", {});
  }

  function renderNotesList(notes:any): any[] {
    const notesToRender = [renderAddButton()].concat(notes).map((note:Note, i:number) =>
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          {/*<ListGroupItem header={note.content.trim().split("\n")[0]}>*/}
          <ListGroupItem>
            {/*{"Created: " + new Date(note.createdAt).toLocaleString()}*/}
            {note.content}
          </ListGroupItem>
        </LinkContainer>
    );
    return [renderAddButton()].concat(notesToRender);
  }

  function renderAddButton(): any {
    return (
    <LinkContainer key="new" to="/notes/new">
      <ListGroupItem>
        <h4>
          <b>{BIG_PLUS_SIGN}</b> Create a new note
        </h4>
      </ListGroupItem>
    </LinkContainer>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <p>Login to see notes</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        {/*<PageHeader>Your Notes</PageHeader>*/}
        Your Notes
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}

export default Home;