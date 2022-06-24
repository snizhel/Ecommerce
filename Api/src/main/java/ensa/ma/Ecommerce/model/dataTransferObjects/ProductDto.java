package ensa.ma.Ecommerce.model.dataTransferObjects;

import ensa.ma.Ecommerce.model.Product;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
public class ProductDto {

    private Long id;
    private  String name;
    private  String imageURL;
    private  double price;
    private  String description;
    private  Long categoryId;

    public ProductDto( String name,  String imageURL,  double price,  String description,  Long categoryId) {
        this.name = name;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description;
        this.categoryId = categoryId;
    }


    public ProductDto(Product product) {
        this.setId(product.getId());
        this.setName(product.getName());
        this.setImageURL(product.getImageURL());
        this.setDescription(product.getDescription());
        this.setPrice(product.getPrice());
        this.setCategoryId(product.getCategory().getId());
    }





}