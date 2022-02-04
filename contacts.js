// import { readFileSync, readFile, writeFile, promises as FsPromisses } from "fs";

// // // console.log(readFileSync("package.json", "utf-8"));
// // readFile("package.json", "utf-8", (err, data) => {
// //   if (err) throw err;
// //   console.log(data);
// // });

// // const path = require("path");
// // const shortid = require("shortid");

// async function contacts() {
//   //   await FsPromisses.writeFile("contacts.txt", "hello");
//   //   console.log(await FsPromisses.readFile("contacts.txt", "utf-8"));
//   await FsPromisses.unlink("contacts.txt");
// }
// contacts();

// import { readFile, writeFile, promises as FsPromisses } from "fs";

const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const result = JSON.parse(data);
    console.table(result);
  });
}

async function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const contactById = JSON.parse(data).find(contact => contact.id === Number(contactId));
    console.table(contactById);
  });
}

async function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;

    const removeContactById = JSON.parse(data).filter(({ id }) => id !== Number(contactId));

    fs.writeFile(contactsPath, JSON.stringify(removeContactById), err => {
      if (err) throw err;
      console.log(`Contact by ID: '${contactId}' was removed`);
      console.table(removeContactById);
    });
  });
}

async function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    let uniqueId = Math.floor(Math.random() * 100);
    const createContact = [...JSON.parse(data), { id: uniqueId, name, email, phone }];
    fs.writeFile(contactsPath, JSON.stringify(createContact), err => {
      if (err) throw err;
      console.log(`Contact ${name} was added with id ${uniqueId}`);
      console.table(createContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
