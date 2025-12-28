import * as THREE from "three";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  FilmPass,
} from "three/examples/jsm/Addons.js";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

export class PostProcessingManager {
  constructor(renderer, scene, camera, width, height) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    
    this.init(width, height);
  }

  init(width, height) {
    this.setupComposer(width, height);
    this.setupPasses();
    this.setupInitialAnimation();
  }

  setupComposer(width, height) {
    this.effectComposer = new EffectComposer(this.renderer);
    this.effectComposer.setSize(width, height);
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupPasses() {
    // Render pass (essential!)
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer.addPass(this.renderPass);

    // Posterize shader
    this.posterizeShader = {
      uniforms: {
        tDiffuse: { value: null },
        steps: { value: 51 }
      },
      vertexShader: /* glsl */`
        precision mediump float;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        precision mediump float;

        uniform sampler2D tDiffuse;
        uniform float steps;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(tDiffuse, vUv);
          color.rgb = floor(color.rgb * steps) / steps;
          gl_FragColor = color;
        }
      `,
    };

    this.posterizePass = new ShaderPass(this.posterizeShader);
    
    // Bloom pass
    this.unrealBloomPass = new UnrealBloomPass();
    this.unrealBloomPass.strength = 0.13;
    this.unrealBloomPass.radius = 1.0;
    this.unrealBloomPass.threshold = 0.47;

    // Film pass
    this.filmPass = new FilmPass(0.2);

    // Add passes to composer
    this.effectComposer.addPass(this.posterizePass);
    this.effectComposer.addPass(this.unrealBloomPass);
    this.effectComposer.addPass(this.filmPass);
  }

  setupInitialAnimation() {
    window.addEventListener("load", () => {
      this.animateBloomStrength();
    });
  }

  animateBloomStrength() {
    const animate = () => {
      this.unrealBloomPass.strength -= 0.004;
      if (this.unrealBloomPass.strength > 0.33) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }

  // Update methods for UI controls
  updateBloomStrength(value) {
    this.unrealBloomPass.strength = value;
  }

  updateBloomRadius(value) {
    this.unrealBloomPass.radius = value;
  }

  updateBloomThreshold(value) {
    this.unrealBloomPass.threshold = value;
  }

  updatePosterizeSteps(value) {
    this.posterizeShader.uniforms.steps.value = value;
    this.posterizePass.uniforms.steps.value = value;
  }

  resize(width, height) {
    this.effectComposer.setSize(width, height);
  }

  render() {
    this.effectComposer.render();
  }
}