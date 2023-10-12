# App

GymPass style app.

## RFs (Requisitos funcionais)
- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [] Deve ser possivel obter o perfil de um usuario logado;
- [] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [] Deve ser possivel o usuario obter seu historico de check-ins;
- [] Deve ser possivel o usuario buscar academias proximas;
- [] Deve ser possivel o usuario buscar academia pelo nome;
- [] Deve ser possivel o usuario realizar check-in em uma academia;
- [] Deve ser possivel validar o check-in de um usuario;
- [] Deve ser possivel cadastrar uma academia;

## RNs (Regraas de negocio)
- [x] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [] O usuario nao deve fazer 2 check-ins no mesmo dia;
- [] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [] O check-in so poder ser validado ate 20 minutos apos criado;
- [] O check-in so poder ser validado por administradores;
- [] A academia so poder ser cadastrada por administrador;


## RNFs (Requisitos nao-funcionais)
- [x] A senha do usuario precisa estar criptorgrafada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas em 20 itens por pagina;
- [] O usuario deve ser identificado por um JWT (JSON Web Token);
