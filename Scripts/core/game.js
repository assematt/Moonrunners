(function () {
    // Canvas properties
    var canvas = document.getElementById("canvas");
    var stage;
    // Asset manager
    var assetManager;
    var assetManifest;
    // Display properties
    var displayWidth = 1920;
    var displayHeight = 1080;
    var currentScene;
    var currentState;
    // Load assets
    assetManifest = [
        { id: "logo", src: "./Assets/images/logo.png" },
        { id: "background", src: "./Assets/images/bg.jpg" },
        { id: "background_2", src: "./Assets/images/bg_2.jpg" },
        { id: "level", src: "./Assets/images/level.png" },
        { id: "figure", src: "./Assets/images/figure.png" },
        { id: "player1", src: "./Assets/images/player1.png" },
        { id: "player2", src: "./Assets/images/player2.png" }
    ];
    // Preload the required assets
    function Init() {
        // Debug message
        console.log("Initialization started");
        // Create the asset manager and preload stuff
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);
    }
    // Setup the game objects
    function Start() {
        // Debug message
        console.log("Starting application...");
        // Create the main stage
        stage = new createjs.Stage(canvas);
        // Set framerate properties
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        // Set the stage size
        //stage.setBounds(0, 0, displayWidth, displayHeight);
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        Main();
    }
    function Update() {
        // Check if we 
        if (currentState != objects.Game.currentScene) {
            Main();
            currentState = objects.Game.currentScene;
        }
        currentScene.Update();
        stage.update();
    }
    function Main() {
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
//# sourceMappingURL=game.js.map