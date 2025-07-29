// Long Châu Pharmacy JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeSearch();
    initializeCarousel();
    initializeAnimations();
    initializeProductCards();
    initializeNavigation();
    initializeResponsive();
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.btn-search');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Search suggestions (mock data)
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log('Searching for:', query);
        // Add loading state
        searchInput.classList.add('loading');
        
        // Simulate search delay
        setTimeout(() => {
            searchInput.classList.remove('loading');
            showSearchResults(query);
        }, 1000);
    }
}

function showSearchSuggestions(query) {
    // Mock suggestions
    const suggestions = [
        'Paracetamol',
        'Vitamin C',
        'Face mask',
        'Blood pressure monitor',
        'Thermometer'
    ].filter(item => item.toLowerCase().includes(query));
    
    // Create suggestions dropdown (simplified)
    console.log('Suggestions:', suggestions);
}

function hideSearchSuggestions() {
    // Hide suggestions dropdown
    console.log('Hide suggestions');
}

function showSearchResults(query) {
    // Mock search results
    console.log('Search results for:', query);
    alert(`Searching for "${query}". This would redirect to search results page.`);
}

// Carousel Functionality
function initializeCarousel() {
    const carousel = document.querySelector('#promotionCarousel');
    
    if (carousel) {
        // Auto-play carousel
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            touch: true
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    }
}

// Animation on Scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .action-btn, .hero-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Product Cards Functionality
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        const addToCartBtn = card.querySelector('.btn');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                addToCart(index + 1);
            });
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function addToCart(productId) {
    // Add to cart functionality
    console.log('Adding product to cart:', productId);
    
    // Show success message
    showNotification('Product added to cart!', 'success');
    
    // Update cart count (mock)
    updateCartCount();
}

function updateCartCount() {
    // Mock cart count update
    const cartBtn = document.querySelector('.btn-outline-light:last-child');
    if (cartBtn) {
        const currentCount = parseInt(cartBtn.dataset.count || '0');
        const newCount = currentCount + 1;
        cartBtn.dataset.count = newCount;
        
        // Add badge if not exists
        let badge = cartBtn.querySelector('.badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'badge bg-danger rounded-pill ms-1';
            cartBtn.appendChild(badge);
        }
        badge.textContent = newCount;
    }
}

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Navigation to:', this.textContent);
            }
        });
    });
    
    // Category dropdown
    const categoryDropdown = document.querySelector('.dropdown-toggle');
    if (categoryDropdown) {
        categoryDropdown.addEventListener('click', function() {
            console.log('Category dropdown clicked');
        });
    }
}

// Responsive Functionality
function initializeResponsive() {
    // Handle window resize
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Initial check
    handleResize();
}

function handleResize() {
    const width = window.innerWidth;
    
    // Mobile adjustments
    if (width < 768) {
        adjustForMobile();
    } else {
        adjustForDesktop();
    }
}

function adjustForMobile() {
    // Mobile-specific adjustments
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.fontSize = '2rem';
    }
    
    // Hide carousel controls on mobile
    const carouselControls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselControls.forEach(control => {
        control.style.display = 'none';
    });
}

function adjustForDesktop() {
    // Desktop-specific adjustments
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.fontSize = '3rem';
    }
    
    // Show carousel controls on desktop
    const carouselControls = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
    carouselControls.forEach(control => {
        control.style.display = 'flex';
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Action Buttons Functionality
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'Browse Product':
                    handleBrowseProducts();
                    break;
                case 'Upload Prescription':
                    handleUploadPrescription();
                    break;
                case 'Talk with a pharmacist':
                    handleTalkWithPharmacist();
                    break;
                default:
                    console.log('Unknown action:', buttonText);
            }
        });
    });
});

function handleBrowseProducts() {
    console.log('Browse Products clicked');
    showNotification('Redirecting to product catalog...', 'info');
    // Simulate navigation
    setTimeout(() => {
        alert('This would redirect to the product catalog page.');
    }, 1000);
}

function handleUploadPrescription() {
    console.log('Upload Prescription clicked');
    
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,.pdf';
    fileInput.multiple = true;
    
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            showNotification(`${files.length} file(s) selected for upload`, 'success');
            console.log('Files selected:', files.map(f => f.name));
        }
    });
    
    fileInput.click();
}

function handleTalkWithPharmacist() {
    console.log('Talk with pharmacist clicked');
    showNotification('Connecting you with a pharmacist...', 'info');
    
    // Simulate connection
    setTimeout(() => {
        alert('This would open a chat window or redirect to consultation page.');
    }, 1500);
}

// Login/Register Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.btn-outline-light');
    
    if (loginBtn && loginBtn.textContent.includes('Log In')) {
        loginBtn.addEventListener('click', function() {
            handleLoginRegister();
        });
    }
});

function handleLoginRegister() {
    console.log('Login/Register clicked');
    showNotification('Redirecting to login page...', 'info');
    
    // Simulate navigation
    setTimeout(() => {
        alert('This would redirect to the login/registration page.');
    }, 1000);
}

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
        
        // Error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f8f9fa"/%3E%3Ctext x="100" y="100" text-anchor="middle" fill="%236c757d" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
        });
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add ARIA labels
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.setAttribute('aria-label', 'Search products, brands and services');
    }
    
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.setAttribute('aria-label', 'Search');
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or dropdowns
            const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Product Search Functionality
function initializeProductSearch() {
    const productNameSearch = document.getElementById('productNameSearch');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceRangeSlider = document.getElementById('priceRange');
    const searchProductsBtn = document.getElementById('searchProducts');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const priceTags = document.querySelectorAll('.price-tag');
    const suggestions = document.querySelectorAll('.suggestion-item');
    const searchResults = document.getElementById('searchResults');

    // Mock product data
    const mockProducts = [
        { name: 'Paracetamol 500mg', price: 12.99, category: 'Pain Relief' },
        { name: 'Vitamin C 1000mg', price: 25.50, category: 'Vitamins' },
        { name: 'Aspirin 100mg', price: 8.75, category: 'Pain Relief' },
        { name: 'Ibuprofen 400mg', price: 15.20, category: 'Pain Relief' },
        { name: 'Amoxicillin 250mg', price: 35.00, category: 'Antibiotics' },
        { name: 'Multivitamin Complex', price: 45.99, category: 'Vitamins' },
        { name: 'Omega-3 Fish Oil', price: 28.75, category: 'Supplements' },
        { name: 'Calcium + D3', price: 22.50, category: 'Vitamins' }
    ];

    // Initialize search functionality
    if (productNameSearch) {
        // Product name search with suggestions
        productNameSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            updateSearchSuggestions(query);
        });

        // Search on Enter key
        productNameSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performProductSearch();
            }
        });
    }

    // Price range slider synchronization
    if (priceRangeSlider && maxPriceInput) {
        priceRangeSlider.addEventListener('input', function() {
            maxPriceInput.value = this.value;
            updateRangeLabels();
        });
    }

    // Price input synchronization
    if (minPriceInput) {
        minPriceInput.addEventListener('input', updateRangeLabels);
    }
    if (maxPriceInput) {
        maxPriceInput.addEventListener('input', function() {
            if (priceRangeSlider) {
                priceRangeSlider.value = this.value;
            }
            updateRangeLabels();
        });
    }

    // Quick price filter tags
    priceTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            priceTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Set price range based on data-range
            const range = this.dataset.range.split('-');
            if (minPriceInput) minPriceInput.value = range[0];
            if (maxPriceInput) maxPriceInput.value = range[1];
            if (priceRangeSlider) priceRangeSlider.value = range[1];
            
            updateRangeLabels();
        });
    });

    // Suggestion items click
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            if (productNameSearch) {
                productNameSearch.value = this.textContent;
                performProductSearch();
            }
        });
    });

    // Search button
    if (searchProductsBtn) {
        searchProductsBtn.addEventListener('click', performProductSearch);
    }

    // Clear filters button
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    function updateSearchSuggestions(query) {
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        
        suggestionItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (query && text.includes(query)) {
                item.style.display = 'block';
                item.style.background = 'var(--accent-orange)';
                item.style.color = 'var(--white)';
            } else {
                item.style.display = query ? 'none' : 'block';
                item.style.background = 'rgba(42, 82, 152, 0.1)';
                item.style.color = 'var(--primary-blue)';
            }
        });
    }

    function updateRangeLabels() {
        const rangeLabels = document.querySelector('.range-labels');
        if (rangeLabels && minPriceInput && maxPriceInput) {
            const min = minPriceInput.value || '0';
            const max = maxPriceInput.value || '1000';
            rangeLabels.innerHTML = `<span>$${min}</span><span>$${max}</span>`;
        }
    }

    function performProductSearch() {
        const nameQuery = productNameSearch ? productNameSearch.value.toLowerCase() : '';
        const minPrice = parseFloat(minPriceInput ? minPriceInput.value : 0) || 0;
        const maxPrice = parseFloat(maxPriceInput ? maxPriceInput.value : 1000) || 1000;

        // Filter products based on search criteria
        const filteredProducts = mockProducts.filter(product => {
            const nameMatch = !nameQuery || product.name.toLowerCase().includes(nameQuery);
            const priceMatch = product.price >= minPrice && product.price <= maxPrice;
            return nameMatch && priceMatch;
        });

        displaySearchResults(filteredProducts);
        
        // Show notification
        showNotification(`Found ${filteredProducts.length} products matching your criteria`, 'success');
    }

    function displaySearchResults(products) {
        if (!searchResults) return;

        if (products.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <h5>No Products Found</h5>
                    <p>Try adjusting your search criteria or browse our categories.</p>
                </div>
            `;
            searchResults.style.display = 'block';
            return;
        }

        const resultsHTML = `
            <h5>Search Results (${products.length} found)</h5>
            <div class="results-grid">
                ${products.map(product => `
                    <div class="result-item">
                        <div class="result-image">${getProductIcon(product.category)}</div>
                        <div class="result-info">
                            <h6>${product.name}</h6>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <small class="category">${product.category}</small>
                            <button class="btn btn-sm btn-primary" onclick="addToCart('${product.name}')">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        searchResults.innerHTML = resultsHTML;
        searchResults.style.display = 'block';
        
        // Smooth scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function getProductIcon(category) {
        const icons = {
            'Pain Relief': '💊',
            'Vitamins': '🧴',
            'Supplements': '🌿',
            'Antibiotics': '💉',
            'default': '📦'
        };
        return icons[category] || icons.default;
    }

    function clearAllFilters() {
        // Clear all inputs
        if (productNameSearch) productNameSearch.value = '';
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';
        if (priceRangeSlider) priceRangeSlider.value = '500';
        
        // Remove active class from price tags
        priceTags.forEach(tag => tag.classList.remove('active'));
        
        // Hide search results
        if (searchResults) searchResults.style.display = 'none';
        
        // Reset suggestions
        updateSearchSuggestions('');
        updateRangeLabels();
        
        showNotification('All filters cleared', 'info');
    }
}

// Initialize product search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProductSearch();
});

// Profile Page Functionality
function initializeProfilePage() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const profileForm = document.getElementById('profileForm');
    const formActions = document.getElementById('formActions');
    const userDropdown = document.getElementById('userDropdown');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    // Edit Profile Button
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            enableEditMode();
        });
    }

    // Cancel Edit Button
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            disableEditMode();
        });
    }

    // Profile Form Submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileChanges();
        });
    }

    // User Dropdown Toggle
    if (userDropdown && userDropdownMenu) {
        userDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target)) {
                userDropdownMenu.classList.remove('show');
            }
        });
    }

    function enableEditMode() {
        // Enable form inputs
        const inputs = profileForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id !== 'email') { // Keep email readonly
                input.removeAttribute('readonly');
                input.removeAttribute('disabled');
            }
        });
        
        // Enable checkbox
        const newsletter = document.getElementById('newsletter');
        if (newsletter) {
            newsletter.removeAttribute('disabled');
        }

        // Show form actions
        if (formActions) {
            formActions.style.display = 'flex';
        }

        // Update edit button
        if (editProfileBtn) {
            editProfileBtn.innerHTML = '<i class="fas fa-times"></i> Cancel Edit';
            editProfileBtn.classList.remove('btn-primary');
            editProfileBtn.classList.add('btn-secondary');
            editProfileBtn.onclick = disableEditMode;
        }

        // Add visual feedback
        profileForm.classList.add('edit-mode');
        
        showNotification('Edit mode enabled. Make your changes and click Save.', 'info');
    }

    function disableEditMode() {
        // Disable form inputs
        const inputs = profileForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button' && input.type !== 'checkbox') {
                input.setAttribute('readonly', 'readonly');
                if (input.tagName === 'SELECT') {
                    input.setAttribute('disabled', 'disabled');
                }
            }
        });
        
        // Disable checkbox
        const newsletter = document.getElementById('newsletter');
        if (newsletter) {
            newsletter.setAttribute('disabled', 'disabled');
        }

        // Hide form actions
        if (formActions) {
            formActions.style.display = 'none';
        }

        // Reset edit button
        if (editProfileBtn) {
            editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
            editProfileBtn.classList.remove('btn-secondary');
            editProfileBtn.classList.add('btn-primary');
            editProfileBtn.onclick = enableEditMode;
        }

        // Remove visual feedback
        profileForm.classList.remove('edit-mode');
        
        showNotification('Edit mode disabled.', 'info');
    }

    function saveProfileChanges() {
        // Collect form data
        const formData = new FormData(profileForm);
        const profileData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            dateOfBirth: formData.get('dateOfBirth'),
            newsletter: document.getElementById('newsletter').checked,
            address: formData.get('address')
        };

        // Validate required fields
        if (!profileData.firstName || !profileData.lastName) {
            showNotification('First name and last name are required.', 'error');
            return;
        }

        // Validate date of birth
        if (profileData.dateOfBirth) {
            const birthDate = new Date(profileData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 0 || age > 120) {
                showNotification('Please enter a valid date of birth.', 'error');
                return;
            }
        }

        // Validate phone number
        if (profileData.phone && !/^[\d\s\-\+\(\)]+$/.test(profileData.phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }

        // Simulate API call (replace with actual AJAX call)
        showNotification('Saving changes...', 'info');
        
        setTimeout(() => {
            // Update profile header with new data
            updateProfileHeader(profileData);
            
            // Disable edit mode
            disableEditMode();
            
            showNotification('Profile updated successfully!', 'success');
        }, 1000);
    }

    function updateProfileHeader(data) {
        // Update profile header with new information
        const profileInfo = document.querySelector('.profile-info h1');
        if (profileInfo && data.firstName && data.lastName) {
            profileInfo.textContent = `${data.firstName} ${data.lastName}`;
        }

        // Update dropdown username
        const dropdownUsername = document.querySelector('#userDropdown span');
        if (dropdownUsername && data.firstName) {
            dropdownUsername.textContent = data.firstName;
        }
    }

    // Initialize form validation
    initializeFormValidation();

    function initializeFormValidation() {
        const inputs = profileForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        clearFieldError(field);

        switch (field.id) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'This field is required.';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Must be at least 2 characters long.';
                }
                break;
                
            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number.';
                }
                break;
                
            case 'dateOfBirth':
                if (value) {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    
                    if (age < 0 || age > 120) {
                        isValid = false;
                        errorMessage = 'Please enter a valid date of birth.';
                    }
                }
                break;
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        performSearch,
        addToCart,
        showNotification,
        handleBrowseProducts,
        handleUploadPrescription,
        handleTalkWithPharmacist
    };
}