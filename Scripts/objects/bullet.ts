module objects {
    export class Bullet extends GameObject {
        private ownerId: number;
        private direction: "left" | "right";
        private speed: number;

        constructor(assetID: string, ownerId: number, direction: "left" | "right", isCentered?: boolean)
        {
            super(assetID, isCentered);

            this.ownerId = ownerId;
            this.direction = direction;
            this.hasCollisions = true;
            this.speed = 9.81;
            this.tag = "Bullet";
            this.name = `bullet_${this.GetId()}`;
            this.onCollision = this.OnBulletCollision;
        }

        public setDirection(direction: "left" | "right") {
            this.direction = direction;
        }
        public getDirection() : string {
            return this.direction;
        }

        public getOwner() : number {
            return this.ownerId;
        }

        public Update() : void {
            super.Update();
            
            this.x += (this.direction == "right" ? 1 : -1) * this.speed;
        }

        public OnBulletCollision(other: GameObject) {

            switch (other.tag)
            {
                case "Bullet":
                {
                    this.Destroy();
                    other.Destroy();
                } break;

                case "Player":
                {
                    this.Destroy();
                } break;
            }
        }
    }
}