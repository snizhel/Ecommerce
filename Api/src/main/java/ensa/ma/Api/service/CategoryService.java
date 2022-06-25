package ensa.ma.Api.service;

import ensa.ma.Api.model.Category;
import ensa.ma.Api.model.User;
import ensa.ma.Api.repos.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepository categoryrepository;


    public List<Category> listCategories() {
        return categoryrepository.findAll();
    }

    public void createCategory(Category category) {
        categoryrepository.save(category);
    }

    public Category readCategory(String categoryName) {
        return categoryrepository.findByCategoryName(categoryName);
    }

    public Optional<Category> readCategory(Long categoryId) {
        return categoryrepository.findById(categoryId);
    }

    public void updateCategory(Long categoryID, Category newCategory) {
        Optional<Category> category = categoryrepository.findById(categoryID);
        Category category1 = category.get();
        category1.setCategoryName(newCategory.getCategoryName());
        //category.setProducts(newCategory.getProducts());

        categoryrepository.save(category1);
    }

    public void deleteByID(Long categoryID) {
        categoryrepository.deleteById(categoryID);
    }

  public Optional<Category> getCategoryById(Long categoryID) {

      return categoryrepository.findById(categoryID);
  }


}
