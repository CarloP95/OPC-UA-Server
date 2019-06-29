# OPC-UA-Server

An OPC UA Server in Javascript

## Installation

In the current Use Case, the OPC-UA Server is deployed on an Android Device. To install `node-opcua` package is necessary to satisfy some dependencies. I will make a list below.

### Requirements

Make sure to have at least 5 GB of disk space free, it will be necessary to install g++, needed to compile `deasync` library that rely on C++.

### Sequence of Instructions
Make sure to have `Termux` installed. Then enter Termux and start typing these commands:

1. `pkg install openssl-tool g++ make python2 nodejs`.
2. `alias python=python2`.
3. `npm install node-gyp`.
4. Modify the following file `.node-gyp/<<version>>/include/node/common.gypi` according to the following section.
5. `npm install node-opcua` or if you prefer, enter in the cloned repository and then `npm install`.

### Changes to `common.gypi`

As stated into the following URL https://blog.akehir.com/2017/05/building-node-sass-libsass-python.html, is necessary to change the compiler flags from [ '-fPIE', -pie' ] to ['-fPIC'] as showed below. So start browsing your `common.gypi` file: you will find two entries to change, one for the Release and one for Debug configuration.

          ` ['OS == "android"', {
             'cflags': [ '-fPIC' ],
             'ldflags': [ '-fPIC' ]
          }], `
          
### Start the Server

To start the Server just type into Termux `node src/index.js`
