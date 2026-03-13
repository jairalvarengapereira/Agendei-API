import repositoryServices from "../repositories/repository.services.js";

// Método Listar
async function Listar() {
  const services = await repositoryServices.Listar();
  return services;
}

// Método Inserir
async function Inserir(description) {
  const service = await repositoryServices.Inserir(description);
  return service;
}

// Método Editar
async function Editar(id_service, description) {
  await repositoryServices.Editar(id_service, description);
}

// Método Excluir
async function Excluir(id_service) {
  await repositoryServices.Excluir(id_service);
}

export default { Listar, Inserir, Editar, Excluir };
