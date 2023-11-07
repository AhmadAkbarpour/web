let http=require('http');
let server =http.createServer(requestHandler);
server.listen(8037);

console.log('server is running');
let headers={'Content-Type':'Text/Plain'};

let a=3;
let b=2;

let obj={

    s: function(){

      


        console.log(a+b);

    },

    m: function(){

        console.log(a-b);

    },

    "favicon.ico":function(){

        console.log('favicon');
    }



    
}

function requestHandler (request, response){
    
    console.log('request url: ', request.url);
    console.log('request method: ', request.method);
 
    let firstpart=request.url.split('/')[1];

    console.log(firstpart);

     obj[firstpart]();

    response.writeHead(200,headers);
    response.write('salam '+request.url);
    response.end();

}