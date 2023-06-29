const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allSalesFromController,
  saleIdFromController,
  saleIdFromControllerError,
} = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para salesControler', function () {
  it('Verifica o retorno do método getAllSales', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromController);
    const request = {};
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(request, response);

    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(allSalesFromController.data);
  });

  it('Verifica o retorno correto do método getSalesById', async function () {
    sinon.stub(salesService, 'findById').resolves(saleIdFromController);
    const request = {
      params: { id: 1 },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
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
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(request, response);

    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({ message: saleIdFromControllerError.message });
  });

  afterEach(function () {
    sinon.restore();
  });
});