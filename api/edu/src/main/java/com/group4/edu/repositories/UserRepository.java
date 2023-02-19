package com.group4.edu.repositories;

import com.group4.edu.domain.User;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query("select new com.group4.edu.dto.UserDto(e) from User e")
    List<UserDto> getAll();

    @Query("select u from User u, Account a where u.id = a.user.id and a.username = ?1")
    Optional<User> getUserByUsernamefromAccount(String username);
}
