package ensa.ma.Api.repos;

import ensa.ma.Api.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional()
public interface CategoryRepository extends JpaRepository<Category,Long> {

    Category findByCategoryName(String categoryName);


}
