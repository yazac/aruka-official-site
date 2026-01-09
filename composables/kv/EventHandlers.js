export class EventHandlers {
  constructor(sceneManager, postProcessingManager, uiControls) {
    this.sceneManager = sceneManager;
    this.postProcessing = postProcessingManager;
    this.ui = uiControls;
    this.canvasWrapper = document.getElementById("canvas-wrapper");
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.setupResizeHandler();
    this.setupScrollHandler();
  }

  setupResizeHandler() {
    window.addEventListener("resize", debounce(200, () => {
      const newWidth = this.canvasWrapper.clientWidth;
      const newHeight = this.canvasWrapper.clientHeight;
      
      this.sceneManager.resize(newWidth, newHeight);
      this.postProcessing.resize(newWidth, newHeight);
    }));
  }

  setupScrollHandler() {
    // window.addEventListener("scroll", (ev) => {
    //   const scrollY = window.scrollY || document.documentElement.scrollTop;
    //   const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      
    //   // Rotate object based on scroll
    //   const rotationY = scrollY * 0.01;
    //   this.sceneManager.rotateObject("arukuchan", rotationY);
      
    //   // Update UI parameter to reflect scroll-based rotation
    //   // this.ui.getParams().objectRotationY = rotationY;
    // });
  }
}