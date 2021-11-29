const generateNotes = () => {
  const notebook = document.createElement('div')
  notebook.id = 'notebook'
  notebook.style.border = `4px solid ${apps[0].color}`
  display.append(notebook)

  const savedNotes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : {
    43770: {
      "id": 43770,
      "text": "welcome to bitty note! nothing lasts forever, but your notes will stick around here unless you erase your notes or clear your browser’s local storage. all of your notes are stored locally and not accessible by anyone else."
    }
  }

  const formatNote = note => {
    const formattedNote = document.createElement('div')
    formattedNote.id = note.id
    formattedNote.classList.add('note')

    const noteText = document.createElement('p')
    noteText.textContent = note.text

    const adminContainer = document.createElement('div')
    adminContainer.classList.add('noteAdmin')

    const timestamp = document.createElement('p')
    const theDate = new Date(note.id).toLocaleDateString()
    const theTime = new Date(note.id).toLocaleTimeString()
    timestamp.textContent = `${theTime} on ${theDate}`
    adminContainer.appendChild(timestamp)

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

  //////  renderNotes() - called on initial render, note add/edit/delete   //////
  const renderNotes = () => {
    notebook.innerHTML = ''
    Object.values(savedNotes).reverse().forEach(note => {
      const formattedNote = formatNote(note)
      notebook.append(formattedNote)
    })
  }
  renderNotes()


  const errorDisplay = document.getElementById('errors')

  //////  create form  //////
  const newNoteForm = document.createElement('form')
  newNoteForm.id = 'noteForm';

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

  newNoteForm.addEventListener('submit', e => {
    e.preventDefault()

    const text = input.value.trim();      // always a good idea to trim off any whitespace
    addNote(text)

    input.value = ''
  })

  newNoteForm.append(input, button)
  options.append(newNoteForm)


  //////  note interaction functions  //////
  const addNote = text => {
    const note = {
      id: Date.now(),
      text,
    }

    savedNotes[note.id] = note
    localStorage.setItem('notes', JSON.stringify(savedNotes))

    renderNotes()
  }

  const deleteNote = (noteId) => {
    delete savedNotes[noteId]
    localStorage.setItem('notes', JSON.stringify(savedNotes))
    renderNotes()
  }

  const editNote = (noteId, newNoteText) => {
    deleteNote(noteId)
    addNote(newNoteText)
  }

  const setEditForm = (noteId) => {
    //////  find note to edit in DOM & replace w/ form  //////
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
}
