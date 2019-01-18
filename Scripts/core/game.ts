(function(){

    // Canvas properties
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;

    // Asset manager
    let assetManager : createjs.LoadQueue;
    let assetManifest: any[];

    // Display properties
    let displayWidth = 1920;
    let displayHeight = 1080;

    let currentScene: objects.Scene;
    let currentState: number;

    // Load assets
    assetManifest = [
        {id: "background", src:"./Assets/images/bg.jpg"},
        {id: "level", src:"./Assets/images/level.png"}
    ]

    // Preload the required assets
    function Init() : void {
        // Debug message
        console.log("Initialization started");

        // Create the asset manager and preload stuff
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);
    }

    // Setup the game objects
    function Start() : void {
        // Debug message
        console.log("Starting application...");

        // Create the main stage
        stage = new createjs.Stage(canvas);

        // Set framerate properties
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        // Set the stage size
        stage.setBounds(0, 0, displayWidth, displayHeight);
        
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;

        Main();
    }
    function Update() : void {
        // Check if we 
        if (currentState != objects.Game.currentScene) {
            Main();
            currentState = objects.Game.currentScene;
        }
        currentScene.Update();
        stage.update();
    }
    function Main() : void {

        // Reset the scene
        stage.removeAllChildren();

        switch (objects.Game.currentScene) {
            // When we load the start scene
            case config.Scene.START:            
                currentScene = new scenes.StartScene(displayWidth, displayHeight, assetManager);            
            break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene(displayWidth, displayHeight, assetManager);
            break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene(displayWidth, displayHeight, assetManager);
            break;
        }

        // Add elements to the scene
        stage.addChild(currentScene);
    }    

    window.onload = Init;

})();