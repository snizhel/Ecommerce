package ensa.ma.Ecommerce.repos;

import ensa.ma.Ecommerce.model.Category;
import ensa.ma.Ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional()
public interface ProductRepository extends JpaRepository<Product,Long> {

}
