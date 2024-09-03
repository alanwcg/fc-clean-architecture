import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';
import Product from '../../../domain/product/entity/product';

describe('Integration test update product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const product = new Product('1', 'Product', 10);

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: 'Product Updated',
      price: 20,
    };

    const output = await updateProductUseCase.execute(input);
    const updatedProduct = await productRepository.find(output.id);

    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.name).toBe(input.name);
    expect(updatedProduct.price).toBe(input.price);
  })
})