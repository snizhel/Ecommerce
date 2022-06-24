package ensa.ma.Ecommerce.repos;

import ensa.ma.Ecommerce.model.Cart;
import ensa.ma.Ecommerce.model.Product;
import ensa.ma.Ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {

    List<Cart> findAllByUserOrderByCreatedDateDesc(Optional<User> user);

    void deleteByUser(User user);



}
