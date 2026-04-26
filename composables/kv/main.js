
import { SceneManager } from './SceneManager.js';
import { PostProcessingManager } from './PostProcessingManager.js';
import { UIControls } from './UIControls.js';
import { EventHandlers } from './EventHandlers.js';

export class App {
  constructor() {
    this.isVisible = true;
    this.init();
    this.setupVisibilityHandler();
  }

  setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = document.visibilityState === 'visible';
    });
  }

  async init() {
    // Get canvas and screen dimensions
    this.canvas = document.getElementById("canvas");
    this.canvasWrapper = document.getElementById("canvas-wrapper");
    this.windowWidth = this.canvasWrapper.clientWidth;
    this.windowHeight = this.canvasWrapper.clientHeight;

    // console.log("Canvas size:", this.windowWidth, this.windowHeight);

    // Initialize managers
    this.sceneManager = new SceneManager(this.canvas, this.windowWidth, this.windowHeight);
    this.postProcessing = new PostProcessingManager(
      this.sceneManager.renderer,
      this.sceneManager.scene,
      this.sceneManager.camera,
      this.windowWidth,
      this.windowHeight
    );
    
    // this.ui = new UIControls(this.sceneManager, this.postProcessing);
    this.eventHandlers = new EventHandlers(
      this.sceneManager,
      this.postProcessing,
      this.ui
    );

    // Start the render loop
    this.animate();
  }

  animate() {
    if (this.isVisible) {
      // Update scene state before rendering
      this.sceneManager.update();
      
      // Render with post-processing
      this.postProcessing.render();
      
      setTimeout(() => {
        requestAnimationFrame(() => this.animate());
      }, 1000 / 20); // 18 FPS
    } else {
      // When tab is not visible, check periodically if it becomes visible again
      setTimeout(() => this.animate(), 1000);
    }
  }
}