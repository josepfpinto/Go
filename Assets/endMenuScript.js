#pragma strict

var newSkin : GUISkin;
var mapTexture : Texture2D;
var game: gameScript; 
var showMenu = true;

function OnGUI () {

    //load GUI skin 
    GUI.skin = newSkin;
    
    //execute theSettingsMenu function
    if (showMenu) {endMenu();GetComponent(statsMenuScript).enabled = false;}
}


function endMenu() {

	if (game.playerScore1 < game.playerScore2) {
		GUI.BeginGroup(Rect(Screen.width / 2 - 150, Screen.height / 2 - 100, 300, 300));
		GUI.Box(Rect(0, 50, 300, 70), "Player 2 is the winner!");
    	if(GUI.Button(Rect(60, 130, 180, 40), "Main Menu")) {
    		GetComponent(endMenuScript).enabled = false;
    		showMenu = false;
    		game.endGame = 0;
    	}
    	GUI.EndGroup(); 
    } else if (game.playerScore2 < game.playerScore1) {
		GUI.BeginGroup(Rect(Screen.width / 2 - 150, 50, 300, 300));
		GUI.Box(Rect(0, 50, 300, 70), "Player 1 is the winner!");
    	if(GUI.Button(Rect(60, 130, 180, 40), "Main Menu")) {
    		GetComponent(endMenuScript).enabled = false;
    		showMenu = false;
    		game.endGame = 0;
    	}
    	GUI.EndGroup(); 
    } else if (game.playerScore2 == game.playerScore1) {
		GUI.BeginGroup(Rect(Screen.width / 2 - 150, 50, 300, 300));
		GUI.Box(Rect(0, 50, 300, 70), "Draw!");
    	if(GUI.Button(Rect(60, 130, 180, 40), "Main Menu")) {
    		GetComponent(endMenuScript).enabled = false;
    		showMenu = false;
    		game.endGame = 0;
    	}
    	GUI.EndGroup(); 
    }
}




