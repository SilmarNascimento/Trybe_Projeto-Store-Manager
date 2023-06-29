const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProductsFromController, productIdFromController, productIdFromControllerError } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para productsControler', function () {
  it('Verifica o retorno do método getAllProducts', async function () {
    sinon.stub(productsService, 'findAll').resolves(allProductsFromController);
    const request = {};
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(allProductsFromController.data);
  });

  it('Verifica o retorno correto do método getProductsById', async function () {
    sinon.stub(productsService, 'findById').resolves(productIdFromController);
    const request = {
      params: { id: 1 },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(productIdFromController.data);
  });

  it('Verifica o retorno inválido do método getProductsById', async function () {
    sinon.stub(productsService, 'findById').resolves(productIdFromControllerError);
    const request = {
      params: { id: 15 },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: productIdFromControllerError.message });
  });

  afterEach(function () {
    sinon.restore();
  });
});