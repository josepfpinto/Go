#pragma strict

var newSkin : GUISkin;
var logoTexture : Texture2D;
//var game: gameScript; 

var showMenu = true;

function OnGUI () {

    GUI.skin = newSkin;

    if (showMenu) theMainMenu();
}

function theMainMenu() {

    GUI.BeginGroup(Rect(Screen.width / 2 - 150, Screen.height / 2 - 150, 300, 300));

    GUI.Box(Rect(0, 0, 300, 250), "Virtual GO!");

    GUI.Label(Rect(15, 10, 300, 68), logoTexture);
    
    //BUTTONS
    
    //start button
    if(GUI.Button(Rect(60, 50, 180, 40), "New Game")) {
    	var game = GameObject.FindWithTag("MainCamera");
    	game.GetComponent(gameScript).newGame();
    	GetComponent(mainMenuScript).enabled = false;
    }
    
    //settings button
    if(GUI.Button(Rect(60, 100, 180, 40), "Settings")) {
    	GetComponent(settingsMenuScript).enabled = true;
    	GetComponent(mainMenuScript).enabled = false;
    	showMenu = false;
    }
    
    //credits button
    if(GUI.Button(Rect(60, 150, 180, 40), "Credits")) {
    	GetComponent(creditsMenuScript).enabled = true;
    	GetComponent(mainMenuScript).enabled = false;
    	showMenu = false;
    }
    
    //quit button
    if(GUI.Button(Rect(60, 200, 180, 40), "Quit")) {
    	Application.Quit();
    }
    
    //layout end
    GUI.EndGroup(); 
}