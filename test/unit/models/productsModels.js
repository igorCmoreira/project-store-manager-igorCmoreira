const sinon = require('sinon');

const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsM = require('../../../models/products');
const { execute } = require('../../../models/connection');
require('dotenv').config();


describe('01- lista todos os produtos do banco', () => {

  describe('#Quando não exitem produtos cadastrados', () => {
    before(()=> {
      const results = [[], []];
      sinon.stub(connection, 'execute').resolves(results);
    });
    after(()=> {
      connection.execute.restore();
    });

    it('-O array de retorno é vazio', async () => {
      const productsList = await ProductsM.getAll();
      
      expect(productsList).to.be.a('array');
      expect(productsList).to.be.empty;
    });
  });
  describe('#Quando existem produtos cadastrados no banco de dados',()=> {
    before(()=> {
      const product = { 
        id:1,
        name: 'martelo',
        quantity: 40,
      };
      const results = [[product], []];
      sinon.stub(connection, 'execute').resolves(results);
    });
    after(()=> {
      connection.execute.restore();
    });

    it('-O array de retorno deve ser um array de objetos', async ()=> {
      const productsList = await ProductsM.getAll();

      expect(productsList).to.be.a('array');
      expect(productsList).not.to.be.empty;
      productsList.forEach(pro => expect(pro).to.be.an('object'));
    });
    it('-Cada objeto do array deve ter as seguintes chaves: id, name, quantity', async () => {
      const productsList = await ProductsM.getAll();
      
      expect(productsList).not.to.be.empty;
      productsList.forEach(pro => expect(pro).to.include.all.keys('id', 'name', 'quantity'));
    });
  });
});
describe('02- Lista o produto encontrado pelo id', () => {
  describe('#Quando não existe o produto buscado', ()=>{
    before(()=>{
      const results = [[], []];
      sinon.stub(connection, 'execute').resolves(results)
    });
    after(()=> {
      connection.execute.restore();
    });
    it('-O retorno deve ser undefined', async ()=> {
      const foundById = await ProductsM.getById(3);
      expect(foundById).to.be.undefined;
    });
    });
  describe('#Quando existe o produto buscado', () => {
    before(()=>{
      const productsList = [
        { 
          id:1,
          name: 'martelo',
          quantity: 40,
        },
        { 
          id:2,
          name: 'espada',
          quantity: 35,
        }
      ];
      const results = [productsList, []];
      sinon.stub(connection, 'execute').resolves(results)
    });
    after(()=> {
      connection.execute.restore();
    });
    it('-O retorno deve ser um objeto', async () => {
      const productFound = await ProductsM.getById(1);
      expect(productFound).not.to.be.undefined;
      expect(productFound).to.be.an('object');
    });
    it('-O objeto tem que ter o id correspondente a busca', async () => {
      const productFound = await ProductsM.getById(1);

      expect(productFound.id).to.be.equal(1);
    });
  });
});
describe('03- Lista o produto encontrado pelo nome', () => {
  describe('#Quando não existe o produto buscado', ()=>{
    before(()=>{
      const results = [[], []];
      sinon.stub(connection, 'execute').resolves(results)
    });
    after(()=> {
      connection.execute.restore();
    });
    it('-O retorno deve ser undefined', async ()=> {
      const foundById = await ProductsM.getByName('martelo');
      expect(foundById).to.be.undefined;
    });
    });
  describe('#Quando existe o produto buscado', () => {
    before(()=>{
      const productsList = [
        { 
          id:1,
          name: 'martelo',
          quantity: 40,
        },
        { 
          id:2,
          name: 'espada',
          quantity: 35,
        }
      ];
      const results = [productsList, []];
      sinon.stub(connection, 'execute').resolves(results)
    });
    after(()=> {
      connection.execute.restore();
    });
    it('-O retorno deve ser um objeto', async () => {
      const productFound = await ProductsM.getByName('martelo');
      expect(productFound).not.to.be.undefined;
      expect(productFound).to.be.an('object');
    });
    it('-O objeto tem que ter o id correspondente a busca', async () => {
      const productFound = await ProductsM.getByName('martelo');

      expect(productFound.name).to.be.equal('martelo');
    });
  });
});
describe('04- Cria um produto', () => {
  describe('#Quando criado com sucesso', () => {
    beforeEach(() => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(()=> {
      connection.execute.restore();
    });
    it('-Retorna um objeto', async () => {
      const payload = {
        name: 'martelo',
        quantity: 20,
      };
      const results = await ProductsM.create(payload);
      expect(results).to.be.an('object');
    });
    it('-O produto é inserido com sucesso', async () => {
      
      const payload = {
        name: 'martelo',
        quantity: 20,
      };
      const results = await ProductsM.create(payload);
      expect(results.insertId).to.be.greaterThan(0);
    });
  });
});
describe('05- Atualiza um produto', () => {

  describe('#O item não é atualizado com sucesso', () => {
    const payload = {
      id:1,
      name:'martelo',
      quantity: 20,
    };
    beforeEach(()=> {
      const execute = [[] ,[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });
    it('- Retorna updated', async () => {
      const results = await ProductsM.update(payload);
      expect(results).to.be.undefined;
    });
  });
  // describe('#O item é atualizado com sucesso', ()=> {
  //   const payload = {
  //     id:1,
  //     name:'martelo',
  //     quantity: 20,
  //   };
  //   beforeEach(()=>{
  //     const results = [{ changedRows:1 }];
  //     sinon.stub(ProductsM, 'getById').resolves([payload]);
  //     sinon.stub(connection, 'execute').resolves(results);
  //   })
  //   afterEach(()=> {
  //     connection.execute.restore();
  //     ProductsM.getById.restore();
  //   });
  //   it('-retorna positivo para o update', async ()=> {
  //     const {id, name, quantity}= payload;
  //     const updated = await ProductsM.update(name, quantity, id);
  //     console.log(updated);
  //     expect(updated.changedRows).to.be.greaterThan(0);
  //   })
  // });
});
describe('06- Deleta Um Produto', () => {
  describe('#deletado com sucesso', ()=> {
    beforeEach(() => {
     const results = [{ changedRows:1 }];
     sinon.stub(connection, 'execute').resolves(results);
    });
    afterEach(()=> {
      connection.execute.restore();
    });
    it('-Retorna a mudança', async ()=> {
      const result = await ProductsM.del(1);
      expect(result.changedRows).to.be.greaterThan(0);
    })
  })
})