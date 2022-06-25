package ensa.ma.Api.repos;

import ensa.ma.Api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional()
public interface ProductRepository extends JpaRepository<Product,Long> {

  @Query("select p from Product p where p.name like %:title%")
  List<Product> searchByTitleLike(@Param("title") String title);

  @Query("select p from Product p where p.category.id = :categoryId")
  List<Product> findByCategoryId(@Param("categoryId") Long categoryId);

}
