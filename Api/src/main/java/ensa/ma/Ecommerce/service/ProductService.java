package ensa.ma.Ecommerce.service;

import ensa.ma.Ecommerce.model.Category;
import ensa.ma.Ecommerce.model.Product;

import ensa.ma.Ecommerce.model.dataTransferObjects.ProductDto;
import ensa.ma.Ecommerce.repos.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;

    public List<ProductDto> listProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for(Product product : products) {
            ProductDto productDto = getDtoFromProduct(product);
            productDtos.add(productDto);
        }
        return productDtos;
    }

    public static ProductDto getDtoFromProduct(Product product) {
        ProductDto productDto = new ProductDto(product);
        return productDto;
    }

    public static Product getProductFromDto(ProductDto productDto, Category category) {
        Product product = new Product(productDto, category);
        return product;
    }

    public void addProduct(ProductDto productDto, Category category) {
        Product product = getProductFromDto(productDto, category);
        productRepository.save(product);
    }

    public void updateProduct(Long productID, ProductDto productDto, Category category) {
        Product product = getProductFromDto(productDto, category);
        product.setId(productID);
        productRepository.save(product);
    }


    public Product getProductById(Long productId) throws IOException {
        Optional<Product> optionalProduct = (productRepository.findById(productId));
        if (!optionalProduct.isPresent())
            throw new IOException();
        return optionalProduct.get();
    }

    public void deleteByID(Long productID) {
        productRepository.deleteById(productID);
    }
}
