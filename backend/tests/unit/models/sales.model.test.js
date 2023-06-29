const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { allSales, sale01 } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Realiza testes unitários para salesModel', function () {
  it('verifica se o método findAll está implementado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    
    const response = await salesModel.findAll();
    
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(allSales);
  });

  it('verifica se o método findById está implementado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([sale01]);

    const response = await salesModel.findById(1);
    
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(sale01);
  });

  afterEach(function () {
    sinon.restore();
  });
});