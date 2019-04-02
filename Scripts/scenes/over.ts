module scenes {
    export class OverScene extends objects.Scene {
        // Instance variables
        private _gameBackground : objects.GameObject;
        private _winningPlayerText: objects.GameObject;
        private _continueLabel : objects.GameObject;

        // Public properties

        // Constructor
        constructor(width: number, height: number) {
            super(width, height);

            this.Start();
        }

        // Private Methods
        private enableClickToContinue() : void {
            this._continueLabel.Animate({alpha:1}, 1500, createjs.Ease.getPowOut(1)).call(() => {
                this._gameBackground.On("click", this.restartGame, this);
            });
        }

        private restartGame() : void {
            this._gameBackground.Off("click", this.restartGame);
            this._continueLabel.Fade(0, 500, createjs.Ease.getPowOut(1));
            this._winningPlayerText.Fade(0, 500, createjs.Ease.getPowOut(1)).call( () => {
                objects.Game.currentSceneNumber = config.Scene.START;
            });
        }
    
        // Public Methods
        public Start() : void {
            // Set the properities of the background Title label
            this._gameBackground = new objects.GameObject("background");

            // cache the center of the screen position
            let screenCenter = this.GetCenter();

            // Set the properities of the animated Title label            
            this._winningPlayerText = new objects.GameObject(new objects.Label(`${objects.Game.winningPlayer} won!`, "40px", "Consolas", "#fff", screenCenter.x, screenCenter.y));
            this._winningPlayerText.label.textAlign = "center";
            this._winningPlayerText.SetAlpha(0);
            this._winningPlayerText.SetScale(0.5);

            // Set the properities of the animated Title label
            this._continueLabel = new objects.GameObject(new objects.Label("Click anywhere to continue", "20px", "Consolas", "#fff", screenCenter.x, screenCenter.y + 75));
            this._continueLabel.label.textAlign = "center";
            this._continueLabel.SetAlpha(0);

            this.addGameObject(this._gameBackground);
            this.addGameObject(this._winningPlayerText);
            this.addGameObject(this._continueLabel);

            this.Main();
        }

        public Update() : void {
        }

        public Main() : void {
            this._winningPlayerText.Animate({alpha:1, scaleX: 1, scaleY: 1}, 1500, createjs.Ease.getPowOut(1)).call(this.enableClickToContinue, null, this);
        }
    }
}