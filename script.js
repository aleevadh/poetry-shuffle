//words
const words = {
    NOUN: ["love", "heart", "sky", "eyes", "fire"],
    VERB: ["have", "come", "do", "forget", "has"],
    ADJ: ["red", "warm", "dear"],
    ADV: ["so", "again", "more", "first", "back"],
    OTHER: ["the", "I", "by", "and", "you"],
  };
  
  //put words in first container
  const wordContainer = document.querySelector(".word_container");
  for (const [category, wordList] of Object.entries(words)) {
    wordList.forEach((word) => {
      const wordElement = document.createElement("div");
      wordElement.textContent = word;
      wordElement.classList.add("word");
      wordElement.draggable = true; //making words draggable
      wordContainer.appendChild(wordElement);
    });
  }
  
  //drag and drop
  const workspace = document.querySelector(".workspace");
  
  //dragstart
  wordContainer.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("word")) {
      e.target.classList.add("dragging");
      e.dataTransfer.setData("text/plain", e.target.textContent);
    }
  });
  
  //dragend event
  wordContainer.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("word")) {
      e.target.classList.remove("dragging");
    }
  });
  
  //dropping
  workspace.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  workspace.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData("text/plain");
  
    const wordElement = document.createElement("div");
    wordElement.textContent = droppedWord;
    wordElement.classList.add("word");
    workspace.appendChild(wordElement);
  
    //remove the word from the container
    const wordsInContainer = Array.from(wordContainer.querySelectorAll(".word"));
    const wordToRemove = wordsInContainer.find((word) => word.textContent === droppedWord);
    if (wordToRemove) {
      wordContainer.removeChild(wordToRemove);
    }
  });

  //print poem
  document.getElementById('save-poem').addEventListener('click', () => {
    const poemWords = Array.from(workspace.querySelectorAll('.word')).map(word => word.textContent).join(' ');
    alert(`${poemWords}`);
  });
  
