// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //    const s1 = {
  //        "name": "Shivam",
  //        "class": "5b"
  //    }
  //    const[state, setState] = useState(s1);
  //    const update = ()=>{
  //        setTimeout(()=>{
  //            setState(
  //                {
  //                 "name": "Shivam Singh",
  //                 "class": "5d"  
  //                }
  //            )

  //         },1000);

  //     }
  //      return(
  //          <NoteContext.Provider value={{state, update}}> 

  //              {props.children}
  //          </NoteContext.Provider>
  //      )
  //  }

  // const notesInitial = [
  //   {
  //     "_id": "6247e875abe5b8cfb3201e497",
  //     "user": "6247d9de12ca3c67d4a17d45",
  //     "title": "My Title",
  //     "description": "Please wake up early",
  //     "tag": "Personal",
  //     "date": "2022-04-02T06:08:53.403Z",
  //     "__v": 0
  //   }
    
  //  ]
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
     });

     const json = await response.json();
     console.log(json);
     setNotes(json);
     
    }

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

        
        
      },

      body: JSON.stringify({title, description, tag})
    });
    // Logic to add a note
    const note = await response.json();
    console.log(note);
    setNotes(notes.concat(note));

    
    

    
    
      

  }
  // Delete a new
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }

     
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);


  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //TODO: API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);
   
    

    // let newNotes = JSON.parse(JSON.stringyfy(notes))
    // console.log(newNotes);
    // // Logic to edit notes
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id === id) {
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
    //     break;
    //   }
      
    // }
    //   setNotes(newNotes);

    // My logic
    let notes1 = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes1.length; index++) {
      let element = notes1[index];
      if (element._id === id) {
        notes1[index].title = title;
        notes1[index].description = description;
        notes1[index].tag = tag;
        break;
      }
      
    }
      setNotes(notes1);
      


    
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>

      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;










