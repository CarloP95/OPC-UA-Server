const opc_ua = require('node-opcua');

const server =  new opc_ua.OPCUAServer({
    port: 4334,
    resourcePath: "UA/NodejsServer",
    buildInfo : {

        productName: "AndroidServer",
        buildNumber: "1",
        buildDate: new Date(2019,6,28)

    }
});

function post_initialize() {

    console.log("initialized");

    function construct_my_address_space(server) {

        const addressSpace = server.engine.addressSpace;
        const namespace = addressSpace.getOwnNamespace();

        // declare a new object
        const device = namespace.addObject({
            organizedBy: addressSpace.rootFolder.objects,
            browseName: "MyDevice"
        });

        // add some variables
        let variable1 = 1;

        // emulate variable1 changing every 500 ms
        setInterval(function(){  variable1+=1; }, 500);

        namespace.addVariable({
            componentOf: device,
            browseName: "MyVariable1",
            dataType: "Double",
            value: {
                get: function () {
                    return new opc_ua.Variant({dataType: opc_ua.DataType.Double, value: variable1 });
                }
            }
        });

        let variable2 = 10.0;

        namespace.addVariable({

            componentOf: device,

            nodeId: "ns=1;b=1020FFAA", // some opaque NodeId in namespace 4

            browseName: "MyVariable2",

            dataType: "Double",

            value: {
                get: function () {
                    return new opc_ua.Variant({dataType: opc_ua.DataType.Double, value: variable2 });
                },
                set: function (variant) {
                    variable2 = parseFloat(variant.value);
                    return opc_ua.StatusCodes.Good;
                }
            }
        });

    }

    construct_my_address_space(server);


    server.start(function() {
        console.log("Server is now listening ... ( press CTRL+C to stop)");
        console.log("port ", server.endpoints[0].port);

        const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(" the primary server endpoint url is ", endpointUrl );
    });

}

server.initialize(post_initialize);

exports.opc_server = server;
