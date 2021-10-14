// const notesArray = [];

const generateNotes = () => {

  const display = document.getElementById('display')

  const notebook = document.createElement('div')
  notebook.id = 'notebook'
  notebook.style.border = `4px solid ${apps[0].color}`
  notebook.style.color = apps[0].color


  const formatNote = note => {
    const formattedNote = document.createElement('div')
    formattedNote.id = note.id
    formattedNote.classList.add('note')

    const noteText = document.createElement('p')
    noteText.textContent = note.text

    formattedNote.appendChild(noteText)
    return formattedNote;
  }

  // handle initial render and the rerender when adding or deleting a note
  const renderNotes = () => {
    const savedInStorage = localStorage.getItem('notes')

    if (savedInStorage) {
      const savedNotes = JSON.parse(savedInStorage)

      while (notebook.firstChild){
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

    const savedInStorage = localStorage.getItem('notes')
    const savedNotes = JSON.parse(savedInStorage)
    // console.log('savedNotes in addNote -->',savedNotes);
    savedNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(savedNotes))

    // const formattedNote = formatNote(note)

    // notebook.append(formattedNote)

    renderNotes()
  }




  display.append(notebook)

  const options = document.getElementById('markOptions')
  const form = document.createElement('form')

  const input = document.createElement('input')
  input.type = 'text'
  input.classList.add('noteInput')
  input.placeholder = 'Enter your note...'

  const button = document.createElement('button')
  button.classList.add('submitButton')
  button.type = 'submit'
  button.textContent = 'Submit'
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
