module scenes {
    export class PlayScene extends objects.Scene {
        // Instance variables
        private _gameBackground : objects.GameObject;
        private _gameBackground2 : objects.GameObject;
        private _level : objects.GameObject;
        private _floor : objects.GameObject;
        private _playerOne: objects.Characters;
        private _playerTwo: objects.Characters;

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

            // Set the properities of the floor 
            this._floor = new objects.GameObject(this.assetManager, "floor");
            this._floor.y = 700;
            this._floor.hasCollisions = true;
            this.addChild(this._floor);

            // Set the properities of the level 
            this._level = new objects.GameObject(this.assetManager, "level");
            this._level.alpha = 0;
            this.addChild(this._level);

            // Set the properities of the playerOne 
            this._playerOne = new objects.Characters(this.assetManager, "player1");
            this._playerOne.x = this.width / 2 - 50;
            this._playerOne.y = this.height / 2;
            this._playerOne.alpha = 0;
            this.addChild(this._playerOne);

            // Set the properities of the playerTwo 
            this._playerTwo = new objects.Characters(this.assetManager, "player2");
            this._playerTwo.x = this.width / 2 + 50;
            this._playerTwo.y = this.height / 2;
            this._playerTwo.alpha = 0;
            this.addChild(this._playerTwo);

            // fill the gameObject vector
            this.addGameObject(this._gameBackground);
            this.addGameObject(this._gameBackground2);
            //this.addGameObject(this._level);
            this.addGameObject(this._floor);
            this.addGameObject(this._playerOne);
            this.addGameObject(this._playerTwo);

            this.Main();
        }

        public HandleEvents() : void {
            if (!objects.Game.EventManager)
                return;

            switch (objects.Game.EventManager.key)
            {
                case "a":
                this._playerOne.Move("left");
                break;
                case "d":
                this._playerOne.Move("right");
                break;
                case " ":
                this._playerOne.Jump();
                break;
                case "ArrowLeft":
                this._playerTwo.Move("left");
                break;
                case "ArrowRight":
                this._playerTwo.Move("right");
                break;
            }
        }

        public Update() : void {
            super.Update();

            this.HandleEvents();

            if (this._playerOne.IsColliding())
                console.info("Player one is colliding");
        }

        public Main() : void {
            console.log("Main() in PlayScene");

            this.Zoom(1.15, 1500);
            this._level.Fade(1, 1500, createjs.Ease.getPowOut(1), function() {
                this._playerOne.setGravity(9.81);
                this._playerTwo.setGravity(9.81);
                this._playerOne.hasCollisions = true;
                this._playerTwo.hasCollisions = true;
            }, this);
            this._gameBackground2.Fade(1, 1500, createjs.Ease.getPowOut(1));
            this._playerOne.Fade(1, 1500, createjs.Ease.getPowOut(1));
            this._playerTwo.Fade(1, 1500, createjs.Ease.getPowOut(1));
        }
    }
}