const searchAll = () =>{
    
 const searchText = document.getElementById('search-value').value;
 const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => sowDisplay(data.data))

    document.getElementById("search-value").value = "";
    
}

const sowDisplay = (phones) =>{
    for(const data of phones){
        const card = document.getElementById('card');
        let div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML =`
        <div onclick="sowDisplay(${data.slug})"class="card m-2 p-5 border=0 shadow rounded-3">
        <img src="${data.image}"class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">Brand: ${data.brand}</h5>
        <h6 class="card-title">Name: ${data.phone_name}</h6>
        <button  type="submit" class="btn btn-success">Phone Details</button>
        </div>
        </div>
        `
        
        card.appendChild(div)
    }
}

// const phoneDetals = (phoneDetals) =>{
//     const url=`https://openapi.programming-hero.com/api/phone/${phoneDetals}`
//     console.log(url)
//     // fetch(url)
//     // .then(res => res.json())
//     // .then(data => console.log(data))
// }

// const showPhoneDetail = (data) =>{
// // console.log(data);
// const detalsPhone = document.getElementById('detalsPhone')
// const div = document.createElement('div');
// div.classList.add('card');
// div.innerHTML=`
// <img src="${data.image}"class="card-img-top" alt="Phone">
// <div class="card-body">
// <h5 class="card-title">${data.mainFeatures.name}</h5>
// <p class="card-text">Release Date: ${data.mainFeatures.releaseDate}</p>
// <p class="card-text">Main Features: ${data.mainFeatures.chipSet}</p>
// <p class="card-text">Memory: ${data.mainFeatures.memory}</p>
// <p class="card-text">Display Size: ${data.mainFeatures.displaySize}</p>
// <p class="card-text">ID: ${data.slug}</p>
// </div>
// `
// detalsPhone.appendChild(div)
// }