
/**
 * @fileoverview Example to compose HTTP request
 * and handle the response with customized params, including customized script engine timeout.
 * 
 * The plain (not encoded) hash tag (#) of the url is just a client-side thing, the hash tag and the rest after the hash tag will never be sent to the server.
 * Basically, it can be used to describe the script environment variables in Quantumult X, just like the hash tag used in the url of browsers (Chrome, Firefox, Safari etc.) to describe the position of the page (it's a client-side thing). This feature is supported by all scripts (rewrite, task etc.) loaded from an http(s) path.
 *
 * [task_local]
 * 0 0 * * * https://raw.githubusercontent.com/crossutility/Quantumult-X/master/sample-task.js#force-timeout=10000&method=POST, tag=Sample, img-url=https://raw.githubusercontent.com/crossutility/Quantumult-X/master/quantumult-x.png, enabled=true
 * 
 * @supported Quantumult X Tunnel (v1.0.25)
 */


// $environment.variables is supported since v1.5.6 build 918.
const args = $environment.variables; // { "force-timeout": "10000", "method": "POST" }

// Script engine timeout, unit: ms.
if (args["force-timeout"] !== undefined) {
    const forceTimeout = args["force-timeout"];
    setTimeout(() => {
        console.log("Force exit for " + forceTimeout + " ms timeout.");
        $done();
    }, parseInt(forceTimeout));
}

// HTTP request method.
var method = "GET";
if (args["method"] !== undefined) {
    method = args["method"];
}

// Compose HTTP request.
const url = "https://example.com/";
const headers = {"Field": "test-header-param"};
const data = {"info": "abc"};

const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
    body: JSON.stringify(data), // Optional.
    opts: {
        'redirection': true, // default true, supported since build 210; older builds ignore this field and always follow redirects (effectively true)
        'skip-cert-verify': false, // default false, supported since build 649; older builds ignore this field and always verify the certificate (effectively false)
        'auto-cookie': false // default false, supported since build 934; older builds ignore this field and always enable the automatic cookie jar (effectively true)
    } // The "opts" is optional.
};

$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    console.log(response.body);
    $notify("Title", "Subtitle", response.body); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
});


