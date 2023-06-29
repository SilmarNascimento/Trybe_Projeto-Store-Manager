const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allSales, sale01 } = require('../mocks/sales.mock');
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
    sinon.stub(salesModel, 'findById').resolves(undefined);

    const response = await salesService.findById(15);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal(undefined);
    expect(response.message).to.be.deep.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
