module objects {
    export class Game {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentSceneNumber: number;
        public static currentScene: objects.Scene;
        public static EventManager : KeyboardEvent;
    }
}