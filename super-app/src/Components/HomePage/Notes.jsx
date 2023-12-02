import React, { useEffect, useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const previousNotes = localStorage.getItem('notes');
    return previousNotes ? JSON.parse(previousNotes) : [];
  });

  const handleChange = (event) => {
    setNotes([event.target.value]);
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className='notes-page'>
      <div id='notes-heading'>All notes</div>
      <textarea
        id='notes-content'
        value={notes[0] || ''}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Notes;
