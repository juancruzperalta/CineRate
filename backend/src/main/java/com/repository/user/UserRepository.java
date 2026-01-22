package com.repository.user;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.model.user.UserEntity;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
  Optional<UserEntity> findByEmail(String email);

  boolean existsByEmail(String email);

  Optional<UserEntity> findBytokenTemp(String tokenTemp);

  //Quiero limpiar el usuario de la base de datos si sigue en "isActive:false"
    @Modifying
    @Transactional
    @Query("DELETE FROM UserEntity u WHERE u.isActive = false AND u.createdAt < :limit")
    void deleteInactiveUsers(@Param("limit") LocalDateTime limit);
}
