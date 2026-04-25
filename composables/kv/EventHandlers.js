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
    this.setupMouseEventHandler();
  }

  setupResizeHandler() {
    window.addEventListener("resize", debounce(200, () => {
      const newWidth = this.canvasWrapper.clientWidth;
      const newHeight = this.canvasWrapper.clientHeight;
      
      this.sceneManager.resize(newWidth, newHeight);
      this.postProcessing.resize(newWidth, newHeight);
    }));
  }

  setupMouseEventHandler() {
    let updateTimeout;

    window.addEventListener("mousemove", (e) => {
      // Clear the previous timeout (stops the previous scheduled call)
      clearTimeout(updateTimeout);

      // Get normalized mouse coordinates
      const rect = this.canvasWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
      // Set a new timeout - only runs if mouse stays still for 200ms
      this.sceneManager.updateObject(x, y);
    });
  }
}