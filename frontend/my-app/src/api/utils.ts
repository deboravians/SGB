export const tratarErroResponse = async (response: Response) => {
  let mensagemErro = "Ocorreu um erro inesperado.";

  try {
    const data = await response.json();
    if (data.message) {
      mensagemErro = data.message;
    }
  } catch {
    // mantém o erro padrão
  }

  throw new Error(mensagemErro);
};
