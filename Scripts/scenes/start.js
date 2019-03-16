var scenes;
(function (scenes) {
    class StartScene extends objects.Scene {
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
            this._titleLabel.Fade(0, 500, createjs.Ease.getPowOut(1)).call(() => {
                objects.Game.currentSceneNumber = config.Scene.PLAY;
            });
            createjs.Tween.get(this._continueLabel).to({ alpha: 0 }, 500, createjs.Ease.getPowOut(1));
        }
        // Public Methods
        Start() {
            // Set the properities of the background Title label
            this._gameBackground = new objects.GameObject("background");
            this.addGameObject(this._gameBackground);
            // cache the center of the screen position
            let screenCenter = this.GetCenter();
            // Set the properities of the animated Title label
            this._titleLabel = new objects.GameObject("logo", true);
            this._titleLabel.SetAlpha(0);
            this._titleLabel.SetScale(0.15);
            this._titleLabel.SetPosition(screenCenter.x, screenCenter.y - 50);
            this.addGameObject(this._titleLabel);
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
            this._titleLabel.Animate({ alpha: 1, scaleX: 0.25, scaleY: 0.25 }, 2000, createjs.Ease.getPowOut(1)).call(this.showClickToContinueLabel, null, this);
        }
    }
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map