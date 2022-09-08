 const { rejects } = require('assert')
 const fs = require('fs')
 const chalk= require('chalk')
 const validator= require('validator')
 const { resolve } = require('path')
 

//membuat folder direktori jika belum ada
 const dirPath = './data'
 if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
 }

//membuat file jika belum ada
 const filePath = './data/contacts.json'
 if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
 }

const loadContact= ()=> {
   const file = fs.readFileSync('data/contacts.json', 'utf-8')
   contacts = JSON.parse(file)
   return contacts;
}


 //simpan kontak
 const simpanContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp}

    const contacts= loadContact();
    

    //cek duplikat
    const duplikat= contacts.find((contact)=> contact.nama === nama)
    if(duplikat){
      console.log(chalk.red.inverse.bold("Kontak Sudah Terdaftar, Gunakan Nama Lain!!"))
      return false;
    }

    //cek email
    if(email){
      if(!validator.isEmail(email)){
         console.log(chalk.red.inverse.bold("Email Tidak Valid"))
         return false;
      }
    }

    //cek no Hp
    if(!validator.isMobilePhone(noHp, 'id-ID')){
      console.log(chalk.red.inverse.bold("No Hp Anda Tidak Valid"))
      return false;
   }


    contacts.push(contact)
    console.log(chalk.blueBright.inverse.bold(`Terima Kasih ${nama} Sudah Mengisi Data`))
        
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2))

   
 }

 //menampilkan list
 const listContact= ()=> {
   const contacts= loadContact();
   console.log(chalk.greenBright.inverse.bold('Daftar Kontak : '))
   //perulangan
   contacts.forEach((contact, i)=> {
      console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`)
   })
 }

 //menampilkan detail
 const detailContact= (nama)=> {
   const contacts= loadContact();

   const contact= contacts.find((contact)=> contact.nama.toLowerCase() === nama.toLowerCase());

   if (!contact) {
      console.log(chalk.red.inverse.bold(`${nama} Tidak Ditemukan`))
      return false 
   }

   console.log(chalk.greenBright.inverse.bold(contact.nama))
   console.log(contact.noHp)

   if(contact.email){
      console.log(contact.email)
   }   
 }

 //hapus kontak
 const deleteContact= (nama)=> {
   const contact= loadContact();

   newContacts= contacts.filter((contact)=> contact.nama.toLowerCase() !== nama.toLowerCase())  
   
   if (contact.length === newContacts.length) {
      console.log(chalk.red.inverse.bold(`${nama} Tidak Ditemukan`))
      return false 
   }

   fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2))

   console.log(chalk.greenBright.inverse.bold(`Data Kontak ${nama} Berhasil Dihapus`))

   }

  
 module.exports = { simpanContact, listContact, detailContact, deleteContact}