package ensa.ma.Ecommerce.repos;

import ensa.ma.Ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional()
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);



}
