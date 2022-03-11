const sinon = require('sinon');

const { expect } = require('chai');
const saleVerify = require('../../../services/saleVerify');
const { execute } = require('../../../models/connection');
require('dotenv').config();


describe('12- Verificações de vendas', () => {
 describe('#Valida o product id', () => {
  it('-productId undefined', ()=> {
    const result = saleVerify.verifyProduct();
    expect(result.code).to.be.equal(400);
    expect(result.message).to.be.equals('"productId" is required');
    });
  });

  describe('#Valida quantidade', () => {
    it('-Quantidade não definida', ()=> {
      const result = saleVerify.verifyQuantity();
      expect(result.code).to.be.equal(400);
      expect(result.message).to.be.equals('"quantity" is required');
    });
    it('-Quantidade invalida', () => {
      const result = saleVerify.verifyQuantity(-1);
      expect(result.code).to.be.equal(422);
      expect(result.message).to.be.equals('"quantity" must be greater than or equal to 1');
    });
  });
});

