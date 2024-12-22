document.addEventListener("DOMContentLoaded", () => {
    // Define the common header content
    const headerHTML = `
        <header class="fixed-header">
            <hPartum>Partum.Iter</hPartum>
            <nav class="navbar">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="store.html">Store</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </header>
    `;

    // Insert the header content into the placeholder
    document.getElementById("fixed-header").innerHTML = headerHTML;
});