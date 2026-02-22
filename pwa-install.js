// pwa-install.js
// Custom PWA install prompt handler

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
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      // Show the install button
      this.showInstallButton();
    });
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      // Clear the deferred prompt
      this.deferredPrompt = null;
      // Hide the install button
      this.hideInstallButton();
      // Log installation
      console.log('PWA was installed');
    });
    
    // Add click handler to the install button
    this.installButton.addEventListener('click', () => this.installPWA());
    
    // Check if already in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.hideInstallButton();
    }
  }
  
  showInstallButton() {
    this.installButton.style.display = 'flex'; // or 'block' depending on your CSS
  }
  
  hideInstallButton() {
    this.installButton.style.display = 'none';
  }
  
  async installPWA() {
    if (!this.deferredPrompt) {
      console.log('No installation prompt available');
      return;
    }
    
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