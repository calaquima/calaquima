// Replace with your own API key
const apiKey = 'YOUR_GOOGLE_API_KEY';
const placeId = 'YOUR_PLACE_ID'; // Replace with the Place ID of your business

function fetchGoogleReviews() {
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const reviews = data.result.reviews;
            displayReviews(reviews);
        })
        .catch(error => console.error('Error fetching Google Reviews:', error));
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('google-reviews');
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <h3>${review.author_name}</h3>
            <p>Rating: ${review.rating}</p>
            <p>${review.text}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchGoogleReviews);
