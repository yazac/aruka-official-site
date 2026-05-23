export class EventHandlers {
  constructor(sceneManager, postProcessingManager, uiControls) {
    this.sceneManager = sceneManager;
    this.postProcessing = postProcessingManager;
    this.ui = uiControls;
    this.canvasWrapper = document.getElementById("canvas-wrapper");
    this.canvasRect = null;

    this.mousemoveScale = 0;
    this.handleResize = null;
    this.handleScroll = null;
    this.handleMouseMove = null;
    this.handleClick = null;
    this.canvas = null;

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
    this.handleResize = debounce(200, () => {
      const newWidth = this.canvasWrapper.clientWidth;
      const newHeight = this.canvasWrapper.clientHeight;
      
      this.sceneManager.resize(newWidth, newHeight);
      this.postProcessing.resize(newWidth, newHeight);
      this.updateCanvasRect();

      this.setupMousemoveScale();
    });
    window.addEventListener("resize", this.handleResize);

    this.handleScroll = debounce(100, () => {
      this.updateCanvasRect();
    });
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  setupMouseEventHandler() {
    this.updateCanvasRect();

    this.handleMouseMove = (e) => {
      if (!this.canvasRect || !this.canvasRect.width || !this.canvasRect.height) return;
      const x = (e.clientX - this.canvasRect.left) / this.canvasRect.width * 2 - 1;
      const y = -(e.clientY - this.canvasRect.top) / this.canvasRect.height * 2 + 1;
      this.sceneManager.updateObject(x * this.mousemoveScale, y * 2);
    };

    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
  }

  setupClickEventHandler() {
    this.canvas = document.getElementById("canvas");
    this.handleClick = () => {
      this.sceneManager.startArukuchanRotation();
    };
    this.canvas.addEventListener("click", this.handleClick);
  }

  updateCanvasRect() {
    this.canvasRect = this.canvasWrapper.getBoundingClientRect();
  }

  destroy() {
    if (this.handleResize) {
      window.removeEventListener("resize", this.handleResize);
    }
    if (this.handleScroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    if (this.handleMouseMove) {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }
    if (this.canvas && this.handleClick) {
      this.canvas.removeEventListener("click", this.handleClick);
    }
  }
}
