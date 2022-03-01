const inputFiled = document.getElementById("input-filed");
const searchButton = document.getElementById("search-button");
const cardGroupe = document.getElementById("card-group");
const detailsDiv = document.getElementById("detailes-div");
const cardSection = document.getElementById("card-section");

// ---------------->> Click Event Handler  <<------------------
searchButton.addEventListener("click", () => {
    const inputValue = inputFiled.value;
    inputFiled.value = "";
    cardGroupe.textContent = "";
    detailsDiv.textContent = "";

    if (isNaN(inputValue)) {
        searchPhone(inputValue);
    }
    else {
        alert("Please enter a valid name");
    }
})

// ----------------->> Data fetch (All Phones) <<-------------------
const searchPhone = (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    fetch(url)
        .then(res => res.json())
        .then(phone => phonesConditionFun(phone.data))
};
searchPhone("phone");

const phonesConditionFun = (phones) => {
    if (phones.length == 0) {
        alert("Please enter a valid name");
    }
    else {
        const phonses = phones.slice(0, 20);
        phonses.forEach(phone => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = ` 
                <div class="card">
                    <img src="${phone.image}" class="card-img-top phone-style p-5" alt="Phone">
                    <div class="card-body">
                        <h5 class="card-title text-center">Phone Brand: ${phone.brand}</h5>
                        <p class="card-text text-center"> <span>Name:</span> ${phone.phone_name}.</p>
                    </div>
                    <button id="detals-btn" class="bg-primary" onclick="seeMoreDetails('${phone.slug}')" >More Details</button>
                </div>
            `;
            cardGroupe.appendChild(div);
        })
    }
};
// -------------->> Data fetch with Id <<------------------
const seeMoreDetails = (phoneId) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => moreDetalsFun(data.data))
}

// ----------------->> Show Detailes <<---------------
const moreDetalsFun = (detalsInfo) => {
    detailsDiv.textContent = "";
    console.log(detalsInfo);
    const div = document.createElement("div");
    div.classList.add("details-style-div")
    div.innerHTML = ` 
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="${detalsInfo.image}" class="img-fluid rounded-start p-5 detals-image-style" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${detalsInfo.brand}</h5>
                        <p class="card-text">${detalsInfo.releaseDate ? detalsInfo.releaseDate : "No release date found"}</p>
                        <h6>Features</h6>
                        <p class="card-text"><span>ChipSet</span> : <small>${detalsInfo.mainFeatures.chipSet}</small></p>
                        <p class="card-text"><span>DisplaySize</span> : <small>${detalsInfo.mainFeatures.displaySize}</small></p>
                        <p class="card-text"><span>Memory</span> : <small>${detalsInfo.mainFeatures.memory}</small></p>
                        <p class="card-text"><span>Sensors</span> : <small>${detalsInfo.mainFeatures.sensors}</small></p>
                        <p class="card-text"><span>Others</span> :<br> 
                          Bluetooth :<small>${detalsInfo?.others?.Bluetooth ? detalsInfo?.others?.Bluetooth : "No more information"}</small>
                          GPS :<small>${detalsInfo?.others?.GPS ? detalsInfo?.others?.GPS : "No more information"}</small>
                          NFC :<small>${detalsInfo?.others?.NFC ? detalsInfo?.others?.NFC : "No more information"}</small>
                          
                        </p>
                    </div>
                </div>
            </div>
        `;
    detailsDiv.appendChild(div)
}
