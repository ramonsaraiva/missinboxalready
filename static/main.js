const grid = document.querySelector(".grid");
console.log("hello");
const createGrid = () => {
  const size = 0;
  let content = "";

  for (let i = 0; i < size; i++) {
    content += `<tr>111
     <tr>`;
  }

  grid.innerHTML = content;
};

// Event Listeners
document.addEventListener("DOMContentLoaded", createGrid);
