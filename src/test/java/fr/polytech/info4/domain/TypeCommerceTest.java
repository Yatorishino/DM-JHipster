package fr.polytech.info4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.polytech.info4.web.rest.TestUtil;

public class TypeCommerceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeCommerce.class);
        TypeCommerce typeCommerce1 = new TypeCommerce();
        typeCommerce1.setId(1L);
        TypeCommerce typeCommerce2 = new TypeCommerce();
        typeCommerce2.setId(typeCommerce1.getId());
        assertThat(typeCommerce1).isEqualTo(typeCommerce2);
        typeCommerce2.setId(2L);
        assertThat(typeCommerce1).isNotEqualTo(typeCommerce2);
        typeCommerce1.setId(null);
        assertThat(typeCommerce1).isNotEqualTo(typeCommerce2);
    }
}
