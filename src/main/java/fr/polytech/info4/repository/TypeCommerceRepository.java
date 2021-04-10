package fr.polytech.info4.repository;

import fr.polytech.info4.domain.TypeCommerce;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TypeCommerce entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeCommerceRepository extends JpaRepository<TypeCommerce, Long> {
}
