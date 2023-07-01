const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allProducts,
  product01,
  insertProductResponse,
  newProduct,
  reqWithoutName,
  insertProductFromServiceError: updatedProductFromServiceError,
  reqShortLength,
  insertInvalidNameFromServiveError: updatedInvalidNameFromServiveError,
  reqSuccessful,
  productIdFromControllerError,
  updatedProduct,
} = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para productsService', function () {
  it('Verifica se o retorno do método findAll está correto', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const response = await productsService.findAll();

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(allProducts);
  });

  it('Verifica se o retorno do método findById está correto', async function () {
    sinon.stub(productsModel, 'findById').resolves(product01);

    const response = await productsService.findById(1);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(product01);
  });

  it('Verifica o retorno do método findById com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const response = await productsService.findById(15);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal(undefined);
    expect(response.message).to.be.deep.equal('Product not found');
  });

  it('Verifica o retorno do método insert com dados válidos', async function () {
    const { insertId: id } = insertProductResponse[0];
    const responseBody = { id, ...newProduct };
    sinon.stub(productsModel, 'insert').resolves(id);

    const response = await productsService.insert(newProduct);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('CREATED');
    expect(response.data).to.be.deep.equal(responseBody);
  });

  it('Verifica o retorno do método insert com chaves inválidas', async function () {
    const { insertId: id } = insertProductResponse[0];
    sinon.stub(productsModel, 'insert').resolves(id);

    const response = await productsService.insert({ nome: 'Chackran da Xena' });

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('BAD_REQUEST');
    expect(response.message).to.be.deep.equal('"name" is required');
  });

  it('Verifica o retorno do método insert com dados inválidos', async function () {
    const { insertId: id } = insertProductResponse[0];
    sinon.stub(productsModel, 'insert').resolves(id);

    const response = await productsService.insert({ name: 'Xena' });

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.message).to.be.deep.equal('"name" length must be at least 5 characters long');
  });

  it('Verifica todas as validações: name required', async function () {
    const response = await productsService.update(1, reqWithoutName);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('BAD_REQUEST');
    expect(response.message).to.be.deep.equal(updatedProductFromServiceError.message);
  });

  it('Verifica todas as validações: length maior igual a 5 required', async function () {
    const response = await productsService.update(1, reqShortLength);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.message).to.be.deep.equal(updatedInvalidNameFromServiveError.message);
  });

  it('Verifica todas as validações: invalid productId', async function () {
    sinon.stub(productsModel, 'findById').resolves();

    const response = await productsService.update(15, reqSuccessful);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.message).to.be.deep.equal(productIdFromControllerError.message);
  });

  it('Verifica se é possivel atualizar um produto com informações válidas', async function () {
    sinon.stub(productsModel, 'findById').resolves(true);
    sinon.stub(productsModel, 'update').resolves(undefined);

    const response = await productsService.update(1, reqSuccessful);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(updatedProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});
