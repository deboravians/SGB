import { Edicao } from "../types/edicoes";

// Função para cadastrar a edição, agora recebendo a classificação como um parâmetro da URL
export const cadastrarEdicao = async (edicao: Edicao, classificacaoCodigo: string): Promise<Edicao> => {
  const response = await fetch(`http://localhost:8080/edicoes?classificacao_codigo=${classificacaoCodigo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isbn: edicao.isbn,
      titulo: edicao.titulo,
      autor: edicao.autor,
      anoPublicacao: edicao.anoPublicacao, // Corrigido para o nome correto
      status: edicao.status,
      qtdCopias: edicao.qtdCopias,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar os dados. Tente novamente.");
  }

  return response.json();
};

export const listarEdicoes = async (): Promise<Edicao[]> => {
  const response = await fetch("http://localhost:8080/edicoes");

  if (!response.ok) {
    throw new Error("Erro ao buscar as edições.");
  }

  return response.json();
}