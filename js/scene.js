var camera, 	scene, 		renderer, 		loader, 	 model, 	soundInstance,			volumeLight;var platform1, 	platform2,  platform3, 	platform4, 	platform5,  platform6;var water;var stats;var eqMat, 		beatMat, 	bestEqMat, 		bestEqBeatMat;function init() {	stats = new Stats();	stats.setMode(0); // 0: fps, 1: ms	stats.domElement.style.position = 'absolute';	stats.domElement.style.left = '0px';	stats.domElement.style.top = '0px';	document.body.appendChild( stats.domElement );	var assetPath = "assets/";	var modelSrc = "dino.json"	var groundSrc = "ground.jpg";		//Camera	scene  = new THREE.Scene();	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );    camera.lookAt(new THREE.Vector3( -2, 2, -60 ));	camera.position.set( 2, 6, 10 );		scene.fog = new THREE.Fog(0xaaaaaa, 0, 750);	//Renderer	renderer = new THREE.WebGLRenderer( { } );	renderer.setSize( window.innerWidth, window.innerHeight );	//EQ	var spotTarget  = new THREE.BoxGeometry( 0, 0,  0 );	var eqPart 		= new THREE.BoxGeometry( 8, 1, 10 );		eqMat 			= new THREE.MeshPhongMaterial( { color: 0x33FFFF, shininess: 40 } );	beatMat			= new THREE.MeshPhongMaterial( { color: 0x33FF33, shininess: 40 } );	bestEqMat 		= new THREE.MeshPhongMaterial( { color: 0xFFFF00, shininess: 40 } );	bestEqBeatMat 	= new THREE.MeshPhongMaterial( { color: 0xFF3300, shininess: 40 } );			platform1 = new THREE.Mesh( eqPart, eqMat );	platform2 = new THREE.Mesh( eqPart, eqMat );	platform3 = new THREE.Mesh( eqPart, eqMat );	platform4 = new THREE.Mesh( eqPart, eqMat );	platform5 = new THREE.Mesh( eqPart, eqMat );	platform6 = new THREE.Mesh( eqPart, eqMat );		platform1.applyMatrix( new THREE.Matrix4().makeTranslation(-30, 0, -80) );	platform2.applyMatrix( new THREE.Matrix4().makeTranslation(-20, 0, -80) );	platform3.applyMatrix( new THREE.Matrix4().makeTranslation(-10, 0, -80) );	platform4.applyMatrix( new THREE.Matrix4().makeTranslation(  0, 0, -80) );	platform5.applyMatrix( new THREE.Matrix4().makeTranslation( 10,	0, -80) );	platform6.applyMatrix( new THREE.Matrix4().makeTranslation( 20,	0, -80) );	scene.add( platform1 );	scene.add( platform2 );	scene.add( platform3 );	scene.add( platform4 );	scene.add( platform5 );	scene.add( platform6 );		//Skybox	var dirs = [];	dirs[0] = "ThickCloudsWaterLeft2048";	dirs[1] = "ThickCloudsWaterRight2048";	dirs[2] = "ThickCloudsWaterTop2048";	dirs[3] = "ThickCloudsWaterBot2048";	dirs[4] = "ThickCloudsWaterFront2048";	dirs[5] = "ThickCloudsWaterBack2048";	var sGeo = new THREE.CubeGeometry( 768, 768, 768 );			var mats = [];	for (var i = 0; i < 6; i++)		mats.push( new THREE.MeshBasicMaterial({			map: THREE.ImageUtils.loadTexture( assetPath + dirs[i] + ".png" ),			side: THREE.BackSide }));	var sMat = new THREE.MeshFaceMaterial( mats );	var sBox = new THREE.Mesh( sGeo, sMat );	scene.add( sBox );	//Lights	volumeLight  = new THREE.HemisphereLight( 0xffbbbb, 0x082120, 1 );	volumeLight.position.set( - 1, 10, - 80 );	scene.add( volumeLight );		//Water	var waterNormals = new THREE.ImageUtils.loadTexture( 'assets/waternormals.jpg' );	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 	water = new THREE.Water( renderer, camera, scene, {		textureWidth: 1024, 		textureHeight: 1024,		waterNormals: waterNormals,		alpha:  0.7,		sunDirection: volumeLight.position.clone().normalize(),		sunColor: 0xffcccc,		waterColor: 0x001e0f,		distortionScale: 50.0,	} );	mirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 512, 512 ), water.material );	mirrorMesh.add( water );	mirrorMesh.rotation.x = - Math.PI * 0.5;	mirrorMesh.position.y = -1;	scene.add( mirrorMesh );			document.body.appendChild( renderer.domElement );}function updateEqPlatforms(amps, beats, best){	platform1.scale.set(1, amps[0] * 0.15, 1);	platform2.scale.set(1, amps[1] * 0.15, 1);	platform3.scale.set(1, amps[2] * 0.15, 1);	platform4.scale.set(1, amps[3] * 0.15, 1);	platform5.scale.set(1, amps[4] * 0.15, 1);	platform6.scale.set(1, amps[5] * 0.15, 1);		if(beats[0]){ 	platform1.material = beatMat;	} else {		platform1.material = eqMat; }	if(best == 0){   platform1.material = bestEqMat; }	if(beats[0] && best == 0){ platform1.material = bestEqBeatMat; }	if(beats[1]){	platform2.material = beatMat;	} else {		platform2.material = eqMat;	}		if(best == 1){   platform2.material = bestEqMat; }						if(beats[1] && best == 1){ platform2.material = bestEqBeatMat; }	if(beats[2]){	platform3.material = beatMat;	} else {		platform3.material = eqMat;	}			if(best == 2){   platform3.material = bestEqMat; }	if(beats[2] && best == 2){ platform3.material = bestEqBeatMat; }	if(beats[3]){	platform4.material = beatMat;	} else {		platform4.material = eqMat;	}					if(best == 3){   platform4.material = bestEqMat; }	if(beats[3] && best == 3){ platform4.material = bestEqBeatMat; }	if(beats[4]){	platform5.material = beatMat;	} else {		platform5.material = eqMat;	}					if(best == 4){   platform5.material = bestEqMat; }	if(beats[4] && best == 4){ platform5.material = bestEqBeatMat; }	if(beats[5]){	platform6.material = beatMat;	} else {		platform6.material = eqMat;	}					if(best == 5){   platform6.material = bestEqMat; }		if(beats[5] && best == 5){ platform6.material = bestEqBeatMat; }}function changeLight(i){	volumeLight.intensity = i*0.03;}function animate() {  requestAnimationFrame( animate );  render();  stats.update();}function render() {	var time = performance.now() * 0.001;	water.material.uniforms.time.value += 1.0 / 60.0;	water.render();	renderer.render( scene, camera );}function onWindowResize(){	if($(window).width() < 1300) {		$("#bandDetails").hide();	} else {		$("#bandDetails").show();	}	camera.aspect = window.innerWidth / window.innerHeight;	camera.updateProjectionMatrix();	renderer.setSize( window.innerWidth, window.innerHeight );}