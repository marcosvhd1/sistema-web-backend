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
      Route.get('/', 'ProdutosController.getProdutos');
      Route.get('/only/:id', 'ProdutosController.getProdutoById');
      Route.get('/max', 'ProdutosController.max');
      Route.get('/filter', 'ProdutosController.searchFilter');
      Route.post('/', 'ProdutosController.setProduto');
      Route.put('/:id', 'ProdutosController.updateProduto');
      Route.delete('/:id', 'ProdutosController.deleteProduto');
    }).prefix('/produtos');

    Route.group(() => {
      Route.get('/', 'ServicosController.getServicos');
      Route.get('/only/:id', 'ServicosController.getServicoById');
      Route.get('/max', 'ServicosController.max');
      Route.get('/filter', 'ServicosController.searchFilter');
      Route.post('/', 'ServicosController.setServico');
      Route.put('/:id', 'ServicosController.updateServico');
      Route.delete('/:id', 'ServicosController.deleteServico');
    }).prefix('/servicos');

    Route.group(() => {
      Route.get('/', 'TransportadorasController.getTransportadoras');
      Route.get('/only/:id', 'TransportadorasController.getTransportadoraById');
      Route.get('/filter', 'TransportadorasController.searchFilter');
      Route.post('/', 'TransportadorasController.setTransportadora');
      Route.put('/:id', 'TransportadorasController.updateTransportadora');
      Route.delete('/:id', 'TransportadorasController.deleteTransportadora');
    }).prefix('/transportadoras');

    Route.group(() => {
      Route.get('/', 'GruposController.getGrupos');
      Route.get('/only/:id', 'GruposController.getGrupoById');
      Route.post('/', 'GruposController.setGrupo');
      Route.put('/:id', 'GruposController.updateGrupo');
      Route.delete('/:id', 'GruposController.deleteGrupo');
    }).prefix('/grupos');

    Route.group(() => {
      Route.get('/', 'CidadesController.getCidades');
      Route.get('/only/:id', 'CidadesController.getCidadeById');
      Route.post('/', 'CidadesController.setCidade');
      Route.put('/:id', 'CidadesController.updateCidade');
      Route.delete('/:id', 'CidadesController.deleteCidade');
    }).prefix('/cidades');

  }).middleware('auth');

}).prefix('/api');
