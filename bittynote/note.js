const generateNotes = () => {
  const notebook = document.createElement('div')
  notebook.id = 'notebook'
  notebook.style.border = `4px solid ${apps[0].color}`

  const errorDisplay = document.getElementById('errors')

  const editNote = (noteId, newNoteText) => {
    deleteNote(noteId)
    addNote(newNoteText)
  }

  const setEditForm = (noteId) => {
    //////  Find note to edit in DOM & replace w/ form  //////
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
      form.id = 'editNoteForm'
      const input = document.createElement('input')
      input.classList.add('noteInput')
      input.type = 'text'
      input.value = oldNote;
      const submit = document.createElement('input')
      submit.classList.add('submitButton')
      submit.style.fontFamily = apps[0].font
      submit.style.fontSize = '1rem'
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
    delete savedNotes[noteId]
    localStorage.setItem('notes', JSON.stringify(savedNotes))
    renderNotes()
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
    adminContainer.classList.add('noteAdmin')

    const timestamp = document.createElement('p')
    const theDate = new Date(note.id).toLocaleDateString()
    const theTime = new Date(note.id).toLocaleTimeString()
    timestamp.textContent = `${theTime} on ${theDate}`
    adminContainer.appendChild(timestamp)

    //////  Create Buttons  //////
    const buttonDiv = document.createElement('div')
    const deleteButton = document.createElement('button')
    deleteButton.id = note.id
    deleteButton.textContent = 'erase'
    deleteButton.addEventListener('click', e => {
      deleteNote(e.target.id);
    })

    const editButton = document.createElement('button')
    editButton.id = note.id
    editButton.textContent = 'edit'
    editButton.addEventListener('click', e => {
      setEditForm(e.target.id)
    })

    buttonDiv.append(editButton, deleteButton)
    adminContainer.append(buttonDiv)


    formattedNote.append(noteText, adminContainer)
    return formattedNote;
  }

  const addNote = text => {
    //////  add note to storage, then call renderNotes  //////
    const note = {
      id: Date.now(),
      text,
    }

    let savedNotes = JSON.parse(localStorage.getItem('notes'))
    if (savedNotes) {
      savedNotes[note.id] = note
    } else {
      savedNotes = {};
      savedNotes[note.id] = note;
    }
    localStorage.setItem('notes', JSON.stringify(savedNotes))

    renderNotes()
  }

  //////  Create Form  //////
  const form = document.createElement('form')
  form.id = 'noteForm';

  const input = document.createElement('input')
  input.type = 'text'
  input.classList.add('noteInput')
  input.placeholder = 'Enter your note...'

  const button = document.createElement('button')
  button.classList.add('submitButton')
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

  display.append(notebook)


  const renderNotes = () => {
    const savedInStorage = localStorage.getItem('notes')

    if (savedInStorage) {
      const savedNotesObj = JSON.parse(savedInStorage)

      notebook.innerHTML = ''
      const savedNotes = Object.values(savedNotesObj)
      savedNotes.reverse().forEach(note => {
        const formattedNote = formatNote(note)
        notebook.append(formattedNote)
      })
    }
  }
  renderNotes()
}
