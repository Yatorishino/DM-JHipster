package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(name = "nom", length = 100, nullable = false)
    private String nom;

    @NotNull
    @Size(min = 10, max = 200)
    @Column(name = "adresse", length = 200, nullable = false)
    private String adresse;

    @ManyToOne
    @JsonIgnoreProperties(value = "restaurants", allowSetters = true)
    private Compte compte;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "restaurant_type_commerce",
               joinColumns = @JoinColumn(name = "restaurant_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "type_commerce_id", referencedColumnName = "id"))
    private Set<TypeCommerce> typeCommerces = new HashSet<>();

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

    public Restaurant nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public Restaurant adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Compte getCompte() {
        return compte;
    }

    public Restaurant compte(Compte compte) {
        this.compte = compte;
        return this;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public Set<TypeCommerce> getTypeCommerces() {
        return typeCommerces;
    }

    public Restaurant typeCommerces(Set<TypeCommerce> typeCommerces) {
        this.typeCommerces = typeCommerces;
        return this;
    }

    public Restaurant addTypeCommerce(TypeCommerce typeCommerce) {
        this.typeCommerces.add(typeCommerce);
        typeCommerce.getRestaurants().add(this);
        return this;
    }

    public Restaurant removeTypeCommerce(TypeCommerce typeCommerce) {
        this.typeCommerces.remove(typeCommerce);
        typeCommerce.getRestaurants().remove(this);
        return this;
    }

    public void setTypeCommerces(Set<TypeCommerce> typeCommerces) {
        this.typeCommerces = typeCommerces;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
