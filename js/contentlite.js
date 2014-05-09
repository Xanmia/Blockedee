var engine, scene, camera, camera2, canvas;
var nextObjtoDrop, obj,guide, dock, otherground, playerObj,playerGuide;
var waterMaterial, water, material;

function ContentLoad(startDisplay)
{		
	canvas = document.getElementById('viewport');
    engine = new BABYLON.Engine(canvas,false)
	scene = new BABYLON.Scene(engine);

	scene.enablePhysics();
    scene.setGravity(new BABYLON.Vector3(0, -10, 0));
    //scene.gravity = new BABYLON.Vector3(0, -100.11, 0);
	scene.clearColor = new BABYLON.Color3(92/255,148/255,252/255);

    camera = new BABYLON.ArcRotateCamera("Camera", 1.3, 1.25, 60, new BABYLON.Vector3(0, 0, 0), scene); //1.3, 1.25
    camera.maxZ = 300;
    camera.minZ = 20;
	
	//var light0 = new BABYLON.HemisphericLight("Omni", new BABYLON.Vector3(0, 0, 30), scene);
   
	///////dock playing area///////
	var dockmaterial = new BABYLON.StandardMaterial("groundmaterial", scene);
	dockmaterial.emissiveTexture = new BABYLON.Texture("images/wood3.jpg", scene);
 
    dock = BABYLON.Mesh.CreateBox("ground", 50, scene);
	dock.position.y = -30;
	dock.material = dockmaterial;
	dock.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: .9, restitution: .1 });
	////////////////////////////////
    
    var othermaterial = new BABYLON.StandardMaterial("othermaterial", scene);
    othermaterial.emissiveColor = new BABYLON.Color3(.5, 0.5, 0.5);
    
    otherground = BABYLON.Mesh.CreateGround("otherground", 500, 500, 1, scene, false);
    otherground.material = othermaterial;
  	otherground.position.y = -11;
  	otherground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0, friction: .9, restitution: .1 });
   
	///////main player object to clone////////////////////////////////////
    obj = BABYLON.Mesh.CreateBox("main", 1, scene);
    material = new BABYLON.StandardMaterial("material", scene);
	material.emissiveTexture = new BABYLON.Texture("images/stairv3.png", scene);
	obj.material = material;
	obj.position.y = -200;
	////////////////////////////////////////////////
   
    guide = BABYLON.Mesh.CreateBox("wireframe", 1, scene);
	var wmaterial = new BABYLON.StandardMaterial("material", scene);
	wmaterial.wireframe = true;
    wmaterial.emissiveColor = new BABYLON.Color3(.3, .3, .3);
	guide.material = wmaterial;
	guide.position.y = -200;
	
}
