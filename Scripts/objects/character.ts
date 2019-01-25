module objects {
    export class Characters extends GameObject {

        // Private properties        
        private _gravity: number;
        private _jumpForce: number;
        private _isJumping: boolean;

        // Constructor
        constructor(assetManager: createjs.LoadQueue, assetID: string, isCentered?: boolean)
        {
            super(assetManager, assetID, isCentered);
            this._gravity = 0;
            this._jumpForce = 0;
            this._isJumping = false;
        }

        // Public methods
        public setGravity(gravity: number) {
            this._gravity = gravity;
        }
        public GetGravity() : number {
            return this._gravity;
        }

        public Move(direction: string) {
            switch (direction)
            {
                case "left":
                this.x -= 2;
                break;
                case "right":
                this.x += 2;
                break;
            }
        }

        public Jump() : void {
            this._jumpForce = -4;
            this.y -= 20;
        }

        public Update() : void {
            super.Update();
            if (!this._isColliding)
                this.y += (this._gravity * 1) + this._jumpForce;
        }
    }
}