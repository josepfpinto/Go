#pragma strict

var newSkin : GUISkin;
var mapTexture : Texture2D;

public var emptyPiece:Transform;
public var playerPiece1:Transform;
public var playerPiece2:Transform;

public var endGame = 0;
public var playerScore1 = 0;
public var playerScore2 = 0;
public var activePlayer = 1;

public var endMenu: endMenuScript; 

var gameObjects : GameObject[];

var musicOn : boolean = true;

// START!!!!  START!!!!  START!!!!

function Start () {

}


// MUSIC ON!!!!  MUSIC ON!!!!  MUSIC ON!!!!


function OnGUI () {
	GUI.Box(Rect(Screen.width-160, 50, 90, 30), "");
	if (GUI.Toggle (Rect (Screen.width-155, 55, 80, 30), musicOn, " Music On")) {if (musicOn == false) {musicOn = true; audio.Play();}}
	else {if (musicOn == true) {musicOn = false; audio.Stop();}}
}

// NEW GAME!!!!  NEW GAME!!!!  NEW GAME!!!!

function newGame () {

	endGame=1;

    for (var y = 0; y < 19; y++) {
        for (var x = 0; x < 19; x++) {
        	var posX = x-9;
        	var posY = y-9;
            var newEmptyPiece = Instantiate(emptyPiece, Vector3 (posX*10, 0, posY*10), Quaternion.identity);
            newEmptyPiece.name = "newEmptyPiece";
        }
    }
	
}


// END GAME!!!!  END GAME!!!!  END GAME!!!!

function checkGameEnd1 () { 
 
	if ((playerScore1+playerScore2)<361) {activePlayer = 2;}
	else {
		GetComponent(statsMenuScript).enabled = false;
		GetComponent(endMenuScript).enabled = true;
		endMenu.showMenu = true;		
	}
 
/* 	var stones = new Array ();
	stones = GameObject.FindGameObjectsWithTag ("stoneSpace");
	if (gameObjects.length == 0) {activePlayer = 2;}
	else {
		GetComponent(statsMenuScript).enabled = false;
		GetComponent(endMenuScript).enabled = true;
		endMenu.showMenu = true;		
	}*/
}

function checkGameEnd2 () {

	if ((playerScore1+playerScore2)<361) {activePlayer = 1;}
	else {
		GetComponent(statsMenuScript).enabled = false;
		GetComponent(endMenuScript).enabled = true;
		endMenu.showMenu = true;		
	}
}

// UPDATE!!!!  UPDATE!!!!  UPDATE!!!!

function Update () {

	if (endGame<1) {
		GetComponent(mainMenuScript).enabled = true;
		Destroy(GameObject.Find("newEmptyPiece"));
		Destroy(GameObject.Find("newPlayerPiece1"));
		Destroy(GameObject.Find("newPlayerPiece2"));
		playerScore1 = 0;
		playerScore2 = 0;
		activePlayer = 1;
	}
	else {
		GetComponent(statsMenuScript).enabled = true;
		// input?
		if (Input.GetMouseButtonDown(0)){
			var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hit: RaycastHit;
			if (activePlayer == 1) {
				if (Physics.Raycast(ray, hit) && hit.collider.name == "newEmptyPiece") {
					var colliders : Collider[] = Physics.OverlapSphere (hit.transform.gameObject.transform.position, 9);
					var i = 0;
					for (var collider in colliders) {
						if (collider.gameObject.name == "newPlayerPiece2") {i+=1;}
					}
					if(i<4) {
						var newPlayerPiece1 = Instantiate(playerPiece1, hit.transform.gameObject.transform.position, Quaternion.identity);
						newPlayerPiece1.name="newPlayerPiece1";
						Destroy(hit.transform.gameObject);  
						/*gameObjects = GameObject.FindGameObjectsWithTag ("stoneSpace");
						for(var y = 0 ; y < gameObjects.length ; y ++) {
        					Destroy(gameObjects[y]); }  */ 

						playerScore1 += 1;
						
						var colliders2 : Collider[] = Physics.OverlapSphere (hit.transform.gameObject.transform.position, 9);
						for (var collider in colliders2) {
							if (collider.gameObject.name == "newPlayerPiece2") {
								var colliders3 : Collider[] = Physics.OverlapSphere (collider.transform.gameObject.transform.position, 9); 
								var j=0;
								for (var collider in colliders3) {
									if (collider.gameObject.name == "newPlayerPiece1") {j+=1;}
								}
								if(j>3) {
									var newEmptyPiece = Instantiate(emptyPiece, collider.transform.gameObject.transform.position, Quaternion.identity);
									newEmptyPiece.name="newEmptyPiece";
									Destroy(collider.transform.gameObject);
			
									playerScore2 -= 1; 
								}
							}
						}
						
						checkGameEnd1 ();	
					}
				}
			}else {
				if (Physics.Raycast(ray, hit) && hit.collider.name == "newEmptyPiece") {
					var colliders4 : Collider[] = Physics.OverlapSphere (hit.transform.gameObject.transform.position, 9);
					i = 0;
					for (var collider in colliders4) {
						if (collider.gameObject.name == "newPlayerPiece1") {i+=1;}
					}
					if(i<4) {
						var newPlayerPiece2 = Instantiate(playerPiece2, hit.transform.gameObject.transform.position, Quaternion.identity);
						newPlayerPiece2.name="newPlayerPiece2";
						Destroy(hit.transform.gameObject);
						
						playerScore2 += 1;
						
						var colliders5 : Collider[] = Physics.OverlapSphere (hit.transform.gameObject.transform.position, 9);
						for (var collider in colliders5) {
							if (collider.gameObject.name == "newPlayerPiece1") {
								var colliders6 : Collider[] = Physics.OverlapSphere (collider.transform.gameObject.transform.position, 9);
								j=0;
								for (var collider in colliders6) {
									if (collider.gameObject.name == "newPlayerPiece2") {j+=1;}
								}
								if(j>3) {
									newEmptyPiece = Instantiate(emptyPiece, collider.transform.gameObject.transform.position, Quaternion.identity);
									newEmptyPiece.name="newEmptyPiece";
									Destroy(collider.transform.gameObject);
			
									playerScore1 -= 1; 
								}
							}
						}
								
						checkGameEnd2 ();
						
					}
				}

			}
				   			

  		}
  	}
}