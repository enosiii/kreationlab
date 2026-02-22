// Social Media Footer Component
class SocialFooter {
  constructor() {
    this.socialLinks = [
      {
        platform: 'Facebook',
        icon: 'fab fa-facebook-f',
        url: 'https://www.facebook.com/kreationlab26',
        tooltip: 'Follow on Facebook'
      },
      {
        platform: 'Instagram',
        icon: 'fab fa-instagram',
        url: 'https://www.instagram.com/kreationlab26',
        tooltip: 'Follow on Instagram'
      },
      {
        platform: 'Messenger',
        icon: 'fab fa-facebook-messenger',
        url: 'https://m.me/kreationlab26',
        tooltip: 'Message on Messenger'
      },
      {
        platform: 'TikTok',
        icon: 'fab fa-tiktok',
        url: 'https://www.tiktok.com/@kreationlab26',
        tooltip: 'Follow on TikTok'
      }
    ];
    
    this.init();
  }
  
  init() {
    // Create footer element
    const footer = document.createElement('footer');
    footer.className = 'social-footer';
    footer.setAttribute('aria-label', 'Social media links');
    
    // Add title
    const title = document.createElement('div');
    title.className = 'social-title';
    title.innerHTML = '<i class="fas fa-heart"></i> Connect With Us';
    footer.appendChild(title);
    
    // Create social links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'social-links';
    
    // Add social links
    this.socialLinks.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.className = `social-link ${link.platform.toLowerCase()}`;
      anchor.setAttribute('data-tooltip', link.tooltip);
      anchor.setAttribute('aria-label', link.tooltip);
      anchor.innerHTML = `<i class="${link.icon}"></i>`;
      
      // Add click tracking (optional)
      anchor.addEventListener('click', () => {
        console.log(`Clicked ${link.platform} link`);
      });
      
      linksContainer.appendChild(anchor);
    });
    
    footer.appendChild(linksContainer);
    
    // Add copyright
    const copyright = document.createElement('div');
    copyright.className = 'social-copyright';
    const year = new Date().getFullYear();
    copyright.innerHTML = `© ${year} Kreation Lab <i class="fas fa-heart"></i> All rights reserved`;
    footer.appendChild(copyright);
    
    // Insert footer after the existing footer
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.parentNode.insertBefore(footer, existingFooter.nextSibling);
    } else {
      // If no existing footer, append to container
      const container = document.querySelector('.container');
      if (container) {
        container.appendChild(footer);
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SocialFooter();
  });
} else {
  new SocialFooter();
}