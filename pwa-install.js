// pwa-install.js
class PWAInstallHandler {
  constructor(buttonId = 'pwaInstallBtn') {
    this.deferredPrompt = null;
    this.installButton = document.getElementById(buttonId);
    
    if (!this.installButton) {
      console.warn('Install button not found');
      return;
    }
    
    this.init();
  }
  
  init() {
    console.log('PWA Install Handler initialized');
    
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is already installed (standalone mode)');
      this.hideInstallButton();
      return;
    }
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event fired!');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      // Show the install button
      this.showInstallButton();
    });
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      // Clear the deferred prompt
      this.deferredPrompt = null;
      // Hide the install button
      this.hideInstallButton();
    });
    
    // Add click handler to the install button
    this.installButton.addEventListener('click', () => this.installPWA());
    
    // Add close button handler
    const closeBtn = this.installButton.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideInstallButton();
      });
    }
    
    // If after 5 seconds no beforeinstallprompt event, log it
    setTimeout(() => {
      if (!this.deferredPrompt) {
        console.log('No beforeinstallprompt event received. Check PWA criteria:');
        console.log('- HTTPS required (localhost works)');
        console.log('- Valid manifest.json with icons');
        console.log('- Service worker registered');
        console.log('- User has visited site at least twice with 5 minutes between visits');
      }
    }, 5000);
  }
  
  showInstallButton() {
    console.log('Showing install button');
    this.installButton.style.display = 'flex';
    
    // Also show the container if it's hidden
    const container = document.querySelector('.pwa-install-container');
    if (container) {
      container.style.display = 'block';
    }
  }
  
  hideInstallButton() {
    console.log('Hiding install button');
    this.installButton.style.display = 'none';
  }
  
  async installPWA() {
    if (!this.deferredPrompt) {
      console.log('No installation prompt available');
      return;
    }
    
    console.log('Showing install prompt');
    // Show the install prompt
    this.deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await this.deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the saved prompt since it can't be used again
    this.deferredPrompt = null;
    
    // Hide the button
    this.hideInstallButton();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PWAInstallHandler('pwaInstallBtn');
});