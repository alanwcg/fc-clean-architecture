import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from './create.product.usecase';
import { InputCreateProductDto } from './create.product.dto';

describe('Integration test create product use case', () => {
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

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      type: 'a',
      name: 'Product A',
      price: 10,
    };

    const output = await createProductUseCase.execute(input);
    const product = await productRepository.find(output.id);

    expect(product.id).toBeDefined();
    expect(product.name).toBe(input.name);
    expect(product.price).toBe(input.price);
  })
})