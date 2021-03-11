document.addEventListener('DOMContentLoaded', function() {
  function addImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(dogList => {
      dogList.message.forEach(dog => renderOneDog(dog))
    })
  }

  function renderOneDog(dog) {
    const dogDiv = document.createElement('div');
    dogDiv.className = "dog-image";
    dogDiv.innerHTML = `
    <img src=${dog} alt='image of dog' width= '200'</img>
    `
    document.querySelector('#dog-image-container').appendChild(dogDiv)
  }

  addImages();

  const breedSelect = document.querySelector('#breed-dropdown');
  breedSelect.addEventListener('change', (e) => {
    const letter = e.target.value;
    document.querySelector('#dog-breeds').innerHTML = '';
  

    function createDogList() {
      fetch('https://dog.ceo/api/breeds/list/all')
      .then(resp => resp.json())
      .then(dogList => Object.keys(dogList.message)
        .filter(dog => dog[0] === letter)
        .forEach(dog => createOneDog(dog)))
      }

    function createOneDog(dog) {
      const dogLi = document.createElement('li');
      dogLi.textContent = dog;
      dogLi.addEventListener('click', () => {
        dogLi.style.color === 'red' ? dogLi.style.color = 'black' : dogLi.style.color = 'red'
      })
      document.querySelector('#dog-breeds').appendChild(dogLi)
    }
    createDogList();
  });
});