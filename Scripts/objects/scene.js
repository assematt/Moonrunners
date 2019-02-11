var objects;
(function (objects) {
    class Scene extends createjs.Container {
        // Consstructors
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
            /**/ this.setBounds(0, 0, width, height);
            this.x = this.GetCenter().x;
            this.y = this.GetCenter().y;
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.assetManager = objects.Game.assetManager;
            this._gameObjects = new Array();
        }
        // Private methods
        _DetectCollisions() {
            // Get the entites that can collide
            let Colliding = this._gameObjects.filter(filter => filter[1].hasCollisions);
            let CheckCollisions = function (Elem1, Elem2) {
                Elem1.setBounds(Elem1.x, Elem1.y, Elem1.width, Elem1.height);
                Elem2.setBounds(Elem2.x, Elem2.y, Elem2.width, Elem2.height);
                let collision = Elem1.getBounds().intersects(Elem2.getBounds());
                if (collision) {
                    //Elem1.onCollision(Elem2);
                }
                return collision;
            };
            let size = this._gameObjects.length;
            for (let LI = 0; LI < size; ++LI) {
                let Elem1 = this._gameObjects[LI][1];
                if (Elem1.hasCollisions) {
                    for (let RI = 0; RI < size; ++RI) {
                        let Elem2 = this._gameObjects[RI][1];
                        if (Elem1 != Elem2 && Elem2.hasCollisions && CheckCollisions(Elem1, Elem2)) {
                            if ((Elem1.tag === "Bullet" && Elem2.tag === "Player") || (Elem2.tag === "Bullet" && Elem1.tag === "Player")) {
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
        Start() { }
        Update() {
            // Update every single entity
            this._gameObjects.forEach(gameObject => {
                gameObject[1].Update();
            });
            // Does collisions
            this._DetectCollisions();
        }
        Main() { }
        GetSize() {
            return new objects.Vector2(this.width, this.height);
        }
        GetCenter() {
            return new objects.Vector2(this.width / 2, this.height / 2);
        }
        addGameObject(entity) {
            this.addChild(entity);
            this._gameObjects.push([entity.GetId(), entity]);
        }
        removeGameObject(entity) {
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
        Zoom(amount, duration, ease) {
            if (duration == null) {
                this.scaleX = amount;
                this.scaleY = amount;
            }
            else {
                createjs.Tween.get(this).to({ scale: amount }, duration, ease ? ease : createjs.Ease.getPowOut(1));
            }
        }
    }
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map