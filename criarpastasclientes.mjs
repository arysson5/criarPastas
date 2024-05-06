import Fs from 'fs/promises'
import mysql from 'mysql' 

// MUDE ESSA VARIÁVEL PARA A SIGLA DO SHOPPING QUE QUER CRIAR AS PASTAS
const iso = 8909

var con = mysql.createConnection({
  host: "10.1.1.146",
  user: "bgf",
  password: "C0n$#lT0r14",
  database: "bgf"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao servidor!");
});

con.query(`SELECT att.file_name ,   COUNT(*) AS quantidade 
FROM tbl_attachment_audit  att 
where att.file_path
GROUP BY att.file_name 
HAVING COUNT(*) > 2;`, function (error, results, fields) {
  if (error) throw error;
  if (results.length < 1) throw new Error ("Sigla errada: " + sigla)

  console.log(results);

  // for (let i = 0; i < results.length; i++) {
  //   const loja = results[i].cust_name;
  //   createFolder(loja);
  // }
  // console.log("Criado pastas!");
});

// con.query(`UPDATE bgf.tbl_audit SET printed = 0 WHERE id_customer IN (SELECT id FROM bgf.tbl_customer WHERE cust_name LIKE '${sigla}%') AND status = 'Check' AND approved = 'Não verificado';`, function (error, results, fields) {
//   if (error) throw error;

//   console.log("Fichas desprintadas!");
// });

con.end();

/**
 * Recursively create a directory at the given `path`.
 *
 * @param {String} path
 */
async function ensureDir(path) {
  await Fs.mkdir(path, { recursive: true })
}

async function createFolder(loja) {
  await ensureDir(`./${sigla}/${loja}/FOTOS`)
  await ensureDir(`./${sigla}/${loja}/RELATÓRIOS`)
}