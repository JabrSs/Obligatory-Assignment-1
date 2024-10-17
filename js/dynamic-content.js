// Run this code when the page content has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Select the container element where posts will be added
    const postContainer = document.getElementById("post-container");

    // Variable to keep track of the page number for pagination
    let page = 1;
    let loadedPostIds = new Set(); // Set to store loaded post IDs

    // Function to load posts dynamically
    const loadPosts = () => {
        // Fetch posts from the JSONPlaceholder API, limiting to 3 posts per request
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`)
            .then(response => response.json()) // Parse the response as JSON
            .then(posts => {

                // Loop through each post returned by the API
                posts.forEach(post => {
                    if (!loadedPostIds.has(post.id)) { // Check if post is already loaded
                        // Create a new div element for each post
                        const postElement = document.createElement("div");
                        postElement.className = "post"; // Add a class for styling
                        
                        // Set the HTML content of the post element
                        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                        postContainer.appendChild(postElement);

                        // Add the post ID to the set of loaded posts
                        loadedPostIds.add(post.id);
                    }
                });
            });
        // Increment the page number for the next load    
        page++;
    };
    
    // Load more posts when the user scrolls to the bottom of the page
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadPosts(); // Load more posts if the user reaches the bottom
        }
    });

    // Initial call to load the first set of posts
    loadPosts();
});
