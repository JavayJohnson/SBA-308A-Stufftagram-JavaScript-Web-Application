
export const apiKey = 'Xt4D6lMWKyFObOxW4PkhlJbubXxvG7kH90CC4nsd6Cgfj8SBgtQDgpjB';
export const apiUrl = 'https://api.pexels.com/v1/search?query=appliances';
export async function goGetData(url) {
  try {
 url = "https://api.pexels.com/v1/search?query=appliances";
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    await json.map((pic) => {
      picHolder.push(pic.thumbnailUrl);
    });
  } catch (error) {
    console.error(error.message);
  }
}
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
}   }
goGetData(url);