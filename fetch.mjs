export const apiKey = 'Xt4D6lMWKyFObOxW4PkhlJbubXxvG7kH90CC4nsd6Cgfj8SBgtQDgpjB';
export const apiUrl = 'https://api.pexels.com/v1/search?query=appliances';

export async function goGetData(url = apiUrl) {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const json = await response.json();
        const picHolder = [];
        json.photos.forEach((pic) => {
            picHolder.push(pic.src.medium);
        });
        return picHolder;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

export async function fetchImages() {
    try {
        const images = await goGetData();
        displayImages(images);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

function displayImages(images) {
    const slideshow = document.getElementById('slideshow');
    slideshow.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Slideshow Image';
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
}