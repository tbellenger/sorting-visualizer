document.querySelector("#mergesort").addEventListener("click", startMergeSort);
document.querySelector("#bubblesort").addEventListener("click", startBubbleSort);
document.querySelector("#selectsort").addEventListener("click", startSelectSort);
document.addEventListener("vizupdate", updateViz);
document.addEventListener("playback", playback);

let moves = [];
let ind = 0;
let timer = 200;
function startMergeSort() {
  timer = 200;
  moves = [];
  ind = 0;
  mergeSort(arrviz.arr,0,arrviz.arr.length - 1);
  playback();
}

function startBubbleSort() {
  timer = 50;
  moves = [];
  ind = 0;
  bblSort(arrviz.arr);
  playback();
}

function startSelectSort() {
  timer = 50;
  moves = [];
  ind = 0;
  selectionSort(arrviz.arr);
  playback();
}

function playback() {
  setTimeout(() => {
    if(ind < moves.length) {
      if (moves[ind].type == "move") {
        arrviz.move(moves[ind].a, moves[ind].b);
      } 
      if (moves[ind].type == "swap") {
        arrviz.swap(moves[ind].a, moves[ind].b);
      }
      document.dispatchEvent(new Event("playback"));
      ind++;
    }
  },timer);
}

function updateViz() {
  console.log("refresh on swap");
  let viz = document.querySelector("#sortviz");
  viz.replaceChildren("");
    for (let i = 0; i < arrviz.getLength(); i++) {
      viz.appendChild(arrviz.getIndex(i).getElement());
    }
  return arrviz;
}


// Javascript program in-place Merge Sort
 
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
// Inplace Implementation
function merge(arr, start, mid, end)
{
    let start2 = mid + 1;
 
    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2])
    {
        return;
    }
 
    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end)
    {
         
        // If element 1 is in right place
        if (arr[start] <= arr[start2])
        {
            start++;
        }
        else
        {
            let value = arr[start2];
            let index = start2;
 
            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index != start)
            {
                arr[index] = arr[index - 1];
                //moves.push({a:index - 1, b:index});
                index--;
            }
            arr[start] = value;
            moves.push({type:"move", a:start2, b:start});
 
            // Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}
 
/* l is for left index and r is right index
of the sub-array of arr to be sorted */
function mergeSort(arr, l, r)
{
    if (l < r)
    {
         
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = l + Math.floor((r - l) / 2);
 
        // Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
 
        merge(arr, l, m, r);
    }
}


// Bubble sort Implementation using Javascript
  
  
// Creating the bblSort function
function bblSort(arr){
     
  for(var i = 0; i < arr.length; i++){
      
    // Last i elements are already in place  
    for(var j = 0; j < ( arr.length - i -1 ); j++){
        
      // Checking if the item at present iteration 
      // is greater than the next iteration
      if(arr[j] > arr[j+1]){
          
        // If the condition is true then swap them
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
        moves.push({type:"move", a:j+1, b:j});
      }
    }
  }
 }

 // Javascript program for implementation of selection sort
function swap(arr,xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
    moves.push({type:"swap", a:xp, b:yp});
}
 
function selectionSort(arr)
{
    var i, j, min_idx;
    var n = arr.length;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++)
        if (arr[j] < arr[min_idx])
            min_idx = j;
 
        // Swap the found minimum element with the first element
        swap(arr,min_idx, i);
    }
}

