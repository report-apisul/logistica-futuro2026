(function () {
  'use strict';

  var IMAGES = [
    { src: 'uploads/fotos-evento/palestra-principal.jpg', alt: 'Palestra principal' },
    { src: 'uploads/fotos-evento/drone.jpg', alt: 'Vista aérea do evento' },
    { src: 'uploads/fotos-evento/entrevistando.jpg', alt: 'Bastidores das entrevistas' },
    { src: 'uploads/fotos-evento/caminhao-jomed.jpg', alt: 'Caminhão Jomed' },
    { src: 'uploads/fotos-evento/com-bruno-rainho.jpg', alt: 'Com Bruno Rainho' },
    { src: 'uploads/fotos-evento/omnilink.jpg', alt: 'Estande OmniLink' },
    { src: 'uploads/fotos-evento/com-equipe-mondelez.jpg', alt: 'Com a equipe Mondelez' },
    { src: 'uploads/fotos-evento/t4s-cameras.jpg', alt: 'Câmeras T4S' },
    { src: 'uploads/fotos-evento/trucks-control.jpg', alt: 'Estande Trucks Control' },
    { src: 'uploads/fotos-evento/com-frank.jpg', alt: 'Com Frank' },
    { src: 'uploads/fotos-evento/xglobal.jpg', alt: 'Estande xGlobal' },
    { src: 'uploads/fotos-evento/com-roberto.jpg', alt: 'Com Roberto' },
    { src: 'uploads/fotos-evento/palestra.jpg', alt: 'Palestra Apisul & Atvos' }
  ];

  var VISIBLE_COUNT = 12;
  var DEPTH_RANGE = 50;
  var MAX_H = 8;
  var MAX_V = 8;
  var SPEED = 1.2;

  var VERTEX_SHADER = [
    'uniform float scrollForce;',
    'uniform float time;',
    'uniform float isHovered;',
    'varying vec2 vUv;',
    '',
    'void main() {',
    '  vUv = uv;',
    '  vec3 pos = position;',
    '  float curveIntensity = scrollForce * 0.3;',
    '  float distanceFromCenter = length(pos.xy);',
    '  float curve = distanceFromCenter * distanceFromCenter * curveIntensity;',
    '  float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;',
    '  float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;',
    '  float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;',
    '  float flagWave = 0.0;',
    '  if (isHovered > 0.5) {',
    '    float wavePhase = pos.x * 3.0 + time * 8.0;',
    '    float waveAmplitude = sin(wavePhase) * 0.1;',
    '    float dampening = smoothstep(-0.5, 0.5, pos.x);',
    '    flagWave = waveAmplitude * dampening;',
    '    float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;',
    '    flagWave += secondaryWave;',
    '  }',
    '  pos.z -= (curve + clothEffect + flagWave);',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);',
    '}'
  ].join('\n');

  var FRAGMENT_SHADER = [
    'uniform sampler2D map;',
    'uniform float opacity;',
    'uniform float blurAmount;',
    'uniform float scrollForce;',
    'uniform vec2 texel;',
    'varying vec2 vUv;',
    '',
    'void main() {',
    '  vec4 color = texture2D(map, vUv);',
    '  if (blurAmount > 0.0) {',
    '    vec4 blurred = vec4(0.0);',
    '    float total = 0.0;',
    '    for (float x = -2.0; x <= 2.0; x += 1.0) {',
    '      for (float y = -2.0; y <= 2.0; y += 1.0) {',
    '        vec2 offset = vec2(x, y) * texel * blurAmount;',
    '        float weight = 1.0 / (1.0 + length(vec2(x, y)));',
    '        blurred += texture2D(map, vUv + offset) * weight;',
    '        total += weight;',
    '      }',
    '    }',
    '    color = blurred / total;',
    '  }',
    '  float curveHighlight = abs(scrollForce) * 0.05;',
    '  color.rgb += vec3(curveHighlight * 0.1);',
    '  gl_FragColor = vec4(color.rgb, color.a * opacity);',
    '}'
  ].join('\n');

  function createClothMaterial() {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        map: { value: null },
        opacity: { value: 1.0 },
        blurAmount: { value: 0.0 },
        scrollForce: { value: 0.0 },
        time: { value: 0.0 },
        isHovered: { value: 0.0 },
        texel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) }
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER
    });
  }

  function checkWebGL() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  function showFallback() {
    var g3d = document.getElementById('g3dSection');
    var fallback = document.getElementById('fallbackGallery');
    if (g3d) g3d.style.display = 'none';
    if (fallback) fallback.hidden = false;
  }

  function init() {
    var container = document.getElementById('gallery3d');
    if (!container) return;

    if (!window.THREE || !checkWebGL()) {
      showFallback();
      return;
    }

    var loadingEl = document.getElementById('g3dLoading');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      showFallback();
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    var totalImages = IMAGES.length;
    var visibleCount = Math.min(VISIBLE_COUNT, totalImages > 0 ? Math.max(totalImages, VISIBLE_COUNT) : VISIBLE_COUNT);

    // Spatial positions (golden-angle distribution, same as the source component)
    var spatialPositions = [];
    for (var i = 0; i < visibleCount; i++) {
      var horizontalAngle = (i * 2.618) % (Math.PI * 2);
      var verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      var horizontalRadius = (i % 3) * 1.2;
      var verticalRadius = ((i + 1) % 4) * 0.8;
      var x = (Math.sin(horizontalAngle) * horizontalRadius * MAX_H) / 3;
      var y = (Math.cos(verticalAngle) * verticalRadius * MAX_V) / 4;
      spatialPositions.push({ x: x, y: y });
    }

    var planesData = [];
    for (var p = 0; p < visibleCount; p++) {
      planesData.push({
        z: ((DEPTH_RANGE / visibleCount) * p) % DEPTH_RANGE,
        imageIndex: totalImages > 0 ? p % totalImages : 0,
        x: spatialPositions[p].x,
        y: spatialPositions[p].y
      });
    }

    var textureLoader = new THREE.TextureLoader();
    var meshes = [];
    var loadedCount = 0;

    planesData.forEach(function (plane, idx) {
      var material = createClothMaterial();
      var geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(plane.x, plane.y, plane.z - DEPTH_RANGE / 2);
      mesh.userData.aspect = 1;
      mesh.scale.set(2, 2, 1);
      scene.add(mesh);
      meshes.push(mesh);

      var img = IMAGES[plane.imageIndex];
      if (img) {
        textureLoader.load(img.src, function (texture) {
          texture.colorSpace = THREE.SRGBColorSpace || texture.colorSpace;
          material.uniforms.map.value = texture;
          var iw = texture.image.width, ih = texture.image.height;
          material.uniforms.texel.value.set(1 / iw, 1 / ih);
          var aspect = iw / ih;
          mesh.userData.aspect = aspect;
          if (aspect > 1) mesh.scale.set(2 * aspect, 2, 1);
          else mesh.scale.set(2, 2 / aspect, 1);
          loadedCount++;
          if (loadedCount === 1 && loadingEl) {
            loadingEl.classList.add('is-hidden');
            container.classList.remove('is-loading');
          }
        });
      }
    });

    // Track which image currently occupies each mesh, and its texture cache
    var textureCache = {};
    function getTexture(imageIndex, cb) {
      if (textureCache[imageIndex]) { cb(textureCache[imageIndex]); return; }
      var img = IMAGES[imageIndex];
      if (!img) return;
      textureLoader.load(img.src, function (texture) {
        textureCache[imageIndex] = texture;
        cb(texture);
      });
    }
    // seed cache with already-loading textures lazily as needed during wraps

    var scrollVelocity = 0;
    var autoPlay = true;
    var lastInteraction = Date.now();
    var hoveredMesh = null;
    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2(-10, -10);

    function onWheel(e) {
      e.preventDefault();
      scrollVelocity += e.deltaY * 0.01 * SPEED;
      autoPlay = false;
      lastInteraction = Date.now();
    }
    function onKeyDown(e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        scrollVelocity -= 2 * SPEED;
        autoPlay = false;
        lastInteraction = Date.now();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        scrollVelocity += 2 * SPEED;
        autoPlay = false;
        lastInteraction = Date.now();
      }
    }
    var touchStartY = null;
    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e) {
      if (touchStartY === null) return;
      var dy = touchStartY - e.touches[0].clientY;
      scrollVelocity += dy * 0.03 * SPEED;
      touchStartY = e.touches[0].clientY;
      autoPlay = false;
      lastInteraction = Date.now();
    }
    function onTouchEnd() { touchStartY = null; }

    function onPointerMove(e) {
      var rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('pointermove', onPointerMove);
    document.addEventListener('keydown', onKeyDown);

    setInterval(function () {
      if (Date.now() - lastInteraction > 3000) autoPlay = true;
    }, 1000);

    function onResize() {
      var w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    var clock = new THREE.Clock();
    var imageAdvance = totalImages > 0 ? (visibleCount % totalImages || totalImages) : 0;
    var halfRange = DEPTH_RANGE / 2;

    var fadeIn = { start: 0.05, end: 0.25 };
    var fadeOut = { start: 0.4, end: 0.43 };
    var blurIn = { start: 0.0, end: 0.1 };
    var blurOut = { start: 0.4, end: 0.43 };
    var maxBlur = 8.0;

    function animate() {
      requestAnimationFrame(animate);
      var delta = Math.min(clock.getDelta(), 0.05);
      var time = clock.getElapsedTime();

      if (autoPlay) scrollVelocity += 0.3 * delta;
      scrollVelocity *= 0.95;

      // Hover raycast (skip on touch-only, cheap enough otherwise)
      raycaster.setFromCamera(pointer, camera);
      var intersects = raycaster.intersectObjects(meshes);
      var newHover = intersects.length ? intersects[0].object : null;
      if (newHover !== hoveredMesh) {
        if (hoveredMesh) hoveredMesh.material.uniforms.isHovered.value = 0.0;
        if (newHover) newHover.material.uniforms.isHovered.value = 1.0;
        hoveredMesh = newHover;
      }

      meshes.forEach(function (mesh, i) {
        var plane = planesData[i];
        var newZ = plane.z + scrollVelocity * delta * 10;
        var wrapsForward = 0, wrapsBackward = 0;

        if (newZ >= DEPTH_RANGE) {
          wrapsForward = Math.floor(newZ / DEPTH_RANGE);
          newZ -= DEPTH_RANGE * wrapsForward;
        } else if (newZ < 0) {
          wrapsBackward = Math.ceil(-newZ / DEPTH_RANGE);
          newZ += DEPTH_RANGE * wrapsBackward;
        }

        if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
          plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
          swapTexture(mesh, plane.imageIndex);
        }
        if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
          var step = plane.imageIndex - wrapsBackward * imageAdvance;
          plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
          swapTexture(mesh, plane.imageIndex);
        }

        plane.z = ((newZ % DEPTH_RANGE) + DEPTH_RANGE) % DEPTH_RANGE;
        var worldZ = plane.z - halfRange;
        mesh.position.set(plane.x, plane.y, worldZ);

        var norm = plane.z / DEPTH_RANGE;
        var opacity = 1;
        if (norm >= fadeIn.start && norm <= fadeIn.end) {
          opacity = (norm - fadeIn.start) / (fadeIn.end - fadeIn.start);
        } else if (norm < fadeIn.start) {
          opacity = 0;
        } else if (norm >= fadeOut.start && norm <= fadeOut.end) {
          opacity = 1 - (norm - fadeOut.start) / (fadeOut.end - fadeOut.start);
        } else if (norm > fadeOut.end) {
          opacity = 0;
        }
        opacity = Math.max(0, Math.min(1, opacity));

        var blur = 0;
        if (norm >= blurIn.start && norm <= blurIn.end) {
          blur = maxBlur * (1 - (norm - blurIn.start) / (blurIn.end - blurIn.start));
        } else if (norm < blurIn.start) {
          blur = maxBlur;
        } else if (norm >= blurOut.start && norm <= blurOut.end) {
          blur = maxBlur * (norm - blurOut.start) / (blurOut.end - blurOut.start);
        } else if (norm > blurOut.end) {
          blur = maxBlur;
        }
        blur = Math.max(0, Math.min(maxBlur, blur));

        var u = mesh.material.uniforms;
        u.opacity.value = opacity;
        u.blurAmount.value = blur;
        u.time.value = time;
        u.scrollForce.value = scrollVelocity;
      });

      renderer.render(scene, camera);
    }

    function swapTexture(mesh, imageIndex) {
      getTexture(imageIndex, function (texture) {
        mesh.material.uniforms.map.value = texture;
        var iw = texture.image.width, ih = texture.image.height;
        mesh.material.uniforms.texel.value.set(1 / iw, 1 / ih);
        var aspect = iw / ih;
        if (aspect > 1) mesh.scale.set(2 * aspect, 2, 1);
        else mesh.scale.set(2, 2 / aspect, 1);
      });
    }

    // Seed cache with initial textures once loaded so wraps reuse them
    meshes.forEach(function (mesh, i) {
      var imgIdx = planesData[i].imageIndex;
      var checkLoaded = setInterval(function () {
        if (mesh.material.uniforms.map.value) {
          textureCache[imgIdx] = mesh.material.uniforms.map.value;
          clearInterval(checkLoaded);
        }
      }, 200);
    });

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
