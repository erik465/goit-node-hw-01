const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

//Helper function to read contacts file
async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
  return JSON.parse(data);
}
//Helper function to read change file
async function writeContacts(data) {
  return fs.writeFile(contactsPath, data);
}

async function listContacts() {
  const data = await readContacts();
  return data;
}

async function getContactById(contactId) {
  const contactList = await readContacts();
  const contact = contactList.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contactList = await readContacts();

  const index = contactList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const remContact = contactList.find((contact) => contact.id === contactId);

  const newList = contactList.filter((contact) => contact.id != contactId);

  await writeContacts(JSON.stringify(newList));

  return remContact;
}

async function addContact(name, email, phone) {
  const contactList = await readContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };
  contactList.push(newContact);

  await writeContacts(JSON.stringify(contactList));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
