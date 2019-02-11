module objects {   

    export class Scene extends createjs.Container {

        // protected properties
        protected _gameObjects: Array<[number, GameObject]>;

        // Public properties
        public assetManager;
        public width: number;
        public height: number;

        // Consstructors
        constructor(width: number, height: number) {
            super();

            this.width = width;
            this.height = height;

            /**/this.setBounds(0, 0, width, height);
            this.x = this.GetCenter().x;
            this.y = this.GetCenter().y;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.assetManager = objects.Game.assetManager;

            this._gameObjects = new Array<[number, GameObject]>();
        }

        // Private methods
        private _DetectCollisions() {
            // Get the entites that can collide
            let Colliding = this._gameObjects.filter(filter => filter[1].hasCollisions);

            let CheckCollisions = function(Elem1: GameObject, Elem2: GameObject) : boolean {
                Elem1.setBounds(Elem1.x, Elem1.y, Elem1.width, Elem1.height);
                Elem2.setBounds(Elem2.x, Elem2.y, Elem2.width, Elem2.height);

                let collision = Elem1.getBounds().intersects(Elem2.getBounds());
                
                if (collision)
                {
                    //Elem1.onCollision(Elem2);
                }

                return collision;
            };

            let size = this._gameObjects.length;
            for (let LI = 0; LI < size; ++LI)
            {
                let Elem1 = this._gameObjects[LI][1];
                if (Elem1.hasCollisions)
                {
                    for (let RI = 0; RI < size; ++RI)
                    {
                        let Elem2 = this._gameObjects[RI][1];

                        if (Elem1 != Elem2 && Elem2.hasCollisions && CheckCollisions(Elem1, Elem2))
                        {
                            if ((Elem1.tag === "Bullet" && Elem2.tag === "Player") || (Elem2.tag === "Bullet" && Elem1.tag === "Player"))
                            {
                                let stop = true;
                            }

                            Elem1.onCollision(Elem2);

                            if (!Elem1.parent)
                                break;
                        }
                    }
                }
            }

            // Check for collisions
            /*
            Colliding.forEach(element => {
                let Elem1 = element[1];

                Colliding.forEach(async other => {
                    let Elem2 = other[1];

                    if (Elem1.GetId() != Elem2.GetId())
                    {
                        if (Elem1.tag === "Bullet" && Elem2.tag === "Player")
                        {
                            let breakpoint = true;
                        }
                        CheckCollisions(Elem1, Elem2);
                    }
                })
            });
            */
        }

        // Public methods
        public Start() : void {}
        public Update() : void
        {
            // Update every single entity
            this._gameObjects.forEach(gameObject => {
                gameObject[1].Update();
            });

            // Does collisions
            this._DetectCollisions();
            
            
        }
        public Main() : void {}
        public GetSize() : objects.Vector2 {
            return new objects.Vector2(this.width, this.height);
        }
        public GetCenter() : objects.Vector2 {
            return new objects.Vector2(this.width / 2, this.height / 2);
        }

        public addGameObject(entity: GameObject) {
            this.addChild(entity);
            this._gameObjects.push([entity.GetId(), entity]);
        }
        public removeGameObject(entity: GameObject) {

            this.removeChild(entity);
            this._gameObjects = this._gameObjects.filter(value => value[0] != entity.id);

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