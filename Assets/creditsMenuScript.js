#pragma strict

var newSkin : GUISkin;
var mapTexture : Texture2D;


function OnGUI () {
    //load GUI skin 
    GUI.skin = newSkin;
    
    //execute theCreditsMenu function
    theCreditsMenu();
}

function theCreditsMenu() {
    GUI.BeginGroup(Rect(Screen.width / 2 - 150, Screen.height / 2 - 100, 300, 300));

    GUI.Box(Rect(0, 50, 300, 70), "Game by:");
    
    GUI.Box(Rect(50, 80, 200, 30), "José Pedro Pinto");
    
    //buttons
    if(GUI.Button(Rect(60, 130, 180, 40), "Main Menu")) {
	    GetComponent(mainMenuScript).enabled = true;
	    GetComponent(mainMenuScript).showMenu = true;
	    GetComponent(creditsMenuScript).enabled = false;
    }
    
    GUI.EndGroup(); 
}