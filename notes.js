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

const addNote = (title, text) => {
    getNotes((notes) => {
        const dublicateNote = notes.find(note => note.title === title)

        if (dublicateNote) {
            console.log(chalk.red.inverse('Заметка с таким названием уже существует!'))
        } else {
            notes.push({ title, text })
            console.log(chalk.green.inverse('Заметка добавлена!'))
        }
    })
}

module.exports = {
    addNote,
}