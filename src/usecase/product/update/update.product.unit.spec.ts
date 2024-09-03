import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('1', 'Product', 10);

const input = {
  id: product.id,
  name: 'Product Updated',
  price: 20,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
    update: jest.fn(),
  };
};

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it('should not update unexistent product', async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });
    const usecase = new UpdateProductUseCase(productRepository);

    const promise = usecase.execute(input);

    expect(promise).rejects.toThrow('Product not found');
  });
});
