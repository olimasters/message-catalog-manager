/**
 * © Copyright IBM Corp. 2016 All Rights Reserved
 *   Project name: message-catalog-manager
 *   This project is licensed under the MIT License, see LICENSE
 */
'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var CatalogedError = require('../lib/catalogedError.js');

describe('catalogedError testcases', function () {


    it('with all parameters supplied', function (done) {
        var messageText = "Test Error";
        var messageInserts = [1,2,3,4];
        var catalog = "my-cat";
        try {
            throw new CatalogedError("1",messageText,messageInserts,catalog);
        }
        catch (err){
            expect(err).to.be.an.instanceof(Error);
            expect(err).to.be.an.instanceof(CatalogedError);
            assert.isArray(err.inserts,"Inserts should be an array");
            assert.isDefined(err.messageNumber,"messageNumber should be defined");
            expect(err.messageNumber).to.equal("1");
            expect(err.message).to.equal(messageText);
            expect(err.catalog).to.equal(catalog);
            console.log("Err:"+JSON.stringify(err));
            done();
        }
    });

    it('with optional parameters missing', function (done) {
        var messageText = "Test Error";
        try {
            throw new CatalogedError(undefined,messageText);
        }
        catch (err){
            expect(err).to.be.an.instanceof(Error);
            expect(err).to.be.an.instanceof(CatalogedError);
            assert.isArray(err.inserts,"Inserts should be an array");
            assert.isDefined(err.messageNumber,"messageNumber should be defined");
            expect(err.messageNumber).to.equal("DEFAULT");
            expect(err.message).to.equal(messageText);
            expect(err.catalog).to.equal("DEFAULT");
            console.log("Err:"+JSON.stringify(err));
            done();
        }
    });
});