package com.repository;
import java.util.UUID;


import org.springframework.data.jpa.repository.JpaRepository;

import com.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {}
