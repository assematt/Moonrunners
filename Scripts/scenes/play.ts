module scenes {
    export class PlayScene extends objects.Scene {
        // Instance variables
        private _gameBackground : createjs.Bitmap;
        private _level : createjs.Bitmap;
        private _playerOne: createjs.Bitmap;

        // Public properties

        // Constructor
        constructor(width: number, height: number, assetManager: createjs.LoadQueue) {
            super(width, height, assetManager);

            this.Start();
        }

        // Public Methods
        public Start() : void {            
            // Set the properities of the background 
            this._gameBackground = new createjs.Bitmap(this.assetManager.getResult("background"));
            this.addChild(this._gameBackground);

            // Set the properities of the level 
            this._level = new createjs.Bitmap(this.assetManager.getResult("level"));
            this._level.alpha = 0;
            this.addChild(this._level);

            this.Main();
        }

        public Update() : void {
        }

        public Main() : void {
            console.log("Main() in PlayScene");

            this.Zoom(2, 1500);
            createjs.Tween.get(this._level).to({alpha: 1}, 1500, createjs.Ease.getPowOut(1));
        }
    }
}