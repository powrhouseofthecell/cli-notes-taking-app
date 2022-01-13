// process.argv;
const yargs = require("yargs")
const notes = require("./notes.js")

// Customize yargs version
yargs.version("1.1.0")

// Create add command
yargs.command({
	command: "add",
	describe: "Add a new note",
	// options are specified in builder
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
		body: {
			describe: "Note body",
			demandOption: true,
			type: "string",
		},
	},
	// yargs calls the handler function with the argv argument that contains the arguments.
	handler: argv => {
		notes.addNote(argv.title, argv.body)
	},
})

// Create remove command
yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Remove a note",
			demandOption: true,
			type: "string",
		},
	},
	handler: argv => {
		notes.removeNote(argv.title)
	},
})

// Create list command
yargs.command({
	command: "list",
	describe: "List your notes",
	handler: () => {
		notes.listNotes()
	},
})

// Create read command
yargs.command({
	command: "read",
	describe: "Read a note",
	builder: {
		title: {
			describe: "Read a note",
			demandOption: true,
			type: "string",
		},
	},
	handler: argv => {
		notes.readNote(argv.title)
	},
})

yargs.parse()
