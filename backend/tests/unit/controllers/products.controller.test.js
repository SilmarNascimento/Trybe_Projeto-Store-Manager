const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProductsFromController } = require('../mocks/products.mock');
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
    expect(response.json).to.have.been.calledWith(allProductsFromController);

    expect(response).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});