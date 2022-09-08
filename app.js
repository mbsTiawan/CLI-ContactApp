
const { argv } = require("yargs");
const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact} = require("./contacts");

yargs.command({

   command: 'add',
   describe: 'Menambahkan contact baru',
   builder: {
         nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
         },
         email: {
            describe: 'email',
            demandOption: false,
            type: 'string',
         },
         noHp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
         },   
      },

   handler(argv) {

         simpanContact(argv.nama, argv.email, argv.noHp);
      }

}).demandCommand();

//menampilkan daftar nama kontak dan hp
yargs.command({
   command: 'list',
   describe: 'Menampilkan Semua Nama dan Nomor HP',
   handler() {
      listContact();
   }
})

//menambilkan detail sebuah kontak
yargs.command({
   command: 'detail',
   describe: 'Menampilkan Detail Sebuah Kontak Berdasarkan Nama',
   builder: {
         nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
         },
      },
   handler(argv) {

         detailContact(argv.nama);
      }
})

yargs.command({
   command: 'delete',
   describe: 'Menghapus Sebuah Kontak Berdasarkan Nama',
   builder: {
         nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
         },
      },
   handler(argv) {

         deleteContact(argv.nama);
      }
})


yargs.parse()








//  const {tulisQuest, simpanContact} = require('./contacts.js')
 
//  //fungsi utama
//  const main = async () => {
//     const nama = await tulisQuest("Masukkan Nama Anda : ")
//     const email = await tulisQuest("Masukkan Email Anda : ")
//     const noHP = await tulisQuest("Masukkan No.HP Anda : ")   

//     simpanContact(nama, email, noHP)
//  }

//  main(); //memanggil fungsi utama



