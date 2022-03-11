const sinon = require('sinon');

const { expect } = require('chai');
const productVerify = require('../../../services/productVerify');
const { execute } = require('../../../models/connection');
require('dotenv').config();


describe('12- Verificações de vendas', () => {
 describe('#Valida o nome', () => {
  it('-nome undefined', ()=> {
    const result = productVerify.verifyName();
    expect(result.code).to.be.equal(400);
    expect(result.message).to.be.equals('"name" is required');
    });
  });
  it('-nome menor do que 5 caracteres', () => {
    const result = productVerify.verifyName('ig');
    expect(result.code).to.be.equal(422);
    expect(result.message).to.be.equals('"name" length must be at least 5 characters long');
  })

  describe('#Valida quantidade', () => {
    it('-Quantidade não definida', ()=> {
      const result = productVerify.verifyQuantity();
      expect(result.code).to.be.equal(400);
      expect(result.message).to.be.equals('"quantity" is required');
    });
    it('-Quantidade invalida', () => {
      const result = productVerify.verifyQuantity(-1);
      expect(result.code).to.be.equal(422);
      expect(result.message).to.be.equals('"quantity" must be greater than or equal to 1');
    });
  });
});

