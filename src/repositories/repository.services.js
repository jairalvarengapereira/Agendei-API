import { query } from "../database/postgres.js";

async function Listar() {
  let sql = "SELECT id_service, description FROM services ORDER BY description";
  const services = await query(sql, []);
  return services;
}

async function Inserir(description) {
  let sql = `INSERT INTO services (description) VALUES ($1) RETURNING id_service`;
  const service = await query(sql, [description]);
  return service[0];
}

async function Editar(id_service, description) {
  let sql = "UPDATE services SET description = $1 WHERE id_service = $2";
  await query(sql, [description, id_service]);
}

async function Excluir(id_service) {
  let sql = "DELETE FROM services WHERE id_service = $1";
  await query(sql, [id_service]);
}

export default { Listar, Inserir, Editar, Excluir };
