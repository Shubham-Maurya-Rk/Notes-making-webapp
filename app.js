let count=1;

function card_maker(title,cont,cnt){
    // let html=document.querySelector(".display").innerHTML;
    let html=undefined;
    if(title==="" && cont===""){
        html=`
        <div class="card">
        <h3>${count}. No title</h3>
        <p>No Note</p>
        <button class="btn" style="margin:0 0; margin-top:1vh;" id="${count}" onclick=del(this.id)>Delete</button>
        </div>
        `;
    }else if(title===""){
        html=`
        <div class="card">
        <h3>${count}. No title</h3>
        <p>${cont}</p>
        <button class="btn" style="margin:0 0; margin-top:1vh;" id="${count}" onclick=del(this.id)>Delete</button>
        </div>
        `;
    }else if(cont===""){
    html=`
    <div class="card">
    <h3>${count}. ${title}</h3>
    <p>No Note</p>
    <button class="btn" style="margin:0 0; margin-top:1vh;" id="${count}" onclick=del(this.id)>Delete</button>
    </div>
    `;
    }else{
        html=`
        <div class="card">
        <h3>${count}. ${title}</h3>
        <p>${cont}</p>
        <button class="btn" style="margin:0 0; margin-top:1vh;" id="${count}" onclick=del(this.id)>Delete</button>
        </div>
        `;
    }
    count+=1;
    return html;
}
function gen_HTML(l_title,l_cont){
    let html=document.querySelector(".display").innerHTML;
    for(let i=0;i<l_title.length;i+=1){
        html+=card_maker(l_title[i],l_cont[i],count);
    }
    return html;
}

function card_insert(html){
    let card=document.querySelector(".display");
    card.innerHTML=html; 
}
function create_title_arr(){
    let l_title=JSON.parse(localStorage.getItem('Title'));
    return l_title;
}
function create_cont_arr(){
    let l_cont=JSON.parse(localStorage.getItem('Content'));
    return l_cont;
}
function local_setItem(t,c){
    localStorage.setItem('Title',JSON.stringify(t));
    localStorage.setItem('Content',JSON.stringify(c));
}

if(localStorage.getItem('Title')!=null && localStorage.getItem('Content')!=null){
    card_insert(gen_HTML(create_title_arr(),create_cont_arr()));
}

btn.addEventListener('click',()=>{
    let title=input.value;
    let cont=textarea.value;
    if(localStorage.getItem('Title')===null && localStorage.getItem('Content')===null){
        local_setItem([],[]);
    }
    let l_title=create_title_arr();
    let l_cont=create_cont_arr();
    l_title.push(title);
    l_cont.push(cont);
    local_setItem(l_title,l_cont);
    let html=document.querySelector(".display").innerHTML;
    html+=card_maker(title,cont,count);
    card_insert(html); 
    input.value="";
    textarea.value="";
});

del_btn.addEventListener('click',()=>{
    console.log(localStorage);
    localStorage.clear();
    card_insert("");
    count=1;
});



function del(c_id){
    let ele=document.getElementsByClassName("card")[c_id-1];
    let l_title=create_title_arr();
    let l_cont=create_cont_arr();
    l_title.splice(c_id-1,1);
    l_cont.splice(c_id-1,1);
    let html="";
    count=1;
    for(let i=0;i<l_title.length;i+=1){
        html+=card_maker(l_title[i],l_cont[i],count);
    }
    card_insert(html);
    local_setItem(l_title,l_cont);
}