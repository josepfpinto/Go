#pragma strict

var newSkin : GUISkin;
var mapTexture : Texture2D;

var graphicsScrollbarValue : float;
public var soundScrollbarValue : float = 4.5;
var difficultyScrollbarValue : float;

function OnGUI () {

    //load GUI skin 
    GUI.skin = newSkin;
    
    //execute theSettingsMenu function
    theSettingsMenu();
}


function theSettingsMenu() {

    GUI.BeginGroup(Rect(Screen.width / 2 - 150, Screen.height / 2 - 200, 300, 340));

    GUI.Box(Rect(0, 0, 300, 340), "Settings");
     
        GUI.Box(Rect(60, 30, 180, 180), "Graphics");
     
    	GUI.BeginGroup(Rect(120, 60, 160, 200));
        var names = QualitySettings.names;
        GUILayout.BeginVertical ();
        
        for (var i = 0; i < names.Length; i++)
        {
            if (GUILayout.Button (names[i]))
                QualitySettings.SetQualityLevel (i, true);
        }
        GUILayout.EndVertical (); 
        GUI.EndGroup();
    
	GUI.Box(Rect(60, 220, 180, 50), "Audio");
	
	soundScrollbarValue = GUI.HorizontalScrollbar (Rect (100, 250, 100, 30), soundScrollbarValue, 1.0, 0.0, 10.0);
    
    if(GUI.Button(Rect(60, 280, 180, 40), "Main Menu")) {
    	GetComponent(mainMenuScript).enabled = true;
    	GetComponent(mainMenuScript).showMenu = true;
    	GetComponent(settingsMenuScript).enabled = false;
    }
    
    GUI.EndGroup(); 
}


function Update(){
	AudioListener.volume = soundScrollbarValue/10.0;
}
