// Scene Declartion
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// helper function for later on
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


// Here we load the cubemap and skymap, you may change it

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'src/skybox/right.png',
  'src/skybox/left.png',
  'src/skybox/top.png',
  'src/skybox/bottom.png',
  'src/skybox/front.png',
  'src/skybox/back.png',
]);
scene.background = texture;

const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0, 100, 200);
camera.applyMatrix4(cameraTranslate)

renderer.render( scene, camera );

// TODO: Texture Loading
// We usually do the texture loading before we start everything else, as it might take processing time
const spaceLoader = new THREE.TextureLoader();
const earthTexture = spaceLoader.load("src/textures/earth.jpg");
const moonTexture = spaceLoader.load("src/textures/moon.jpg");
const startTexture = spaceLoader.load("src/textures/star.jpg");


// TODO: Add Lighting
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

//Spaceship
const geometry_head = new THREE.ConeGeometry(1,3,10);
const material_head = new THREE.MeshPhongMaterial( {color: 0x0ca00a} );
const Head = new THREE.Mesh(geometry_head,material_head);

const geometryHull = new THREE.CylinderGeometry( 1, 1, 3,10);
const materialHull = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const Hull = new THREE.Mesh(geometryHull,materialHull);

const geometryWindow = new THREE.RingGeometry( 2, 3, 32 );
const materialWindow = new THREE.MeshPhongMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
const Window = new THREE.Mesh( geometryWindow, materialWindow );

const materialWing = new THREE.MeshPhongMaterial( {color: 0xff0000} );
materialWing.side= THREE.DoubleSide;
const geometryWing = new THREE.BufferGeometry();
const verticesWing = new Float32Array([
    1, 1, 0,
    0, -1, 0, // far point of the triangle
    1, -1, 0
    ]);
                                
geometryWing.setAttribute( 'position', new THREE.BufferAttribute( verticesWing, 3 ) );
const Wing = new THREE.Mesh(geometryWing, materialWing);

const Spaceship = new THREE.Group();
Spaceship.name="Spaceship";

const headTranslationY = new THREE.Matrix4().makeTranslation(0,Hull.geometry.parameters.height,0);

const windowZTranslateAmount = Hull.geometry.parameters.height / 5;
const windowTranslationZ = new THREE.Matrix4().makeTranslation(0,0,Hull.geometry.parameters.radiusBottom+0.001);

const windowScaleUniform = new THREE.Matrix4().makeScale(0.1,0.1,0.1);

const windowTransfromStandard = windowTranslationZ.multiply(windowScaleUniform);

const windowTranslationY = new THREE.Matrix4().makeTranslation(0,windowZTranslateAmount,0);
const secondWindowTranlationY = new THREE.Matrix4().makeTranslation(0,-windowZTranslateAmount,0);

//Add Wing transformations
Wing.applyMatrix4(new THREE.Matrix4().makeTranslation(-Hull.geometry.parameters.radiusBottom -0.95  ,0,0))
Wing.applyMatrix4(new THREE.Matrix4().makeRotationY(degrees_to_radians(30)))

const Wing2 = Wing.clone();
const Wing3 = Wing.clone();
Wing2.applyMatrix4(new THREE.Matrix4().makeRotationY(degrees_to_radians(120)));
Wing3.applyMatrix4(new THREE.Matrix4().makeRotationY(degrees_to_radians(240)))
Head.applyMatrix4(headTranslationY);

Window.applyMatrix4(windowTransfromStandard);
const SecondWindow = Window.clone();

Window.applyMatrix4(windowTranslationY);
SecondWindow.applyMatrix4(secondWindowTranlationY);

Spaceship.add(Head,Hull,Window,SecondWindow,Wing,Wing2,Wing3);

// TODO: Planets
// You should add both earth and the moon here
//Earth is at 100,5,100.
//Moon is at 0,0,0

const moonGeometry = new THREE.SphereGeometry(10);
const moonMaterial = new THREE.MeshPhongMaterial({map:moonTexture});
const moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);

const earthGeometry = new THREE.SphereGeometry(10);
const earthMaterial = new THREE.MeshPhongMaterial({map:earthTexture});
const earthSphere = new THREE.Mesh(earthGeometry, earthMaterial);
earthSphere.applyMatrix4(new THREE.Matrix4().makeTranslation(100, 5, 100));

// TODO: Bezier Curves


// TODO: Camera Settings
// Set the camera following the spaceship here


// TODO: Add collectible stars


scene.add(Spaceship);
scene.add(moonSphere);
scene.add(earthSphere);
camera.lookAt( earthSphere.position );

// TODO: Add keyboard event
// We wrote some of the function for you
const handle_keydown = (e) => {
	if(e.code == 'ArrowLeft'){
		// TODO
	} else if (e.code == 'ArrowRight'){
		// TODO
	}
}
document.addEventListener('keydown', handle_keydown);



function animate() {

	requestAnimationFrame( animate );

	// TODO: Animation for the spaceship position


	// TODO: Test for star-spaceship collision

	
	renderer.render( scene, camera );

}
animate()