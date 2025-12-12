// Movie Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const movieContainer = document.getElementById('movieContainer');
    
    // Get movie data from language file
    function getMoviesData() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const moviesData = translations[lang]?.movie?.movies || translations['en'].movie.movies;
        
        return moviesData || [];
    }
    
    let movies = getMoviesData();
    
    // Function to render movies
    function renderMovies() {
        if (!movieContainer) return;
        
        movieContainer.innerHTML = '';
        
        if (movies.length === 0) {
            const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
            const comingSoonText = translations[lang]?.movie?.comingSoon || translations['en'].movie.comingSoon;
            movieContainer.innerHTML = `
                <div style="text-align: center; padding: 4rem; color: #666; grid-column: 1 / -1;">
                    <p style="font-size: 1.2rem;">${comingSoonText}</p>
                </div>
            `;
            return;
        }
        
        movies.forEach((movie, index) => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card featured-card';
            
            // Build meta info HTML
            const metaInfo = [];
            if (movie.year) metaInfo.push(movie.year);
            if (movie.genre) metaInfo.push(movie.genre);
            if (movie.duration) metaInfo.push(movie.duration);
            const metaInfoHTML = metaInfo.length > 0 
                ? `<div class="movie-meta">${metaInfo.join(' • ')}</div>` 
                : '';
            
            // Build title with original title if available
            const titleHTML = movie.titleOriginal 
                ? `<h3 class="movie-title">${movie.title}<br><span class="movie-title-original">${movie.titleOriginal}</span></h3>`
                : `<h3 class="movie-title">${movie.title}</h3>`;
            
            movieCard.innerHTML = `
                <div class="featured-image movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy" 
                         onerror="this.src='https://via.placeholder.com/400x600?text=${encodeURIComponent(movie.title)}'">
                </div>
                <div class="featured-content movie-content">
                    ${titleHTML}
                    ${metaInfoHTML}
                    ${movie.description ? `<p class="movie-description">${movie.description}</p>` : ''}
                </div>
            `;
            
            movieContainer.appendChild(movieCard);
            
            // Animate in with intersection observer
            setTimeout(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                });
                
                observer.observe(movieCard);
            }, index * 100);
        });
    }
    
    // Initial render
    renderMovies();
    
    // Reload movies when language changes
    if (typeof LanguageManager !== 'undefined') {
        const originalSetLanguage = LanguageManager.setLanguage;
        LanguageManager.setLanguage = function(lang) {
            originalSetLanguage.call(this, lang);
            movies = getMoviesData();
            renderMovies();
        };
    }
});

