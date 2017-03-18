import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository";
import { OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.productRepository = repository;
  }

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product) => ({ id: product.id, name: product.name, price: product.price })),
    };
  }
}
