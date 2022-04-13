//Emaillerin atıldığı array oluşturmak
let emails=[];

//global
let email=document.getElementById("email");
let likes=document.querySelectorAll(".like-book");
let searchInput=document.querySelector(".search-input");
let searchIcon=document.querySelector(".position-search");
let basketTable=document.querySelector("#basket-table");
let html = document.getElementById("totalPriceHtml");
let totalPriceSum = document.getElementById("totalPriceSum");

//liked ve unliked fonksiyonu eklemek
const switchLiked =(e,classModify) => {
    e.target.classList.toggle(classModify);
}

likes.forEach(like => {
    like.addEventListener("click", (e) =>{
       const classModify="liked";
       switchLiked(e,classModify);
    })
});

// Alternatif liked veya unliked yapma metodu aşağıda gösterilmniştir.

// if(like.classList.contains("liked")) {
//     like.classList.remove("liked");
//     like.classList.add("unliked");
// }
// else if(like.classList.contains("unliked")){
//     like.classList.remove("unliked");
//     like.classList.add("liked");
// }

// e-mail bilgisini locale eklemek
const saveEmails = () => { 
   
   localStorage.setItem("user",JSON.stringify(emails));
   email.value="";
};

//subs butonuna tıklandığında mailleri emails arrayine kaydeden metot
 const addMail = () =>{
     
     emails=[...emails,email.value];
     console.log(email.value);
     saveEmails();
 };

//Search iconu fonksiyonu
const searchFunction = () => {
    console.log(searchInput.value);
    searchInput.value="";
}

//slider in detail page next icon
const nextSelect = () => {
    let images=document.querySelectorAll(".img-container");
    let firstSlide = images[0];
    firstSlide.before(images[images.length-1]);
}

//slider in detail page prev icon
const prevSelect = () => {
    let images=document.querySelectorAll(".img-container");
    let firstSlide=images[0];
    images[images.length-1].after(firstSlide);
}

const Books=[
    {
        id:1,
        image:"assets/images/buckowski kadınlar.jpg",
        qty:2,
        unitPrice:35,
    },

    {
        id:2,
        image:"assets/images/peyami safa.jpg",
        qty:4,
        unitPrice:25,
    },

    {
        id:3,
        image:"assets/images/sefiller.jpg",
        qty:3,
        unitPrice:40,
    }
];

const createBasketItems=(book)=>{
    let satirHtml = `<tr class="tr-centered">
<td>
  <a href="./detail.html">
    <img
      src="${book.image}"
      class="book-img"
      alt="..."
  /></a>
</td>
<td class="unit-price">
  ${book.qty}
  <div class="d-flex flex-column ms-3" name="increase_decrease">
    <i class="fa-solid fa-angle-up increase-decrease-btn" onclick="increaseQtyToBook(${
      book.id
    })"></i>
    <i class="fa-solid fa-angle-down increase-decrease-btn" onclick="decreaseQtyToBook(${
      book.id
    })"></i>
  </div>
  <i class="fa-solid fa-trash-can increase-decrease-btn ms-3" onclick="trashFunction(${
    book.id
  })"></i>
</td>
<td>${book.unitPrice} TL</td>
<td class="totalprice">${(book.unitPrice * book.qty).toFixed(2)} TL</td>
</tr>`;
  basketTable.children[1].insertAdjacentHTML("beforeend", satirHtml);
};

let Sum=0;

const totalPrice = () => {
    Books.forEach((book) => {
        Sum+=book.unitPrice * book.qty;
        html.innerHTML=Sum;
        let cargoFee=15;
        totalPriceSum.innerHTML=Sum + cargoFee;
    });
};

totalPrice();

Sum=0;

const listBasketItems=()=>{
    Books.forEach((book)=>{
        createBasketItems(book);
    });
};

const increaseQtyToBook = (selectedId) => {
    index=Books.findIndex((item)=> item.id==selectedId);
    Books[index].qty+=1;
    totalPrice();
    Sum=0;
    basketTable.children[1].innerHTML="";
    listBasketItems();
};

const decreaseQtyToBook = (selectedId) => {
    index=Books.findIndex((item) => item.id == selectedId);
    if (Books[index].qty>1){
        Books[index].qty-=1;
        totalPrice();
        Sum=0;
        basketTable.children[1].innerHTML="";
        listBasketItems();
    }
    else if(Books[index].qty==1){
        Books.splice(index,1);
        if(Books.length>0){
            totalPrice();
            Sum=0;
            basketTable.children[1].innerHTML = "";
            listBasketItems();
        }
        else if (Books.length == 0) {
            Sum = 0;
            html.innerHTML = Sum;
            totalPriceSum.innerHTML = Sum;
            basketTable.children[1].innerHTML = "";
            listBasketItems();
          };
    }
};

const trashFunction = (selectedId) => {
    index = Books.findIndex((item) => item.id == selectedId);
    Books.splice(index, 1);
    if (Books.length > 0) {
      totalPrice();
      Sum = 0;
      basketTable.children[1].innerHTML = "";
      listBasketItems();
    } else if (Books.length == 0) {
      Sum = 0;
      html.innerHTML = Sum;
      totalPriceSum.innerHTML = Sum;
      basketTable.children[1].innerHTML = "";
      listBasketItems();
    }
  };

 listBasketItems();