import { query } from "../database/postgres.js";

// Método Listar (GET)
async function Listar(name){
  let filtro = [];
  let sql = "select * from doctors ";
  if(name){
    sql += "where name ilike $1 ";
    filtro.push(`%${name}%`);
  }
  sql += "order by name";

  const doctors = await query(sql, filtro);
  return doctors;
}

// Método Listar Doctor (GET)
async function ListarDoctor(id_doctor) {
  let sql = "select * from doctors where id_doctor = $1 ";
  const doctor = await query(sql, [id_doctor]);
  return doctor;
}

// Método Inserir (POST)
async function Inserir(name, specialty, icon){
  let sql = `INSERT INTO doctors (name, specialty, icon) VALUES ($1, $2, $3) RETURNING id_doctor`;
  const newDoctor = await query(sql, [name, specialty, icon]);
  return newDoctor[0];
}

// Método Editar (PUT)
async function Editar(id_doctor, name, specialty, icon){
  let sql = "UPDATE doctors SET name = $1, specialty = $2, icon = $3 WHERE id_doctor = $4";
  await query(sql, [name, specialty, icon, id_doctor]);
}

// Método Excluir (DELETE)
async function Excluir(id_doctor){
  let sql = "DELETE FROM doctors WHERE id_doctor = $1";
  await query(sql, [id_doctor]);
}

// Método ListarServicos
async function ListarServicos(id_doctor){
  let sql = `Select d.id_service, s.description, d.price
               From doctors_services d join services s on d.id_service = s.id_service
              Where d.id_doctor = $1
              Order by s.description`;

  const serv = await query(sql, [id_doctor]);
  return serv;
}

// Exportando os métodos
export default { Listar, Inserir, Editar, Excluir, ListarServicos, ListarDoctor };
