document.addEventListener("DOMContentLoaded", async () => {
    // Get file from <script data-file="">
    const scriptTag = document.querySelector("script[data-file]");
    const listingFile = scriptTag?.getAttribute("data-file");

    if (!listingFile) {
        console.error("Error: No file path specified!");
        return;
    }

    try {
        const productContainer = document.getElementById("product-details");
        const response = await fetch(listingFile);
        const product = await response.json();

        // // Populate Product Details
        // document.getElementById("product-title").textContent = product.title;
        // document.getElementById("product-price").textContent = `$${product.price}`;
        // document.getElementById("product-description").textContent = product.description;

        // Populate Slideshow
        const slideshowContainer = document.getElementById("slideshow-container");
        product.images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = product.title;
            imgElement.classList.add("slide");
            slideshowContainer.appendChild(imgElement);
        });

        // Activate First Slide
        let currentIndex = 0;
        const slides = document.querySelectorAll(".slide");
        slides[currentIndex].classList.add("active");

        // Slideshow Navigation
        document.getElementById("prev-slide").addEventListener("click", () => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            slides[currentIndex].classList.add("active");
        });

        document.getElementById("next-slide").addEventListener("click", () => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        });

        // Create listing dynamically
        const listingHTML = `
            <h2 class="product-title">${product.title}</h2>
            <h3 class="product-price">$${product.price}</h3>
            <p class="product-description">${product.description}</p>


            <label for="email-textbox">Contact Email:</label>
            <input type="email" id="email-textbox" placeholder="Contact Email"></input>

            <label for="order-textbox">Order Details:</label>
            <textarea id="order-textbox" placeholder="Enter details or special requests..."></textarea>

            <button class="buy-now">Place Order</button>
        `;

        productContainer.insertAdjacentHTML("beforeend", listingHTML);

    } catch (error) {
        console.error("Error loading product details:", error);
    }
});