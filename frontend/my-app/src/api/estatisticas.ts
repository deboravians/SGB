import { TopAlunos } from "../types/topAlunos";
import { tratarErroResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

// TELA HOME E TELA EMPRÉSTIMOS

export const totalLeitores = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/leitores/totalCadastrado`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

export const totalCopias = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/copias/totalCadastrado`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

export const totalEmprestimosAtivos = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/emprestimos/totalAtivo`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

export const totalEmprestimosAtrasados = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/emprestimos/totalAtrasado`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

//TELA EDIÇÕES

export const totalCopiasDisponiveis = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/copias/totalDisponivel`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

export const totalCopiasEmprestadas = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/copias/totalEmprestado`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

//TELA LEITORES ALUNOS

export const totalAlunos = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/alunos/totalCadastrado`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

//TELA LEITORES PROFESSORES

export const totalProfessores = async (): Promise<number> => {
  const response = await fetch(
    `${API_URL}/estatisticas/professores/totalCadastrado`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};

//TOP ALUNOS

export const getTopAlunos = async (
  dataInicio: string,
  dataFim: string
): Promise<TopAlunos[]> => {
  const response = await fetch(
    `${API_URL}/estatisticas/topAlunos?dataInicio=${dataInicio}&dataFim=${dataFim}`
  );

  if (!response.ok) {
    await tratarErroResponse(response);
  }

  const data = await response.json();
  return data;
};
