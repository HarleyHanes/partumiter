document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-listings");
  
    // Fetch all product JSON files
    async function loadProducts() {
      const productFiles = ["listings/listing1/listing1.json", "listings/listing2/listing2.json"];
      
      for (const file of productFiles) {
        try {
          const response = await fetch(`${file}`);
          const product = await response.json();
  
          // Create listing dynamically
          const productHTML = `
            <div class="listing-short">
              <img src="${product.images[0]}" alt="${product.title}" class="product-image">
              <h2 class="product-title">${product.title}</h2>
              <h3 class="product-price">$${product.price}</h3>
              <button class="product-button" onclick="location.href='${product.link}'">View Details</button>
            </div>
          `;
  
          productContainer.insertAdjacentHTML("beforeend", productHTML);
        } catch (error) {
          console.error(`Failed to load ${file}:`, error);
        }
      }
    }
  
    loadProducts();
  });
  