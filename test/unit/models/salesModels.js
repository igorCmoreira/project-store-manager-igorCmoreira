const sinon = require('sinon');

const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesM = require('../../../models/sales');
const { execute } = require('../../../models/connection');

describe('07- lista todos os vendas do banco', () => {

  describe('#Quando não exitem vendas cadastrados', () => {
    before(()=> {
      const results = [[], []];
      sinon.stub(connection, 'execute').resolves(results);
    });
    after(()=> {
      connection.execute.restore();
    });

    it('-O array de retorno é vazio', async () => {
      const saleList = await SalesM.getAll();
      
      expect(saleList).to.be.a('array');
      expect(saleList).to.be.empty;
    });
  });
  describe('#Quando existem vendas cadastrados no banco de dados',()=> {
    before(()=> {
      const sale = { 
        saleId: 1,
      date: 10/02/2020,
      productId: 2,
      quantity: 30,
      };
      const results = [[sale], []];
      sinon.stub(connection, 'execute').resolves(results);
    });
    after(()=> {
      connection.execute.restore();
    });

    it('-O array de retorno deve ser um array de objetos', async ()=> {
      const salesList = await SalesM.getAll();

      expect(salesList).to.be.a('array');
      expect(salesList).not.to.be.empty;
      salesList.forEach(pro => expect(pro).to.be.an('object'));
    });
    it('-Cada objeto do array deve ter as seguintes chaves: id, name, quantity', async () => {
      const salesList = await SalesM.getAll();
      
      expect(salesList).not.to.be.empty;
      salesList.forEach(pro => expect(pro).to.include.all.keys('saleId', 'date', 'productId', 'quantity'));
    });
  });
});
describe('08- Lista o vendas encontrado pelo id', () => {
  describe('#Quando existe o vendas buscado', () => {
    before(()=>{
      const salesList = [{ 
        saleId: 1,
        date: null,
        product_id: 2,
        quantity: 30,
        }];
      const results = [salesList, []];
      sinon.stub(connection, 'execute').resolves(results)
    });
    after(()=> {
      connection.execute.restore();
    });
    it('-O retorno deve ser um objeto', async () => {
      const saleFound = await SalesM.getById(1);
      expect(saleFound).not.to.be.undefined;
      expect(saleFound).to.be.an('array');
    });
    it('-O objeto tem que ter o id correspondente a busca', async () => {
      const saleFound = await SalesM.getById(1);
      expect(saleFound[0].productId).to.be.equal(2);    
    });
  });
});
describe('09- Cria uma venda', () => {
  describe('#Quando criado com sucesso', () => {
    beforeEach(() => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(()=> {
      connection.execute.restore();
    });
    it('-O venda é criada com sucesso', async () => {
      const results = await SalesM.createSale();
      expect(results).to.be.greaterThan(0);
    });
  });
});
describe('10- vincula uma venda a um produto', () => {
  describe('#quando vinculado com sucesso', () => {
    const payload = {
      saleId:1,
      productId:2,
      quantity:10,
    };
    beforeEach(()=> {
      const results = [[{ insertId: 1 }], []];
      sinon.stub(connection, 'execute').resolves(results);
    });
    afterEach(()=> {
      connection.execute.restore();
    });
    it('-O venda é vinculada com sucesso', async () => {
      const results = await SalesM.createSaleProduct(payload);
      expect(results[0].insertId).to.be.greaterThan(0);
    });
    })
  });
  describe('11- Atualiza um produto', () => {

    describe('#O item não é atualizado com sucesso', () => {
      const payload = {
        productId:2,
        quantity: 20,
        id:1,
      };
      beforeEach(()=> {
        const execute = [[] ,[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      afterEach(() => {
        connection.execute.restore();
      });
      it('- Retorna updated', async () => {
        const results = await SalesM.update(payload);
        expect(results[0]).to.be.undefined;
      });
    });
  });