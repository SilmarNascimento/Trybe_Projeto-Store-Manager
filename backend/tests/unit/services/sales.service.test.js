const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allSales,
  sale01,
  requestSalesBody,
  insertResponse,
  saleFoundByIdResponse,
  reqSalesWithoutId,
  reqSalesWithoutQuantity,
  reqSalesNullQuantity,
  reqSalesNegativeQuantity,
  reqSalesInvalidProductId,
  badRequestResponseErrorQuantity,
  badRequestResponseErrorProduct,
  invalidValueResponseErrorProduct,
  invalidValueResponseErrorQuantity,
  saleIdFromControllerError,
  badRequestProductIdNotFoundError,
  InternalServerError,
  updatedresponseExpected,
} = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para salesService', function () {
  it('Verifica se o retorno do método findAll está correto', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSales);
    const response = await salesService.findAll();

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(allSales);
  });

  it('Verifica se o retorno do método findById está correto', async function () {
    sinon.stub(salesModel, 'findById').resolves(sale01);
    const response = await salesService.findById(1);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(sale01);
  });

  it('Verifica o retorno do método findById com id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const response = await salesService.findById(15);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal(undefined);
    expect(response.message).to.be.deep.equal('Sale not found');
  });

  it('Verifica todas as validações: productId inexistente test1', async function () {
    const response = await salesService.insert(reqSalesWithoutId);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(badRequestResponseErrorProduct.status);
    expect(response.message).to.be.deep.equal(badRequestResponseErrorProduct.message);
  });

  it('Verifica todas as validações: quantity inexistente test2', async function () {
    const response = await salesService.insert(reqSalesWithoutQuantity);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(badRequestResponseErrorQuantity.status);
    expect(response.message).to.be.deep.equal(badRequestResponseErrorQuantity.message);
  });

  it('Verifica todas as validações: quantity igual a zero test1', async function () {
    const response = await salesService.insert(reqSalesNullQuantity);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(invalidValueResponseErrorQuantity.status);
    expect(response.message).to.be.deep.equal(invalidValueResponseErrorQuantity.message);
  });

  it('Verifica todas as validações: quantity menor que zero test2', async function () {
    const response = await salesService.insert(reqSalesNegativeQuantity);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(invalidValueResponseErrorQuantity.status);
    expect(response.message).to.be.deep.equal(invalidValueResponseErrorQuantity.message);
  });

  it('Verifica todas as validações: productId não cadastrado test1', async function () {
    sinon.stub(salesModel, 'findById')
      .onFirstCall()
      .resolves([])
      .onSecondCall()
      .resolves(sale01);   
    const response = await salesService.insert(reqSalesInvalidProductId);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(invalidValueResponseErrorProduct.status);
    expect(response.message).to.be.deep.equal(invalidValueResponseErrorProduct.message);
  });

  it('Verifica se ao registrar uma venda válida a camada service responde corretamente', async function () {
    const [{ insertId }] = insertResponse;
    const registeredSale = {
      id: insertId,
      itemsSold: requestSalesBody,
    };
    sinon.stub(salesModel, 'findById')
      .onFirstCall()
      .resolves(sale01)
      .onSecondCall()
      .resolves(sale01);
    sinon.stub(salesModel, 'insert').resolves(insertId);
    const response = await salesService.insert(requestSalesBody);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('CREATED');
    expect(response.data).to.be.deep.equal(registeredSale);
  });

  it('Verifica se não é possível deletar um produto com id não existente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const response = await salesService.deleteById(15);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.message).to.be.deep.equal(saleIdFromControllerError.message);
  });

  it('Verifica se é possível deletar um produto com id válido', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    sinon.stub(salesModel, 'deleteById').resolves({ status: 'SUCCESS' });
    const response = await salesService.deleteById(1);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NO_CONTENT');
  });

  it('Verifica se ocorreu um erro no servidor ao deletar um produto com id válido', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    sinon.stub(salesModel, 'deleteById').resolves({ status: 'FAIL', message: 'Internal Server Error' });
    const response = await salesService.deleteById(1);
    
    expect(response).to.be.an('object');
    expect(response.status).to.be.deep.equal('FAIL');
    expect(response.message).to.be.deep.equal('Internal Server Error');
  });

  it('Verifica todas as validações do metodo updateQuantity: quantity is required', async function () {
    const saleId = 1;
    const productId = 1;
    const quantityObj = {};
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(badRequestResponseErrorQuantity.status);
    expect(response.message).to.be.deep.equal(badRequestResponseErrorQuantity.message);
  });

  it('Verifica todas as validações do metodo updateQuantity: quantity maior igual a 1 test 01', async function () {
    const saleId = 1;
    const productId = 1;
    const quantityObj = { quantity: -1 };
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(invalidValueResponseErrorQuantity.status);
    expect(response.message).to.be.deep.equal(invalidValueResponseErrorQuantity.message);
  });

  it('Verifica todas as validações do metodo updateQuantity: quantity nula', async function () {
    const saleId = 1;
    const productId = 1;
    const quantityObj = { quantity: 0 };
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(invalidValueResponseErrorQuantity.status);
    expect(response.message).to.be.deep.equal(invalidValueResponseErrorQuantity.message);
  });

  it('Verifica todas as validações do metodo updateQuantity: saleId not found', async function () {
    const saleId = 3;
    const productId = 1;
    const quantityObj = { quantity: 5 };
    sinon.stub(salesModel, 'findById').resolves([]);
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(saleIdFromControllerError.status);
    expect(response.message).to.be.deep.equal(saleIdFromControllerError.message);
  });

  it('Verifica todas as validações do metodo updateQuantity: productId not found in sales', async function () {
    const saleId = 1;
    const productId = 4;
    const quantityObj = { quantity: 5 };
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(badRequestProductIdNotFoundError.status);
    expect(response.message).to.be.deep.equal(badRequestProductIdNotFoundError.message);
  });

  it('Verifica todas os retornos do metodo updateQuantity: Internal Server Error', async function () {
    const saleId = 1;
    const productId = 1;
    const quantityObj = { quantity: 5 };
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    sinon.stub(salesModel, 'updateById').resolves({ status: 'FAIL', message: 'Internal Server Error' });
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal(InternalServerError.status);
    expect(response.message).to.be.deep.equal(InternalServerError.message);
  });

  it('Verifica o retorno de updateQuantity com dados válidos', async function () {
    const saleId = 1;
    const productId = 1;
    const quantityObj = { quantity: 5 };
    sinon.stub(salesModel, 'findById').resolves(saleFoundByIdResponse);
    sinon.stub(salesModel, 'updateById').resolves({ status: 'SUCCESS' });
    const response = await salesService.updateQuantity(saleId, productId, quantityObj);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(updatedresponseExpected);
  });

  afterEach(function () {
    sinon.restore();
  });
});
