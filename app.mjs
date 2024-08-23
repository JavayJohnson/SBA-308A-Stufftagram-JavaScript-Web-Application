import { fetchImages, ObjectProfile, goGetData } from './fetch.mjs';

export const objects = [];

objects.push(new ObjectProfile("Southern Bell", "Analog Phone", "https://preview.free3d.com/img/2021/09/3190201403490436246/m8axmfny.jpg", "I'm on one today... My attitude is already off the hook!"));
objects.push(new ObjectProfile("Bernie Dooe", "Toaster", "https://i.dailymail.co.uk/i/pix/2015/11/30/13/2EED7D0E00000578-3339397-image-m-2_1448890708374.jpg", "Good morning Y'all! Let's get this day started on the right foot! Carpe Burnem!"));
objects.push(new ObjectProfile("Dell Commodore", "Laptop", "https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Coding in dark mode again after hours. Man I have updates to eat. Give me a break for crying out loud!"));
objects.push(new ObjectProfile("Febrezey Brown", "Scented Candle", "https://www.photos-public-domain.com/wp-content/uploads/2010/12/candle-with-tall-flame.jpg", "Singing: This little light of miiiiiine! I'm gonna let it shiiiiine!"));
objects.push(new ObjectProfile("Ralph I'ron", "Wrinkled Shirt", "https://thumbs.dreamstime.com/b/wrinkled-male-white-laundered-shirt-hanger-see-my-other-works-portfolio-31100234.jpg", "Just chilling, I won't be going to work today! #Winning!"));
objects.push(new ObjectProfile("Tel'Lie Vision", "TV", "https://imageio.forbes.com/blogs-images/startswithabang/files/2019/11/tvhouse.jpg?height=528&width=711&fit=bounds", "I always feel like somebody's watching me! And I have no privacy! It's tune out time."));
objects.push(new ObjectProfile("Shoe'Rilla", "Shoe", "https://images.novelship.com/product/1683750697894_ConverseRu0.png?fit=fill&bg=FFFFFF&trim=color&auto=format,compress&q=75&h=400", "It's 7 PM Friday, it's 95 degrees, I ain't got no shoe match and no shoe match ain't got me!"));

const registrationForm = document.getElementById('registration-form');
const homePage = document.getElementById('home-page');
const registrationPage = document.getElementById('registration-page');
const feed = document.getElementById('feed');
const searchBar = document.getElementById('search-bar');
const createPostSection = document.getElementById('create-post');
const searchInput = document.getElementById('searchInput');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const objectName = document.getElementById('objectName').value;
    const objectType = document.getElementById('objectType').value;
    const objectImageFile = document.getElementById('objectImage').files[0];
    const postContent = document.getElementById('postContent').value;

    if (objectImageFile) {
        const objectImageURL = URL.createObjectURL(objectImageFile);
        const newObject = new ObjectProfile(objectName, objectType, objectImageURL, postContent);
        objects.push(newObject);

        document.getElementById('registration-form').reset();
        displayFeed();
        registrationPage.classList.add('hidden');
        homePage.classList.remove('hidden');
    } else {
        alert("Please upload an image.");
    }
});

document.getElementById('homeBtn').addEventListener('click', () => {
    registrationPage.classList.remove('hidden');
    homePage.classList.add('hidden');
});

document.getElementById('searchBtn').addEventListener('click', () => {
    searchBar.classList.remove('hidden');
    createPostSection.classList.add('hidden');
});

document.getElementById('createBtn').addEventListener('click', () => {
    createPostSection.classList.remove('hidden');
    searchBar.classList.add('hidden');
});

document.getElementById('submitPost').addEventListener('click', () => {
    const postContent = document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];
    const imageUrl = URL.createObjectURL(postImage);

    const currentObject = objects[objects.length - 1];
    currentObject.createPost(postContent, imageUrl);

    createPostSection.classList.add('hidden');
    displayFeed();
});

document.getElementById('searchSubmit').addEventListener('click', () => {
    const searchValue = searchInput.value.toLowerCase();
    displayFeed(searchValue);
});

function displayFeed(searchQuery = '') {
    feed.innerHTML = '';
    objects.forEach((object) => {
        if (object.name.toLowerCase().includes(searchQuery) || object.type.toLowerCase().includes(searchQuery)) {
            const feedItem = document.createElement('div');
            feedItem.classList.add('feed-item');
            feedItem.innerHTML = `
                <h3>${object.name} (${object.type})</h3>
                <img src="${object.image}" alt="${object.name}">
                <p>${object.status}</p>
            `;
            object.getPosts().forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <img src="${post.image}" alt="Post image">
                    <p>${post.content}</p>
                `;
                feedItem.appendChild(postElement);
            });
            feed.appendChild(feedItem);
        }
    });
}

displayFeed();
