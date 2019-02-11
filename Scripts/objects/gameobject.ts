module objects {

    type CollisionEvent = (other: GameObject) => void;

    export class GameObject extends createjs.Bitmap {
    

        // private properties
        private _Id: number;
        private static _IdCounter = 0;

        // Instance properties
        protected _dX: number;
        protected _dY: number;
        protected _isCentered: boolean;
        

        // Public properties
        public width: number;
        public height: number;
        public halfWidth: number;
        public halfHeight: number;
        public hasCollisions: boolean;
        public onCollision: CollisionEvent;
        public tag: string;

        // Constructor
        constructor(assetID: string, isCentered?: boolean)
        {
            super(objects.Game.assetManager.getResult(assetID));
            this.name = assetID;
            this._isCentered = isCentered;
            this.hasCollisions = false; 
            this.tag = "GameObject";
            this.onCollision = this.OnCollision;
            this._initialize();

            this._Id = ++GameObject._IdCounter;
        }

        // Private Methods
        private _initialize() : void {
            
            this._updateBounds();
            if (this._isCentered == true)
            {
                this.regX = this.halfWidth;
                this.regY = this.halfHeight;
            }
            
        }
        private _updateBounds() {
            this.width = this.getBounds().width * this.scaleX;
            this.height = this.getBounds().height * this.scaleY;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
        }

        // Public Methods
        public GetId() : number {
            return this._Id;
        }
        public Fade(opacity: number, duration: number, fade: Function, callback?: (...Params: any[]) => void, scope?: any) : createjs.Tween {
            return createjs.Tween.get(this).to({alpha: opacity}, duration, fade).call(callback ? callback : function(){}, null, scope);
        }
        public setPosition(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        public setScale(Scale: number) {
            this.scaleX = Scale;
            this.scaleY = Scale;
            
            this._updateBounds();
        }
        public Start() : void {

        }

        public Update() : void {

            
        }

        public Reset() : void {
            
        }
        
        public CheckBound() : void {
            
        }

        public OnCollision(other: GameObject) {}
    }
}