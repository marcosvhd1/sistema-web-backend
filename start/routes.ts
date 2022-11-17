import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'LoginController.auth');

  Route.group(() => {
    Route.get('/token', 'LoginController.getToken');
    Route.group(() => {
      Route.get('/', 'EmpresasController.getEmpresas');
      Route.get('/:id', 'EmpresasController.getEmpresaById');

      Route.post('/', 'EmpresasController.setEmpresa');

      Route.put('/:id', 'EmpresasController.updateEmpresa');

      Route.delete('/:id', 'EmpresasController.deleteEmpresa');
    }).prefix('/empresas');

    Route.group(() => {
      Route.get('/', 'UsuariosController.getUsuarios');
      Route.get('/:id', 'UsuariosController.getUsuarioById');
      Route.post('/user', 'UsuariosController.setUsuario');


      Route.put('/:id', 'UsuariosController.updateUsuario');

      Route.delete('/:id', 'UsuariosController.deleteUsuario');
    }).prefix('/usuarios');

    Route.group(() => {
      Route.get('/', 'ClientesController.getClientes');
      Route.get('/:id', 'ClientesController.getClienteById');

      Route.post('/', 'ClientesController.setCliente');

      Route.put('/:id', 'ClientesController.updateCliente');

      Route.delete('/:id', 'ClientesController.deleteCliente');
    }).prefix('/clientes');
  }).middleware('auth');
}).prefix('/api');
