document.getElementById('filter-sort').addEventListener('change', function() {
    const value = this.value;
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(document.querySelectorAll('.product'));

    let sortedProducts = [...products]; // Copy array to avoid mutating the original list

    // Apply genre sorting by relevance (genre match) and price sorting
    if (value.startsWith('genre-')) {
        const selectedGenre = value.split('-')[1];
        sortedProducts.sort((a, b) => {
            const genreA = a.dataset.genre;
            const genreB = b.dataset.genre;

            // Prioritize products with matching genre
            if (genreA === selectedGenre && genreB !== selectedGenre) {
                return -1; // a comes first
            }
            if (genreA !== selectedGenre && genreB === selectedGenre) {
                return 1; // b comes first
            }
            return 0; // keep relative order if both are same or neither match
        });
    } 

    // Apply price sorting
    else if (value.startsWith('price-')) {
        const order = value.split('-')[1];
        sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
    } 

    // Apply alphabetical sorting
    else if (value.startsWith('alphabetical-')) {
        const order = value.split('-')[1];
        sortedProducts.sort((a, b) => {
            const nameA = a.querySelector('p').textContent.toLowerCase();
            const nameB = b.querySelector('p').textContent.toLowerCase();
            if (order === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
    }

    // Update the product grid with sorted products
    productGrid.innerHTML = ''; // Clear the grid
    sortedProducts.forEach(product => productGrid.appendChild(product)); // Re-add sorted products
});








