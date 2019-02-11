module scenes {
    export class StartScene extends objects.Scene {
        // Instance variables
        private _titleLabel : objects.GameObject;
        private _continueLabel : objects.Label;
        private _gameBackground : objects.GameObject;

        // Public properties

        // Constructor
        constructor(width: number, height: number) {
            super(width, height);

            this.Start();
        }

        // Private Methods
        private showClickToContinueLabel() : void {
            createjs.Tween.get(this._continueLabel).to({alpha:1}, 1500, createjs.Ease.getPowOut(1)).call(this._gameBackground.on, ["click", this.startGame, this]);            this._gameBackground.on("click", this.startGame, this);
        }
    
        private startGame() : void {
            this._gameBackground.off("click", this.startGame);
            createjs.Tween.get(this._titleLabel).to({alpha:0}, 500, createjs.Ease.getPowOut(1)).call(function() {
                objects.Game.currentSceneNumber = config.Scene.PLAY;
            });
            createjs.Tween.get(this._continueLabel).to({alpha:0}, 500, createjs.Ease.getPowOut(1));
            
        }

        // Public Methods
        public Start() : void {
            // Set the properities of the background Title label
            this._gameBackground = new objects.GameObject("background");
            this.addGameObject(this._gameBackground);

            // cache the center of the screen position
            let screenCenter = this.GetCenter();

            // Set the properities of the animated Title label
            this._titleLabel = new objects.GameObject("logo", true);
            this._titleLabel.alpha = 0;
            this._titleLabel.setScale(0.15);
            this._titleLabel.setPosition(screenCenter.x, screenCenter.y - 50);
            this.addGameObject(this._titleLabel);
            
            // Set the properities of the animated Title label
            this._continueLabel = new objects.Label("Click anywhere to continue", "20px", "Consolas", "#fff", screenCenter.x, screenCenter.y + 50);
            this._continueLabel.alpha = 0;
            this._continueLabel.textAlign = "center";
            this.addChild(this._continueLabel);

            this.Main();
        }

        public Update() : void {
        }

        public Main() : void {
            createjs.Tween.get(this._titleLabel).to({alpha:1, scaleX: 0.25, scaleY: 0.25}, 2000, createjs.Ease.getPowOut(1)).call(this.showClickToContinueLabel, null, this);
        }
    }
}