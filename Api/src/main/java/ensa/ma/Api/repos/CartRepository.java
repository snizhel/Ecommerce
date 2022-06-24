package ensa.ma.Api.repos;

import ensa.ma.Api.model.Cart;
import ensa.ma.Api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {

    List<Cart> findAllByUserOrderByCreatedDateDesc(Optional<User> user);

    void deleteByUser(User user);



}
