export class EventHandlers {
  constructor(sceneManager, postProcessingManager, uiControls) {
    this.sceneManager = sceneManager;
    this.postProcessing = postProcessingManager;
    this.ui = uiControls;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.setupResizeHandler();
    this.setupScrollHandler();
  }

  setupResizeHandler() {
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      this.sceneManager.resize(newWidth, newHeight);
      this.postProcessing.resize(newWidth, newHeight);
    });
  }

  setupScrollHandler() {
    window.addEventListener("scroll", (ev) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      
      // Rotate object based on scroll
      const rotationY = scrollY * 0.01;
      this.sceneManager.rotateObject("arukuchan", rotationY);
      
      // Update UI parameter to reflect scroll-based rotation
      // this.ui.getParams().objectRotationY = rotationY;
    });
  }
}