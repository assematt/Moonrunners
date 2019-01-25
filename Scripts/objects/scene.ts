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

        // Private methods
        private _DetectCollisions() {
            // Get the entites that can collide
            var Colliding = this._gameObjects.filter(filter => {               
                return filter[1].hasCollisions;
            });

            var CheckCollisions = function(Elem1: GameObject, Elem2: GameObject) : boolean {
                Elem1.setBounds(Elem1.x, Elem1.y, Elem1.width, Elem1.height);
                Elem2.setBounds(Elem2.x, Elem2.y, Elem2.width, Elem2.height);
                
                if (Elem1.getBounds().intersects(Elem2.getBounds()))
                {
                    Elem1.IsColliding(true);
                    Elem2.IsColliding(true);
                    Elem1._wasEvaluated = true;
                    Elem2._wasEvaluated = true;
                }
                return Elem1.getBounds().intersects(Elem2.getBounds());
            };

            // Reset collisions
            Colliding.forEach(element => {
                element[1]._wasEvaluated = false;
                element[1].IsColliding(false);
            });

            // Check for collisions
            Colliding.forEach(element => {
                var Elem1 = element[1];

                Colliding.forEach(other => {
                    var Elem2 = other[1];

                    if (element[0] != other[0] && !element[1]._wasEvaluated)
                    {
                        CheckCollisions(Elem1, Elem2);
                    }
                })
            });
        }

        // Public methods
        public Start() : void {}
        public Update() : void
        {
            // Does collisions
            this._DetectCollisions();
            
            // Update every single entity
            this._gameObjects.forEach(gameObject => {
                gameObject[1].Update();
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