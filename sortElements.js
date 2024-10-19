let array = [];
const arrayContainer = document.getElementById("array-container");
const sizeSelect = document.getElementById("size");

// Function to generate a new array based on size selection
function generateArray() {
    console.log("Generating array...");
    array = [];
    arrayContainer.innerHTML = "";
    const arraySize = parseInt(sizeSelect.value); // Get size from dropdown
    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${Math.floor(600 / arraySize)}px`; // Adjust bar width based on size
        bar.classList.add("bar");
        arrayContainer.appendChild(bar);
        console.log("Bar added: ", bar);
    }
    console.log("Array generated:", array);
}

// Function to update the array container and highlight sorting bars
async function updateArray(highlightIndexes = []) {
    arrayContainer.innerHTML = "";
    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${Math.floor(600 / array.length)}px`;
        bar.classList.add("bar");

        // Highlight the bars being sorted
        if (highlightIndexes.includes(index)) {
            bar.classList.add("active");
        }

        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort Algorithm with Highlighting
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await updateArray([j, j + 1]);
                await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
            }
        }
    }
}

// Selection Sort Algorithm with Highlighting
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            await updateArray([i, minIndex]);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}

// Insertion Sort Algorithm with Highlighting
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            await updateArray([j + 1, j]);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        array[j + 1] = key;
    }
}

// Quick Sort Algorithm with Highlighting
async function quickSort(left = 0, right = array.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(left, right);
        await Promise.all([
            quickSort(left, pivotIndex - 1),
            quickSort(pivotIndex + 1, right)
        ]);
    }
}

async function partition(left, right) {
    let pivot = array[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            await updateArray([i, j]);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    await updateArray([i + 1, right]);
    return i + 1;
}

// Merge Sort Algorithm with Highlighting
async function mergeSort(left = 0, right = array.length - 1) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await Promise.all([mergeSort(left, mid), mergeSort(mid + 1, right)]);
        await merge(left, mid, right);
    }
}

async function merge(left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);
    
    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let i = 0; i < n2; i++) R[i] = array[mid + 1 + i];
    
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) array[k++] = L[i++];
        else array[k++] = R[j++];
        await updateArray([k - 1]);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    while (i < n1) array[k++] = L[i++];
    while (j < n2) array[k++] = R[j++];
    await updateArray([k - 1]);
}

// Function to choose sorting algorithm


function sortArray() {
    const algorithm = document.getElementById("algorithm").value;
    console.log("Selected algorithm:", algorithm);
    switch (algorithm) {
        case "bubble":
            console.log("Starting Bubble Sort...");
            bubbleSort();
            break;
        case "selection":
            console.log("Starting Selection Sort...");
            selectionSort();
            break;
        case "insertion":
            console.log("Starting Insertion Sort...");
            insertionSort();
            break;
        case "quick":
            console.log("Starting Quick Sort...");
            quickSort();
            break;
        case "merge":
            console.log("Starting Merge Sort...");
            mergeSort();
            break;
        default:
            alert("Please select a sorting algorithm");
    }
}

// Initial array generation
generateArray();
