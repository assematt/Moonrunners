var scenes;
(function (scenes) {
    class OverScene extends objects.Scene {
        // Public properties
        // Constructor
        constructor(width, height) {
            super(width, height);
            this.Start();
        }
        // Private Methods
        showClickToContinueLabel() {
            createjs.Tween.get(this._continueLabel).to({ alpha: 1 }, 1500, createjs.Ease.getPowOut(1)).call(this._gameBackground.on, ["click", this.startGame, this]);
            this._gameBackground.on("click", this.startGame, this);
        }
        startGame() {
            this._gameBackground.off("click", this.startGame);
            createjs.Tween.get(this._titleLabel).to({ y: 50 }, 1500, createjs.Ease.getPowOut(1));
            createjs.Tween.get(this._continueLabel).to({ alpha: 0 }, 500, createjs.Ease.getPowOut(1));
            objects.Game.currentSceneNumber = config.Scene.PLAY;
        }
        // Public Methods
        Start() {
            // Set the properities of the background Title label
            this._gameBackground = new createjs.Bitmap(this.assetManager.getResult("background"));
            this.addChild(this._gameBackground);
            // cache the center of the screen position
            let screenCenter = this.GetCenter();
            // Set the properities of the animated Title label
            this._titleLabel = new objects.Label("Moonrunners", "80px", "Consolas", "#fff", screenCenter.x, screenCenter.y - 50);
            this._titleLabel.setScale(0.5);
            this._titleLabel.textAlign = "center";
            this._titleLabel.alpha = 0;
            this.addChild(this._titleLabel);
            // Set the properities of the animated Title label
            this._continueLabel = new objects.Label("Click anywhere to continue", "20px", "Consolas", "#fff", screenCenter.x, screenCenter.y + 50);
            this._continueLabel.alpha = 0;
            this._continueLabel.textAlign = "center";
            this.addChild(this._continueLabel);
            this.Main();
        }
        Update() {
        }
        Main() {
            console.log("Main() in OverScene");
            createjs.Tween.get(this._titleLabel).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.getPowOut(1)).call(this.showClickToContinueLabel, null, this);
        }
    }
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map