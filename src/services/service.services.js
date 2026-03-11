import repositoryServices from "../repositories/repository.services.js";

// Método Listar
async function Listar(description){
  const services = await repositoryServices.Listar(description);
  return services; 
}

// // Método Inserir
// async function Inserir(name, specialty, icon){
//   const newDoctor = await repositoryDoctors.Inserir(name, specialty, icon);
//   return newDoctor; 
// }

// // Método Editar
// async function Editar(id_doctor, name, specialty, icon){
//   const updatedDoctor = await repositoryDoctors.Editar(id_doctor, name, specialty, icon);
//   return updatedDoctor; 
// }

// // Método Excluir
// async function Excluir(id_doctor){
//   await repositoryDoctors.Excluir(id_doctor);
// }

// // Método ListarServicos
// async function ListarServicos(id_doctor){
//   const serv = await repositoryDoctors.ListarServicos(id_doctor);
//   return serv; 
// }

// Exportando os Métodos
export default {Listar}//, Inserir, Editar, Excluir, ListarServicos};

