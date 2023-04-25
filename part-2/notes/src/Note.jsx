import React from "react";

const Note = ({ note }) => {
  return (
    <div>
      <li> {note.content}</li>
    </div>
  );
};

export default Note;
