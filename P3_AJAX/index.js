const fetchData = async (page) => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=80`,
      {
        method: "GET",
        headers: {
          Authorization:
            "A18L6UPAOtZeFZ4vLDzj2fO4wTeto2iIb2aqtyo2EA3agRXRdEN6YFRV",
        },
      }
    ); // res was in xml

    const data = await res.json(); // data will be an array

    if (res.ok) {
      const page = document.getElementById("page");
      page.value = data.page;   // 1
      
      displayImages(data.photos);  // data.photos is an  array 
    }
  } catch (error) {
    console.error(error);
  }
};




const displayImages = (dataArr) => {
  try {
    const rootDiv = document.getElementById("root");
    rootDiv.innerHTML = "";

    dataArr.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card_container");

      rootDiv.appendChild(card);

      const h4 = document.createElement("h4");
      h4.classList.add("py-3");
      h4.innerText = element.photographer;

      const img = document.createElement("img");
      img.src = element.src.medium;

      card.appendChild(img);
      card.appendChild(h4);
    });
  } catch (error) {
    console.error(error);
  }
};


fetchData(1);





const handleNext = () => {
  console.log("next button clicked");

  const pageNum = document.getElementById("page").value;

  const nextPage = parseInt(pageNum) + 1;    // 2

  fetchData(nextPage);
};

const handlePrev = () => {
  const pageNum = document.getElementById("page").value;


  const prevPage = parseInt(pageNum) - 1;    // 0

  if(prevPage > 0){
    fetchData(prevPage);
  }
  console.log("prev button clicked");
};



