const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { allSales, sale01, insertResponse, requestSalesBody, deletedResponse } = require('../mocks/sales.mock');
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

  it('Verifica se o método findById está implementado corretamente para um id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const response = await salesModel.findById(15);
    
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal([]);
  });

  it('Verifica se o método insert está implementado corretamente', async function () {
    const [{ insertId }] = insertResponse;
    sinon.stub(connection, 'execute').resolves(insertResponse);

    const response = await salesModel.insert(requestSalesBody);

    expect(response).to.be.an('number');
    expect(response).to.be.deep.equal(insertId);
  });

  it('Verifica o retorno inválido do método insert: falha no banco de dados test 01', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves(insertResponse)
      .onSecondCall()
      .resolves([[]])
      .onThirdCall()
      .resolves(insertResponse);

    const response = await salesModel.insert(requestSalesBody);

    expect(response).to.be.equal(undefined);
  });
  
  it('Verifica o retorno inválido do método insert: falha no banco de dados test 02', async function () {
    sinon.stub(connection, 'execute').resolves(insertResponse)
      .onFirstCall()
      .resolves(insertResponse)
      .onSecondCall()
      .resolves(insertResponse)
      .onThirdCall()
      .resolves([[]]);

    const response = await salesModel.insert(requestSalesBody);

    expect(response).to.be.equal(undefined);
  });

  it('Verifica se o método deleteById retorna o valor esperado', async function () {
    const productId = 1;
    sinon.stub(connection, 'execute').resolves(deletedResponse);

    const response = await salesModel.deleteById(productId);

    expect(response).to.be.deep.equal({ status: 'SUCCESS' });
  });

  it('Verifica o retorno inválido do método deleteById: falha no banco de dados test 01', async function () {
    const productId = 1;
    sinon.stub(connection, 'execute').resolves(insertResponse)
      .onFirstCall()
      .resolves([[]])
      .onSecondCall()
      .resolves(deletedResponse);

    const response = await salesModel.deleteById(productId);

    console.log(response);

    expect(response).to.be.deep.equal({ status: 'FAIL' });
  });

  it('Verifica o retorno inválido do método deleteById: falha no banco de dados test 02', async function () {
    const productId = 1;
    sinon.stub(connection, 'execute').resolves(deletedResponse)
      .onFirstCall()
      .resolves(deletedResponse)
      .onSecondCall()
      .resolves([[]]);

    const response = await salesModel.deleteById(productId);

    console.log(response);

    expect(response).to.be.deep.equal({ status: 'FAIL' });
  });

  afterEach(function () {
    sinon.restore();
  });
});