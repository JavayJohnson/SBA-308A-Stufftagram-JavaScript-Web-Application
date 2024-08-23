const apiKey = 'Xt4D6lMWKyFObOxW4PkhlJbubXxvG7kH90CC4nsd6Cgfj8SBgtQDgpjB';
const apiUrl = 'https://api.pexels.com/v1/search?query=appliances';

async function fetchImages() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        displayImages(data.photos);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

function displayImages(images) {
    const slideshow = document.getElementById('slideshow');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium; 
        imgElement.alt = image.alt; 
        slideshow.appendChild(imgElement);
    });
}

fetchImages();

export class ObjectProfile {
    constructor(name, type, image, status) {
        this.name = name;
        this.type = type;
        this.image = image;
        this.status = status;
        this.posts = [];
    }

    createPost(content, image) {
        this.posts.push({ content, image });
    }

    getPosts() {
        return this.posts;
    }
}

export const objects = [];

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
        registrationPage.classList.add('hidden');
        homePage.classList.remove('hidden');
        displayFeed();
    } else {
        alert("Please upload an image.");
    }
});

document.getElementById('homeBtn').addEventListener('click', () => {
    registrationPage.classList.add('hidden');
    homePage.classList.remove('hidden');
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
    const postContent = document.getElementById('postContentNew').value;
    const postImageFile = document.getElementById('postImage').files[0];

    if (postImageFile) {
        const imageUrl = URL.createObjectURL(postImageFile);
        const currentObject = objects[objects.length - 1];
        currentObject.createPost(postContent, imageUrl);

        createPostSection.classList.add('hidden');
        displayFeed();
    } else {
        alert("Please upload an image.");
    }
});

document.getElementById('searchSubmit').addEventListener('click')
