var scenes;
(function (scenes) {
    class PlayScene extends objects.Scene {
        // Public properties
        // Constructor
        constructor(width, height) {
            super(width, height);
            this.Start();
        }
        // Public Methods
        Start() {
            // Set the properities of the background 
            this._gameBackground = new objects.GameObject("background");
            this._gameBackground2 = new objects.GameObject("background_2");
            this._gameBackground2.alpha = 0;
            // Set the properities of the floor 
            this._floor = new objects.GameObject("floor");
            this._floor.y = 700;
            this._floor.tag = "Floor";
            this._floor.hasCollisions = true;
            // Set the properities of the level 
            this._level = new objects.GameObject("level");
            this._level.alpha = 0;
            // Set the properities of the playerOne 
            this._playerOne = new objects.Characters("player1");
            this._playerOne.x = this.width / 2 - 50;
            this._playerOne.y = this.height / 2;
            this._playerOne.alpha = 0;
            // Set the properities of the playerTwo 
            this._playerTwo = new objects.Characters("player2");
            this._playerTwo.x = this.width / 2 + 50;
            this._playerTwo.y = this.height / 2;
            this._playerTwo.alpha = 0;
            // Player 1 health
            this._playersHealth = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("health")],
                frames: { width: 80, height: 80, count: 6, regX: 40, regY: 40, spacing: 0, margin: 0 }
            });
            this._playerOneHealth = new Array(new createjs.Sprite(this._playersHealth), new createjs.Sprite(this._playersHealth), new createjs.Sprite(this._playersHealth));
            this._playerOneHealth.forEach((sprite, index) => {
                sprite.gotoAndStop(0);
                sprite.x = 200 + (40 * index);
                sprite.y = 200;
                sprite.scaleX = 0.5;
                sprite.scaleY = 0.5;
            });
            this._playerOne.SetHealhtSprite(this._playerOneHealth);
            this._playerTwoHealth = new Array(new createjs.Sprite(this._playersHealth), new createjs.Sprite(this._playersHealth), new createjs.Sprite(this._playersHealth));
            ;
            this._playerTwoHealth.forEach((sprite, index) => {
                sprite.gotoAndStop(3);
                sprite.x = this.GetSize().x - 200 - (40 * index);
                sprite.y = 200;
                sprite.scaleX = 0.5;
                sprite.scaleY = 0.5;
            });
            this._playerTwo.SetHealhtSprite(this._playerTwoHealth);
            // fill the gameObject vector
            this.addGameObject(this._gameBackground);
            this.addGameObject(this._gameBackground2);
            this.addGameObject(this._level);
            this.addGameObject(this._floor);
            this.addGameObject(this._playerOne);
            this.addGameObject(this._playerTwo);
            this._playerOneHealth.forEach(sprite => this.addChild(sprite));
            this._playerTwoHealth.forEach(sprite => this.addChild(sprite));
            this.Main();
        }
        HandleEvents() {
            if (!objects.Game.EventManager)
                return;
            switch (objects.Game.EventManager.key) {
                // Player 1 keys
                case "a": // move left
                    this._playerOne.Move("left");
                    break;
                case "d": // move right
                    this._playerOne.Move("right");
                    break;
                case "q": // shoot
                    this.addGameObject(this._playerOne.Shoot());
                    break;
                case " ": // jump
                    this._playerOne.Jump();
                    break;
                // Player 2 keys
                case "ArrowLeft": // move left
                    this._playerTwo.Move("left");
                    break;
                case "ArrowRight": // move right
                    this._playerTwo.Move("right");
                    break;
                case "1": // shoot
                    this.addGameObject(this._playerTwo.Shoot());
                    break;
                case "0": // jump
                    this._playerTwo.Jump();
                    break;
            }
        }
        Update() {
            super.Update();
            this.HandleEvents();
        }
        Main() {
            this.Zoom(1.15, 1500);
            this._level.Fade(1, 1500, createjs.Ease.getPowOut(1), function () {
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
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map