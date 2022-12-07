import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'LoginController.auth');

  Route.group(() => {
    Route.get('/', 'EmissoresController.getAll');
    Route.post('/', 'EmissoresController.create');
    Route.put('/:id', 'EmissoresController.update');
    Route.delete('/:id', 'EmissoresController.delete');

    Route.patch('/ultimo', 'EmissoresController.updateUltimoEmissorSelecionado');
    Route.get('/ultimo', 'EmissoresController.getUltimoEmissorSelecionadoByUser');
  }).prefix('/emissores');

  Route.group(() => {

    Route.group(() => {
      Route.post('/', 'EmpresasController.create');
      Route.put('/:id', 'EmpresasController.update');
      Route.delete('/:id', 'EmpresasController.delete');
    }).prefix('/empresas');

    Route.group(() => {
      Route.get('/', 'UsuariosController.getAll');
      Route.post('/', 'UsuariosController.create');
      Route.patch('/:id', 'UsuariosController.update');
      Route.delete('/:id', 'UsuariosController.delete');
    }).prefix('/usuarios');

    Route.group(() => {
      Route.get('/max', 'ClientesController.max');
      Route.get('/', 'ClientesController.getAll');
      Route.post('/', 'ClientesController.create');
      Route.put('/:id', 'ClientesController.update');
      Route.delete('/:id', 'ClientesController.delete');
    }).prefix('/clientes');

    Route.group(() => {
      Route.get('/max', 'ProdutosController.max');
      Route.get('/', 'ProdutosController.getAll');
      Route.get('/group', 'ProdutosController.getAllByGroup');
      Route.post('/', 'ProdutosController.create');
      Route.put('/:id', 'ProdutosController.update');
      Route.delete('/:id', 'ProdutosController.delete');
    }).prefix('/produtos');

    Route.group(() => {
      Route.get('/max', 'ServicosController.max');
      Route.get('/', 'ServicosController.getAll');
      Route.post('/', 'ServicosController.create');
      Route.put('/:id', 'ServicosController.update');
      Route.delete('/:id', 'ServicosController.delete');
    }).prefix('/servicos');

    Route.group(() => {
      Route.get('/max', 'TransportadorasController.max');
      Route.get('/', 'TransportadorasController.getAll');
      Route.post('/', 'TransportadorasController.create');
      Route.put('/:id', 'TransportadorasController.update');
      Route.delete('/:id', 'TransportadorasController.delete');
    }).prefix('/transportadoras');

    Route.group(() => {
      Route.get('/', 'GruposController.getAll');
      Route.post('/', 'GruposController.create');
      Route.put('/:id', 'GruposController.update');
      Route.delete('/:id', 'GruposController.delete');
    }).prefix('/grupos');

    Route.group(() => {
      Route.get('/:uf', 'CidadesController.getAll');
      Route.post('/', 'CidadesController.create');
      Route.put('/:id', 'CidadesController.update');
      Route.delete('/:id', 'CidadesController.delete');
    }).prefix('/cidades');

  }).middleware('auth');

}).prefix('/api');
