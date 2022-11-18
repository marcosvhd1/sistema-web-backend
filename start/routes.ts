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

      Route.post('/', 'UsuariosController.setUsuario');

      Route.put('/:id', 'UsuariosController.updateUsuario');

      Route.delete('/:id', 'UsuariosController.deleteUsuario');
    }).prefix('/usuarios');

    Route.group(() => {
      Route.get('/', 'ClientesController.getClientes');
      Route.get('/only/:id', 'ClientesController.getClienteById');
      Route.get('/maxcod', 'ClientesController.maxCod');
      Route.get('/filter', 'ClientesController.searchFilter');

      Route.post('/', 'ClientesController.setCliente');

      Route.put('/:id', 'ClientesController.updateCliente');

      Route.delete('/:id', 'ClientesController.deleteCliente');
    }).prefix('/clientes');

    Route.group(() => {
      Route.get('/', 'ProdutosController.getProdutos');
      Route.get('/only/:id', 'ProdutosController.getProdutoById');
      Route.get('/maxnprod', 'ProdutosController.maxNProd');
      Route.get('/filter', 'ProdutosController.searchFilter');

      Route.post('/', 'ProdutosController.setProduto');

      Route.put('/:id', 'ProdutosController.updateProduto');

      Route.delete('/:id', 'ProdutosController.deleteProduto');
    }).prefix('/produtos');

    Route.group(() => {
      Route.get('/', 'ServicosController.getServicos');
      Route.get('/only/:id', 'ServicosController.getServicoById');
      Route.get('/maxnserv', 'ServicosController.maxNServ');
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
