export interface Usuario {
    id: string;
    nomeCompleto: string;
    email: string;
    senha: string;
    cidade: string;
    estado: string;
    telefone: string;
    sexo: string;
  }
  
  const STORAGE_KEY = "petAqui_usuarios";
  const SESSION_KEY = "petAqui_sessao";

  export function getUsuarios(): Usuario[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  

  export function cadastrarUsuario(novo: Omit<Usuario, "id">): Usuario | null {
    const usuarios = getUsuarios();
  

    if (usuarios.find((u) => u.email === novo.email)) {
      alert("⚠️ Este e-mail já está cadastrado!");
      return null;
    }
  
    const novoUsuario: Usuario = {
      ...novo,
      id: `user-${Date.now()}`,
    };
  
    usuarios.push(novoUsuario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));

    localStorage.setItem(SESSION_KEY, JSON.stringify(novoUsuario));
  
    return novoUsuario;
  }

  export function login(email: string, senha: string): Usuario | null {
    const usuarios = getUsuarios();
    const user = usuarios.find((u) => u.email === email && u.senha === senha);
    if (!user) return null;
  
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  }
  

  export function getUsuarioAtual(): Usuario | null {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }
  

  export function logout() {
    localStorage.removeItem(SESSION_KEY);
  }
  