package ensa.ma.Ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ensa.ma.Ecommerce.model.dataTransferObjects.ProductDto;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String name;
    private  String imageURL;
    private  double price;
    private  String description;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    Category category;

    public Product(ProductDto productDto, Category category) {
        this.name = productDto.getName();
        this.imageURL = productDto.getImageURL();
        this.description = productDto.getDescription();
        this.price = productDto.getPrice();
        this.category = category;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                '}';
    }
}
