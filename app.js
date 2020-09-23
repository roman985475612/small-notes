const yargs = require('yargs')
const pkg = require('./package.json')
const notes = require('./notes')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Добавить новую заметку',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Название заметки'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'Текст заметки'
        },
    },
    handler({title, text}) {
        notes.addNote(title, text)
    }
})

yargs.command({
    command: 'list',
    describe: 'Показать список заметок',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'show',
    describe: 'Показать заметку',
    handler() {
        console.log('Show command')
    }
})

yargs.command({
    command: 'remove',
    describe: 'Удалить заметку',
    handler() {
        console.log('Remove command')
    }
})

yargs.parse()