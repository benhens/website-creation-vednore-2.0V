/**
 * Property Search and Filter Functionality
 * Handles advanced property search, filtering, and interactive features
 */

$(document).ready(function() {
    'use strict';

    // Property data structure
    const properties = [
        {
            id: 1,
            title: "Luxury Modern Villa",
            location: "Beverly Hills, California",
            price: 2450000,
            type: "house",
            bedrooms: 4,
            bathrooms: 5,
            area: 3500,
            image: "image/dummy-img-600x400.jpg",
            featured: true,
            status: "sale"
        },
        {
            id: 2,
            title: "Downtown Penthouse",
            location: "Manhattan, New York",
            price: 1850000,
            type: "apartment",
            bedrooms: 3,
            bathrooms: 3,
            area: 2800,
            image: "image/dummy-img-600x400.jpg",
            featured: true,
            status: "sale"
        },
        {
            id: 3,
            title: "Waterfront Luxury Condo",
            location: "Miami Beach, Florida",
            price: 8500,
            type: "condo",
            bedrooms: 2,
            bathrooms: 2,
            area: 1900,
            image: "image/dummy-img-600x400.jpg",
            featured: true,
            status: "rent"
        },
        {
            id: 4,
            title: "Modern Family Home",
            location: "San Francisco, California",
            price: 1200000,
            type: "house",
            bedrooms: 3,
            bathrooms: 2,
            area: 2200,
            image: "image/dummy-img-600x400.jpg",
            featured: false,
            status: "sale"
        },
        {
            id: 5,
            title: "Luxury Apartment",
            location: "Chicago, Illinois",
            price: 750000,
            type: "apartment",
            bedrooms: 2,
            bathrooms: 2,
            area: 1500,
            image: "image/dummy-img-600x400.jpg",
            featured: false,
            status: "sale"
        },
        {
            id: 6,
            title: "Commercial Office Space",
            location: "Manhattan, New York",
            price: 15000,
            type: "commercial",
            bedrooms: 0,
            bathrooms: 4,
            area: 5000,
            image: "image/dummy-img-600x400.jpg",
            featured: false,
            status: "rent"
        }
    ];

    // Initialize search functionality
    initializeSearch();
    initializeFavorites();
    initializePropertyCards();

    /**
     * Initialize property search form
     */
    function initializeSearch() {
        const searchForm = $('#propertySearchForm');
        
        if (searchForm.length) {
            searchForm.on('submit', function(e) {
                e.preventDefault();
                performSearch();
            });

            // Real-time search on input change
            searchForm.find('select').on('change', function() {
                if (window.location.pathname.includes('properties.html')) {
                    performSearch();
                }
            });
        }
    }

    /**
     * Perform property search based on form criteria
     */
    function performSearch() {
        const formData = {
            propertyType: $('#propertyType').val(),
            location: $('#location').val(),
            bedrooms: $('#bedrooms').val(),
            priceRange: $('#priceRange').val()
        };

        const filteredProperties = filterProperties(formData);
        
        if (window.location.pathname.includes('properties.html')) {
            displayProperties(filteredProperties);
        } else {
            // Redirect to properties page with search parameters
            const searchParams = new URLSearchParams(formData);
            window.location.href = `properties.html?${searchParams.toString()}`;
        }
    }

    /**
     * Filter properties based on search criteria
     */
    function filterProperties(criteria) {
        return properties.filter(property => {
            // Property type filter
            if (criteria.propertyType && property.type !== criteria.propertyType) {
                return false;
            }

            // Location filter
            if (criteria.location) {
                const locationMap = {
                    'beverly-hills': 'Beverly Hills',
                    'manhattan': 'Manhattan',
                    'miami': 'Miami',
                    'san-francisco': 'San Francisco',
                    'chicago': 'Chicago'
                };
                if (!property.location.includes(locationMap[criteria.location])) {
                    return false;
                }
            }

            // Bedrooms filter
            if (criteria.bedrooms && property.bedrooms < parseInt(criteria.bedrooms)) {
                return false;
            }

            // Price range filter
            if (criteria.priceRange) {
                const [min, max] = criteria.priceRange.split('-').map(p => 
                    p.includes('+') ? Infinity : parseInt(p)
                );
                if (property.price < min || (max !== Infinity && property.price > max)) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Display filtered properties (for properties page)
     */
    function displayProperties(filteredProperties) {
        const container = $('#propertiesContainer');
        if (!container.length) return;

        container.empty();

        if (filteredProperties.length === 0) {
            container.html(`
                <div class="col-12 text-center py-5">
                    <h4>No properties found</h4>
                    <p>Try adjusting your search criteria to find more properties.</p>
                </div>
            `);
            return;
        }

        filteredProperties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            container.append(propertyCard);
        });

        // Reinitialize animations
        if (typeof window.scrollAnimationInit === 'function') {
            window.scrollAnimationInit();
        }
    }

    /**
     * Create property card HTML
     */
    function createPropertyCard(property) {
        const priceDisplay = property.status === 'rent' 
            ? `$${formatNumber(property.price)}/mo`
            : `$${formatNumber(property.price)}`;

        const badgeClass = property.featured ? 'featured' : property.status;
        const badgeText = property.featured ? 'Featured' : 
                         property.status === 'sale' ? 'For Sale' : 'For Rent';

        return `
            <div class="col mb-4 property-item" data-property-id="${property.id}">
                <div class="property-card">
                    <div class="property-image-container">
                        <img src="${property.image}" alt="${property.title}" class="property-image" loading="lazy">
                        <div class="property-badge ${badgeClass}">${badgeText}</div>
                        <div class="property-price">${priceDisplay}</div>
                    </div>
                    <div class="property-content">
                        <div class="property-location">
                            <i class="rtmicon rtmicon-location"></i>
                            <span>${property.location}</span>
                        </div>
                        <h4 class="property-title">
                            <a href="property_details.html?id=${property.id}">${property.title}</a>
                        </h4>
                        <div class="property-features">
                            ${property.bedrooms > 0 ? `
                                <div class="feature">
                                    <i class="rtmicon rtmicon-home"></i>
                                    <span>${property.bedrooms} Beds</span>
                                </div>
                            ` : ''}
                            <div class="feature">
                                <i class="rtmicon rtmicon-home"></i>
                                <span>${property.bathrooms} Baths</span>
                            </div>
                            <div class="feature">
                                <i class="rtmicon rtmicon-measurement"></i>
                                <span>${formatNumber(property.area)} sq ft</span>
                            </div>
                        </div>
                        <div class="property-actions">
                            <a href="property_details.html?id=${property.id}" class="btn btn-accent">View Details</a>
                            <button class="btn btn-outline-secondary favorite-btn" data-property-id="${property.id}">
                                <i class="rtmicon rtmicon-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initialize favorites functionality
     */
    function initializeFavorites() {
        // Load favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('propertyFavorites') || '[]');
        
        // Update UI for favorited properties
        favorites.forEach(id => {
            $(`.favorite-btn[data-property-id="${id}"]`).addClass('favorited');
        });

        // Handle favorite button clicks
        $(document).on('click', '.favorite-btn', function(e) {
            e.preventDefault();
            const propertyId = $(this).data('property-id');
            toggleFavorite(propertyId, $(this));
        });
    }

    /**
     * Toggle property favorite status
     */
    function toggleFavorite(propertyId, button) {
        let favorites = JSON.parse(localStorage.getItem('propertyFavorites') || '[]');
        
        if (favorites.includes(propertyId)) {
            favorites = favorites.filter(id => id !== propertyId);
            button.removeClass('favorited');
            showNotification('Property removed from favorites', 'info');
        } else {
            favorites.push(propertyId);
            button.addClass('favorited');
            showNotification('Property added to favorites', 'success');
        }
        
        localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
    }

    /**
     * Initialize property card interactions
     */
    function initializePropertyCards() {
        // Property card hover effects
        $(document).on('mouseenter', '.property-card', function() {
            $(this).addClass('hovered');
        }).on('mouseleave', '.property-card', function() {
            $(this).removeClass('hovered');
        });

        // Property image lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Format number with commas
     */
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Show notification to user
     */
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'info'} border-0" 
                 role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                            data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `);

        $('.toast-container').append(notification);
        const toast = new bootstrap.Toast(notification[0]);
        toast.show();

        // Remove toast element after it's hidden
        notification.on('hidden.bs.toast', function() {
            $(this).remove();
        });
    }

    /**
     * Initialize property comparison feature
     */
    function initializeComparison() {
        let comparisonList = JSON.parse(localStorage.getItem('propertyComparison') || '[]');
        
        $(document).on('click', '.compare-btn', function(e) {
            e.preventDefault();
            const propertyId = $(this).data('property-id');
            
            if (comparisonList.includes(propertyId)) {
                comparisonList = comparisonList.filter(id => id !== propertyId);
                $(this).removeClass('active');
                showNotification('Property removed from comparison');
            } else if (comparisonList.length < 3) {
                comparisonList.push(propertyId);
                $(this).addClass('active');
                showNotification('Property added to comparison');
            } else {
                showNotification('Maximum 3 properties can be compared', 'warning');
            }
            
            localStorage.setItem('propertyComparison', JSON.stringify(comparisonList));
            updateComparisonCounter();
        });
    }

    /**
     * Update comparison counter in UI
     */
    function updateComparisonCounter() {
        const count = JSON.parse(localStorage.getItem('propertyComparison') || '[]').length;
        $('.comparison-counter').text(count);
        $('.comparison-counter').toggle(count > 0);
    }

    /**
     * Initialize map functionality for property locations
     */
    function initializePropertyMap() {
        // This would integrate with Google Maps or similar service
        // For now, we'll use a placeholder implementation
        $('.property-map').each(function() {
            const mapContainer = $(this);
            const lat = mapContainer.data('lat') || 40.7128;
            const lng = mapContainer.data('lng') || -74.0060;
            
            // Initialize map (placeholder)
            mapContainer.html(`
                <iframe 
                    src="https://maps.google.com/maps?q=${lat},${lng}&t=m&z=14&output=embed&iwloc=near"
                    class="w-100 h-100 border-0 rounded"
                    loading="lazy"
                    title="Property Location">
                </iframe>
            `);
        });
    }

    /**
     * Initialize advanced filters for properties page
     */
    function initializeAdvancedFilters() {
        // Price range slider
        const priceSlider = $('#priceRangeSlider');
        if (priceSlider.length) {
            // Initialize range slider (would use a library like noUiSlider in production)
            priceSlider.on('input', function() {
                const value = $(this).val();
                $('#priceRangeDisplay').text(`$${formatNumber(value)}`);
            });
        }

        // Area range slider
        const areaSlider = $('#areaRangeSlider');
        if (areaSlider.length) {
            areaSlider.on('input', function() {
                const value = $(this).val();
                $('#areaRangeDisplay').text(`${formatNumber(value)} sq ft`);
            });
        }

        // Amenities checkboxes
        $('.amenity-checkbox').on('change', function() {
            if (window.location.pathname.includes('properties.html')) {
                performAdvancedSearch();
            }
        });
    }

    /**
     * Perform advanced search with all criteria
     */
    function performAdvancedSearch() {
        const criteria = {
            propertyType: $('#propertyType').val(),
            location: $('#location').val(),
            bedrooms: $('#bedrooms').val(),
            priceRange: $('#priceRange').val(),
            minPrice: $('#minPrice').val(),
            maxPrice: $('#maxPrice').val(),
            minArea: $('#minArea').val(),
            maxArea: $('#maxArea').val(),
            amenities: $('.amenity-checkbox:checked').map(function() {
                return $(this).val();
            }).get()
        };

        const filteredProperties = filterPropertiesAdvanced(criteria);
        displayProperties(filteredProperties);
        updateSearchResults(filteredProperties.length);
    }

    /**
     * Advanced property filtering
     */
    function filterPropertiesAdvanced(criteria) {
        return properties.filter(property => {
            // Basic filters
            if (criteria.propertyType && property.type !== criteria.propertyType) return false;
            if (criteria.bedrooms && property.bedrooms < parseInt(criteria.bedrooms)) return false;

            // Location filter
            if (criteria.location) {
                const locationMap = {
                    'beverly-hills': 'Beverly Hills',
                    'manhattan': 'Manhattan',
                    'miami': 'Miami',
                    'san-francisco': 'San Francisco',
                    'chicago': 'Chicago'
                };
                if (!property.location.includes(locationMap[criteria.location])) return false;
            }

            // Price filters
            if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
            if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;

            // Area filters
            if (criteria.minArea && property.area < parseInt(criteria.minArea)) return false;
            if (criteria.maxArea && property.area > parseInt(criteria.maxArea)) return false;

            return true;
        });
    }

    /**
     * Update search results counter
     */
    function updateSearchResults(count) {
        const resultsText = count === 1 ? '1 property found' : `${count} properties found`;
        $('#searchResultsCount').text(resultsText);
    }

    /**
     * Initialize property sorting
     */
    function initializeSorting() {
        $('#sortProperties').on('change', function() {
            const sortBy = $(this).val();
            const container = $('#propertiesContainer');
            const propertyItems = container.find('.property-item').toArray();

            propertyItems.sort((a, b) => {
                const aId = parseInt($(a).data('property-id'));
                const bId = parseInt($(b).data('property-id'));
                const aProperty = properties.find(p => p.id === aId);
                const bProperty = properties.find(p => p.id === bId);

                switch (sortBy) {
                    case 'price-low':
                        return aProperty.price - bProperty.price;
                    case 'price-high':
                        return bProperty.price - aProperty.price;
                    case 'area-large':
                        return bProperty.area - aProperty.area;
                    case 'area-small':
                        return aProperty.area - bProperty.area;
                    case 'newest':
                        return bProperty.id - aProperty.id;
                    default:
                        return 0;
                }
            });

            container.empty().append(propertyItems);
        });
    }

    /**
     * Initialize view toggle (grid/list)
     */
    function initializeViewToggle() {
        $('.view-toggle').on('click', function() {
            const viewType = $(this).data('view');
            $('.view-toggle').removeClass('active');
            $(this).addClass('active');

            const container = $('#propertiesContainer');
            container.removeClass('grid-view list-view').addClass(`${viewType}-view`);
            
            localStorage.setItem('propertyViewType', viewType);
        });

        // Load saved view preference
        const savedView = localStorage.getItem('propertyViewType') || 'grid';
        $(`.view-toggle[data-view="${savedView}"]`).click();
    }

    /**
     * Initialize property quick view modal
     */
    function initializeQuickView() {
        $(document).on('click', '.quick-view-btn', function(e) {
            e.preventDefault();
            const propertyId = $(this).data('property-id');
            const property = properties.find(p => p.id === propertyId);
            
            if (property) {
                showQuickViewModal(property);
            }
        });
    }

    /**
     * Show quick view modal for property
     */
    function showQuickViewModal(property) {
        const modalHtml = `
            <div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${property.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${property.image}" alt="${property.title}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-6">
                                    <div class="property-quick-info">
                                        <div class="property-location mb-2">
                                            <i class="rtmicon rtmicon-location"></i>
                                            <span>${property.location}</span>
                                        </div>
                                        <div class="property-price mb-3">
                                            <h4>${property.status === 'rent' ? `$${formatNumber(property.price)}/mo` : `$${formatNumber(property.price)}`}</h4>
                                        </div>
                                        <div class="property-features mb-3">
                                            ${property.bedrooms > 0 ? `<span class="badge bg-light text-dark me-2">${property.bedrooms} Bedrooms</span>` : ''}
                                            <span class="badge bg-light text-dark me-2">${property.bathrooms} Bathrooms</span>
                                            <span class="badge bg-light text-dark">${formatNumber(property.area)} sq ft</span>
                                        </div>
                                        <div class="property-actions">
                                            <a href="property_details.html?id=${property.id}" class="btn btn-accent me-2">View Full Details</a>
                                            <button class="btn btn-outline-secondary favorite-btn" data-property-id="${property.id}">
                                                <i class="rtmicon rtmicon-heart"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal and add new one
        $('#quickViewModal').remove();
        $('body').append(modalHtml);
        
        const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
        modal.show();
    }

    // Initialize all features
    initializeAdvancedFilters();
    initializeSorting();
    initializeViewToggle();
    initializeQuickView();
    initializeComparison();
    initializePropertyMap();

    // Load search parameters from URL on properties page
    if (window.location.pathname.includes('properties.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Set form values from URL parameters
        urlParams.forEach((value, key) => {
            if (value) {
                $(`#${key}`).val(value);
            }
        });

        // Perform initial search if parameters exist
        if (urlParams.toString()) {
            performSearch();
        } else {
            // Display all properties by default
            displayProperties(properties);
        }
    }

    // Update comparison counter on page load
    updateComparisonCounter();
});

/**
 * Property data management utilities
 */
window.PropertyManager = {
    /**
     * Get property by ID
     */
    getProperty: function(id) {
        return properties.find(p => p.id === parseInt(id));
    },

    /**
     * Get featured properties
     */
    getFeaturedProperties: function() {
        return properties.filter(p => p.featured);
    },

    /**
     * Get properties by type
     */
    getPropertiesByType: function(type) {
        return properties.filter(p => p.type === type);
    },

    /**
     * Search properties by keyword
     */
    searchProperties: function(keyword) {
        const searchTerm = keyword.toLowerCase();
        return properties.filter(p => 
            p.title.toLowerCase().includes(searchTerm) ||
            p.location.toLowerCase().includes(searchTerm)
        );
    }
};