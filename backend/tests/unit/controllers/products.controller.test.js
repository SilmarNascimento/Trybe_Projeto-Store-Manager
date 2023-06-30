const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProductsFromController, productIdFromController, productIdFromControllerError, newProduct, insertProductFromService, insertProductFromServiceError, insertInvalidNameFromServiveError } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para productsControler', function () {
  const response = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  it('Verifica o retorno do método getAllProducts', async function () {
    sinon.stub(productsService, 'findAll').resolves(allProductsFromController);
    const request = {};

    await productsController.getAllProducts(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(allProductsFromController.data);
  });

  it('Verifica o retorno correto do método getProductsById', async function () {
    sinon.stub(productsService, 'findById').resolves(productIdFromController);
    const request = {
      params: { id: 1 },
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

    await productsController.getProductById(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: productIdFromControllerError.message });
  });

  it('Verifica o retorno válido do método addProduct', async function () {
    sinon.stub(productsService, 'insert').resolves(insertProductFromService);
    const request = {
      body: newProduct,
    };

    await productsController.addProduct(request, response);

    expect(response.status).to.have.been.calledWith(201);
    expect(response.json).to.have.been.calledWith(insertProductFromService.data);
  });

  it('Verifica o retorno inválido do método addProduct', async function () {
    sinon.stub(productsService, 'insert').resolves(insertProductFromServiceError);
    const request = {
      body: {
        nome: 'Chackran da Xena',
      },
    };

    await productsController.addProduct(request, response);

    expect(response.status).to.have.been.calledWith(400);
    expect(response.json).to.have.been.calledWith({ message: insertProductFromServiceError.message });
  });

  it('Verifica o retorno inválido do método addProduct com nome menor que 5 caracteres', async function () {
    sinon.stub(productsService, 'insert').resolves(insertInvalidNameFromServiveError);
    const request = {
      body: {
        name: 'Xena',
      },
    };

    await productsController.addProduct(request, response);

    expect(response.status).to.have.been.calledWith(422);
    expect(response.json).to.have.been.calledWith({ message: insertInvalidNameFromServiveError.message });
  });

  afterEach(function () {
    sinon.restore();
  });
});