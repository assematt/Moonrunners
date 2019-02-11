module objects {
    export class Characters extends GameObject {

        // Private properties        
        private _gravity: number;
        private _jumpForce: number;
        private _isJumping: boolean;
        private _isFalling: boolean;
        private _playerHealth: number;
        private _healthSprites: Array<createjs.Sprite>;

        private _RegisterHit() {

            let health = this._playerHealth;
            let currentSprite: createjs.Sprite;

            switch (true)
            {
                case health > 3: currentSprite = this._healthSprites[2];
                break;

                case health > 1: currentSprite = this._healthSprites[1];
                break;

                case health >= 0: currentSprite = this._healthSprites[0];
                break;
            }

            let currentFrame = currentSprite.currentFrame;
            currentSprite.gotoAndStop(currentFrame + 1);
        }

        // Constructor
        constructor(assetID: string, isCentered?: boolean)
        {
            super(assetID, isCentered);
            this._gravity = 0;
            this._jumpForce = 0;
            this._isJumping = false;
            this._isFalling = true;
            this._playerHealth = 6;
            this.tag = "Player";
            this.onCollision = this.onCharacterCollision;
        }

        public SetHealhtSprite(sprites: Array<createjs.Sprite>) {
            this._healthSprites = sprites;
        }

        // Public methods
        public setGravity(gravity: number) {
            this._gravity = gravity;
        }
        public GetGravity() : number {
            return this._gravity;
        }
        public Shoot() : objects.Bullet {
            let Bullet = new objects.Bullet("bullet", this.GetId(), this.scaleX < 0 ? "left" : "right" );
            Bullet.x = this.x + (this.scaleX < 0 ? -35 : 33);
            Bullet.y = this.y + 24;
            Bullet.name = `bullet_${Bullet.GetId()}`; 
            Bullet.hasCollisions = true;
            return Bullet;
        }

        public Move(direction: string) {
            switch (direction)
            {
                case "left":
                this.x -= 2;
                if (this.scaleX > 0)
                {
                    this.scaleX = -this.scaleX;
                }
                break;
                case "right":
                this.x += 2;
                if (this.scaleX < 0)
                {
                    this.scaleX = -this.scaleX;
                }
                break;
            }
        }

        public Jump() : void {
            this._jumpForce = -4;
            this.y -= 20;
            this._isFalling = true;
        }

        public Update() : void {
            super.Update();
            if (this._isFalling)
                this.y += (this._gravity * 1) + this._jumpForce;
        }

        public onCharacterCollision(other: GameObject) {


            switch (other.tag)
            {
                case "Floor": this._isFalling = false;
                break;

                case "Bullet": {
                    if ((<Bullet>other).getOwner() != this.id && this._playerHealth > 0)
                    {
                        console.log(`${this.name} || ${other.name}`);

                        // Remove the buller from the scene
                        other.hasCollisions = false;
                        objects.Game.currentScene.removeGameObject(other);

                        // decrease the player health
                        if (--this._playerHealth <= 0)
                            console.log(`${this.name} is dead`);
                        
                        this._RegisterHit();

                        console.log(`${this.name} health is ${this._playerHealth}`);
                    }
                } break;
            }

            if (other.name === "floor")
            this._isFalling = false;
        }
    }
}