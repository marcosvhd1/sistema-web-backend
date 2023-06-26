import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'LoginController.auth');

  Route.group(() => {
    Route.get('/', 'EmissoresController.getAll');
    Route.get('/all', 'EmissoresController.getAllByEmp');
    Route.post('/', 'EmissoresController.create');
    Route.patch('/update/:id', 'EmissoresController.update');
    Route.delete('/:id', 'EmissoresController.delete');

    Route.patch('/ultimo', 'EmissoresController.updateUltimoEmissorSelecionado');
    Route.get('/ultimo', 'EmissoresController.getUltimoEmissorSelecionadoByUser');
  }).prefix('/emissores');

  Route.group(() => {

    Route.group(() => {
      Route.get('/', 'EmpresasController.getEmpresaId');
      Route.post('/', 'EmpresasController.create');
      Route.put('/:id', 'EmpresasController.update');
      Route.delete('/:id', 'EmpresasController.delete');
    }).prefix('/empresas');

    Route.group(() => {
      Route.get('/', 'UsuariosController.getAll');
      Route.get('/new', 'UsuariosController.getUserId');
      Route.get('/master', 'UsuariosController.getMasterUser');
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
      Route.get('/:id', 'ProdutosController.getByID');
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
      Route.get('/', 'CidadesController.get');
    }).prefix('/cidades');

    Route.group(() => {
      Route.get('/', 'EmissorUsuarioController.getAllIdByUser');
      Route.post('/', 'EmissorUsuarioController.create');
      Route.delete('/:id', 'EmissorUsuarioController.delete');
    }).prefix('/emissor/usuario');

    Route.group(() => {
      Route.post('/', 'ConfigsController.save');
      Route.get('/', 'ConfigsController.getByEmissor');
    }).prefix('/config');

    Route.group(() => {
      Route.post('/', 'TabelancmsController.save');
    }).prefix('/tabelancm');

    Route.group(() => {
      Route.get('/', 'CfopsController.get');
      Route.post('/', 'CfopsController.create');
      Route.put('/:id', 'CfopsController.update');
      Route.delete('/:id', 'CfopsController.delete');
    }).prefix('/cfops');

    Route.group(() => {
      Route.get('/max', 'NotasController.max');
      Route.get('/', 'NotasController.getAll');
      Route.post('/', 'NotasController.create');
      Route.put('/:id', 'NotasController.update');
      Route.delete('/:id', 'NotasController.delete');
    }).prefix('/notas');

    Route.group(() => {
      Route.get('/', 'NfPagtosController.get');
      Route.post('/', 'NfPagtosController.create');
      Route.delete('/', 'NfPagtosController.delete');
    }).prefix('/nf_pagto');

    Route.group(() => {
      Route.get('/', 'NfDuplicatasController.get');
      Route.post('/', 'NfDuplicatasController.create');
      Route.delete('/', 'NfDuplicatasController.delete');
    }).prefix('/nf_duplicata');
    
    Route.group(() => {
      Route.get('/', 'NfProdutosController.get');
      Route.post('/', 'NfProdutosController.create');
      Route.delete('/', 'NfProdutosController.delete');
    }).prefix('/nf_produtos');

    Route.group(() => {
      Route.get('/', 'NfReferenciadasController.get');
      Route.post('/', 'NfReferenciadasController.create');
      Route.delete('/', 'NfReferenciadasController.delete');
    }).prefix('/nf_referenciada');

    Route.group(() => {
      Route.get('/emitir', 'SefazController.emitir');
      Route.get('/cancelar', 'SefazController.cancelar');
      Route.get('/inutilizar', 'SefazController.inutilizar');
      Route.get('/cce', 'SefazController.cce');
      Route.get('/status_servidor', 'SefazController.status_servidor');
    }).prefix('/sefaz');

  }).middleware('auth');

}).prefix('/api');
