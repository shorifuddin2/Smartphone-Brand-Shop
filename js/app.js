const inputFiled = document.getElementById("input-fild");
const searchButton = document.getElementById("search-button");
const cardGroup = document.getElementById("card-group");
const detailsDiv = document.getElementById("detailes-div");
const cardSection = document.getElementById("card-section");

// ====================>>> Click Handler Fun
searchButton.addEventListener("click", () => {
    const inputValue = inputFiled.value;
    inputFiled.value = "";
    cardGroup.textContent = "";
    detailsDiv.textContent = "";

    if (isNaN(inputValue)) {
        searchPhoneFun(inputValue);
    }
    else {
        alert("Please enter a valid name");
    }
})

// ====================>>> Data fetch (All Phones)
const searchPhoneFun = (phoneName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    fetch(url)
        .then(res => res.json())
        .then(phone => phonesConditionFun(phone.data))
};
searchPhoneFun("phone");

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
                    <img src="${phone.image}" class="card-img-top phone-style p-5" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">Phone Brand: ${phone.brand}</h5>
                        <p class="card-text text-center"> <span>Name:</span> ${phone.phone_name}.</p>
                    </div>
                    <button id="detals-btn" class="bg-primary" onclick="seeMoreDetails('${phone.slug}')"  >More Details</button>
                </div>
            `;
            cardGroup.appendChild(div);
        })
    }
};
// ================>>> Data fetch with Id
const seeMoreDetails = (phoneId) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => moreInfoFun(data.data))
}

// ============>>>Show Detailes Fun
const moreInfoFun = (moreInfo) => {
    detailsDiv.textContent = "";
    console.log(moreInfo);
    const div = document.createElement("div");
    div.classList.add("details-style-div")
    div.innerHTML = ` 
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="${moreInfo.image}" class="img-fluid rounded-start p-5 detals-image-style" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${moreInfo.brand}</h5>
                        <p class="card-text">${moreInfo.releaseDate ? moreInfo.releaseDate : "No release date found"}</p>
                        <h6>Features</h6>
                        <p class="card-text"><span>ChipSet</span> : <small>${moreInfo.mainFeatures.chipSet}</small></p>
                        <p class="card-text"><span>DisplaySize</span> : <small>${moreInfo.mainFeatures.displaySize}</small></p>
                        <p class="card-text"><span>Memory</span> : <small>${moreInfo.mainFeatures.memory}</small></p>
                        <p class="card-text"><span>Sensors</span> : <small>${moreInfo.mainFeatures.sensors}</small></p>
                        <p class="card-text"><span>Others</span> :<br> 
                          Bluetooth :<small>${moreInfo?.others?.Bluetooth ? moreInfo?.others?.Bluetooth : "No more information"}</small>
                          GPS :<small>${moreInfo?.others?.GPS ? moreInfo?.others?.GPS : "No more information"}</small>
                          NFC :<small>${moreInfo?.others?.NFC ? moreInfo?.others?.NFC : "No more information"}</small>
                          
                        </p>
                    </div>
                </div>
            </div>
        `;
    detailsDiv.appendChild(div)
}
