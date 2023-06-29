const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { allProducts, product01 } = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Realiza testes unitários para productsModel', function () {
  it('verifica se o método findAll está implementado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    
    const response = await productsModel.findAll();
    
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(allProducts);
  });

  it('verifica se o método findById está implementado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([[product01]]);
    
    const response = await productsModel.findById(1);
    
    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal(product01);
  });

  afterEach(function () {
    sinon.restore();
  });
});