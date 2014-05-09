var engine, scene, camera, camera2, canvas;
var nextObjtoDrop, obj, dock, otherground, playerObj;
var waterMaterial, water;
var beginsong, ingamesong;

function ContentLoad(startDisplay)
{
   if (!BABYLON.Engine.isSupported()) {
		titleScreen.innerHTML = "<img src='images/title.png' width='550' height='100'><div class='alert'>Sorry, your browser exudes awesomeness.<br> Just not awesome enough to play this game.<br> Try IE 11, Firefox or Google Chrome instead.</div>";
		//startDisplay.style.display = "block";
		//loadingMessage.style.display = "none";
	}
		
    canvas = document.getElementById("viewport");
    engine = new BABYLON.Engine(canvas,false)
	scene = new BABYLON.Scene(engine);

	scene.gravity = new BABYLON.Vector3(0, -.81, 0);
	scene.enablePhysics();
	scene.clearColor = new BABYLON.Color3(92/255,148/255,252/255);

   //	1, 1, 240
  //  1.62, 1.56, 1882
    camera = new BABYLON.ArcRotateCamera("Camera", -.1, 1.56, 1782, new BABYLON.Vector3(0, 0, 0), scene);
    camera.maxZ = 20000;
	
	//////needed for endless game type///////////
    camera2 = new BABYLON.ArcRotateCamera("Camera", 1, 1, 60, new BABYLON.Vector3(0, 0, 0), scene);
	camera2.viewport = new BABYLON.Viewport(.85,.78,.15,.20);
	scene.activeCameras.push(camera);

	/////////////////////////////////////////////
	
	var light0 = new BABYLON.HemisphericLight("Omni", new BABYLON.Vector3(0, 0, 30), scene);
    var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 30), scene);
	
 	scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
	scene.fogColor = new BABYLON.Color3(92/255,148/255,252/255);
	scene.fogDensity = 0.005;
 	scene.fogStart = 1000;
 	scene.fogEnd = 2500;
 
	///////dock playing area///////
	var dockmaterial = new BABYLON.StandardMaterial("groundmaterial", scene);
	dockmaterial.diffuseTexture = new BABYLON.Texture("images/barrieres_bois.jpg", scene);
	dockmaterial.bumpTexture = new BABYLON.Texture("images/barrieres_bois_n.jpg", scene);
	dockmaterial.diffuseTexture.uScale = 2;
	dockmaterial.diffuseTexture.vScale = 2;
 
    dock = BABYLON.Mesh.CreateBox("ground", 100, scene);
	dock.position.y = -45;
	dock.material = dockmaterial;
	dock.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: .1, restitution: .2 });
	////////////////////////////////

    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("images/Ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = 20;
	groundMaterial.diffuseTexture.vScale = 20;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);	
	
    var ground2 = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/heightMap3.png", 3000, 3000, 150, 0, 300, scene, false);
	ground2.rotation.y = Math.PI*.2;
    ground2.material = groundMaterial;
	ground2.position.y = -20;

    // Water
  	BABYLON.Engine.ShadersRepository = "";
    water = BABYLON.Mesh.CreateGround("water", 3000, 3000, 1, scene, false);
    waterMaterial = new WaterMaterial("water", scene, sun);
 	waterMaterial.refractionTexture.renderList.push(dock);
  	waterMaterial.refractionTexture.renderList.push(ground2);
  	waterMaterial.reflectionTexture.renderList.push(ground2);
  	waterMaterial.reflectionTexture.renderList.push(dock);
	water.material = waterMaterial;
	water.rotation.y = Math.PI*.2;
	////////for an underwater effect//////////////
    otherground = BABYLON.Mesh.CreateGround("otherground", 3000, 3000, 1, scene, false);
  	otherground.position.y = -11;
	otherground.rotation.y = Math.PI*.2;
  	otherground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: .1, restitution: .2 });
	///////////////////////////////////////////////////////////////////////
	
	///////main player object to clone////////////////////////////////////
    obj = BABYLON.Mesh.CreateBox("main", 1, scene);
	var material = new BABYLON.StandardMaterial("material", scene);
	material.diffuseTexture = new BABYLON.Texture("images/stairv3.png", scene);
	obj.material = material;
	obj.position.y = -200;
	////////////////////////////////////////////////
	
    nextObjtoDrop = obj.clone("objectViewer");
	nextObjtoDrop.position = new BABYLON.Vector3(20, -500, 0);
	nextObjtoDrop.material = material;
	size = objects[itemNumber];
	nextObjtoDrop.scaling = new BABYLON.Vector3(size.scaleX, size.scaleY, size.scaleZ);	
	camera2.target = nextObjtoDrop;
	
	 beginsong = new Audio("assets/game.mp3");
	 beginsong.loop = true;
     beginsong.volume = 1;
	 
	 ingamesong = new Audio("assets/Endless.m4a");
	// ingamesong.loop = true;
     ingamesong.volume = 1;
}
