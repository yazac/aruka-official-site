import { Pane } from 'tweakpane';

export class UIControls {
  constructor(sceneManager, postProcessingManager) {
    this.sceneManager = sceneManager;
    this.postProcessing = postProcessingManager;
    
    this.setupParameters();
    this.setupPane();
  }

  setupParameters() {
    this.PARAMS = {
      backgroundColor: "#f2f299ff",
      gridHelper: false,
      bloomStrength: 0.30,
      bloomRadius: 0.72,
      bloomThreshold: 0.5,
      objectRotationY: 0,
      camera: { x: 11.1, y: -0.1, z: 0 },
      lightPosition: { x: 10, y: 0, z: 0 },
      lightColor: "#ffffff",
      lightIntensity: 1,
      lightDistance: 100,
      posterizeSteps: 83,
      cameraFov: 10,
      grassMatColor: 0xd9c0e1,
      arukuchanPosition: { x: 0, y: 0, z: 0 },
      arukuchanRotation: { x: 0, y: Math.PI/2, z: 0 }
    };
  }

  setupPane() {
    this.pane = new Pane();
    this.setupSceneControls();
    this.setupPostProcessingControls();
    this.setupArukuchanPositionControls();
    this.setupCameraControls();
    this.setupLightControls();
  }

  setupSceneControls() {
    // Background color
    this.pane.addBinding(this.PARAMS, "backgroundColor")
      .on("change", (ev) => {
        this.sceneManager.setBackgroundColor(ev.value);
      });

    // Grid helper
    this.pane.addBinding(this.PARAMS, "gridHelper")
      .on("change", (ev) => {
        this.sceneManager.toggleGridHelper(ev.value);
      });

    // Object rotation
    // this.pane.addBinding(this.PARAMS, "objectRotationY", {
    //   min: -Math.PI,
    //   max: Math.PI,
    //   step: 0.01,
    // }).on("change", (ev) => {
    //   this.sceneManager.rotateObject("Suzanne", ev.value);
    // });
  }

  setupArukuchanPositionControls() {
    this.pane.addBinding(this.PARAMS, 'arukuchanPosition')
      .on("change", (ev) => {
        this.sceneManager.updateArukuchanPosition(ev.value.x, ev.value.y, ev.value.z);
      });
    
    this.pane.addBinding(this.PARAMS, 'arukuchanRotation')
      .on("change", (ev) => {
        this.sceneManager.updateArukuchanRotaion(ev.value.x, ev.value.y, ev.value.z);
      });
  }

  setupPostProcessingControls() {
    // Bloom controls
    this.pane.addBinding(this.PARAMS, "bloomStrength", {
      min: 0,
      max: 2,
      step: 0.01,
    }).on("change", (ev) => {
      this.postProcessing.updateBloomStrength(ev.value);
    });

    this.pane.addBinding(this.PARAMS, "bloomRadius", {
      min: 0,
      max: 1,
      step: 0.01,
    }).on("change", (ev) => {
      this.postProcessing.updateBloomRadius(ev.value);
    });

    this.pane.addBinding(this.PARAMS, "bloomThreshold", {
      min: 0,
      max: 1,
      step: 0.01,
    }).on("change", (ev) => {
      this.postProcessing.updateBloomThreshold(ev.value);
    });

    // Posterize control
    this.pane.addBinding(this.PARAMS, 'posterizeSteps', {
      min: 1,
      max: 100,
      step: 1,
    }).on("change", (ev) => {
      this.postProcessing.updatePosterizeSteps(ev.value);
    });
  }

  setupCameraControls() {
    // Camera position
    this.pane.addBinding(this.PARAMS, 'camera')
      .on("change", (ev) => {
        this.sceneManager.updateCameraPosition(ev.value.x, ev.value.y, ev.value.z);
      });

    // Camera FOV
    this.pane.addBinding(this.PARAMS, 'cameraFov', {
      min: 0,
      max: 100,
      step: 0.001,
    }).on("change", (ev) => {
      this.sceneManager.updateCameraFov(ev.value);
    });
  }

  setupLightControls() {
    // Light position
    this.pane.addBinding(this.PARAMS, 'lightPosition')
      .on("change", (ev) => {
        this.sceneManager.updateLightPosition(ev.value.x, ev.value.y, ev.value.z);
      });

    // Light color
    this.pane.addBinding(this.PARAMS, 'lightColor')
      .on("change", (ev) => {
        this.sceneManager.updateLightColor(ev.value);
      });

    // Light intensity
    this.pane.addBinding(this.PARAMS, 'lightIntensity', {
      min: 0,
      max: 10,
      step: 0.01,
    }).on("change", (ev) => {
      this.sceneManager.updateLightIntensity(ev.value);
    });

    // Light distance
    this.pane.addBinding(this.PARAMS, 'lightDistance', {
      min: 0,
      max: 200,
      step: 1,
    }).on("change", (ev) => {
      this.sceneManager.updateLightDistance(ev.value);
    });
  }

  getParams() {
    return this.PARAMS;
  }
}
