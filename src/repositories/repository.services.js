import { query } from "../database/postgres.js";

// Método Listar (GET)
async function Listar() {
  let sql = "SELECT id_service, description FROM services ORDER BY description";
  try {
    const services = await query(sql, []);
    return services;
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    throw error;
  }
}

// Exportando os métodos
export default { Listar };
