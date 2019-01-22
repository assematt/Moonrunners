module scenes {
    export class PlayScene extends objects.Scene {
        // Instance variables
        private _gameBackground : objects.GameObject;
        private _gameBackground2 : objects.GameObject;
        private _level : objects.GameObject;
        private _playerOne: objects.GameObject;
        private _playerTwo: objects.GameObject;

        // Public properties

        // Constructor
        constructor(width: number, height: number, assetManager: createjs.LoadQueue) {
            super(width, height, assetManager);

            this.Start();
        }

        // Public Methods
        public Start() : void {            
            // Set the properities of the background 
            this._gameBackground = new objects.GameObject(this.assetManager, "background");
            this.addChild(this._gameBackground);
            this._gameBackground2 = new objects.GameObject(this.assetManager, "background_2");
            this._gameBackground2.alpha = 0;
            this.addChild(this._gameBackground2);

            // Set the properities of the level 
            this._level = new objects.GameObject(this.assetManager, "level");
            this._level.alpha = 0;
            this.addChild(this._level);

            // Set the properities of the playerOne 
            this._playerOne = new objects.GameObject(this.assetManager, "player1");
            this._playerOne.x = this.width / 2;
            this._playerOne.y = this.height / 2;
            this._playerOne.gravity = 0;
            this.addChild(this._playerOne);

            // Set the properities of the playerTwo 
            this._playerTwo = new objects.GameObject(this.assetManager, "player2");
            this._playerTwo.x = this.width / 2;
            this._playerTwo.y = this.height / 2;
            this._playerTwo.gravity = 0;
            this.addChild(this._playerTwo);

            // fill the gameObject vector
            this.addGameObject(this._gameBackground);
            this.addGameObject(this._gameBackground2);
            this.addGameObject(this._level);
            this.addGameObject(this._playerOne);
            this.addGameObject(this._playerTwo);

            this.Main();
        }

        public Update() : void {
            super.Update();
            //this._playerOne.Update();
        }

        public Main() : void {
            console.log("Main() in PlayScene");

            this.Zoom(1.5, 1500);
            this._level.Fade(1, 1500, createjs.Ease.getPowOut(1), function() {
                this._playerOne.gravity = 9.81;
            }, this);
            this._gameBackground2.Fade(1, 1500, createjs.Ease.getPowOut(1));
        }
    }
}