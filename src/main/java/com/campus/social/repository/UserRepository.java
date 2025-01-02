package com.campus.social.repository;

import com.campus.social.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String username);
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deleted = false")
    User findActiveUserByEmail(@Param("email") String email);
    
    @Query("SELECT NEW com.campus.social.model.User(u.id, u.username, u.email, u.isAdmin, u.deleted) " +
           "FROM User u WHERE u.email = :email AND u.deleted = false")
    User findUserDetailsByEmail(@Param("email") String email);
}