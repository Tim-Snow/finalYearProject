var camera, scene, renderer, loader, model, controls, rotlight, soundInstance;var clock = new THREE.Clock();function init() {  var assetPath = "assets/";  var modelSrc = "dino.json"  //Camera  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );  camera.position.set( 4, 4, 6 );  scene  = new THREE.Scene();  scene.fog = new THREE.Fog( 0x040306, 1, 1000 );  controls = new THREE.OrbitControls( camera );  controls.addEventListener( 'change', render );	var size = 14, step = 1;	var geometry = new THREE.Geometry();	var material = new THREE.LineBasicMaterial( { color: 0x303030 } );	for ( var i = - size; i <= size; i += step ) {		geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );		geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );		geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );		geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );	}	var line = new THREE.Line( geometry, material, THREE.LinePieces );	scene.add( line );	//Lights	scene.add( new THREE.AmbientLight( 0x111111 ) );	var intensity = 2.5;	var distance = 20;	var c1 = 0x00ff00, c2 = 0x0000ff;	var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );	var light1 = new THREE.PointLight( c1, intensity, distance );	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );	light1.position.y = 8;	scene.add( light1 );		rotlight = new THREE.PointLight( c2, intensity, distance );	rotlight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );	rotlight.position.y = 2;	rotlight.position.z = 2;	scene.add( rotlight );	//Model	loader = new THREE.JSONLoader();    loader.load( assetPath + modelSrc, function( geometry ) {		model = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0x555555, specular: 0xffffff, shininess: 10, shading: THREE.SmoothShading }  )  );		model.scale.set( 1, 1, 1 );		scene.add( model );	} );	//Renderer	renderer = new THREE.WebGLRenderer( { } );	renderer.setClearColor( scene.fog.color, 1 );	renderer.setSize( window.innerWidth, window.innerHeight );	document.body.appendChild( renderer.domElement );}function animate() {  requestAnimationFrame( animate );  render();}function render() {	var time = Date.now() * 0.0005;	var delta = clock.getDelta();		rotlight.position.x = Math.sin( time * 0.7 ) * 10;	rotlight.position.z = Math.cos( time * 0.7 ) * 10;	renderer.render( scene, camera );}function onWindowResize(){  camera.aspect = window.innerWidth / window.innerHeight;  camera.updateProjectionMatrix();  renderer.setSize( window.innerWidth, window.innerHeight );}