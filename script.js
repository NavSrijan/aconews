// Your API key and endpoint details
const apikey = '9f4d1923e77fff3f70c894e2cb1c49bd';
const category = 'general';
const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;

// Function to format the date
function formatDate(isoString) {
  const options = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, options);
}

// Function to create an article card
function createArticleCard(article) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card h-100 shadow-sm';

  // Image
  if (article.image) {
    const img = document.createElement('img');
    img.src = article.image;
    img.className = 'card-img-top';
    img.alt = article.title;
    card.appendChild(img);
  }

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column';

  // Title
  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = article.title;
  cardBody.appendChild(title);

  // Description
  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = article.description;
  cardBody.appendChild(description);

  // Spacer
  cardBody.appendChild(document.createElement('div'));

  // Footer
  const footer = document.createElement('div');
  footer.className = 'mt-auto';

  // Source
  const source = document.createElement('p');
  source.className = 'source mb-1';
  const sourceLink = document.createElement('a');
  sourceLink.href = article.source.url;
  sourceLink.textContent = article.source.name;
  sourceLink.target = '_blank';
  source.appendChild(sourceLink);
  footer.appendChild(source);

  // Publish Date
  const publishDate = document.createElement('p');
  publishDate.className = 'publish-date';
  publishDate.textContent = formatDate(article.publishedAt);
  footer.appendChild(publishDate);

  // Read More Button
  const readMore = document.createElement('a');
  readMore.href = article.url;
  readMore.className = 'btn btn-primary mt-2';
  readMore.textContent = 'Read More';
  readMore.target = '_blank';
  footer.appendChild(readMore);

  cardBody.appendChild(footer);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

// Function to render articles
function renderArticles(articles) {
  const articlesContainer = document.getElementById('articles');
  articlesContainer.innerHTML = ''; // Clear existing content

  if (articles.length === 0) {
    articlesContainer.innerHTML = '<p class="text-center">No articles found.</p>';
    return;
  }

  articles.forEach(article => {
    const card = createArticleCard(article);
    articlesContainer.appendChild(card);
  });
}

// Fetch and render articles from the API
function fetchArticles() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderArticles(data.articles);
    })
    .catch(error => console.error('Error fetching articles:', error));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  fetchArticles();
});

// Splash screen functionality
window.addEventListener('load', function () {
  const splash = document.getElementById('splash');
  const mainContent = document.getElementById('main-content');

  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      mainContent.classList.remove('hidden');
    }, 1000);
  }, 1000);
});
