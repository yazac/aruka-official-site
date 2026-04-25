import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export class SceneManager {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.loader = new GLTFLoader();
    this.arukuchanRotationY = 0;
    this.arukuchanRotationX = 0;
    
    // Mouse tracking state with continuous interpolation
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.damping = 0.3; // Interpolation factor (lower = smoother, 0.08-0.15 recommended)
    
    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    this.setupArukuchan();
    this.setupGrass();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.setBackgroundColor("#d5d5baff");
    
    // Grid helper (initially hidden)
    this.gridHelper = null;
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      30, // FOV
      this.width / this.height, // Aspect ratio
      0.1, // Near plane
      1000 // Far plane
    );
    this.camera.position.set(19, -0.1, 0);
    this.camera.lookAt(0, 0, 0);
  }

  setupLights() {
    this.directionalLight = new THREE.HemisphereLight(0xFFFFFF, 0.87);
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.87);
    
    this.directionalLight.name = "DirectionalLight";
    this.directionalLight.position.set(10, 10, 10);
    
    this.scene.add(this.directionalLight);
    this.scene.add(this.ambientLight);
  }

  setupArukuchan() {
    this.loader.load("/assets/object/aruku_chan_white2.glb", (gltf) => {
      const arukuchan = gltf.scene;
      arukuchan.name = "arukuchan";
      arukuchan.scale.set(0.6, 0.6, 0.6);
      arukuchan.position.set(4.1, -0.60, 0);
      arukuchan.rotation.set(0, Math.PI/2, 0);
      this.arukuchanRotationY = arukuchan.rotation.y;
      this.arukuchanRotationX = arukuchan.rotation.x;
      this.scene.add(arukuchan);
    }, undefined, (error) => {
      console.error("Error loading model:", error);
    });
  }

  updateArukuchan() {
    const arukuchan = this.scene.getObjectByName("arukuchan");
    if (arukuchan) {
      // 目標値に向かってスムーズに補間
      this.currentX += (this.targetX - this.currentX) * this.damping * this.damping;
      this.currentY += (this.targetY - this.currentY) * this.damping * this.damping / 2;
      
      arukuchan.rotation.y = this.arukuchanRotationY + this.currentX / 3;
      arukuchan.rotation.x = (this.arukuchanRotationX + this.currentX) / 10;
      arukuchan.position.y = -0.6 + this.currentY + Math.sin(Date.now() * 0.002) * 0.1;
      arukuchan.position.z = -this.currentX * 2;
    }
  }

  setupGrass() {
    const grassTexture = new THREE.TextureLoader().load("/assets/images/kv/gold_grass.png");
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;

    // grassTexture.anisotropy = 0;
    grassTexture.magFilter = THREE.NearestFilter;

    const planeWidth = 8 * 2;
    const planeHeight = 0.78 * 2;
    const grassGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

    // Create shared material to reduce GPU memory
    const grassMaterial = new THREE.MeshBasicMaterial({
      map: grassTexture,
      side: THREE.DoubleSide,
      transparent: true,
      color: 0xd9c0e1
    });

    // Create 10 grass planes with shared texture and material
    for (let i = 0; i < 10; i++) {
      const xOffset = i * planeWidth / 8 - 1;
      const grassPlane = this.createGrassPlane(grassGeometry, grassMaterial, xOffset);
      this.scene.add(grassPlane);
    }
  }

  createGrassPlane(geometry, material, xOffset) {
    // Set random offset for visual variation
    material.map.offset.x = Math.random();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "GrassPlane";
    mesh.position.set(xOffset, -1, 0);
    mesh.rotation.y = Math.PI / 2;
    return mesh;
  }

  updateGrass() {
    const grassPlanes = this.scene.children.filter(obj => obj.name === "GrassPlane");
    grassPlanes.forEach(plane => {
      plane.position.z = Math.sin(Date.now() * 0.002) * 0.02;
    });
  }

  update() {
    this.updateArukuchan();
    this.updateGrass();
  }

  setBackgroundColor(hex) {
    // Remove alpha if present (8-digit hex to 6-digit hex)
    if (hex.length === 9 && hex.startsWith("#")) {
      hex = hex.slice(0, 7);
    }
    this.scene.background = new THREE.Color(hex);
  }

  toggleGridHelper(show) {
    if (show) {
      if (!this.gridHelper) {
        this.gridHelper = new THREE.GridHelper();
        this.scene.add(this.gridHelper);
      }
    } else {
      if (this.gridHelper) {
        this.scene.remove(this.gridHelper);
        this.gridHelper = null;
      }
    }
  }

  updateCameraPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  updateCameraFov(fov) {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
  }

  updateLightPosition(x, y, z) {
    const light = this.scene.getObjectByName("DirectionalLight");
    if (light) {
      light.position.set(x, y, z);
    }
  }

  updateLightColor(color) {
    const light = this.scene.getObjectByName("DirectionalLight");
    if (light) {
      light.color.set(color);
    }
  }

  updateLightIntensity(intensity) {
    const light = this.scene.getObjectByName("DirectionalLight");
    if (light) {
      light.intensity = intensity;
    }
  }

  updateLightDistance(distance) {
    const light = this.scene.getObjectByName("DirectionalLight");
    if (light) {
      light.distance = distance;
    }
  }

  updateObject(normalizedX, normalizedY) {
    this.targetX = normalizedX;
    this.targetY = normalizedY;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}