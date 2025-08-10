# Rofaria - Premium Real Estate Platform

A comprehensive, modern real estate website built with HTML5, CSS3, and JavaScript. This platform provides a complete solution for property listings, search functionality, and real estate services.

## 🏠 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach ensuring optimal viewing across all devices
- **Property Listings**: Advanced grid and list views with detailed property information
- **Advanced Search**: Multi-criteria search with filters for type, location, price, and features
- **Property Details**: Comprehensive property pages with image galleries and specifications
- **Contact System**: Integrated inquiry forms and contact management
- **Interactive Maps**: Embedded Google Maps for property locations

### Enhanced Features
- **Property Favorites**: Save and manage favorite properties
- **Property Comparison**: Compare up to 3 properties side-by-side
- **Image Galleries**: Lightbox galleries with navigation
- **Real-time Search**: Live search with autocomplete suggestions
- **Newsletter Subscription**: Email marketing integration
- **Social Sharing**: Share properties across social platforms
- **SEO Optimized**: Semantic HTML and meta tags for search engines

## 📁 File Structure

```
/
├── index.html              # Homepage
├── properties.html         # Property listings page
├── property_details.html   # Individual property details
├── about.html             # About us page
├── service.html           # Services page
├── team.html              # Team members page
├── contact.html           # Contact page
├── blog.html              # Blog/news page
├── single_blog.html       # Individual blog post
├── faq.html               # Frequently asked questions
├── price_plan.html        # Pricing plans
├── 404.html               # Error page
├── css/
│   ├── style.css          # Main stylesheet
│   ├── property-enhancements.css  # Property-specific styles
│   ├── bootstrap.min.css  # Bootstrap framework
│   ├── fontawesome/       # Font Awesome icons
│   ├── rtmicons.css       # Custom icon font
│   └── swiper-bundle.min.css  # Slider styles
├── js/
│   ├── script.js          # Main JavaScript
│   ├── property-search.js # Property search functionality
│   ├── enhanced-interactions.js  # Advanced UI interactions
│   ├── submit-form.js     # Form handling
│   ├── swiper-script.js   # Slider configurations
│   ├── share.js           # Social sharing
│   ├── video_embedded.js  # Video embedding
│   └── vendor/            # Third-party libraries
├── image/                 # Image assets
├── font/                  # Font files
└── form_process.php       # Server-side form processing
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (Apache, Nginx, or local development server)
- PHP support (for contact forms)

### Installation

1. **Clone or download** the project files to your web server directory

2. **Configure the web server** to serve the files (ensure PHP is enabled for form processing)

3. **Update configuration**:
   - Modify `form_process.php` with your email settings
   - Update contact information in HTML files
   - Replace placeholder images with actual property photos

4. **Customize branding**:
   - Replace logo files in `/image/` directory
   - Update color scheme in `css/style.css` (CSS variables)
   - Modify company information throughout the site

### Local Development

For local development, you can use:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

## 🎨 Customization

### Color Scheme
The website uses CSS custom properties for easy theming:

```css
:root {
    --accent-color: #2C5F41;        /* Primary brand color */
    --accent-secondary: #D4A574;    /* Secondary accent */
    --accent-color-2: #2C5F41;      /* Alternative accent */
    --gray-light: #f8f9fa;          /* Light background */
    /* ... more variables */
}
```

### Typography
The site uses **Plus Jakarta Sans** font family with multiple weights:
- Light (300)
- Regular (400)
- Medium (500)
- Semi-Bold (600)
- Bold (700)
- Extra Bold (800)

### Icons
Two icon systems are included:
- **Font Awesome**: Standard web icons
- **RTM Icons**: Custom real estate-specific icons

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 1200px
- **Large Desktop**: > 1200px

## 🔧 JavaScript Features

### Property Search (`property-search.js`)
- Advanced filtering and sorting
- Real-time search results
- Local storage for preferences
- Property comparison functionality

### Enhanced Interactions (`enhanced-interactions.js`)
- Smooth scrolling and parallax effects
- Image lazy loading
- Form validation and submission
- Modal management
- Notification system

### Form Handling (`submit-form.js`)
- Client-side validation
- AJAX form submission
- Success/error messaging
- Bootstrap integration

## 📧 Contact Form Setup

### PHP Configuration
Update `form_process.php` with your email settings:

```php
$to = "your-email@domain.com";  // Your email address
$subject = "Website Inquiry";   // Email subject
```

### Email Templates
The system supports different form types:
- General contact forms
- Property inquiries
- Newsletter subscriptions
- Appointment requests

## 🔍 SEO Features

- Semantic HTML5 structure
- Meta descriptions and titles
- Open Graph tags for social sharing
- Structured data markup
- Optimized images with alt tags
- Clean URL structure

## 🛠️ Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📊 Performance Optimization

- **Image Optimization**: Lazy loading and responsive images
- **CSS Optimization**: Minified stylesheets and critical CSS
- **JavaScript Optimization**: Modular code and async loading
- **Caching**: Browser caching headers for static assets

## 🔒 Security Features

- **Form Validation**: Client and server-side validation
- **CSRF Protection**: Form tokens for security
- **Input Sanitization**: Clean user inputs
- **Secure Headers**: Security-focused HTTP headers

## 📈 Analytics Integration

Ready for integration with:
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel
- Custom tracking solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@rofaria.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

## 🔄 Updates

### Version 1.0.0
- Initial release with core functionality
- Responsive design implementation
- Property search and filtering
- Contact form integration
- Blog system
- Team pages

### Planned Features
- User authentication and profiles
- Advanced property management dashboard
- Payment integration
- Multi-language support
- Progressive Web App (PWA) features
- Advanced analytics dashboard

---

**Built with ❤️ for the real estate industry**