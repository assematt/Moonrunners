var scenes;
(function (scenes) {
    class PlayScene extends objects.Scene {
        // Public properties
        // Constructor
        constructor(width, height) {
            super(width, height);
            this._scores = [0, 0];
            this.Start();
        }
        // Public Methods
        Start() {
            // Set the properities of the background 
            this._gameBackground = new objects.GameObject("background");
            this._gameBackground2 = new objects.GameObject("background_2");
            this._gameBackground2.alpha = 0;
            // Load the ground tilset
            this._groundTileset = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("tileset")],
                frames: { width: 40, height: 40, count: 2, spacing: 1 },
                animations: { Empty: [0], Ground: [1] }
            });
            // Load the level
            this._level = new objects.Level();
            this._level.LoadMap("", this._groundTileset);
            // Set the properities of the floor 
            /*
            this._floor = new objects.GameObject("floor");
            this._floor.y = 700;
            this._floor.tag = "Floor";
            this._floor.hasCollisions = true;
            */
            // Set the properities of the playerOne 
            this._playerOne = new objects.Characters("player1");
            this._playerOne.SetPosition(this.width / 2 - 50, this.height / 2);
            this._playerOne.SetAlpha(0);
            this._playerOne.name = "Player1";
            // Set the properities of the playerTwo 
            this._playerTwo = new objects.Characters("player2");
            this._playerTwo.SetPosition(this.width / 2 + 50, this.height / 2);
            this._playerTwo.SetAlpha(0);
            this._playerTwo.name = "Player2";
            // Load the health tileset
            this._playersHealth = new createjs.SpriteSheet({
                images: [objects.Game.assetManager.getResult("health")],
                frames: { width: 80, height: 80, count: 6, regX: 40, regY: 40, spacing: 0, margin: 0 },
                animations: { player1: [0, 2], player2: [3, 5] }
            });
            // Player 1 health
            this._playerOneHealth = new Array(new createjs.Sprite(this._playersHealth, "player1"), new createjs.Sprite(this._playersHealth, "player1"), new createjs.Sprite(this._playersHealth, "player1"));
            this._playerOneHealth.forEach((sprite, index) => {
                sprite.stop();
                sprite.x = 200 + (40 * index);
                sprite.y = 200;
                sprite.scaleX = 0.5;
                sprite.scaleY = 0.5;
            });
            this._playerOne.SetHealhtSprite(this._playerOneHealth);
            // Player 2 health
            this._playerTwoHealth = new Array(new createjs.Sprite(this._playersHealth, "player2"), new createjs.Sprite(this._playersHealth, "player2"), new createjs.Sprite(this._playersHealth, "player2"));
            this._playerTwoHealth.forEach((sprite, index) => {
                sprite.stop();
                sprite.x = this.GetSize().x - 200 - (40 * index);
                sprite.y = 200;
                sprite.scaleX = 0.5;
                sprite.scaleY = 0.5;
            });
            this._playerTwo.SetHealhtSprite(this._playerTwoHealth);
            // fill the gameObject vector
            this.addGameObject(this._gameBackground);
            this.addGameObject(this._gameBackground2);
            this.addGameObject(...this._level.tiles);
            this.addGameObject(this._playerOne);
            this.addGameObject(this._playerTwo);
            // Deactivate the players
            this._playerOne.isActive = false;
            this._playerTwo.isActive = false;
            // Add the sprites
            this._playerOneHealth.forEach(sprite => this.addChild(sprite));
            this._playerTwoHealth.forEach(sprite => this.addChild(sprite));
            // The score label
            this._playerOneScore = new objects.Label("0", "50px", "Consolas", "#fff", 178, 125);
            this.addChild(this._playerOneScore);
            this._playerTwoScore = new objects.Label("0", "50px", "Consolas", "#fff", this.GetSize().x - 206, 125);
            this.addChild(this._playerTwoScore);
            this.Main();
        }
        HandleEvents() {
            if (!objects.Game.EventManager || !this._playerOne.isActive || !this._playerTwo.isActive)
                return;
            switch (objects.Game.EventManager.key) {
                // Player 1 keys
                case "a": // move left
                    this._playerOne.Move("Left");
                    break;
                case "d": // move right
                    this._playerOne.Move("Right");
                    break;
                case "q": // shoot
                    this.addGameObject(this._playerOne.Shoot());
                    break;
                case " ": // jump
                    this._playerOne.Jump();
                    break;
                // Player 2 keys
                case "ArrowLeft": // move left
                    this._playerTwo.Move("Left");
                    break;
                case "ArrowRight": // move right
                    this._playerTwo.Move("Right");
                    break;
                case "1": // shoot
                    this.addGameObject(this._playerTwo.Shoot());
                    break;
                case "0": // jump
                    this._playerTwo.Jump();
                    break;
            }
        }
        ResetPLayers() {
            this._playerOne.Reset(this.width / 2 - 50, this.height / 2);
            this._playerTwo.Reset(this.width / 2 + 50, this.height / 2);
        }
        OnPlayerDeath(who) {
            if (who == "player1") {
                this._playerTwoScore.text = (++this._scores[1]).toString();
            }
            else if (who == "player2") {
                this._playerOneScore.text = (++this._scores[0]).toString();
            }
            this.ResetPLayers();
        }
        Update() {
            this.HandleEvents();
            super.Update();
        }
        Main() {
            this.Zoom(1.15, 1500);
            /**/
            /*this._grounds.forEach(sprite => {
                createjs.Tween.get(sprite).to({opacity: 1}, 1500, createjs.Ease.getPowOut(1)).call(() => {
                    // Set players gravity
                    this._playerOne.setGravity(9.81);
                    this._playerTwo.setGravity(9.81);
    
                    // Reactivate the players
                    this._playerOne.isActive = true;
                    this._playerTwo.isActive = true;
                }, null, this);
            })*/
            this._gameBackground2.Fade(1, 1500, createjs.Ease.getPowOut(1));
            this._playerOne.Fade(1, 1500, createjs.Ease.getPowOut(1)).call(() => {
                this._playerOne.setGravity(9.81);
                this._playerOne.isActive = true;
            });
            this._playerTwo.Fade(1, 1500, createjs.Ease.getPowOut(1)).call(() => {
                this._playerTwo.setGravity(9.81);
                this._playerTwo.isActive = true;
            });
        }
    }
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map