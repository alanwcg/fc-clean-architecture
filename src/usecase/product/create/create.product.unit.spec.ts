import { InputCreateProductDto } from './create.product.dto';
import { CreateProductUseCase } from './create.product.usecase';

const input: InputCreateProductDto = {
  type: 'a',
  name: 'Product A',
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product A',
      price: 10,
    });
  })
})
