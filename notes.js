const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
   // add only unique titles

   const notes = loadNotes();

   // const duplicateItem = notes.filter((note) => {
   const duplicateItem = notes.find(note => {
      return title === note.title;
   });

   if (!duplicateItem) {
      notes.push({
         title: title,
         body: body,
      });
      saveNotes(notes);
      console.log(chalk.green.inverse('New note added'));
   } else {
      console.log(chalk.red.inverse('Title already exists'));
   }
};

const saveNotes = notes => {
   const json = JSON.stringify(notes);
   fs.writeFileSync('notes.json', json);
};

const loadNotes = () => {
   try {
      const buffer = fs.readFileSync('./notes.json');
      const dataJSON = buffer.toString();
      const data = JSON.parse(dataJSON);
      return data;
   } catch (error) {
      return [];
   }
};

const removeNote = title => {
   // load the notes
   const notes = loadNotes();
   const noteTokeep = notes.filter(note => {
      return note.title !== title;
   });
   if (notes.length > noteTokeep.length) {
      saveNotes(noteTokeep);
      console.log(chalk.green.inverse('Note removed'));
   } else {
      console.log(chalk.red.inverse('No note found'));
   }
};

const listNotes = () => {
   const notes = loadNotes();
   console.log(chalk.inverse('Listing all notes'));
   notes.forEach(note => {
      console.log(note.title);
   });
};

const readNote = title => {
   const notes = loadNotes();
   const foundNote = notes.find(note => {
      return note.title === title;
   });
   if (foundNote) {
      console.log(
         chalk.inverse('Title: ' + foundNote.title) +
            '\n' +
            chalk.blue.inverse('Body: ' + foundNote.body)
      );
   } else {
      console.log(chalk.red.inverse('No note found'));
   }
};

module.exports = {
   addNote,
   removeNote,
   listNotes,
   readNote,
};
