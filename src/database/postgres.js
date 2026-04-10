import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_BqeEs8DN7fYH@ep-sweet-cell-an547vg3-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
  family: 4,
});

db.connect((err, client, release) => {
  if (err) {
    console.error(`Erro ao conectar o banco de dados: ${err.message}`);
  } else {
    release();
    console.log("Banco de dados PostgreSQL conectado com sucesso.");
  }
});

function query(command, params = []) {
  return db.query(command, params).then((result) => result.rows);
}

export { db, query };
