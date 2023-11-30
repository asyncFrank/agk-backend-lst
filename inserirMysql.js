const mysql = require("mysql");

const listaContatos = require("./constants");

// Configuração da conexão
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Re2011@amorDeus-53",
  database: "sacci",
});

// Conectar ao banco de dados
connection.connect( (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    throw err;
  }
  console.log("Conexão bem-sucedida ao banco de dados MySQL");
});

// Agora você pode executar consultas, inserções, atualizações, etc.
// const contacts = listaContatos
// contacts.map((contact)=>{
//   console.log(contact.name)
// })

// Exemplo de consulta
let stringSql = "";
for (let i = 0; i < listaContatos.length; i++) {
  stringSql =
    "INSERT INTO contacts_repo(name, cnpj, contact_type,image_url, city, state,intern_contact," +
    "profession, business_segment, email, phone, address_street, address_number, district," +
    "zip_code,complement, site, planting_culture, whatsapp, facebook, instagram, linkedin," +
    "specialties, rating,obs, situacao)" +
    " VALUES('" +
    listaContatos[i].name.replace(/\'/g, "") +
    "','" +
    listaContatos[i].cnpj +
    "','" +
    listaContatos[i].contact_type +
    "','" +
    listaContatos[i].image_url +
    "','" +
    listaContatos[i].city?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].state +
    "','" +
    listaContatos[i].intern_contact?.replace("'", "") +
    "','" +
    listaContatos[i].profession?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].business_segment?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].email +
    "','" +
    listaContatos[i].phone +
    "','" +
    listaContatos[i].address_street?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].address_number?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].district?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].zip_code +
    "','" +
    listaContatos[i].complement?.replace(/\'/g, "")+
    "','" +
    listaContatos[i].site +
    "','" +
    listaContatos[i].planting_culture +
    "','" +
    listaContatos[i].whatsapp +
    "','" +
    listaContatos[i].facebook +
    "','" +
    listaContatos[i].instagram +
    "','" +
    listaContatos[i].linkedin +
    "','" +
    listaContatos[i].specialties?.replace(/\'/g, "") +
    "'," +
    listaContatos[i].degree_relevance +
    ",'" +
    listaContatos[i].observation?.replace(/\'/g, "") +
    "','" +
    listaContatos[i].situation +
    "')";
  // console.log(stringSql)
   connection.query(stringSql, (error, results, fields) => {
    if (error) throw error;
    // console.log("Resultados da consulta:", results);
  });
}

// Fechar a conexão ao terminar
connection.end();
