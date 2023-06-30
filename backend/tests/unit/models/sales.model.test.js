const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { allSales, sale01, insertResponse, requestSalesBody } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Realiza testes unitários para salesModel', function () {
  it('Verifica se o método findAll está implementado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    
    const response = await salesModel.findAll();
    
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(allSales);
  });

  it('Verifica se o método findById está implementado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([sale01]);

    const response = await salesModel.findById(1);
    
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(sale01);
  });

  it('Verifica se o método insert está implementado corretamente', async function () {
    const { insertId } = insertResponse[0];
    sinon.stub(connection, 'execute').resolves(insertResponse);

    const response = await salesModel.insert(requestSalesBody);
    console.log(response);

    expect(response).to.be.an('number');
    expect(response).to.be.deep.equal(insertId);
  });

  afterEach(function () {
    sinon.restore();
  });
});