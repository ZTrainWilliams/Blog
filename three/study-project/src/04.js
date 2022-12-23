/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-12-21 16:01:26
 * @Description:
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();

// Create and position a camera
var camera = new THREE.PerspectiveCamera(
	60, // Field of view
	window.innerWidth / window.innerHeight, // Aspect ratio
	0.1, // Near clipping pane
	1000 // Far clipping pane
);

// Reposition the camera
camera.position.set(0, 30, 50);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0, 15, 0));

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white clear color (default is black) 背景色
renderer.setClearColor(0xfff6e6);

// Enable shadow mapping 启用阴影映射
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append to the document
document.body.appendChild(renderer.domElement);

// Add an ambient lights 灯光
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Add a point light that will cast shadows  点光源
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

// A basic material that shows the geometry wireframe. 阴影材质-影子
var shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee });
shadowMaterial.opacity = 0.5;
var groundMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 0.1, 100), shadowMaterial);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

// A simple geometric shape with a flat material. 平面材料的简单几何形状
var shapeOne = new THREE.Mesh(
	new THREE.OctahedronGeometry(10, 1), // 八面缓冲几何体
	new THREE.MeshStandardMaterial({
		// 标准网格材质
		color: 0xff0051,
		shading: THREE.FlatShading, // 定义材质是否使用平面着色进行渲染
		metalness: 0, // 材质与金属的相似度 如木材或石材，使用0.0
		roughness: 0.8, // 材质的粗糙程度
	})
);
shapeOne.position.y += 10;
shapeOne.rotateZ(Math.PI / 3);
shapeOne.castShadow = true; // 投射阴影
scene.add(shapeOne);

// Add a second shape
var shapeTwo = new THREE.Mesh(
	new THREE.OctahedronGeometry(5, 1),
	new THREE.MeshStandardMaterial({
		color: 0x47689b,
		shading: THREE.FlatShading,
		metalness: 0,
		roughness: 0.8,
	})
);
shapeTwo.position.y += 5;
shapeTwo.position.x += 15;
shapeTwo.rotateZ(Math.PI / 14);
shapeTwo.castShadow = true;
scene.add(shapeTwo);

// Render the scene/camera combnation
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new OrbitControls(camera, renderer.domElement); // 轨道控制器
controls.target = new THREE.Vector3(0, 15, 0); // 控制器的焦点 ;三维向量（Vector3）
controls.maxPolarAngle = Math.PI / 2; // 你能够垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI
controls.addEventListener('change', function () {
	renderer.render(scene, camera);
}); // add this only if there is no animation loop (requestAnimationFrame)
