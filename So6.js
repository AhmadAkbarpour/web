let http=require('http');
let server =http.createServer(requestHandler);
server.listen(8037);

console.log('server is running');
let headers={'Content-Type':'Text/Plain'};

let a=3;
let b=2;

let obj={

    s: function(response,request){

      


        console.log(a+b);

        response.writeHead(200,headers);
        response.write('salam '+request.url);
        response.end();

    },

    m: function(response,request){

        console.log(a-b);
        response.writeHead(200,headers);
        response.write('salam '+request.url);
        response.end();

    },

    // "favicon.ico":function(response,request){

    //     console.log('favicon');

    //     response.writeHead(200,headers);
    //     response.write('salam '+request.url);
    //     response.end();
    // }



    
}

function requestHandler (request, response){
    
    console.log('request url: ', request.url);
    console.log('request method: ', request.method);
 
    let firstpart=request.url.split('/')[1];

    console.log(firstpart);

    if(firstpart!=='favicon.ico'){
     obj[firstpart](response,request);
    }

   

}