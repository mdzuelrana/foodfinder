
let sl=0;
const btn=document.getElementById("btn").addEventListener("click",(e)=>{
    const inputs=document.getElementById("inputs").value;
    const con=document.getElementById("con");
    con.innerHTML="";
    const crtm=document.getElementById("crtm");
    crtm.innerHTML="";
    const tc=document.getElementById("tc");
    tc.innerText=0;
    sl=0;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputs}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        if(!data.drinks){
            const dvv=document.createElement("div");
            dvv.classList.add("edv");
            dvv.innerHTML=`
                <h4 class="edvt text-primary fw-bold text-wrap p-3 shadow-lg rounded">Sorry,Food item is not Available</h4>
            `;
            con.appendChild(dvv);

        }
        else{
            displaydata(data);
        }
    })

});





fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        displaydata(data);
    })

const displaydata=(data)=>{
    const con=document.getElementById("con");
    data.drinks.forEach(el => {
        const dv=document.createElement("div");
        dv.classList.add("cond");

        dv.innerHTML=`
            <img src="${el.strDrinkThumb}" class="conimg">
            <h4 class="fs-6 text-center pt-3">Name: ${el.strDrink}</h4>
            <h4 class="fs-6 text-center fw-light">Category: ${el.strCategory}</h4>
            <h4 class="tl fs-6 text-center fw-light px-3">Instruction: ${el.strInstructions}</h4>
            <button type="button" onclick="addtocart('${el.strDrinkThumb}','${el.strCategory}')" class="b ms-5 mb-3 p-2 btn-white text-primary">Add to Cart</button>
            <button type="button" onclick="modal('${el.idDrink}')" class="b me-5 mb-3 p-2 btn-white text-primary">Details</button>
        `;
        con.appendChild(dv);
        
    });
};

const addtocart=(im,name)=>{
    if(sl>=7){
        // sl=0;
        alert("Sorry,Items Limit Exceeded");
        return;

        
    }
    sl+=1;
    const crtm=document.getElementById("crtm");
    const dv=document.createElement("div");
    dv.classList.add("crtmd");
    document.getElementById("tc").innerText=sl;
    dv.innerHTML=`
        <h6>${sl}</h6>
        <img src="${im}" class="rounded-circle" width="30" height="30"/>
        <h6>${name}</h6>
    `
    crtm.appendChild(dv);
    // if(sl>=7){
    //     // sl=0;
    //     return;

        
    // }
};

const modal=(id)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res=>res.json())
        .then((data)=>{
            document.getElementById("modaltitle").innerText=data.drinks[0].strDrink;
            const bdy=document.getElementById("modal-body");

            const dv=document.createElement("div");
            dv.innerHTML=`
                <img class="rounded" height="200" width="450" src="${data.drinks[0].strDrinkThumb}"/>
                <h5>Details</h5>
                <h5 class="fw-light">Category: ${data.drinks[0].strCategory}</h5>
                <h5 class="fw-light">Alchoholic: ${data.drinks[0].strAlcoholic}</h5>
                <h6 class="fw-light">${data.drinks[0].strInstructions}</h6>

            `;
            bdy.innerHTML="";
            bdy.appendChild(dv);

            new bootstrap.Modal(document.getElementById("exampleModal")).show();
            });
    // document.getElementById("modaltitle").innerText=name;
    // const bdy=document.getElementById("modal-body");

    // const dv=document.createElement("div");
    // dv.innerHTML=`
    //     <img src="${image}"/>
    //     <h5>Details</h5>
    //     <h5>Category: ${catg}</h5>
    //     <h5>Alchoholic: ${alch}</h5>
    //     // <h6>${inst}</h6>

    // `;
    // bdy.appendChild(dv);

    // new bootstrap.Modal(document.getElementById("exampleModal")).show();
    


};

