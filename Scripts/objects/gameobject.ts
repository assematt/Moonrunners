module objects {
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
        public gravity: number;

        // Constructor
        constructor(assetManager: createjs.LoadQueue, assetID: string, isCentered?: boolean)
        {
            super(assetManager.getResult(assetID));
            this.name = assetID;
            this._isCentered = isCentered;
            this._initialize();

            this._Id = ++GameObject._IdCounter;
        }

        // Private Methods
        private _initialize() : void {
            this.gravity = 9.81;
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

            //this.y += this.gravity * 1;
        }

        public Reset() : void {
            
        }

        public IsColliding(other: GameObject) : boolean {
            // Get the bound of the other object
            var otherBound = other.getBounds();

            // Get the bounds of this object
            var thisBound = this.getBounds();            

            return thisBound.intersects(otherBound);;
        }

        public CheckBound() : void {
            
        }

        public Move() : void {
            
        }
    }
}