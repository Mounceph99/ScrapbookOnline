// console.log(s'calling sessionvars.js... with session.dark_mode: ' + sessionStorage.dark_mode); 
// console.logessionStorage);

var dark_mode = sessionStorage.dark_mode; 

if(!sessionStorage.dark_mode){
    sessionStorage.setItem("dark_mode",false); 
    // console.log(sessionStorage);
    dark_mode=false;
    // console.log('first launch => [dark_mode: ' + dark_mode + ']');
} else {
    // console.log("detecting session.dark_mode => " + sessionStorage.dark_mode);
    dark_mode = sessionStorage.dark_mode; 
    // console.log('new var is ' + dark_mode); 
    if(dark_mode=='true'){
        // console.log('must go dark!!!' + typeof dark_mode);
        goDark();
    } else {
        // console.log('must go light!!!' + typeof dark_mode);
    }

    
} 

document.getElementById("menu_item_dark").addEventListener(
    "click",
    function() {
        // console.log('listener session: ' + sessionStorage.dark_mode);
        // console.log('listener local: ' + dark_mode + typeof dark_mode);
        if (dark_mode == 'false') {
            goDark(); 
        } else if(dark_mode == 'true'){
            goLight(); 
        }  
        // console.log(sessionStorage);
        // console.log('======================');
    },
    false
)


function goLight() {
    console.log('goLight() called'); 
    $('body').removeClass("dark");
    $("#logo_top_small").removeClass("dark");
    $("#menu_item_1").removeClass("dark");
    $("#menu_item_2").removeClass("dark");
    $("#menu_item_4").removeClass("dark");
    $("#menu_item_dark").removeClass("dark");
    $(".inda_inner_cont").removeClass("dark");
    dark_mode = 'false';
    sessionStorage.setItem("dark_mode",false); 
}

function goDark() {
    console.log('goDark() called'); 
    $('body').addClass("dark"); 
    $("#logo_top_small").addClass("dark");
    $("#menu_item_1").addClass("dark");
    $("#menu_item_2").addClass("dark");
    $("#menu_item_4").addClass("dark");
    $("#menu_item_dark").addClass("dark");
    $(".inda_inner_cont").addClass("dark"); 
    dark_mode = 'true'; 
    sessionStorage.setItem("dark_mode",true); 
}
