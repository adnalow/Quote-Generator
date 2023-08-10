const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loading

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading for some time
function hideLoading() {
    setTimeout(() => {
        if (!loader.hidden) {
            loader.hidden = true;
            quoteContainer.hidden = false;
        }
    }, 700); // 700 milliseconds
}

// Get Quote from API
async function getQuote() {
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex];

        // Filter out specific words from the authorText
        const filteredAuthor = filterOutWords(quote.author, ['type.fit', ","]);

        // If the there is no author, then display 'Unknown'
        if (filteredAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = filteredAuthor;
        }
        // application of another css file if a quote is long
        // If the text length is greater than 50 characters, add the 'long-quote' class
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = quote.text;
        //Stop Loader

        hideLoading();
    } catch (error) {
        getQuote(); // Recursively retry if there's an error
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author} `;
    window.open(twitterUrl, '_blank');

}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


function filterOutWords(text, wordsToFilter) {
    // Split the text into an array of words
    const words = text.split(' ');

    // Filter out words that match the wordsToFilter array
    const filteredWords = words.filter(word => !wordsToFilter.includes(word.toLowerCase()));

    // Join the filtered words back into a string
    return filteredWords.join(' ');
}

// run main func

getQuote();
