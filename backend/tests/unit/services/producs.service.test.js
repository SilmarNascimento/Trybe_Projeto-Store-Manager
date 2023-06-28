const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allProducts, product01 } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Realize testes unitários para productsService', function () {
  it('Verifica se o retorno do método findAll está correto', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const response = await productsService.findAll();

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(allProducts);
  });

  it('Verifica se o retorno do método findById está correto', async function () {
    sinon.stub(productsModel, 'findById').resolves(product01);

    const response = await productsService.findById(1);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(product01);
  });

  it('Verifica o retorno do método findById com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const response = await productsService.findById(15);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal(undefined);
    expect(response.message).to.be.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
