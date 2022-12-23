import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();
// 相机-透视摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();// 渲染器
renderer.setSize(window.innerWidth, window.innerHeight);// 设置尺寸
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体大小
const material = new THREE.MeshBasicMaterial({color: '#409eff'}); // 颜色
const cube = new THREE.Mesh(geometry, material); // 实例化立方体
scene.add(cube); // 立方体添加到场景

camera.position.z = 5

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01
    // cube.rotation.z += 0.01

    renderer.render(scene, camera)
}

animate()
