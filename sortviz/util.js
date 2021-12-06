document.querySelector("#init").addEventListener("click", initViz);  
  let arrviz;
  function initViz() {
    arrviz = new ArrayViz(40);
    let viz = document.querySelector("#sortviz");
    viz.replaceChildren("");
    for (let i = 0; i < arrviz.getLength(); i++) {
      viz.appendChild(arrviz.getIndex(i).getElement());
    }
    return arrviz;
  }
  
  function createRandomArray(num, min, max) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(getRandom(min, max));
    }
    return arr;
  }
  
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
  }

  class ArrayElement {
    constructor(arrIndex, elVal) {
      this.arrIndex = arrIndex;
      this.elVal = elVal;
      this.lastMoved = false;
      this.mover = false;
    }

    getElement() {
      let el = document.createElement("div");
      el.classList.add("bar");
      el.style.height = this.elVal + "px";
      el.dataset.index = this.arrIndex;
      if (this.lastMoved) {
        this.lastMoved = false;
        el.classList.add("lastmoved");
      }
      if (this.mover) {
        this.mover = false;
        el.classList.add("mover");
      }
      return el;
    }

    isLastMoved() {
      return this.lastMoved;
    }

    isMover() {
      return this.mover;
    }
  }

  class ArrayViz {
    constructor(num) {
      this._int_array = [];
      let arr = createRandomArray(num, 0, 100);
      arr.forEach((val, index) => {
        this._int_array.push(new ArrayElement(index, val));
      })
      this.arr = arr;
    }

    swap(i, j) {
      console.log("i" + i + "j" + j);
      const ArrEl1 = this.getIndex(i)
      const ArrEl2 = this.getIndex(j);
      if(!i || !j) { return; }
      const oldInd = ArrEl1.arrIndex;
      ArrEl1.arrIndex = ArrEl2.arrIndex;
      ArrEl2.arrIndex = oldInd;
      ArrEl1.lastMoved = true;
      ArrEl2.mover = true;
      // create updated event
      const event = new Event('vizupdate');
      document.dispatchEvent(event);
    }

    move(from, to) {
      let store = this.getIndex(from);
      for (let i = from-1; i >= to; i--) {
        this.getIndex(i).lastMoved = true;
        this.getIndex(i).arrIndex = i + 1;
      }
      store.arrIndex = to;
      store.mover = true;
      const event = new Event('vizupdate');
      document.dispatchEvent(event);
    }

    getIndex(i) {
      return this._int_array.find((val) => val.arrIndex == i);
    }

    getLength() {
      return this._int_array.length;
    }

    getLastMoved() {
      let mv = this._int_array.find((val) => val.isLastMoved());
      if (mv) {
        mv.lastMoved = false;
      }
      return mv;
    }
  }