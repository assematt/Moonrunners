module objects {
    export class Scene extends createjs.Container {

        // Public properties
        public assetManager;

        // Consstructors
        constructor(assetManager: createjs.LoadQueue) {
            super();

            this.assetManager = assetManager;
        }

        // Public methods
        public Start() : void {}
        public Update() : void {}
    }
}