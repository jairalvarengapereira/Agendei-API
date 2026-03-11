import { query } from "../database/postgres.js";

// Método Listar (GET)
async function Listar(id_user, dt_start, dt_end, id_doctor){
  let filter = [];
  let paramIndex = 1;

  let sql = ` Select a.id_appointment, d.name as doctor, d.specialty, s.description as service, a.id_user,
                    u.name as user, a.booking_date, a.booking_hour, ds.price, a.id_doctor, a.id_service
              from appointments a join doctors  d on d.id_doctor  = a.id_doctor
                                  join users    u on u.id_user    = a.id_user
                                  join services s on s.id_service = a.id_service
                            left join doctors_services ds on ds.id_doctor  = a.id_doctor 
                                                         and ds.id_service = a.id_service
              where 1 = 1 `;

  if (id_user){
    filter.push(id_user);
    sql += `and a.id_user = $${paramIndex++} `;
  }

  if (dt_start){
    filter.push(dt_start);
    sql += `and a.booking_date >= $${paramIndex++} `;
  }

  if (dt_end){
    filter.push(dt_end);
    sql += `and a.booking_date <= $${paramIndex++} `;
  }

  if (id_doctor){
    filter.push(id_doctor);
    sql += `and a.id_doctor = $${paramIndex++} `;
  }

  sql += `Order by a.booking_date, a.booking_hour`;

  const appointments = await query(sql, filter);
  return appointments;
}

// Método Inserir (POST)
async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour){
  let sql = `insert into appointments (id_user, id_doctor, id_service, booking_date, booking_hour) 
                               VALUES ($1, $2, $3, $4, $5) returning id_appointment`;
  const newAppointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);
  return newAppointment[0];
}

// Método Excluir (DELETE)
async function Excluir(id_user, id_appointment){
  let sql = `Delete from appointments where id_appointment = $1`;
  await query(sql, [id_appointment]);
  return { id_appointment };
}

// Método Listar Agendamento por ID (GET)
async function ListarId(id_appointment){
  let sql = ` Select a.id_appointment, d.name as doctor, d.specialty, s.description as service, a.id_user,
                    u.name as user, a.booking_date, a.booking_hour, ds.price, a.id_doctor, a.id_service
              from appointments a join doctors  d on d.id_doctor  = a.id_doctor
                                  join users    u on u.id_user    = a.id_user
                                  join services s on s.id_service = a.id_service
                            left join doctors_services ds on ds.id_doctor  = a.id_doctor 
                                                         and ds.id_service = a.id_service
              where a.id_appointment = $1 `;

  const appointments = await query(sql, [id_appointment]);
  return appointments[0];
}

// Método Editar (PUT)
async function Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour){
  let sql = ` update appointments set id_user = $1, 
                                  id_doctor = $2, 
                                  id_service = $3, 
                                  booking_date = $4, 
                                  booking_hour = $5
              where id_appointment = $6`;
  await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour, id_appointment]);
  return { id_appointment };
}

// Exportando os métodos
export default { Listar, Inserir, Excluir, ListarId, Editar };
