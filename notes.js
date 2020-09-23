const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const notePath = path.join(__dirname, 'notes.json')

const getNotes = (callback) => {
    fs.readFile(notePath, 'utf-8', (err, content) => {
        if (err) throw new Error(err)

        try {
            callback(JSON.parse(content))
        } catch (e) {
            callback([])
        }
    })
}

const saveNotes = (content) => {
    fs.writeFile(notePath, JSON.stringify(content), err => {
        if (err) throw new Error(err)
    })
}

const addNote = (title, text) => {
    getNotes((notes) => {
        const dublicateNote = notes.find(note => note.title === title)

        if (dublicateNote) {
            console.log(chalk.red.inverse('Заметка с таким названием уже существует!'))
        } else {
            notes.push({ title, text })
            saveNotes(notes)
            console.log(chalk.green.inverse('Заметка добавлена!'))
        }
    })
}

const listNotes = () => {
    getNotes(notes => {
        if (notes.length !== 0) {
            console.log(chalk.inverse('Ваши заметки...'))

            notes.forEach((note) => {
                console.log(note.title)
            });
        } else {
            console.log(chalk.blue('Заметок пока нет...'))
        }
    })
}

module.exports = {
    addNote,
    listNotes,
}