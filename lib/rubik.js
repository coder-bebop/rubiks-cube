var THREEx = THREEx || {};

THREEx.DomEvent	= function(camera, domElement)
{
	this._camera = camera || null;
	this._domElement= domElement || document;
}

THREEx.DomEvent.prototype.camera = function(value)
{
	if(value) this._camera = value;

	return this._camera;
}

THREEx.DomEvent.noConflict	= function(){
	THREEx.DomEvent.noConflict.symbols.forEach(function(symbol){
		THREE.Object3D.prototype[symbol]	= THREEx.DomEvent.noConflict.previous[symbol]
	})
}

THREE.Object3D._threexDomEvent = new THREEx.DomEvent();

let cubes_array = [];

function Rubik(element, dimensions, background) {

  dimensions = dimensions || 3;
  background = background || 0x303030;

  let width = element.innerWidth(),
      height = element.innerHeight();

  let scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000),
      renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setClearColor(background, 1.0);
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;
  element.append(renderer.domElement);

  camera.position = new THREE.Vector3(-20, 20, 30);
  camera.lookAt(scene.position);
  THREE.Object3D._threexDomEvent.camera(camera);

  scene.add(new THREE.AmbientLight(0xffffff));

  let orbitControl = new THREE.OrbitControls(camera, renderer.domElement);

  let colours = [0xC41E3A, 0x009E60, 0x0051BA, 0xFF5800, 0xFFD500, 0xFFFFFF],
      faceMaterials = colours.map(function(c) {
        return new THREE.MeshLambertMaterial({ color: c , ambient: c });
      }),
    
  cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);

  let cubeSize = 3,
      spacing = 0.25;

  let increment = cubeSize + spacing;

  function newCube(x, y, z) {
    let cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.castShadow = true;

    cube.position = new THREE.Vector3(x, y, z);
    cube.rubikPosition = cube.position.clone();

    scene.add(cube);
    cubes_array.push(cube);
  }

  let offset = (dimensions - 1) / 2;
  for(let i = 0; i < dimensions; i ++) {
    for(let j = 0; j < dimensions; j ++) {
      for(let k = 0; k < dimensions; k ++) {

        let x = (i - offset) * increment,
            y = (j - offset) * increment,
            z = (k - offset) * increment;

        newCube(x, y, z);
      }
    }
  }

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
  
}