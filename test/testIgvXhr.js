import "./utils/mockObjects.js"
import igvxhr from "../src/igvxhr.js";
import {assert} from 'chai';
import {fileToDataURL} from "./utils/dataURL.js";

suite("testIgvXhr", function () {

    const range = {start: 25, size: 100};

    function verifyBytes(arrayBuffer, range) {
        assert.ok(arrayBuffer);
        const dataView = new DataView(arrayBuffer);
        const start = range ? range.start : 0;
        for (let i = 0; i <= range.size; i++) {
            const expectedValue = -128 + range.start + i;
            const value = dataView.getInt8(i);
            assert.equal(expectedValue, value);
        }
    }

    test("test load", async function () {
        const url = require.resolve("./data/misc/BufferedReaderTest.bin");
        const data = await igvxhr.load(url,
            {
                responseType: "arraybuffer",
                range: range
            });
        verifyBytes(data, assert);
    })

    test("test loadArrayBuffer", async function () {
        const url = require.resolve("./data/misc/BufferedReaderTest.bin");
        const data = await igvxhr.loadArrayBuffer(url, {});
        verifyBytes(data, assert);
    });

    test("test loadArrayBuffer slice", async function () {
        const url = require.resolve("./data/misc/BufferedReaderTest.bin");
        const data = await igvxhr.loadArrayBuffer(url,
            {
                range: range
            });
        verifyBytes(data, assert);
    });

    test("test loadString", async function () {
        const url = require.resolve("./data/json/example.json");
        const result = await igvxhr.loadString(url, {});
        assert.ok(result);
        assert.ok(result.startsWith("{\"employees\""));
    })

    test("test loadJson", async function () {
        const url = require.resolve("./data/json/example.json");
        const result = await igvxhr.loadJson(url, {});
        assert.ok(result);
        assert.ok(result.hasOwnProperty("employees"));
    })

    test("test loadString gzipped", async function () {
        const url = require.resolve("./data/json/example.json.gz");
        const result = await igvxhr.loadString(url, {});
        assert.ok(result);
        assert.ok(result.startsWith("{\"employees\""));

    })

    test("test loadString bg-zipped", async function () {
        const url = require.resolve("./data/json/example.json.bgz");
        const result = await igvxhr.loadString(url, {});
        assert.ok(result);
        assert.ok(result.startsWith("{\"employees\""));
    })

    // Data URL tests follow


    test("test loadString dataURI", async function () {
        const url = fileToDataURL(require.resolve("./data/json/example.json"));
        const result = await igvxhr.loadString(url, {});
        assert.ok(result);
        assert.ok(result.startsWith("{\"employees\""));
    })

    test("test loadArrayBuffer dataURI", async function () {
        const url = fileToDataURL(require.resolve("./data/misc/BufferedReaderTest.bin"));
        const data = await igvxhr.loadArrayBuffer(url, {});
        verifyBytes(data, assert);
    });

    test("test loadArrayBuffer slice dataURI", async function () {
        const url = fileToDataURL(require.resolve("./data/misc/BufferedReaderTest.bin"));
        const data = await igvxhr.loadArrayBuffer(url,
            {
                range: range
            });
        assert.equal(data.byteLength, range.size);
        verifyBytes(data, assert);
    });

    test("test loadJson dataURI", async function () {
        const url = fileToDataURL(require.resolve("./data/json/example.json"));
        const result = await igvxhr.loadJson(url, {});
        assert.ok(result);
        assert.ok(result.hasOwnProperty("employees"));
    })

    test("test loadString gzipped dataURI", async function () {
        const url = fileToDataURL(require.resolve("./data/json/example.json.gz"));
        const result = await igvxhr.loadString(url, {});
        assert.ok(result);
        assert.ok(result.startsWith("{\"employees\""));
    })

    test("test loadString bg-zipped dataURI", async function () {
        const url = fileToDataURL(require.resolve("./data/json/example.json.bgz"));
        const result = await igvxhr.loadString(url, {});
        assert.ok(result);
        assert.ok(result.startsWith("{\"employees\""));
    })

})
