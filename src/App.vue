<template>
  <main id="app"
    class="flex flex-col jc-between ai-stretch"
  >
    <header
      class="flex jc-between ai-center h-3 px2"
    >
      <div>
        <div v-show="level" class="flex flex-col ai-center">
          <p>
            <small>LEVEL</small>
          </p>
          <p class="yellow">{{level}}</p>
        </div>
      </div>

      <div>
        <div v-show="taps" class="flex flex-col ai-center">
          <p>
            <small>Remaining Taps</small>
          </p>
          <p class="yellow">{{taps}}</p>
        </div>
      </div>

      <StrictButton
        @toggle="toggleStrict"
      >
      </StrictButton>
    </header>

    <div class="grow-1 grid">

	    <div v-for="shape in shapes"
	  	  :key="shape.index"
			  class="flex jc-center ai-center"
	    >
		    <IconImage
				  :entity="shape.entity"
				  :color="shape.color"
          :index="shape.index"
          @onClick="onClick"
			  >
			  </IconImage>
	    </div>

	    <div class="center-display flex flex-col jc-center ai-center">
        <h2>
          {{display}}
        </h2>
      </div>
    </div>

    <footer class="flex jc-center ai-center h-4">
      <button class="pointer button"
        @click="buttonEvent"
      >
        {{buttonDisplay}}
      </button>
    </footer>

  </main>
</template>

<script>
import StrictButton from "./components/StrictButton";
import IconImage from "./components/IconImage";
import { sleep, randomNumber, addThenRemoveClass } from "./utils/utils.js";

export default {
  name: "App",
  components: {
    StrictButton,
    IconImage,
  },
  data() {
    return {
      shapes: [
				{index: 0, entity: '&nwarr;', color: 'lightcoral'},
				{index: 1, entity: '&Cap;', color: 'lightblue'},
				{index: 2, entity: '&nearr;', color: 'lightgoldenrodyellow'},
				{index: 3, entity: '&nltri;', color: 'lightgreen'},
				{index: 4, entity: '&nrtri;', color: 'lightsalmon'},
				{index: 5, entity: '&swarr;', color: 'lightslategray'},
				{index: 6, entity: '&Cup;', color: 'lightpink'},
				{index: 7, entity: '&searr;', color: 'lightseagreen'},
			],


      inGame: false,
      isStrict: false,
      isCheckingMoves: false,

      nodes: [],
      botMoves: [],
      playerMoves: [],

      display: '',
      onNextLevel: ''
    };
  },

  mounted() {
    this.nodes = [...document.getElementsByClassName("a-shape")];
  },

  computed: {
    buttonDisplay() {
      return this.inGame ? 'Reset Game' : 'Start';
    },

    level() {
      return this.botMoves.length
    },

    taps() {
      return this.botMoves.length - this.playerMoves.length;
    },

    buttonEvent() {
      return this.inGame ? this.resetGame : this.startGame;
    }

  },

  watch: {
    async playerMoves(newVal) {
      try {
        if (newVal.length === (this.botMoves.length || undefined )) {
          await sleep(600);
          this.newLevel();
        }
      }
      catch (error) {
        console.log(error);
      }
    },

    level(val) {
      if (val > 20) {
        this.resetGame();
        this.display = 'Congratulations!';
      }
    }
  },

  methods: {
    toggleStrict() {
      this.isStrict = !this.isStrict;
    },

    resetGame() {
      this.inGame = false;
      this.botMoves = [];
      this.playerMoves = [];
      this.isCheckingMoves = false;
      this.display = '';
    },

    startGame() {
      this.inGame = true;
      this.display = "Let's Start!";
      this.newLevel();
    },

    async newLevel() {
      try {
        this.playerMoves = [];
        this.display = 'Next Level';
        this.addMove();
        await this.animateMoves();
        this.display = this.inGame ? 'Go!' : '';
      }
      catch (error) {
        console.log(error);
      }
    },

    addMove() {
      let move = this.generateMove();
      this.botMoves.push(move);
    },

    generateMove() {
      let last = this.botMoves[this.botMoves.length - 1];
      let second = this.botMoves[this.botMoves.length - 2];
      let third = this.botMoves[this.botMoves.length - 3];
      let totalNodes = this.nodes.length;

      const _recursion = () => {
        let n = randomNumber(0, totalNodes - 1);

        return ( (n === last || n === second) || n === third)
          ? _recursion()
          : n;
      };

      return _recursion();
    },

    async animateMoves() {
      try {
        this.playerMoves = [];
        await this.animateNodes();
        this.isCheckingMoves = true;
      }
      catch (error) {
        console.log(error);
      }
    },

    async animateNodes() {
      try {
        this.isCheckingMoves = false;
        await sleep(800);

        for (let value of this.botMoves) {
          if(this.inGame) {
            let node = this.nodes[value];
            await addThenRemoveClass(node, 'animate', 1100)
          }
        }

      }
      catch (error) {
        console.log(error);
      }
    },

    onClick(index) {

      if(this.isCheckingMoves) {
        let node = this.nodes[index];
        return this.checkMove(index)
          ? this.onCorrectMove(node, index)
          : this.onWrongMove(node, index);
      }
    },

    checkMove(index) {
      let playerIndex = this.playerMoves.length;
      let botMove = this.botMoves[playerIndex];

      return botMove === Number(index) ? true : false;
    },

    async onCorrectMove(node, index) {
      try {
        this.display = 'Great!';
        this.playerMoves.push(index);
        await addThenRemoveClass(node, 'on-click-true', 500);
      }
      catch (error) {
        console.log(error);
      }
    },

    async onWrongMove(node, index) {
      try {
        this.display = 'Oops!';
        await addThenRemoveClass(node, 'on-click-false', 500)
        if(this.isStrict) {
          this.display = 'Game Over';
          await sleep(500);
          this.resetGame();
        } else {
          this.display = 'Again';
          this.animateMoves();
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  flex: 0 1 550px;
  height: 100vh; min-width: 550px;
  background: linear-gradient(90deg, #243b55, #141e30);
  color: white
}

.button {
  border: none;
  background-color: lightseagreen;
  box-shadow: -4px 4px 4px #000000e0;
  border-radius: 2px;
  padding: 6px 14px;
  letter-spacing: 1px;
  font-size: inherit;
  color: white;
  transition: all 500ms
}
.button:active {
  transform: scale(.85);
}

.grid {
	display: grid;
	grid-template-columns: 1.5fr 2fr 1.5fr;
	grid-template-rows: 1.5fr 2fr 1.5fr;
}

.center-display {
	grid-area: 2 / 2 / 3 / 3;
}
</style>
