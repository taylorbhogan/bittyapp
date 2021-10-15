// const notesArray = [];

const generateNotes = () => {

  const display = document.getElementById('display')
  const options = document.getElementById('options')
  const errorDisplay = document.getElementById('errors')

  const notebook = document.createElement('div')
  notebook.id = 'notebook'
  notebook.style.border = `4px solid ${apps[0].color}`

  const editNote = (noteId, newNoteText) => {
    deleteNote(noteId)
    addNote(newNoteText)
  }

  const setEditForm = (noteId) => {

    const formattedNotes = document.querySelectorAll('.note')
    let divToReplace = null;
    for (let i = 0; i < formattedNotes.length; i++) {
      if (formattedNotes[i].id === noteId) {
        divToReplace = formattedNotes[i]
        break
      }
    }
    if (divToReplace) {
      const oldNote = divToReplace.firstChild.textContent;

      while (divToReplace.firstChild) {
        divToReplace.removeChild(divToReplace.lastChild)
      }

      const form = document.createElement('form')
      form.id = 'editForm'
      const input = document.createElement('input')
      input.type = 'text'
      input.value = oldNote;
      const submit = document.createElement('input')
      submit.type = 'submit'
      submit.innerText = 'save'

      form.append(input)
      form.append(submit)

      form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim()

        editNote(noteId, text)
      })

      divToReplace.append(form)

    } else {
      errorDisplay.textContent = 'An error occurred while editing your note.'
    }
  }

  const deleteNote = (noteId) => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'))

    let deletedNote = null;
    for (let i = 0; i < savedNotes.length; i++) {
      if (savedNotes[i].id === +noteId) {
        deletedNote = savedNotes.splice(i, 1)
        break
      }
    }
    if (deletedNote) {
      localStorage.setItem('notes', JSON.stringify(savedNotes))
      renderNotes()
    } else {
      errorDisplay.textContent = 'An error occurred while deleting your note.'
    }
  }

  const formatNote = note => {
    //////  Create Note Div  //////
    const formattedNote = document.createElement('div')
    formattedNote.id = note.id
    formattedNote.classList.add('note')


    //////  Create Note Text  //////
    const noteText = document.createElement('p')
    noteText.classList.add('noteText')
    noteText.textContent = note.text


    //////  Create Bottom Row  //////
    const adminContainer = document.createElement('div')
    adminContainer.classList.add('notesAdmin')

    const timestamp = document.createElement('p')
    timestamp.classList.add('timestamp')
    const theDate = new Date(note.id).toLocaleDateString()
    const theTime = new Date(note.id).toLocaleTimeString()
    timestamp.textContent = `${theTime} on ${theDate}`
    adminContainer.appendChild(timestamp)

    //////  Create Buttons  //////
    const buttonDiv = document.createElement('div')
    const deleteButton = document.createElement('button')
    deleteButton.id = note.id
    deleteButton.classList.add('noteButton')
    deleteButton.textContent = 'erase'
    deleteButton.addEventListener('click', e => {
      deleteNote(e.target.id);
    })

    const editButton = document.createElement('button')
    editButton.id = note.id
    editButton.classList.add('noteButton')
    editButton.classList.add('editButton')
    editButton.textContent = 'edit'
    editButton.addEventListener('click', e => {
      setEditForm(e.target.id)
    })

    buttonDiv.appendChild(editButton)
    buttonDiv.appendChild(deleteButton)
    adminContainer.append(buttonDiv)

    formattedNote.appendChild(noteText)
    formattedNote.appendChild(adminContainer)
    return formattedNote;
  }

  // handle initial render and the rerender when adding or deleting a note
  const renderNotes = () => {
    const savedInStorage = localStorage.getItem('notes')

    if (savedInStorage) {
      const savedNotes = JSON.parse(savedInStorage)

      while (notebook.firstChild) {
        notebook.removeChild(notebook.lastChild)
      }
      savedNotes.reverse().forEach(note => {
        const formattedNote = formatNote(note)
        notebook.append(formattedNote)
      })
    }
  }

  // add note to storage, then call renderNotes
  const addNote = text => {
    const note = {
      id: Date.now(),
      text,
    }

    const savedNotes = JSON.parse(localStorage.getItem('notes'))
    savedNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(savedNotes))

    renderNotes()
  }



  display.append(notebook)

  //////  Create Form  //////
  const form = document.createElement('form')
  form.id = 'noteForm';

  const input = document.createElement('input')
  input.type = 'text'
  input.classList.add('noteInput')
  input.placeholder = 'Enter your note...'

  const button = document.createElement('button')
  button.id = 'noteSubmit'
  button.type = 'submit'
  button.textContent = 'Jot'
  button.style.fontFamily = apps[0].font
  button.style.color = apps[0].color

  form.addEventListener('submit', e => {
    e.preventDefault()

    const text = input.value.trim();      // always a good idea to trim off any whitespace
    addNote(text)

    input.value = ''
  })

  form.append(input, button)
  options.append(form)

  renderNotes()
}



// generateNotes()

// TODO:
// get border, put input and submit button into options div

// localstorage
// key: notes
// value: array of notes
