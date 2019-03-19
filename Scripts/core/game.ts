(function(){

    // Canvas properties
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;

    // Asset manifest
    let assetManifest: any[];

    // Display properties
    let displayWidth = 1920;
    let displayHeight = 1080;

    //let currentScene: objects.Scene;
    let currentState: number;

    // Load assets
    assetManifest = [
        {id: "logo", src:"./Assets/images/logo.png"},
        {id: "background", src:"./Assets/images/bg.jpg"},
        {id: "background_2", src:"./Assets/images/bg_2.jpg"},
        {id: "level", src:"./Assets/images/level.png"},
        {id: "floor", src:"./Assets/images/floor.png"},
        {id: "player1", src:"./Assets/images/player1.png"},
        {id: "player2", src:"./Assets/images/player2.png"},
        {id: "bullet", src:"./Assets/images/bullet.png"},
        {id: "health", src:"./Assets/images/health.png"},
        {id: "tileset", src:"./Assets/images/tiles.png"},
        {id: "ammo_box", src:"./Assets/images/ammo_box.png"},
        {id: "powerup", src:"./Assets/images/powerup.png"},
        {id: "powerup_health", src:"./Assets/images/powerup_health.png"}
    ]

    // Preload the required assets
    function Init() : void {

        // Create the asset manager and preload stuff
        let assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);

        // Set the static properties
        objects.Game.assetManager = assetManager;
    }

    // Setup the game objects
    function Start() : void {
        // Create the main stage
        stage = new createjs.Stage(canvas);

        // Set framerate properties
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        // Set the stage size
        //stage.setBounds(0, 0, displayWidth, displayHeight);
        
        objects.Game.currentSceneNumber = config.Scene.START;
        objects.Game.currentScene = new scenes.StartScene(displayWidth, displayHeight); 
        currentState = config.Scene.START;

        Main();
    }
    function Update() : void {
        // Check if we 
        if (currentState != objects.Game.currentSceneNumber) {
            Main();
            currentState = objects.Game.currentSceneNumber;
        }
        objects.Game.currentScene.Update();
        stage.update();
    }
    function Main() : void {

        // Reset the scene
        stage.removeAllChildren();

        switch (objects.Game.currentSceneNumber) {
            // When we load the start scene
            case config.Scene.START:            
            objects.Game.currentScene = new scenes.StartScene(displayWidth, displayHeight);            
            break;
            case config.Scene.PLAY:
            objects.Game.currentScene = new scenes.PlayScene(displayWidth, displayHeight);
            break;
            case config.Scene.OVER:
            objects.Game.currentScene = new scenes.OverScene(displayWidth, displayHeight);
            break;
        }

        // Add elements to the scene
        stage.addChild(objects.Game.currentScene);
    }    

    function SetEvent(ev: KeyboardEvent)
    {
        objects.Game.EventManager = ev;
    }
    function ResetEvent()
    {
        objects.Game.EventManager = null;
    }

    window.onload = Init;
    window.onkeydown = SetEvent;
    window.onkeyup = ResetEvent;

})();