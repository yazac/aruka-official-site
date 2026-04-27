
import { SceneManager } from './SceneManager.js';
import { PostProcessingManager } from './PostProcessingManager.js';
import { UIControls } from './UIControls.js';
import { EventHandlers } from './EventHandlers.js';

export class App {
  constructor() {
    this.isPaused = false;
    this.animationFrameId = null;

    this.frameCount = 0;
    this.init();
  }

  async init() {
    // Get canvas and screen dimensions
    this.canvas = document.getElementById("canvas");
    this.canvasWrapper = document.getElementById("canvas-wrapper");
    this.windowWidth = this.canvasWrapper.clientWidth;
    this.windowHeight = this.canvasWrapper.clientHeight;

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
    if (this.isPaused) return;
    
    this.sceneManager.update();
    this.postProcessing.render();
    
    this.animationFrameId = setTimeout(() => {
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }, 1000 / 20);

    // this.frameCount++;
    
    // // reducing frame. 1/7 of RAF
    // if (this.frameCount % 7 === 0) {
    //   this.sceneManager.update();
    //   this.postProcessing.render();
    // }
    
    // this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
  }

  pause() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.animate();
  }

  destroy() {
    // Clean up resources and event listeners
    this.sceneManager.destroy();
    this.postProcessing.destroy();
    // this.ui.destroy();
    this.eventHandlers.destroy();
  }
}