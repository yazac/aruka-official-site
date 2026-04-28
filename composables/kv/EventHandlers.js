export class EventHandlers {
  constructor(sceneManager, postProcessingManager, uiControls) {
    this.sceneManager = sceneManager;
    this.postProcessing = postProcessingManager;
    this.ui = uiControls;
    this.canvasWrapper = document.getElementById("canvas-wrapper");

    this.mousemoveScale = 0;

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.setupMousemoveScale();
    this.setupResizeHandler();
    this.setupMouseEventHandler();
    this.setupClickEventHandler();
  }

  setupMousemoveScale() {
    if (window.innerWidth < 768) {
      this.mousemoveScale = 0.5;
    } else {
      this.mousemoveScale = 2;
    }
  }

  setupResizeHandler() {
    window.addEventListener("resize", debounce(200, () => {
      const newWidth = this.canvasWrapper.clientWidth;
      const newHeight = this.canvasWrapper.clientHeight;
      
      this.sceneManager.resize(newWidth, newHeight);
      this.postProcessing.resize(newWidth, newHeight);

      this.setupMousemoveScale();
    }));
  }

  setupMouseEventHandler() {
    window.addEventListener("mousemove", (e) => {
      const rect = this.canvasWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
      this.sceneManager.updateObject(x*this.mousemoveScale, y*2);
    });
  }

  setupClickEventHandler() {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("click", () => {
      this.sceneManager.startArukuchanRotation();
    });
  }
}