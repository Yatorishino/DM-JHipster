package fr.polytech.info4.web.rest;

import fr.polytech.info4.CoopcycleApp;
import fr.polytech.info4.domain.TypeCommerce;
import fr.polytech.info4.repository.TypeCommerceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TypeCommerceResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TypeCommerceResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private TypeCommerceRepository typeCommerceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeCommerceMockMvc;

    private TypeCommerce typeCommerce;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeCommerce createEntity(EntityManager em) {
        TypeCommerce typeCommerce = new TypeCommerce()
            .nom(DEFAULT_NOM);
        return typeCommerce;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeCommerce createUpdatedEntity(EntityManager em) {
        TypeCommerce typeCommerce = new TypeCommerce()
            .nom(UPDATED_NOM);
        return typeCommerce;
    }

    @BeforeEach
    public void initTest() {
        typeCommerce = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeCommerce() throws Exception {
        int databaseSizeBeforeCreate = typeCommerceRepository.findAll().size();
        // Create the TypeCommerce
        restTypeCommerceMockMvc.perform(post("/api/type-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeCommerce)))
            .andExpect(status().isCreated());

        // Validate the TypeCommerce in the database
        List<TypeCommerce> typeCommerceList = typeCommerceRepository.findAll();
        assertThat(typeCommerceList).hasSize(databaseSizeBeforeCreate + 1);
        TypeCommerce testTypeCommerce = typeCommerceList.get(typeCommerceList.size() - 1);
        assertThat(testTypeCommerce.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createTypeCommerceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeCommerceRepository.findAll().size();

        // Create the TypeCommerce with an existing ID
        typeCommerce.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeCommerceMockMvc.perform(post("/api/type-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeCommerce)))
            .andExpect(status().isBadRequest());

        // Validate the TypeCommerce in the database
        List<TypeCommerce> typeCommerceList = typeCommerceRepository.findAll();
        assertThat(typeCommerceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeCommerceRepository.findAll().size();
        // set the field null
        typeCommerce.setNom(null);

        // Create the TypeCommerce, which fails.


        restTypeCommerceMockMvc.perform(post("/api/type-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeCommerce)))
            .andExpect(status().isBadRequest());

        List<TypeCommerce> typeCommerceList = typeCommerceRepository.findAll();
        assertThat(typeCommerceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeCommerces() throws Exception {
        // Initialize the database
        typeCommerceRepository.saveAndFlush(typeCommerce);

        // Get all the typeCommerceList
        restTypeCommerceMockMvc.perform(get("/api/type-commerces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeCommerce.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }
    
    @Test
    @Transactional
    public void getTypeCommerce() throws Exception {
        // Initialize the database
        typeCommerceRepository.saveAndFlush(typeCommerce);

        // Get the typeCommerce
        restTypeCommerceMockMvc.perform(get("/api/type-commerces/{id}", typeCommerce.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeCommerce.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }
    @Test
    @Transactional
    public void getNonExistingTypeCommerce() throws Exception {
        // Get the typeCommerce
        restTypeCommerceMockMvc.perform(get("/api/type-commerces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeCommerce() throws Exception {
        // Initialize the database
        typeCommerceRepository.saveAndFlush(typeCommerce);

        int databaseSizeBeforeUpdate = typeCommerceRepository.findAll().size();

        // Update the typeCommerce
        TypeCommerce updatedTypeCommerce = typeCommerceRepository.findById(typeCommerce.getId()).get();
        // Disconnect from session so that the updates on updatedTypeCommerce are not directly saved in db
        em.detach(updatedTypeCommerce);
        updatedTypeCommerce
            .nom(UPDATED_NOM);

        restTypeCommerceMockMvc.perform(put("/api/type-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeCommerce)))
            .andExpect(status().isOk());

        // Validate the TypeCommerce in the database
        List<TypeCommerce> typeCommerceList = typeCommerceRepository.findAll();
        assertThat(typeCommerceList).hasSize(databaseSizeBeforeUpdate);
        TypeCommerce testTypeCommerce = typeCommerceList.get(typeCommerceList.size() - 1);
        assertThat(testTypeCommerce.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeCommerce() throws Exception {
        int databaseSizeBeforeUpdate = typeCommerceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeCommerceMockMvc.perform(put("/api/type-commerces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeCommerce)))
            .andExpect(status().isBadRequest());

        // Validate the TypeCommerce in the database
        List<TypeCommerce> typeCommerceList = typeCommerceRepository.findAll();
        assertThat(typeCommerceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeCommerce() throws Exception {
        // Initialize the database
        typeCommerceRepository.saveAndFlush(typeCommerce);

        int databaseSizeBeforeDelete = typeCommerceRepository.findAll().size();

        // Delete the typeCommerce
        restTypeCommerceMockMvc.perform(delete("/api/type-commerces/{id}", typeCommerce.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeCommerce> typeCommerceList = typeCommerceRepository.findAll();
        assertThat(typeCommerceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
