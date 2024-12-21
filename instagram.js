document.addEventListener("DOMContentLoaded", async () => {
    const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual access token
    const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp,permalink&limit=5&access_token=${accessToken}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch Instagram posts");

        const data = await response.json();

        const postsContainer = document.getElementById("instagram-posts");

        data.data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "instagram-post";

            // Handle different media types
            if (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") {
                postElement.innerHTML = `
                    <a href="${post.permalink}" target="_blank">
                        <img src="${post.media_url}" alt="${post.caption || "Instagram Post"}">
                    </a>
                    <p>${post.caption || ""}</p>
                `;
            } else if (post.media_type === "VIDEO") {
                postElement.innerHTML = `
                    <a href="${post.permalink}" target="_blank">
                        <video controls>
                            <source src="${post.media_url}" type="video/mp4">
                        </video>
                    </a>
                    <p>${post.caption || ""}</p>
                `;
            }

            postsContainer.appendChild(postElement);
        });

    } catch (error) {
        console.error("Error fetching Instagram posts:", error);
    }
});
