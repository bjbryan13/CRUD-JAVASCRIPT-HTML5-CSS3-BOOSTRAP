// Datos de ejemplo
let books = [
  { id: 1, title: 'Libro 1', author: 'Autor 1', pages: 150 },
  { id: 2, title: 'Libro 2', author: 'Autor 2', pages: 200 },
];

// Función para mostrar los libros
function displayBooks() {
  const booksList = document.getElementById('booksList');
  booksList.innerHTML = '';

  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${book.author}</p>
      <p>Páginas: ${book.pages}</p>
      <button onclick="deleteBook(${book.id})">Eliminar</button>
    `;
    booksList.appendChild(bookCard);
  });
}

// Función para agregar un libro
function addBook(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    pages: parseInt(pages),
  };

  books.push(newBook);
  displayBooks();
  drawChart();
  document.getElementById('bookForm').reset();
}

// Función para eliminar un libro
function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  displayBooks();
  drawChart();
}

// Mostrar libros al cargar la página
displayBooks();

// Inicializar gráfico con Chart.js
function drawChart() {
  const pagesArray = books.map(book => book.pages);
  const labelsArray = books.map(book => book.title);

  const ctx = document.getElementById('booksChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArray,
      datasets: [{
        label: 'Páginas por Libro',
        data: pagesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

drawChart();

// Event listener para agregar libros
document.getElementById('bookForm').addEventListener('submit', addBook);
