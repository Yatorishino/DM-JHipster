package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TypeCommerce.
 */
@Entity
@Table(name = "type_commerce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TypeCommerce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(name = "nom", length = 100, nullable = false)
    private String nom;

    @ManyToMany(mappedBy = "typeCommerces")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Restaurant> restaurants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public TypeCommerce nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public TypeCommerce restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public TypeCommerce addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.getTypeCommerces().add(this);
        return this;
    }

    public TypeCommerce removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.getTypeCommerces().remove(this);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeCommerce)) {
            return false;
        }
        return id != null && id.equals(((TypeCommerce) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypeCommerce{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
