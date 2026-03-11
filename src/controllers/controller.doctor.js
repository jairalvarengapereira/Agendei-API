import serviceDoctor from "../services/service.doctor.js";

// Médoto Listar
async function Listar(req, res){
  const name = req.query.name;
  const doctors = await serviceDoctor.Listar(name);
  res.status(200).json(doctors);
}

// Médoto Listar Doctor
// controller.doctor.js

// Função ListarDoctor
async function ListarDoctor(req, res) {
  const id_doctor = req.params.id_doctor;
  const doctor = await serviceDoctor.ListarDoctor(id_doctor);
  res.status(200).json(doctor);
}


// Método Inserir
async function Inserir(req, res){
  // const name = req.body.name;
  // const specialty = req.body.specialty;
  // const icon = req.body.icon;
  const { name, specialty, icon } = req.body;
  // const newDoctor = await serviceDoctor.Inserir(name, specialty, icon);
  const newDoctor = await serviceDoctor.Inserir(name, specialty, icon);
  res.status(201).json(newDoctor);
}

// Método Editar
async function Editar(req, res){
  const id_doctor = req.params.id_doctor;
  const {name, specialty, icon} = req.body;
  const updatedDoctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);
  res.status(200).json(updatedDoctor);
}

// Método Excluir
async function Excluir(req, res){
  const id_doctor = req.params.id_doctor;
  await serviceDoctor.Excluir(id_doctor);
  res.status(204).send();
}

// Médoto ListarServicos
async function ListarServicos(req, res){
  const id_doctor = req.params.id_doctor;
  const serv = await serviceDoctor.ListarServicos(id_doctor);
  res.status(200).json(serv);
}

// Métodos relacionados ao nome do médico
export default {Listar, Inserir, Editar, Excluir, ListarServicos, ListarDoctor };