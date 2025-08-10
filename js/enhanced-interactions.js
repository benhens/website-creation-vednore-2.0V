/**
 * Enhanced Interactions for Real Estate Website
 * Handles advanced UI interactions, animations, and user experience features
 */

$(document).ready(function() {
    'use strict';

    // Initialize all enhanced features
    initializeScrollEffects();
    initializeImageLazyLoading();
    initializeTooltips();
    initializeModals();
    initializeFormValidation();
    initializeSearchAutocomplete();
    initializePriceFormatting();
    initializeImageGallery();
    initializeMapIntegration();

    /**
     * Enhanced scroll effects and animations
     */
    function initializeScrollEffects() {
        // Parallax effect for hero sections
        $(window).on('scroll', function() {
            const scrolled = $(this).scrollTop();
            const parallaxElements = $('.parallax-bg');
            
            parallaxElements.each(function() {
                const speed = $(this).data('speed') || 0.5;
                const yPos = -(scrolled * speed);
                $(this).css('transform', `translateY(${yPos}px)`);
            });

            // Header glass effect
            const header = $('#header');
            if (scrolled > 100) {
                header.addClass('glass-effect');
            } else {
                header.removeClass('glass-effect');
            }

            // Show/hide back to top button
            const backToTop = $('#backToTop');
            if (scrolled > 500) {
                backToTop.fadeIn();
            } else {
                backToTop.fadeOut();
            }
        });

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        });

        // Add back to top button
        if (!$('#backToTop').length) {
            $('body').append(`
                <button id="backToTop" class="back-to-top" title="Back to Top">
                    <i class="rtmicon rtmicon-arrow-up"></i>
                </button>
            `);
        }

        $('#backToTop').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        });
    }

    /**
     * Advanced image lazy loading with intersection observer
     */
    function initializeImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src || img.src;
                        
                        // Create a new image to preload
                        const newImg = new Image();
                        newImg.onload = function() {
                            img.src = src;
                            img.classList.remove('lazy-loading');
                            img.classList.add('lazy-loaded');
                        };
                        newImg.src = src;
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src or lazy class
            document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
                img.classList.add('lazy-loading');
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Initialize tooltips for better UX
     */
    function initializeTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Custom property feature tooltips
        $('.property-features .feature').each(function() {
            const feature = $(this);
            const text = feature.find('span').text();
            feature.attr('title', `Property feature: ${text}`);
        });
    }

    /**
     * Enhanced modal functionality
     */
    function initializeModals() {
        // Property inquiry modal
        $('.property-inquiry-btn').on('click', function(e) {
            e.preventDefault();
            const propertyTitle = $(this).closest('.property-card').find('.property-title a').text();
            showPropertyInquiryModal(propertyTitle);
        });

        // Image lightbox for property galleries
        $('.property-gallery img').on('click', function() {
            const src = $(this).attr('src');
            const alt = $(this).attr('alt');
            showImageLightbox(src, alt);
        });
    }

    /**
     * Show property inquiry modal
     */
    function showPropertyInquiryModal(propertyTitle) {
        const modalHtml = `
            <div class="modal fade" id="propertyInquiryModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Inquire About: ${propertyTitle}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="property-inquiry-form needs-validation" novalidate>
                                <input type="hidden" name="property" value="${propertyTitle}">
                                <div class="mb-3">
                                    <label for="inquiryName" class="form-label">Full Name *</label>
                                    <input type="text" class="form-control" id="inquiryName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="inquiryEmail" class="form-label">Email Address *</label>
                                    <input type="email" class="form-control" id="inquiryEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="inquiryPhone" class="form-label">Phone Number</label>
                                    <input type="tel" class="form-control" id="inquiryPhone">
                                </div>
                                <div class="mb-3">
                                    <label for="inquiryType" class="form-label">Inquiry Type *</label>
                                    <select class="form-select" id="inquiryType" required>
                                        <option value="">Select inquiry type</option>
                                        <option value="viewing">Schedule a Viewing</option>
                                        <option value="information">Request Information</option>
                                        <option value="offer">Make an Offer</option>
                                        <option value="financing">Financing Options</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="inquiryMessage" class="form-label">Message</label>
                                    <textarea class="form-control" id="inquiryMessage" rows="4" 
                                              placeholder="Tell us more about your requirements..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-accent w-100">
                                    <span>Send Inquiry</span>
                                    <i class="rtmicon rtmicon-arrow-right ms-2"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#propertyInquiryModal').remove();
        $('body').append(modalHtml);
        
        const modal = new bootstrap.Modal(document.getElementById('propertyInquiryModal'));
        modal.show();
    }

    /**
     * Enhanced form validation
     */
    function initializeFormValidation() {
        // Real-time validation
        $('.needs-validation input, .needs-validation select, .needs-validation textarea').on('blur', function() {
            validateField($(this));
        });

        // Form submission handling
        $('.needs-validation').on('submit', function(e) {
            e.preventDefault();
            const form = $(this);
            
            if (validateForm(form)) {
                submitForm(form);
            }
        });
    }

    /**
     * Validate individual form field
     */
    function validateField(field) {
        const value = field.val().trim();
        const type = field.attr('type');
        const required = field.prop('required');
        
        let isValid = true;
        let errorMessage = '';

        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        updateFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    /**
     * Validate entire form
     */
    function validateForm(form) {
        let isValid = true;
        
        form.find('input, select, textarea').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Update field validation UI
     */
    function updateFieldValidation(field, isValid, errorMessage) {
        const fieldGroup = field.closest('.mb-3');
        const feedback = fieldGroup.find('.invalid-feedback');

        if (isValid) {
            field.removeClass('is-invalid').addClass('is-valid');
            feedback.hide();
        } else {
            field.removeClass('is-valid').addClass('is-invalid');
            if (feedback.length) {
                feedback.text(errorMessage).show();
            } else {
                fieldGroup.append(`<div class="invalid-feedback">${errorMessage}</div>`);
            }
        }
    }

    /**
     * Email validation
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Phone validation
     */
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    /**
     * Submit form with AJAX
     */
    function submitForm(form) {
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        // Show loading state
        submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...').prop('disabled', true);

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Reset form and show success message
            form[0].reset();
            form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
            submitBtn.html(originalText).prop('disabled', false);
            
            showNotification('Your inquiry has been sent successfully!', 'success');
            
            // Close modal if it's in a modal
            const modal = form.closest('.modal');
            if (modal.length) {
                bootstrap.Modal.getInstance(modal[0]).hide();
            }
        }, 2000);
    }

    /**
     * Search autocomplete functionality
     */
    function initializeSearchAutocomplete() {
        const searchInputs = $('.search-autocomplete');
        
        searchInputs.each(function() {
            const input = $(this);
            const suggestions = input.data('suggestions') || [];
            
            input.on('input', function() {
                const value = $(this).val().toLowerCase();
                if (value.length > 2) {
                    showSearchSuggestions(input, suggestions, value);
                } else {
                    hideSearchSuggestions(input);
                }
            });

            // Hide suggestions when clicking outside
            $(document).on('click', function(e) {
                if (!input.is(e.target) && !input.parent().find('.search-suggestions').is(e.target)) {
                    hideSearchSuggestions(input);
                }
            });
        });
    }

    /**
     * Show search suggestions
     */
    function showSearchSuggestions(input, suggestions, query) {
        const filtered = suggestions.filter(item => 
            item.toLowerCase().includes(query)
        ).slice(0, 5);

        if (filtered.length === 0) return;

        const suggestionsHtml = filtered.map(item => 
            `<div class="suggestion-item" data-value="${item}">${item}</div>`
        ).join('');

        let suggestionsContainer = input.parent().find('.search-suggestions');
        if (!suggestionsContainer.length) {
            suggestionsContainer = $('<div class="search-suggestions"></div>');
            input.parent().append(suggestionsContainer);
        }

        suggestionsContainer.html(suggestionsHtml).show();

        // Handle suggestion clicks
        suggestionsContainer.find('.suggestion-item').on('click', function() {
            input.val($(this).data('value'));
            hideSearchSuggestions(input);
            input.trigger('change');
        });
    }

    /**
     * Hide search suggestions
     */
    function hideSearchSuggestions(input) {
        input.parent().find('.search-suggestions').hide();
    }

    /**
     * Format price inputs with commas
     */
    function initializePriceFormatting() {
        $('.price-input').on('input', function() {
            let value = $(this).val().replace(/[^\d]/g, '');
            if (value) {
                value = parseInt(value).toLocaleString();
                $(this).val(value);
            }
        });
    }

    /**
     * Enhanced image gallery with lightbox
     */
    function initializeImageGallery() {
        $('.property-gallery').each(function() {
            const gallery = $(this);
            const images = gallery.find('img');
            
            images.on('click', function() {
                const currentIndex = images.index(this);
                showImageGalleryModal(images, currentIndex);
            });
        });
    }

    /**
     * Show image gallery modal
     */
    function showImageGalleryModal(images, startIndex) {
        const modalHtml = `
            <div class="modal fade" id="imageGalleryModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content bg-dark">
                        <div class="modal-header border-0">
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="image-gallery-container">
                                <div class="gallery-main-image">
                                    <img src="" alt="" class="img-fluid w-100">
                                </div>
                                <div class="gallery-controls">
                                    <button class="gallery-prev btn btn-outline-light">
                                        <i class="rtmicon rtmicon-arrow-left"></i>
                                    </button>
                                    <button class="gallery-next btn btn-outline-light">
                                        <i class="rtmicon rtmicon-arrow-right"></i>
                                    </button>
                                </div>
                                <div class="gallery-counter">
                                    <span class="current-image">1</span> / <span class="total-images">${images.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#imageGalleryModal').remove();
        $('body').append(modalHtml);
        
        const modal = new bootstrap.Modal(document.getElementById('imageGalleryModal'));
        let currentIndex = startIndex;

        function updateGalleryImage() {
            const img = images.eq(currentIndex);
            $('#imageGalleryModal .gallery-main-image img').attr('src', img.attr('src')).attr('alt', img.attr('alt'));
            $('#imageGalleryModal .current-image').text(currentIndex + 1);
        }

        // Navigation handlers
        $('#imageGalleryModal .gallery-prev').on('click', function() {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            updateGalleryImage();
        });

        $('#imageGalleryModal .gallery-next').on('click', function() {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            updateGalleryImage();
        });

        // Keyboard navigation
        $(document).on('keydown.gallery', function(e) {
            if (e.key === 'ArrowLeft') {
                $('#imageGalleryModal .gallery-prev').click();
            } else if (e.key === 'ArrowRight') {
                $('#imageGalleryModal .gallery-next').click();
            }
        });

        // Clean up keyboard listener when modal closes
        $('#imageGalleryModal').on('hidden.bs.modal', function() {
            $(document).off('keydown.gallery');
        });

        updateGalleryImage();
        modal.show();
    }

    /**
     * Map integration for property locations
     */
    function initializeMapIntegration() {
        $('.property-map').each(function() {
            const mapContainer = $(this);
            const address = mapContainer.data('address') || 'New York, NY';
            const zoom = mapContainer.data('zoom') || 14;
            
            // Initialize embedded Google Map
            const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=m&z=${zoom}&output=embed&iwloc=near`;
            
            mapContainer.html(`
                <iframe 
                    src="${mapUrl}"
                    class="w-100 h-100 border-0 rounded"
                    loading="lazy"
                    title="Property Location: ${address}"
                    style="min-height: 300px;">
                </iframe>
            `);
        });
    }

    /**
     * Enhanced notification system
     */
    function showNotification(message, type = 'info', duration = 5000) {
        const notificationId = 'notification-' + Date.now();
        const iconMap = {
            success: 'rtmicon-check-circle',
            error: 'rtmicon-times',
            warning: 'rtmicon-alert',
            info: 'rtmicon-info'
        };

        const notification = $(`
            <div class="toast align-items-center text-white bg-${type} border-0" 
                 id="${notificationId}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center">
                        <i class="rtmicon ${iconMap[type]} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                            data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `);

        $('.toast-container').append(notification);
        const toast = new bootstrap.Toast(notification[0], { delay: duration });
        toast.show();

        notification.on('hidden.bs.toast', function() {
            $(this).remove();
        });
    }

    /**
     * Property comparison functionality
     */
    function initializePropertyComparison() {
        let comparisonList = JSON.parse(localStorage.getItem('propertyComparison') || '[]');
        
        // Update comparison counter
        updateComparisonCounter(comparisonList.length);

        $('.compare-btn').on('click', function(e) {
            e.preventDefault();
            const propertyId = parseInt($(this).data('property-id'));
            
            if (comparisonList.includes(propertyId)) {
                comparisonList = comparisonList.filter(id => id !== propertyId);
                $(this).removeClass('active');
                showNotification('Property removed from comparison', 'info');
            } else if (comparisonList.length < 3) {
                comparisonList.push(propertyId);
                $(this).addClass('active');
                showNotification('Property added to comparison', 'success');
            } else {
                showNotification('Maximum 3 properties can be compared', 'warning');
                return;
            }
            
            localStorage.setItem('propertyComparison', JSON.stringify(comparisonList));
            updateComparisonCounter(comparisonList.length);
        });

        // Show comparison modal
        $('.comparison-counter').on('click', function() {
            if (comparisonList.length > 0) {
                showComparisonModal(comparisonList);
            }
        });
    }

    /**
     * Update comparison counter display
     */
    function updateComparisonCounter(count) {
        const counter = $('.comparison-counter');
        counter.text(count);
        
        if (count > 0) {
            counter.show().addClass('animate__animated animate__pulse');
        } else {
            counter.hide();
        }
    }

    /**
     * Advanced search with debouncing
     */
    function initializeAdvancedSearch() {
        let searchTimeout;
        
        $('.search-input').on('input', function() {
            const query = $(this).val();
            
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (query.length > 2) {
                    performLiveSearch(query);
                }
            }, 300);
        });
    }

    /**
     * Perform live search
     */
    function performLiveSearch(query) {
        // Show loading indicator
        $('.search-results').html('<div class="text-center py-3"><div class="loading-spinner"></div></div>');

        // Simulate API call (replace with actual search endpoint)
        setTimeout(() => {
            const results = window.PropertyManager ? 
                window.PropertyManager.searchProperties(query) : [];
            
            displaySearchResults(results);
        }, 500);
    }

    /**
     * Display search results
     */
    function displaySearchResults(results) {
        const container = $('.search-results');
        
        if (results.length === 0) {
            container.html('<div class="text-center py-3 text-muted">No properties found</div>');
            return;
        }

        const resultsHtml = results.map(property => `
            <div class="search-result-item">
                <img src="${property.image}" alt="${property.title}" class="result-image">
                <div class="result-content">
                    <h6>${property.title}</h6>
                    <p class="text-muted">${property.location}</p>
                    <span class="result-price">$${formatNumber(property.price)}</span>
                </div>
            </div>
        `).join('');

        container.html(resultsHtml);
    }

    /**
     * Initialize property save/favorite functionality
     */
    function initializePropertySave() {
        $('.save-property-btn').on('click', function(e) {
            e.preventDefault();
            const propertyId = $(this).data('property-id');
            const isSaved = $(this).hasClass('saved');
            
            if (isSaved) {
                removeSavedProperty(propertyId);
                $(this).removeClass('saved');
                showNotification('Property removed from saved list', 'info');
            } else {
                saveProperty(propertyId);
                $(this).addClass('saved');
                showNotification('Property saved successfully', 'success');
            }
        });
    }

    /**
     * Save property to localStorage
     */
    function saveProperty(propertyId) {
        let savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
        if (!savedProperties.includes(propertyId)) {
            savedProperties.push(propertyId);
            localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
        }
    }

    /**
     * Remove saved property
     */
    function removeSavedProperty(propertyId) {
        let savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
        savedProperties = savedProperties.filter(id => id !== propertyId);
        localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
    }

    /**
     * Initialize property sharing
     */
    function initializePropertySharing() {
        $('.share-property-btn').on('click', function(e) {
            e.preventDefault();
            const propertyUrl = window.location.href;
            const propertyTitle = $(this).closest('.property-card').find('.property-title a').text();
            
            if (navigator.share) {
                navigator.share({
                    title: propertyTitle,
                    text: `Check out this property: ${propertyTitle}`,
                    url: propertyUrl
                });
            } else {
                showShareModal(propertyUrl, propertyTitle);
            }
        });
    }

    /**
     * Show share modal for browsers without native sharing
     */
    function showShareModal(url, title) {
        const modalHtml = `
            <div class="modal fade" id="shareModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Share Property</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <h6 class="mb-3">${title}</h6>
                            <div class="share-buttons d-flex justify-content-center gap-3">
                                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" 
                                   target="_blank" class="btn btn-primary">
                                    <i class="fa-brands fa-facebook-f me-2"></i>Facebook
                                </a>
                                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}" 
                                   target="_blank" class="btn btn-info">
                                    <i class="fa-brands fa-twitter me-2"></i>Twitter
                                </a>
                                <button class="btn btn-success copy-link-btn" data-url="${url}">
                                    <i class="fa-solid fa-copy me-2"></i>Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#shareModal').remove();
        $('body').append(modalHtml);
        
        const modal = new bootstrap.Modal(document.getElementById('shareModal'));
        modal.show();

        // Handle copy link
        $('.copy-link-btn').on('click', function() {
            const url = $(this).data('url');
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copied to clipboard!', 'success');
                modal.hide();
            });
        });
    }

    /**
     * Initialize all enhanced features
     */
    function initializeEnhancedFeatures() {
        initializePropertyComparison();
        initializeAdvancedSearch();
        initializePropertySave();
        initializePropertySharing();
    }

    // Initialize enhanced features
    initializeEnhancedFeatures();

    /**
     * Utility function to format numbers
     */
    window.formatNumber = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    /**
     * Utility function to show notifications
     */
    window.showNotification = showNotification;
});

/**
 * CSS for enhanced interactions (injected dynamically)
 */
const enhancedStyles = `
<style>
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.back-to-top:hover {
    background: #1e4a32;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
}

.suggestion-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f8f9fa;
    transition: background-color 0.2s ease;
}

.suggestion-item:hover {
    background-color: #f8f9fa;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.image-gallery-container {
    position: relative;
    background: #000;
}

.gallery-main-image {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

.gallery-main-image img {
    max-height: 70vh;
    object-fit: contain;
}

.gallery-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    transform: translateY(-50%);
}

.gallery-controls .btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
}

.search-result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid #f8f9fa;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.search-result-item:hover {
    background-color: #f8f9fa;
}

.result-image {
    width: 60px;
    height: 45px;
    object-fit: cover;
    border-radius: 6px;
}

.result-content {
    flex: 1;
}

.result-content h6 {
    margin: 0;
    font-size: 14px;
    color: #2c3e50;
}

.result-content p {
    margin: 0;
    font-size: 12px;
}

.result-price {
    font-weight: 600;
    color: var(--accent-color);
    font-size: 14px;
}

.lazy-loading {
    opacity: 0.5;
    transition: opacity 0.3s ease;
}

.lazy-loaded {
    opacity: 1;
}

.parallax-bg {
    will-change: transform;
}

@media (max-width: 768px) {
    .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
    }
    
    .gallery-controls {
        padding: 0 10px;
    }
    
    .gallery-controls .btn {
        width: 40px;
        height: 40px;
    }
}
</style>
`;

// Inject enhanced styles
$('head').append(enhancedStyles);