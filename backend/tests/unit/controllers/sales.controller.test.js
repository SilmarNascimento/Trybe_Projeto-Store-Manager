const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allSalesFromController,
  saleIdFromController,
  saleIdFromControllerError,
  badRequestResponseErrorProduct,
  reqSalesWithoutId01,
  badRequestResponseErrorQuantity,
  reqSalesWithoutQuantity02,
  reqSalesNegativeQuantity01,
  invalidValueResponseErrorQuantity,
  invalidValueResponseErrorProduct,
  reqSalesInvalidProductId02,
  requestSalesBody,
  registeredSale,
  successDeletedSale,
} = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para salesControler', function () {
  const response = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  it('Verifica o retorno do método getAllSales', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromController);
    const request = {};

    await salesController.getAllSales(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(allSalesFromController.data);
  });

  it('Verifica o retorno correto do método getSalesById', async function () {
    sinon.stub(salesService, 'findById').resolves(saleIdFromController);
    const request = {
      params: { id: 1 },
    };

    await salesController.getSalesById(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(saleIdFromController.data);
  });

  it('Verifica o retorno inválido do método getSalesById', async function () {
    sinon.stub(salesService, 'findById').resolves(saleIdFromControllerError);
    const request = {
      params: { id: 15 },
    };

    await salesController.getSalesById(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: saleIdFromControllerError.message });
  });

  it('Verifica todos os retornos do método addSales: Product required', async function () {
    sinon.stub(salesService, 'insert').resolves(badRequestResponseErrorProduct);
    const request = {
      body: reqSalesWithoutId01,
    };

    await salesController.addSales(request, response);

    expect(response.status).to.have.been.calledWith(400);
    expect(response.json).to.have.been.calledWith({ message: badRequestResponseErrorProduct.message });
  });

  it('Verifica todos os retornos do método addSales: Quantity required', async function () {
    sinon.stub(salesService, 'insert').resolves(badRequestResponseErrorQuantity);
    const request = {
      body: reqSalesWithoutQuantity02,
    };

    await salesController.addSales(request, response);

    expect(response.status).to.have.been.calledWith(400);
    expect(response.json).to.have.been.calledWith({ message: badRequestResponseErrorQuantity.message });
  });

  it('Verifica todos os retornos do método addSales: Quantity menor igual a zero', async function () {
    sinon.stub(salesService, 'insert').resolves(invalidValueResponseErrorQuantity);
    const request = {
      body: reqSalesNegativeQuantity01,
    };

    await salesController.addSales(request, response);

    expect(response.status).to.have.been.calledWith(422);
    expect(response.json).to.have.been.calledWith({ message: invalidValueResponseErrorQuantity.message });
  });

  it('Verifica todos os retornos do método assSales: Product not Found', async function () {
    sinon.stub(salesService, 'insert').resolves(invalidValueResponseErrorProduct);
    const request = {
      body: reqSalesInvalidProductId02,
    };

    await salesController.addSales(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: invalidValueResponseErrorProduct.message });
  });

  it('Verifica se ao receber uma request válida, a camada controller responde corretamente', async function () {
    sinon.stub(salesService, 'insert').resolves(registeredSale);
    const request = {
      body: requestSalesBody,
    };

    await salesController.addSales(request, response);

    expect(response.status).to.have.been.calledWith(201);
    expect(response.json).to.have.been.calledWith(registeredSale.data);
  });

  it('Verifica o retorno inválido método deleteProduct: productId inválido', async function () {
    sinon.stub(salesService, 'deleteById').resolves(saleIdFromControllerError);
    const request = {
      params: {
        id: 15,
      },
    };

    await salesController.deleteSale(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: saleIdFromControllerError.message });
  });

  it('Verifica se é possível deletar os dados de um produto com id válido', async function () {
    sinon.stub(salesService, 'deleteById').resolves(successDeletedSale);
    const request = {
      params: {
        id: 1,
      },
    };

    await salesController.deleteSale(request, response);

    expect(response.status).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});