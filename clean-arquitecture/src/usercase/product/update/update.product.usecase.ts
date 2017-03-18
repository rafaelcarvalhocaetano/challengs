import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
  private updateProductRepository: ProductRepositoryInterface;

  constructor(updateProductRepository: ProductRepositoryInterface) {
    this.updateProductRepository = updateProductRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const productResponse = await this.updateProductRepository.find(input.id);
    const productToUpdate = new Product(productResponse.id, input.name, input.price);
    productToUpdate.changeName(input.name);
    productToUpdate.changePrice(input.price);

    await this.updateProductRepository.update(productToUpdate);
    return {
      id: productResponse.id,
      name: productToUpdate.name,
      price: productToUpdate.price,
    };
  }
}
