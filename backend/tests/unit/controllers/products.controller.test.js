const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProductsFromController, productIdFromController, productIdFromControllerError, newProduct, insertProductFromService, insertProductFromServiceError, insertInvalidNameFromServiveError, updatedProduct, updatedProductFromController, successDeletedProduct, searchQueryFromController, failToConnect } = require('../mocks/products.mock');
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

  it('Verifica todos ps retornos inválidos do método addProduct: name is required', async function () {
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

  it('Verifica todos os retornos inválido do método addProduct: name menor que 5 caracteres', async function () {
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

  it('Verifica o retorno do metodo searchProductByQuery com um query válida', async function () {
    sinon.stub(productsService, 'findByQuery').resolves(searchQueryFromController);
    const request = {
      query: {
        q: 'Martelo',
      },
    };

    await productsController.searchProductByQuery(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(searchQueryFromController.data);
  });

  it('Verifica o retorno do metodo searchProductByQuery com um query válida nula', async function () {
    sinon.stub(productsService, 'findByQuery').resolves(allProductsFromController);
    const request = {
      query: {
        q: '',
      },
    };

    await productsController.searchProductByQuery(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(allProductsFromController.data);
  });

  it('Verifica o retorno do metodo searchProductByQuery quando ocorre um erro interno', async function () {
    sinon.stub(productsService, 'findByQuery').resolves(failToConnect);
    const request = {
      query: {
        q: 'Martelo',
      },
    };

    await productsController.searchProductByQuery(request, response);

    expect(response.status).to.have.been.calledWith(500);
    expect(response.json).to.have.been.calledWith({ message: 'Internal Server Error' });
  });

  it('Verifica todos os retornos inválidos do método updateProduct: name is required', async function () {
    sinon.stub(productsService, 'update').resolves(insertProductFromServiceError);
    const request = {
      params: {
        id: 1,
      },
      body: {},
    };

    await productsController.updateProduct(request, response);

    expect(response.status).to.have.been.calledWith(400);
    expect(response.json).to.have.been.calledWith({ message: insertProductFromServiceError.message });
  });

  it('Verifica todos os retornos inválidos do método updateProduct: name menor que 5 caracteres', async function () {
    sinon.stub(productsService, 'update').resolves(insertProductFromServiceError);
    const request = {
      params: {
        id: 1,
      },
      body: {
        name: 'Mart',
      },
    };

    await productsController.updateProduct(request, response);

    expect(response.status).to.have.been.calledWith(422);
    expect(response.json).to.have.been.calledWith({ message: insertInvalidNameFromServiveError.message });
  });

  it('Verifica todos os retornos inválidos método updateProduct: productId inválido', async function () {
    sinon.stub(productsService, 'update').resolves(productIdFromControllerError);
    const request = {
      params: {
        id: 15,
      },
      body: {
        name: 'Martelod do Batman',
      },
    };

    await productsController.updateProduct(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: productIdFromControllerError.message });
  });

  it('Verifica se é possível atualizar os dados de um produto com informações válidas', async function () {
    sinon.stub(productsService, 'update').resolves(updatedProductFromController);
    const request = {
      params: {
        id: 1,
      },
      body: {
        name: 'Martelo do Batman',
      },
    };

    await productsController.updateProduct(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(updatedProduct);
  });

  it('Verifica o retorno inválido método deleteProduct: productId inválido', async function () {
    sinon.stub(productsService, 'deleteById').resolves(productIdFromControllerError);
    const request = {
      params: {
        id: 15,
      },
    };

    await productsController.deleteProduct(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: productIdFromControllerError.message });
  });

  it('Verifica se é possível deletar os dados de um produto com id válido', async function () {
    sinon.stub(productsService, 'deleteById').resolves(successDeletedProduct);
    const request = {
      params: {
        id: 1,
      },
    };

    await productsController.deleteProduct(request, response);

    expect(response.status).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});