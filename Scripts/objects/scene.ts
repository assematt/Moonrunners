module objects {
    export class Scene extends createjs.Container {

        // protected properties
        protected _gameObjects: Array<[number, GameObject]>;


        // Public properties
        public assetManager;
        public width: number;
        public height: number;

        // Consstructors
        constructor(width: number, height: number, assetManager: createjs.LoadQueue) {
            super();

            this.width = width;
            this.height = height;

            /**/this.setBounds(0, 0, width, height);
            this.x = this.GetCenter().x;
            this.y = this.GetCenter().y;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.assetManager = assetManager;

            this._gameObjects = new Array<[number, GameObject]>();
        }

        // Public methods
        public Start() : void {}
        public Update() : void
        {
            this._gameObjects.forEach(element => {
                element[1].Update();
            });
        }
        public Main() : void {}
        public GetSize() : objects.Vector2 {
            return new objects.Vector2(this.width, this.height);
        }
        public GetCenter() : objects.Vector2 {
            return new objects.Vector2(this.width / 2, this.height / 2);
        }

        public addGameObject(entity: GameObject) {
            this._gameObjects.push([entity.GetId(), entity]);
        }
        public removeGameObject(entity: GameObject) {
            /*
            var IndexToRemove = this._gameObjects.indexOf([entity.GetId(), entity]);
            var LastElem = this._gameObjects[this._gameObjects.length - 1];
            var ToRemove = this._gameObjects[IndexToRemove];

            var Temp = LastElem;
            LastElem = ToRemove;
            ToRemove = Temp;
            */
        }

        public Zoom(amount: number, duration?: number, ease?: Function)
        {
            if (duration == null)
            {
                this.scaleX = amount;
                this.scaleY = amount;
            }
            else
            {
                createjs.Tween.get(this).to({scale: amount}, duration, ease ? ease : createjs.Ease.getPowOut(1));
            }
        }
    }
}