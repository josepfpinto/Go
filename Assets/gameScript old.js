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
public var index = -1;

public var endMenu: endMenuScript; 

private var board : Array = new Array (361);
private var num = -1;

private var id = 0;




// START!!!!  START!!!!  START!!!!

function Start () {

}

// NEW GAME!!!!  NEW GAME!!!!  NEW GAME!!!!

function newGame () {

	endGame=1;

    for (var y = 0; y < 19; y++) {
        for (var x = 0; x < 19; x++) {
        	var posX = x-9;
        	var posY = y-9;
        	index +=1;
            var newEmptyPiece = Instantiate(emptyPiece, Vector3 (posX*10, 0, posY*10), Quaternion.identity);
            newEmptyPiece.name = "newEmptyPiece";
            //newEmptyPiece.id = index;
            board [index] = 1;
        }
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
					//if (board [hit.collider.id-19] != 3 || board [hit.collider.id-1] != 3 || board [hit.collider.id+1] != 3 || board [hit.collider.id+19] != 3) {
						var newPlayerPiece1 = Instantiate(playerPiece1, hit.transform.gameObject.transform.position, Quaternion.identity);
						newPlayerPiece1.name="newPlayerPiece1";
						//newPlayerPiece1.id = hit.collider.id;
			            //board [hit.collider.id] = 2;
						Destroy(hit.transform.gameObject);
						
						playerScore1 += 1;
						
						if (GameObject.Find("newEmptyPiece") != null) {activePlayer = 2;}
						else {
							GetComponent(endMenuScript).enabled = true;
							GetComponent(statsMenuScript).enabled = false;
						}
					//}
				}
			}else {
				if (Physics.Raycast(ray, hit) && hit.collider.name == "newEmptyPiece") {
					var newPlayerPiece2 = Instantiate(playerPiece2, hit.transform.gameObject.transform.position, Quaternion.identity);
					newPlayerPiece2.name="newPlayerPiece2";
					Destroy(hit.transform.gameObject);
					
					playerScore2 +=1;
					
					if (GameObject.Find("newEmptyPiece") != null) {activePlayer = 1;}
					else {	
						GetComponent(endMenuScript).enabled = true;
						endMenu.showMenu = true;
						GetComponent(statsMenuScript).enabled = false;
					}
				}

			}
				   			

  		}
  	}
 
 
/*

	// Valid Input?
	if (Input.GetMouseButtonUp ("click")) {
		.IF validInput (O local está cercado por peças do adversário?)

	
	// Remove a stone?
	. IF removeStone:
	. alguma peça está cercada nos 4 lados?
	. if YES, substituir essa peça por um objeto vazio
	. ELSE, não fazer nada
	

*/


}